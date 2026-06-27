<?php

namespace App\Services;

use App\Enums\ClaimStatus;
use App\Enums\VoucherStatus;
use App\Models\Voucher;
use App\Models\VoucherRedemption;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function summary(): array
    {
        $user = auth()->user();

        if ($user && $user->isStoreUser()) {
            $storeId = $user->store_id;

            return [
                'total_voucher_redeem' => VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->count(),

                'total_nominal_redeem' => (float) VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->sum('redeemed_amount'),

                'claimed_vouchers' => VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->where('claim_status', ClaimStatus::CLAIMED)
                    ->count(),

                'paid_vouchers' => VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->where('claim_status', ClaimStatus::PAID)
                    ->count(),

                'total_claim_amount' => (float) VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->where('claim_status', ClaimStatus::CLAIMED)
                    ->sum('redeemed_amount'),

                'paid_claim_amount' => (float) VoucherRedemption::query()
                    ->where('store_id', $storeId)
                    ->where('claim_status', ClaimStatus::PAID)
                    ->sum('redeemed_amount'),
            ];
        }

        return [
            'total_vouchers' => Voucher::query()->count(),

            'active_vouchers' => Voucher::query()
                ->where('status', VoucherStatus::ACTIVE)
                ->count(),

            'used_vouchers' => Voucher::query()
                ->where('status', VoucherStatus::USED)
                ->count(),

            'expired_vouchers' => Voucher::query()
                ->where('status', VoucherStatus::EXPIRED)
                ->count(),

            'total_claim_amount' => (float) VoucherRedemption::query()
                ->sum('redeemed_amount'),

            'paid_claim_amount' => (float) VoucherRedemption::query()
                ->where(
                    'claim_status',
                    ClaimStatus::PAID,
                )
                ->sum('redeemed_amount'),
        ];
    }

    public function latestVouchers()
    {
        return Voucher::query()
            ->with([
                'employee.department',
                'redemption.store',
            ])
            ->latest()
            ->take(5)
            ->get();
    }

    public function latestClaims()
    {
        $query = VoucherRedemption::query()
            ->with([
                'voucher.employee',
                'store',
                'cashier',
            ]);

        $user = auth()->user();
        if ($user && $user->isStoreUser()) {
            $query->where('store_id', $user->store_id);
        }

        return $query->latest()
            ->take(5)
            ->get();
    }

    public function voucherMonthlyChart(): array
    {
        $rows = DB::table('vouchers')
            ->selectRaw("
            DATE_FORMAT(issued_at, '%Y-%m') as month,
            COUNT(*) as total
        ")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return [
            'labels' => $rows->pluck('month'),
            'datasets' => [
                [
                    'label' => 'Voucher Diterbitkan',
                    'data' => $rows->pluck('total'),
                ],
            ],
        ];
    }

    public function redeemMonthlyChart(): array
    {
        $query = DB::table('voucher_redemptions')
            ->selectRaw("
            DATE_FORMAT(redeemed_at, '%Y-%m') as month,
            COUNT(*) as total
        ")
            ->whereNotNull('redeemed_at');

        $user = auth()->user();
        if ($user && $user->isStoreUser()) {
            $query->where('store_id', $user->store_id);
        }

        $rows = $query->groupBy('month')
            ->orderBy('month')
            ->get();

        return [
            'labels' => $rows->pluck('month'),
            'datasets' => [
                [
                    'label' => 'Voucher Ditukarkan',
                    'data' => $rows->pluck('total'),
                ],
            ],
        ];
    }

    public function claimByStoreChart(): array
    {
        $query = DB::table('voucher_redemptions')
            ->join(
                'stores',
                'stores.id',
                '=',
                'voucher_redemptions.store_id',
            )
            ->selectRaw("
            stores.name,
            COUNT(*) as total
        ");

        $user = auth()->user();
        if ($user && $user->isStoreUser()) {
            $query->where('voucher_redemptions.store_id', $user->store_id);
        }

        $rows = $query->groupBy('stores.name')
            ->orderByDesc('total')
            ->get();

        return [
            'labels' => $rows->pluck('name'),
            'datasets' => [
                [
                    'label' => 'Jumlah Klaim',
                    'data' => $rows->pluck('total'),
                ],
            ],
        ];
    }

    public function voucherByDepartmentChart(): array
    {
        $rows = DB::table('vouchers')
            ->join(
                'employees',
                'employees.id',
                '=',
                'vouchers.employee_id',
            )
            ->join(
                'departments',
                'departments.id',
                '=',
                'employees.department_id',
            )
            ->selectRaw("
            departments.name,
            COUNT(*) as total
        ")
            ->groupBy('departments.name')
            ->orderByDesc('total')
            ->get();

        return [
            'labels' => $rows->pluck('name'),
            'datasets' => [
                [
                    'label' => 'Voucher',
                    'data' => $rows->pluck('total'),
                ],
            ],
        ];
    }
}
