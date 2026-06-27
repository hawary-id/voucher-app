<?php

namespace App\Services;

use App\Enums\VoucherStatus;
use App\Models\Voucher;
use App\Models\VoucherBatch;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class VoucherBatchService
{
    public function paginate(
        ?string $search = null,
        int $perPage = 10,
    ): LengthAwarePaginator {
        return VoucherBatch::query()
            ->search($search)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): VoucherBatch
    {
        return DB::transaction(function () use ($data) {

            $employeeIds = $data['employee_ids'];

            unset($data['employee_ids']);

            $voucherBatch = VoucherBatch::create([
                ...$data,
                'batch_no' => $this->generateBatchNo(),
                'total_employee' => count($employeeIds),
                'created_by' => Auth::id(),
            ]);

            foreach ($employeeIds as $employeeId) {
                Voucher::create([
                    'voucher_batch_id' => $voucherBatch->id,
                    'employee_id' => $employeeId,
                    'code' => $this->generateVoucherCode(),
                    'nominal' => $voucherBatch->nominal,
                    'status' => VoucherStatus::ACTIVE,
                    'issued_at' => $voucherBatch->period_start,
                    'expired_at' => Carbon::parse($voucherBatch->period_end)->endOfDay(),
                ]);
            }

            return $voucherBatch->refresh();
        });
    }

    public function update(
        VoucherBatch $voucherBatch,
        array $data,
    ): VoucherBatch {
        return DB::transaction(function () use ($voucherBatch, $data) {

            $oldPeriodStart = $voucherBatch->period_start;
            $oldPeriodEnd = $voucherBatch->period_end;

            unset(
                $data['employee_ids'],
                $data['nominal'],
            );

            $voucherBatch->update($data);

            $voucherUpdate = [];

            if (! $oldPeriodStart->equalTo($voucherBatch->period_start)) {
                $voucherUpdate['issued_at'] = $voucherBatch->period_start;
            }

            if (! $oldPeriodEnd->equalTo($voucherBatch->period_end)) {
                $voucherUpdate['expired_at'] = Carbon::parse($voucherBatch->period_end)->endOfDay();
            }

            if ($voucherUpdate !== []) {
                Voucher::query()
                    ->where('voucher_batch_id', $voucherBatch->id)
                    ->where('status', VoucherStatus::ACTIVE)
                    ->update($voucherUpdate);
            }

            return $voucherBatch->refresh();
        });
    }

    public function delete(
        VoucherBatch $voucherBatch,
    ): void {
        DB::transaction(function () use ($voucherBatch) {

            $hasProcessedVoucher = $voucherBatch
                ->vouchers()
                ->where('status', '!=', VoucherStatus::ACTIVE)
                ->exists();

            if ($hasProcessedVoucher) {
                throw ValidationException::withMessages([
                    'voucher_batch' => 'Batch tidak dapat dihapus karena sudah memiliki voucher yang telah digunakan atau diproses.',
                ]);
            }

            $voucherBatch->vouchers()->delete();

            $voucherBatch->delete();
        });
    }

    public function findForShow(
        VoucherBatch $voucherBatch,
    ): array {
        $voucherBatch->load([
            'createdBy',
            'vouchers' => fn($query) => $query
                ->with([
                    'employee.department',
                    'redemption.store',
                    'redemption.cashier',
                ])
                ->orderBy('id'),
        ]);

        return [
            'voucherBatch' => $voucherBatch,
            'summary' => [
                'total' => $voucherBatch->vouchers->count(),
                'active' => $voucherBatch->vouchers
                    ->where('status', VoucherStatus::ACTIVE)
                    ->count(),
                'used' => $voucherBatch->vouchers
                    ->where('status', VoucherStatus::USED)
                    ->count(),
                'expired' => $voucherBatch->vouchers
                    ->where('status', VoucherStatus::EXPIRED)
                    ->count(),
            ],
        ];
    }

    private function generateVoucherCode(): string
    {
        do {
            $code = 'VCH-' . strtoupper(
                Str::random(8),
            );
        } while (
            Voucher::query()
            ->where('code', $code)
            ->exists()
        );

        return $code;
    }

    private function generateBatchNo(): string
    {
        $prefix = 'VB-' . Carbon::now()->format('Ymd');

        $lastBatch = VoucherBatch::query()
            ->where('batch_no', 'like', "{$prefix}%")
            ->latest('id')
            ->first();

        $sequence = 1;

        if ($lastBatch) {
            $lastNumber = (int) substr(
                $lastBatch->batch_no,
                -4,
            );

            $sequence = $lastNumber + 1;
        }

        return sprintf(
            '%s-%04d',
            $prefix,
            $sequence,
        );
    }
}
