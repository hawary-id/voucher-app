<?php

namespace App\Services;

use App\Enums\ClaimStatus;
use App\Models\User;
use App\Models\VoucherRedemption;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VoucherClaimService
{
    public function paginate(
        string $search = '',
        ?string $status = null,
        ?int $storeId = null,
    ): LengthAwarePaginator {
        $user = auth()->user();
        if ($user && $user->isStoreUser()) {
            $storeId = $user->store_id;
        }

        return VoucherRedemption::query()
            ->with([
                'voucher.employee.department',
                'store',
                'cashier',
                'claimedBy',
                'paidBy',
            ])
            ->when(
                $search,
                fn(Builder $query) => $query->whereHas(
                    'voucher',
                    fn(Builder $voucher) => $voucher->where(
                        'code',
                        'like',
                        "%{$search}%"
                    )
                )
            )
            ->when(
                filled($status) && $status !== 'ALL',
                fn(Builder $query) => $query->where(
                    'claim_status',
                    ClaimStatus::from($status),
                )
            )
            ->when(
                $storeId,
                fn(Builder $query) => $query->where(
                    'store_id',
                    $storeId,
                )
            )
            ->latest('redeemed_at')
            ->paginate()
            ->withQueryString();
    }

    public function find(
        VoucherRedemption $voucherRedemption,
    ): VoucherRedemption {
        return $voucherRedemption->load([
            'voucher.employee.department',
            'store',
            'cashier',
            'claimedBy',
            'paidBy',
        ]);
    }

    public function claim(
        VoucherRedemption $voucherRedemption,
        User $user,
    ): void {
        DB::transaction(function () use ($voucherRedemption, $user) {

            if (
                $voucherRedemption->claim_status !==
                ClaimStatus::PENDING
            ) {
                throw ValidationException::withMessages([
                    'claim' => 'Voucher sudah pernah diproses.',
                ]);
            }

            $voucherRedemption->update([
                'claim_status' => ClaimStatus::CLAIMED,
                'claimed_by' => $user->id,
                'claimed_at' => now(),
            ]);

            activity('claim')
                ->performedOn($voucherRedemption)
                ->causedBy($user)
                ->event('claimed')
                ->withProperties([
                    'voucher_code' => $voucherRedemption->voucher->code,
                    'store' => $voucherRedemption->store->name,
                    'employee' => $voucherRedemption->voucher->employee->name,
                    'nominal' => $voucherRedemption->redeemed_amount,
                    'claimed_at' => $voucherRedemption->claimed_at,
                ])
                ->log("Mengklaim voucher {$voucherRedemption->voucher->code}");
        });
    }

    public function pay(
        VoucherRedemption $voucherRedemption,
        User $user,
    ): void {
        DB::transaction(function () use ($voucherRedemption, $user) {

            if (
                $voucherRedemption->claim_status !==
                ClaimStatus::CLAIMED
            ) {
                throw ValidationException::withMessages([
                    'payment' => 'Voucher belum dapat dibayar.',
                ]);
            }

            $voucherRedemption->update([
                'claim_status' => ClaimStatus::PAID,
                'paid_by' => $user->id,
                'paid_at' => now(),
            ]);

            activity('claim')
                ->performedOn($voucherRedemption)
                ->causedBy($user)
                ->event('paid')
                ->withProperties([
                    'voucher_code' => $voucherRedemption->voucher->code,
                    'store' => $voucherRedemption->store->name,
                    'employee' => $voucherRedemption->voucher->employee->name,
                    'nominal' => $voucherRedemption->redeemed_amount,
                    'paid_at' => $voucherRedemption->paid_at,
                ])
                ->log("Membayar klaim voucher {$voucherRedemption->voucher->code}");
        });
    }

    public function bulkClaim(
        array $ids,
        User $user,
    ): void {
        DB::transaction(function () use ($ids, $user) {
            $redemptions = VoucherRedemption::query()
                ->with(['voucher.employee', 'store'])
                ->whereIn('id', $ids)
                ->get();

            foreach ($redemptions as $redemption) {
                if ($redemption->claim_status !== ClaimStatus::PENDING) {
                    throw ValidationException::withMessages([
                        'claim' => "Voucher {$redemption->voucher->code} sudah pernah diproses.",
                    ]);
                }

                $redemption->update([
                    'claim_status' => ClaimStatus::CLAIMED,
                    'claimed_by' => $user->id,
                    'claimed_at' => now(),
                ]);

                activity('claim')
                    ->performedOn($redemption)
                    ->causedBy($user)
                    ->event('claimed')
                    ->withProperties([
                        'voucher_code' => $redemption->voucher->code,
                        'store' => $redemption->store->name,
                        'employee' => $redemption->voucher->employee->name,
                        'nominal' => $redemption->redeemed_amount,
                        'claimed_at' => $redemption->claimed_at,
                    ])
                    ->log("Mengklaim voucher {$redemption->voucher->code}");
            }
        });
    }

    public function bulkPay(
        array $ids,
        User $user,
    ): void {
        DB::transaction(function () use ($ids, $user) {
            $redemptions = VoucherRedemption::query()
                ->with(['voucher.employee', 'store'])
                ->whereIn('id', $ids)
                ->get();

            foreach ($redemptions as $redemption) {
                if ($redemption->claim_status !== ClaimStatus::CLAIMED) {
                    throw ValidationException::withMessages([
                        'payment' => "Klaim voucher {$redemption->voucher->code} belum dapat dibayar.",
                    ]);
                }

                $redemption->update([
                    'claim_status' => ClaimStatus::PAID,
                    'paid_by' => $user->id,
                    'paid_at' => now(),
                ]);

                activity('claim')
                    ->performedOn($redemption)
                    ->causedBy($user)
                    ->event('paid')
                    ->withProperties([
                        'voucher_code' => $redemption->voucher->code,
                        'store' => $redemption->store->name,
                        'employee' => $redemption->voucher->employee->name,
                        'nominal' => $redemption->redeemed_amount,
                        'paid_at' => $redemption->paid_at,
                    ])
                    ->log("Membayar klaim voucher {$redemption->voucher->code}");
            }
        });
    }

    public function voidClaim(
        VoucherRedemption $voucherRedemption,
        User $user,
    ): void {
        DB::transaction(function () use ($voucherRedemption, $user) {
            if ($voucherRedemption->claim_status !== ClaimStatus::CLAIMED) {
                throw ValidationException::withMessages([
                    'void' => 'Hanya klaim berstatus CLAIMED yang dapat dibatalkan.',
                ]);
            }

            $voucherRedemption->update([
                'claim_status' => ClaimStatus::PENDING,
                'claimed_by' => null,
                'claimed_at' => null,
            ]);

            activity('claim')
                ->performedOn($voucherRedemption)
                ->causedBy($user)
                ->event('claim_voided')
                ->withProperties([
                    'voucher_code' => $voucherRedemption->voucher->code,
                    'store' => $voucherRedemption->store->name,
                    'employee' => $voucherRedemption->voucher->employee->name,
                    'nominal' => $voucherRedemption->redeemed_amount,
                ])
                ->log("Membatalkan persetujuan klaim voucher {$voucherRedemption->voucher->code}");
        });
    }

    public function voidPay(
        VoucherRedemption $voucherRedemption,
        User $user,
    ): void {
        DB::transaction(function () use ($voucherRedemption, $user) {
            if ($voucherRedemption->claim_status !== ClaimStatus::PAID) {
                throw ValidationException::withMessages([
                    'void' => 'Hanya klaim berstatus PAID yang dapat dibatalkan pembayarannya.',
                ]);
            }

            $voucherRedemption->update([
                'claim_status' => ClaimStatus::CLAIMED,
                'paid_by' => null,
                'paid_at' => null,
            ]);

            activity('claim')
                ->performedOn($voucherRedemption)
                ->causedBy($user)
                ->event('payment_voided')
                ->withProperties([
                    'voucher_code' => $voucherRedemption->voucher->code,
                    'store' => $voucherRedemption->store->name,
                    'employee' => $voucherRedemption->voucher->employee->name,
                    'nominal' => $voucherRedemption->redeemed_amount,
                ])
                ->log("Membatalkan status pembayaran klaim voucher {$voucherRedemption->voucher->code}");
        });
    }
}
