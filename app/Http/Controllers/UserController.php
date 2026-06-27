<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Store;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\RedirectResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    public function index(
        Request $request,
    ): Response {
        $this->authorize('viewAny', User::class);

        $search = $request
            ->string('search')
            ->toString();

        return Inertia::render(
            'users/index',
            [
                'users' => $this->userService
                    ->paginate($search),

                'filters' => [
                    'search' => $search,
                ],
            ]
        );
    }

    public function create(): Response
    {
        $this->authorize(
            'create',
            User::class,
        );

        return Inertia::render(
            'users/create',
            [
                'roles' => Role::query()
                    ->orderBy('name')
                    ->get(),

                'stores' => Store::query()
                    ->orderBy('name')
                    ->get(),
            ]
        );
    }

    public function store(
        StoreUserRequest $request,
    ): RedirectResponse {
        $this->authorize(
            'create',
            User::class,
        );

        $this->userService->create(
            $request->validated(),
        );

        return redirect()
            ->route('users.index')
            ->with(
                'toast',
                [
                    'type' => 'success',
                    'message' => 'User berhasil ditambahkan.',
                ]
            );
    }

    public function edit(
        User $user,
    ): Response {
        $this->authorize(
            'update',
            $user,
        );

        return Inertia::render(
            'users/edit',
            [
                'user' => $user->load([
                    'store',
                    'roles',
                ]),

                'roles' => Role::query()
                    ->orderBy('name')
                    ->get(),

                'stores' => Store::query()
                    ->orderBy('name')
                    ->get(),
            ]
        );
    }

    public function update(
        UpdateUserRequest $request,
        User $user,
    ): RedirectResponse {
        $this->authorize(
            'update',
            $user,
        );

        $this->userService->update(
            $user,
            $request->validated(),
        );

        return redirect()
            ->route('users.index')
            ->with(
                'toast',
                [
                    'type' => 'success',
                    'message' => 'User berhasil diperbarui.',
                ]
            );
    }

    public function destroy(
        User $user,
    ): RedirectResponse {
        $this->authorize(
            'delete',
            $user,
        );

        $this->userService->delete(
            $user,
        );

        return redirect()
            ->route('users.index')
            ->with(
                'toast',
                [
                    'type' => 'success',
                    'message' => 'User berhasil dihapus.',
                ]
            );
    }

    public function resetPassword(
        ResetPasswordRequest $request,
        User $user,
    ): RedirectResponse {

        $this->authorize(
            'resetPassword',
            $user,
        );

        $this->userService->resetPassword(
            $user,
            $request->validated()['password'],
        );

        return back()->with(
            'toast',
            [
                'type' => 'success',
                'message' => 'Password berhasil direset.',
            ],
        );
    }

    public function activate(
        User $user,
    ): RedirectResponse {

        $this->authorize(
            'activate',
            $user,
        );

        $this->userService->activate(
            $user,
        );

        return back()->with(
            'toast',
            [
                'type' => 'success',
                'message' => 'Pengguna berhasil diaktifkan.',
            ],
        );
    }

    public function deactivate(
        User $user,
    ): RedirectResponse {

        $this->authorize(
            'deactivate',
            $user,
        );

        $this->userService->deactivate(
            $user,
        );

        return back()->with(
            'toast',
            [
                'type' => 'success',
                'message' => 'Pengguna berhasil dinonaktifkan.',
            ],
        );
    }
}
