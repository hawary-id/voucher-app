<?php

namespace App\Policies;

use App\Models\Store;
use App\Models\User;

class StorePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('store.view');
    }

    public function view(User $user, Store $store): bool
    {
        return $user->can('store.view');
    }

    public function create(User $user): bool
    {
        return $user->can('store.create');
    }

    public function update(User $user, Store $store): bool
    {
        return $user->can('store.update');
    }

    public function delete(User $user, Store $store): bool
    {
        return $user->can('store.delete');
    }
}
