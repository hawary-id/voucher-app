<?php

namespace App\Policies;

use App\Models\User;
use App\Models\VoucherRedemption;

class VoucherRedemptionPolicy
{
    public function create(User $user): bool
    {
        return $user->can('voucher.redeem');
    }

    public function viewAny(User $user): bool
    {
        return $user->can('voucher_claim.view');
    }

    public function view(
        User $user,
        VoucherRedemption $voucherRedemption,
    ): bool {
        if ($user->isStoreUser()) {
            return $user->can('voucher_claim.view') && $voucherRedemption->store_id === $user->store_id;
        }
        return $user->can('voucher_claim.view');
    }

    public function claim(User $user, VoucherRedemption $voucherRedemption): bool
    {
        if ($user->isStoreUser()) {
            return $user->can('voucher_claim.claim') && $voucherRedemption->store_id === $user->store_id;
        }
        return $user->can('voucher_claim.claim');
    }

    public function pay(User $user, VoucherRedemption $voucherRedemption): bool
    {
        if ($user->isStoreUser()) {
            return $user->can('voucher_claim.pay') && $voucherRedemption->store_id === $user->store_id;
        }
        return $user->can('voucher_claim.pay');
    }

    public function delete(User $user, VoucherRedemption $voucherRedemption): bool
    {
        if ($user->isStoreUser()) {
            return $user->can('voucher.redeem')
                && $voucherRedemption->store_id === $user->store_id
                && $voucherRedemption->claim_status === \App\Enums\ClaimStatus::PENDING;
        }
        return $user->isSuperAdmin() && $voucherRedemption->claim_status === \App\Enums\ClaimStatus::PENDING;
    }

    public function voidClaim(User $user, VoucherRedemption $voucherRedemption): bool
    {
        return $user->can('voucher_claim.claim') 
            && $voucherRedemption->claim_status === \App\Enums\ClaimStatus::CLAIMED;
    }

    public function voidPay(User $user, VoucherRedemption $voucherRedemption): bool
    {
        if ($user->isStoreUser()) {
            return $user->can('voucher_claim.pay')
                && $voucherRedemption->store_id === $user->store_id
                && $voucherRedemption->claim_status === \App\Enums\ClaimStatus::PAID;
        }
        return $user->can('voucher_claim.pay') 
            && $voucherRedemption->claim_status === \App\Enums\ClaimStatus::PAID;
    }
}
