<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

#[Fillable([
    'batch_no',
    'title',
    'description',
    'period_start',
    'period_end',
    'nominal',
    'total_employee',
    'created_by',
])]
class VoucherBatch extends Model
{
    use LogsActivity;
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'nominal' => 'decimal:2',
            'deleted_at' => 'datetime',
        ];
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }

    public function scopeSearch(
        Builder $query,
        ?string $search
    ): Builder {
        return $query->when(
            $search,
            fn(Builder $query) => $query->where(function (
                Builder $query
            ) use ($search) {
                $query
                    ->where('batch_no', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            }),
        );
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'batch_no',
                'title',
                'description',
                'period_start',
                'period_end',
                'nominal',
                'total_employee',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
