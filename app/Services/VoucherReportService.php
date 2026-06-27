<?php

namespace App\Services;

use App\Enums\VoucherStatus;
use App\Models\Department;
use App\Models\Store;
use App\Models\Voucher;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\Response;
use App\Exports\VoucherReportExport;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class VoucherReportService
{
    private function query(
        string $search = '',
        ?string $status = null,
        ?int $departmentId = null,
        ?int $storeId = null,
    ): Builder {
        $user = Auth::user();
        if ($user && $user->isStoreUser()) {
            $storeId = $user->store_id;
        }

        return Voucher::query()
            ->with([
                'employee.department',
                'redemption.store',
                'redemption.cashier',
            ])
            ->when(
                $search,
                fn(Builder $query) => $query->where(function (Builder $q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhereHas('employee', fn(Builder $emp) => $emp->where('name', 'like', "%{$search}%"));
                })
            )
            ->when(
                filled($status) && $status !== 'ALL',
                fn(Builder $query) => $query->where(
                    'status',
                    $status,
                )
            )
            ->when(
                $departmentId,
                fn(Builder $query) => $query->whereHas(
                    'employee',
                    fn(Builder $employee) => $employee->where(
                        'department_id',
                        $departmentId,
                    )
                )
            )
            ->when(
                $storeId,
                fn(Builder $query) => $query->whereHas(
                    'redemption',
                    fn(Builder $redemption) => $redemption->where(
                        'store_id',
                        $storeId,
                    )
                )
            )
            ->latest('id');
    }

    public function paginate(
        string $search = '',
        ?string $status = null,
        ?int $departmentId = null,
        ?int $storeId = null,
    ): LengthAwarePaginator {
        return $this->query(
            $search,
            $status,
            $departmentId,
            $storeId,
        )
            ->paginate()
            ->withQueryString();
    }

    public function summary(): array
    {
        $user = Auth::user();
        $isStore = $user && $user->isStoreUser();
        $storeId = $isStore ? $user->store_id : null;

        $totalQuery = Voucher::query();
        $nominalQuery = Voucher::query();
        $activeQuery = Voucher::query()->where('status', VoucherStatus::ACTIVE);
        $usedQuery = Voucher::query()->where('status', VoucherStatus::USED);
        $expiredQuery = Voucher::query()->where('status', VoucherStatus::EXPIRED);
        $voidQuery = Voucher::query()->where('status', VoucherStatus::VOID);

        if ($isStore) {
            $totalQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
            $nominalQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
            $activeQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
            $usedQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
            $expiredQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
            $voidQuery->whereHas('redemption', fn($q) => $q->where('store_id', $storeId));
        }

        return [
            'total_vouchers' => $totalQuery->count(),

            'total_nominal' => (float) $nominalQuery->sum('nominal'),

            'active_vouchers' => $activeQuery->count(),

            'used_vouchers' => $usedQuery->count(),

            'expired_vouchers' => $expiredQuery->count(),

            'void_vouchers' => $voidQuery->count(),
        ];
    }

    public function printPdf(
        string $search = '',
        ?string $status = null,
        ?int $departmentId = null,
        ?int $storeId = null,
    ): Response {
        $user = Auth::user();
        if ($user && $user->isStoreUser()) {
            $storeId = $user->store_id;
        }

        $vouchers = $this->query(
            $search,
            $status,
            $departmentId,
            $storeId,
        )->get();

        $department = $departmentId
            ? Department::find($departmentId)
            : null;

        $store = $storeId
            ? Store::find($storeId)
            : null;


        $pdf = Pdf::loadView(
            'pdf.voucher-report',
            [
                'vouchers' => $vouchers,
                'filters' => [
                    'search' => $search ?: '-',
                    'status' => $status ?: 'All',
                    'department' => $department?->name ?? 'All',
                    'store' => $store?->name ?? 'All',
                ],
            ]
        )->setPaper('a4', 'landscape');

        if ($user) {
            activity('report')
                ->causedBy($user)
                ->event('print')
                ->withProperties([
                    'report' => 'Voucher Report',
                    'total_data' => $vouchers->count(),
                    'filters' => [
                        'search' => $search,
                        'status' => $status,
                        'department_id' => $departmentId,
                        'store_id' => $storeId,
                    ],
                ])
                ->log('Mencetak laporan voucher');
        }


        return $pdf->download('voucher-report.pdf');
    }

    public function exportExcel(
        string $search = '',
        ?string $status = null,
        ?int $departmentId = null,
        ?int $storeId = null,
    ): BinaryFileResponse {
        $user = Auth::user();
        if ($user && $user->isStoreUser()) {
            $storeId = $user->store_id;
        }

        $vouchers = $this->query(
            $search,
            $status,
            $departmentId,
            $storeId,
        )->get();

        if ($user) {
            activity('report')
                ->causedBy($user)
                ->event('export')
                ->withProperties([
                    'report' => 'Voucher Report',
                    'format' => 'xlsx',
                    'total_data' => $vouchers->count(),
                    'filters' => [
                        'search' => $search,
                        'status' => $status,
                        'department_id' => $departmentId,
                        'store_id' => $storeId,
                    ],
                ])
                ->log('Export laporan voucher');
        }


        return Excel::download(
            new VoucherReportExport($vouchers),
            'voucher-report.xlsx',
        );
    }
}
