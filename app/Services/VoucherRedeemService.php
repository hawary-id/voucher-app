<?php

namespace App\Services;

use App\Enums\ClaimStatus;
use App\Enums\VoucherStatus;
use App\Models\User;
use App\Models\Voucher;
use App\Models\VoucherRedemption;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VoucherRedeemService
{
    public function findByCode(string $code): Voucher
    {
        $voucher = Voucher::query()
            ->with([
                'employee.department',
            ])
            ->where('code', $code)
            ->first();

        if (! $voucher) {
            throw ValidationException::withMessages([
                'code' => 'Voucher tidak ditemukan.',
            ]);
        }

        return $voucher;
    }

    public function redeem(
        string $code,
        User $cashier,
    ): VoucherRedemption {
        return DB::transaction(function () use ($code, $cashier) {

            $voucher = $this->findByCode($code);

            $this->validateVoucher($voucher);

            if (! $cashier->store_id) {
                throw ValidationException::withMessages([
                    'code' => 'User belum terhubung ke store.',
                ]);
            }

            $redemption = VoucherRedemption::create([
                'voucher_id'      => $voucher->id,
                'store_id'        => $cashier->store_id,
                'cashier_id'      => $cashier->id,
                'redeemed_amount' => $voucher->nominal,
                'claim_status'    => ClaimStatus::PENDING,
                'redeemed_at'     => now(),
            ]);

            $voucher->update([
                'status'  => VoucherStatus::USED,
                'used_at' => now(),
            ]);

            activity('voucher')
                ->performedOn($voucher)
                ->causedBy($cashier)
                ->event('redeemed')
                ->withProperties([
                    'voucher_code' => $voucher->code,
                    'employee' => $voucher->employee->name,
                    'store' => $cashier->store?->name,
                    'nominal' => $voucher->nominal,
                    'redeemed_at' => $redemption->redeemed_at,
                ])
                ->log("Redeem voucher {$voucher->code}");

            return $redemption;
        });
    }

    public function void(
        VoucherRedemption $redemption,
        User $user,
    ): void {
        DB::transaction(function () use ($redemption, $user) {
            if ($redemption->claim_status !== ClaimStatus::PENDING) {
                throw ValidationException::withMessages([
                    'void' => 'Penukaran voucher tidak dapat dibatalkan karena sudah dalam proses klaim.',
                ]);
            }

            $voucher = $redemption->voucher;

            $voucher->update([
                'status' => VoucherStatus::ACTIVE,
                'used_at' => null,
            ]);

            activity('voucher')
                ->performedOn($voucher)
                ->causedBy($user)
                ->event('void_redeem')
                ->withProperties([
                    'voucher_code' => $voucher->code,
                    'store' => $redemption->store?->name,
                    'cashier' => $redemption->cashier?->name,
                    'nominal' => $voucher->nominal,
                ])
                ->log("Membatalkan penukaran (void redeem) voucher {$voucher->code}");

            $redemption->delete();
        });
    }

    private function validateVoucher(
        Voucher $voucher,
    ): void {
        if ($voucher->status !== VoucherStatus::ACTIVE) {
            throw ValidationException::withMessages([
                'code' => 'Voucher tidak aktif.',
            ]);
        }

        if ($voucher->used_at !== null) {
            throw ValidationException::withMessages([
                'code' => 'Voucher sudah digunakan.',
            ]);
        }

        if (! $voucher->canRedeem()) {
            throw ValidationException::withMessages([
                'code' => 'Voucher sudah expired atau tidak dapat digunakan.',
            ]);
        }
    }
}
