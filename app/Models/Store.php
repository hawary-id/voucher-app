<?php

namespace App\Models;

use App\Enums\BusinessType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

#[Fillable([
    'code',
    'name',
    'business_type',
    'address',
    'phone',
    'is_active',
])]
class Store extends Model
{
    use LogsActivity;
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'business_type' => BusinessType::class,
            'is_active' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function voucherRedemptions(): HasMany
    {
        return $this->hasMany(VoucherRedemption::class);
    }

    public function scopeActive(
        Builder $query
    ): Builder {
        return $query->where('is_active', true);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'code',
                'name',
                'business_type',
                'address',
                'phone',
                'is_active',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
