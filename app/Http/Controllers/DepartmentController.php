<?php

namespace App\Http\Controllers;

use App\Http\Requests\Department\DepartmentStoreRequest;
use App\Http\Requests\Department\DepartmentUpdateRequest;
use App\Models\Department;
use App\Services\DepartmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DepartmentController extends Controller
{
    public function __construct(
        private readonly DepartmentService $departmentService,
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Department::class);

        $departments = $this->departmentService->paginate(
            search: $request->string('search')->toString(),
        );

        return Inertia::render('departments/index', [
            'departments' => $departments,
            'filters' => [
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Department::class);

        return Inertia::render('departments/create');
    }

    public function store(
        DepartmentStoreRequest $request,
    ): RedirectResponse {
        $this->authorize('create', Department::class);

        $this->departmentService->create(
            $request->validated(),
        );

        return redirect()
            ->route('departments.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Department berhasil ditambahkan.',
            ]);
    }

    public function edit(
        Department $department,
    ): Response {
        $this->authorize('update', $department);

        return Inertia::render('departments/edit', [
            'department' => $department,
        ]);
    }

    public function update(
        DepartmentUpdateRequest $request,
        Department $department,
    ): RedirectResponse {
        $this->authorize('update', $department);

        $this->departmentService->update(
            $department,
            $request->validated(),
        );

        return redirect()
            ->route('departments.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Department berhasil diperbarui.',
            ]);
    }

    public function destroy(
        Department $department,
    ): RedirectResponse {
        $this->authorize('delete', $department);

        $this->departmentService->delete($department);

        return redirect()
            ->route('departments.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Department berhasil dihapus.',
            ]);
    }
}
