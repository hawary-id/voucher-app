<?php

namespace App\Models;

use App\Enums\ClaimStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'voucher_id',
    'store_id',
    'cashier_id',
    'claimed_by',
    'paid_by',
    'redeemed_amount',
    'claim_status',
    'redeemed_at',
    'claimed_at',
    'paid_at',
    'notes',
])]
class VoucherRedemption extends Model
{
    protected function casts(): array
    {
        return [
            'claim_status' => ClaimStatus::class,

            'redeemed_amount' => 'decimal:2',

            'redeemed_at' => 'datetime',

            'claimed_at' => 'datetime',

            'paid_at' => 'datetime',
        ];
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function cashier(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'cashier_id',
        );
    }

    public function claimedBy(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'claimed_by',
        );
    }

    public function paidBy(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'paid_by',
        );
    }

    public function scopeForStore(
        Builder $query,
        int $storeId,
    ): Builder {
        return $query->where(
            'store_id',
            $storeId,
        );
    }

    public function scopePending(
        Builder $query,
    ): Builder {
        return $query->where(
            'claim_status',
            ClaimStatus::PENDING,
        );
    }

    public function scopeClaimed(
        Builder $query,
    ): Builder {
        return $query->where(
            'claim_status',
            ClaimStatus::CLAIMED,
        );
    }

    public function scopePaid(
        Builder $query,
    ): Builder {
        return $query->where(
            'claim_status',
            ClaimStatus::PAID,
        );
    }
}