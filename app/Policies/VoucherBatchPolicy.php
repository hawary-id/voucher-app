<?php

namespace App\Policies;

use App\Models\User;
use App\Models\VoucherBatch;

class VoucherBatchPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('voucher_batch.view');
    }

    public function view(
        User $user,
        VoucherBatch $voucherBatch,
    ): bool {
        return $user->can('voucher_batch.view');
    }

    public function create(User $user): bool
    {
        return $user->can('voucher_batch.create');
    }

    public function update(
        User $user,
        VoucherBatch $voucherBatch,
    ): bool {
        return $user->can('voucher_batch.update');
    }

    public function delete(
        User $user,
        VoucherBatch $voucherBatch,
    ): bool {
        return $user->can('voucher_batch.delete');
    }
}
