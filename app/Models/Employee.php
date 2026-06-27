<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

#[Fillable([
    'nik',
    'name',
    'department_id',
    'position',
    'phone',
    'terminated_at',
    'is_active',
])]
class Employee extends Model
{
    use LogsActivity;
    use SoftDeletes;
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'terminated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->whereNull('terminated_at');
    }

    public function scopeNotTerminated(Builder $query): Builder
    {
        return $query->whereNull('terminated_at');
    }

    public function isActive(): bool
    {
        return $this->is_active
            && is_null($this->terminated_at);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'nik',
                'name',
                'department_id',
                'position',
                'phone',
                'is_active',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
