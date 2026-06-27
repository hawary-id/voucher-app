<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('user.view');
    }

    public function view(User $user, User $model): bool
    {
        return $user->can('user.view');
    }

    public function create(User $user): bool
    {
        return $user->can('user.create');
    }

    public function update(
        User $user,
        User $model,
    ): bool {
        if ($model->isSuperAdmin() && !$user->isSuperAdmin()) {
            return false;
        }
        return $user->can('user.update');
    }

    public function delete(
        User $user,
        User $model,
    ): bool {
        if ($model->isSuperAdmin()) {
            return false;
        }
        return $user->can('user.delete');
    }

    public function resetPassword(
        User $user,
        User $model,
    ): bool {
        if ($model->isSuperAdmin() && !$user->isSuperAdmin()) {
            return false;
        }
        return $user->can(
            'user.reset_password'
        );
    }

    public function activate(
        User $user,
        User $model,
    ): bool {
        if ($model->isSuperAdmin()) {
            return false;
        }
        return $user->can('user.activate');
    }

    public function deactivate(
        User $user,
        User $model,
    ): bool {
        if ($model->isSuperAdmin()) {
            return false;
        }
        return $user->can('user.deactivate');
    }
}
