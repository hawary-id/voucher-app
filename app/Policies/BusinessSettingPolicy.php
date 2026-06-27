<?php

namespace App\Policies;

use App\Models\BusinessSetting;
use App\Models\User;

class BusinessSettingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, ?BusinessSetting $setting = null): bool
    {
        return $user->isSuperAdmin();
    }
}
