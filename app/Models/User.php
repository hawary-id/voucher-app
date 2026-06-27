<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

/**
 * @property int $id
 * @property int|null $store_id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'store_id',
    'name',
    'email',
    'password',
])]
#[Hidden([
    'password',
    'remember_token',
    'two_factor_secret',
    'two_factor_recovery_codes',
])]
class User extends Authenticatable implements PasskeyUser
{
    use LogsActivity;
    use HasFactory;
    use HasRoles;
    use Notifiable;
    use SoftDeletes;
    use PasskeyAuthenticatable;
    use TwoFactorAuthenticatable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'deleted_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function generatedVoucherBatches(): HasMany
    {
        return $this->hasMany(
            VoucherBatch::class,
            'generated_by'
        );
    }

    public function createdVouchers(): HasMany
    {
        return $this->hasMany(
            Voucher::class,
            'created_by'
        );
    }

    public function voucherRedemptions(): HasMany
    {
        return $this->hasMany(
            VoucherRedemption::class,
            'cashier_id'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function isSuperAdmin(): bool
    {
        return $this->hasRole('SUPER_ADMIN');
    }

    public function isHrd(): bool
    {
        return $this->hasRole('HRD');
    }

    public function isAdminStore(): bool
    {
        return $this->hasRole('ADMIN_STORE');
    }

    public function isCashier(): bool
    {
        return $this->hasRole('CASHIER');
    }

    public function isStoreUser(): bool
    {
        return $this->hasAnyRole([
            'ADMIN_STORE',
            'CASHIER',
        ]);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('user')
            ->logOnly([
                'store_id',
                'name',
                'email',
                'is_active',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
