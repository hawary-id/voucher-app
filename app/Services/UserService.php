<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function paginate(
        ?string $search = null,
        int $perPage = 10,
    ): LengthAwarePaginator {
        return User::query()
            ->with([
                'store',
                'roles',
            ])
            ->when(
                $search,
                fn($query) => $query->where(function ($query) use ($search) {
                    $query
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                }),
            )
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): User
    {
        $role = $data['role'];

        unset($data['role']);

        $data['password'] = Hash::make(
            $data['password']
        );

        $user = User::create($data);

        $user->syncRoles($role);

        return $user->load([
            'store',
            'roles',
        ]);
    }

    public function update(
        User $user,
        array $data,
    ): User {
        $role = $data['role'];

        unset($data['role']);

        if (
            empty($data['password'])
        ) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make(
                $data['password']
            );
        }

        $user->update($data);

        $user->syncRoles($role);

        return $user->refresh()->load([
            'store',
            'roles',
        ]);
    }

    public function delete(
        User $user,
    ): void {
        $user->delete();
    }

    public function resetPassword(
        User $user,
        string $password,
    ): void {
        $user->update([
            'password' => Hash::make(
                $password,
            ),
        ]);
    }

    public function activate(User $user): void
    {
        $user->is_active = true;
        $user->save();
    }

    public function deactivate(User $user): void
    {
        $user->is_active = false;
        $user->save();
    }
}
