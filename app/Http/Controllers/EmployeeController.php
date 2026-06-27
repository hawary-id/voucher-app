<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employee\EmployeeStoreRequest;
use App\Http\Requests\Employee\EmployeeUpdateRequest;
use App\Models\Department;
use App\Models\Employee;
use App\Services\EmployeeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(
        protected EmployeeService $employeeService,
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Employee::class);

        $employees = $this->employeeService->paginate(
            search: $request->string('search')->toString(),
        );

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'filters' => [
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Employee::class);

        return Inertia::render('employees/create', [
            'departments' => Department::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(EmployeeStoreRequest $request): RedirectResponse
    {
        $this->authorize('create', Employee::class);

        $this->employeeService->create(
            $request->validated()
        );

        return redirect()
            ->route('employees.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Karyawan berhasil ditambahkan.',
            ]);
    }

    public function edit(Employee $employee): Response
    {
        $this->authorize('update', $employee);

        return Inertia::render('employees/edit', [
            'employee' => $employee->load('department'),
            'departments' => Department::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function update(
        EmployeeUpdateRequest $request,
        Employee $employee
    ): RedirectResponse {
        $this->authorize('update', $employee);

        $this->employeeService->update(
            $employee,
            $request->validated()
        );

        return redirect()
            ->route('employees.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Karyawan berhasil diperbarui.',
            ]);
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        $this->authorize('delete', $employee);

        $this->employeeService->delete($employee);

        return redirect()
            ->route('employees.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Karyawan berhasil dihapus.',
            ]);
    }
}
