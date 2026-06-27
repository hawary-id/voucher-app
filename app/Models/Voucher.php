<?php

namespace App\Models;

use App\Enums\VoucherStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'voucher_batch_id',
    'employee_id',
    'code',
    'nominal',
    'status',
    'issued_at',
    'expired_at',
    'used_at',
])]
class Voucher extends Model
{
    use SoftDeletes;
    protected function casts(): array
    {
        return [
            'status' => VoucherStatus::class,
            'nominal' => 'decimal:2',
            'issued_at' => 'datetime',
            'expired_at' => 'datetime',
            'used_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(
            VoucherBatch::class,
            'voucher_batch_id'
        );
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function redemption(): HasOne
    {
        return $this->hasOne(
            VoucherRedemption::class
        );
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where(
            'status',
            VoucherStatus::ACTIVE
        );
    }

    public function scopeUsed(Builder $query): Builder
    {
        return $query->where(
            'status',
            VoucherStatus::USED
        );
    }

    public function scopeExpired(Builder $query): Builder
    {
        return $query->where(
            'status',
            VoucherStatus::EXPIRED
        );
    }

    public function canRedeem(): bool
    {
        return $this->status === VoucherStatus::ACTIVE
            && ! $this->expired_at->isPast()
            && is_null($this->used_at);
    }
}
