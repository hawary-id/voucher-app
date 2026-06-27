<?php

namespace App\Policies;

use App\Models\User;

class VoucherPolicy
{
    public function view(User $user): bool
    {
        return $user->can('voucher.view');
    }

    public function inquiry(User $user): bool
    {
        return $user->can('voucher.inquiry');
    }

    public function viewAny(User $user): bool
    {
        return $user->can('voucher_report.view');
    }

    public function void(User $user, \App\Models\Voucher $voucher): bool
    {
        return $user->can('voucher_batch.update') && $voucher->status === \App\Enums\VoucherStatus::ACTIVE;
    }
}
