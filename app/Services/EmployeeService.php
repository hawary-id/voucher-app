<?php

namespace App\Services;

use App\Models\Employee;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EmployeeService
{
    public function paginate(
        ?string $search = null,
        int $perPage = 10,
    ): LengthAwarePaginator {
        return Employee::query()
            ->with('department')
            ->when(
                $search,
                fn($query) => $query->where(function ($query) use ($search) {
                    $query
                        ->where('nik', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%");
                }),
            )
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Employee
    {
        return Employee::create($data);
    }

    public function update(Employee $employee, array $data): Employee
    {
        $employee->update($data);

        return $employee->refresh();
    }

    public function delete(Employee $employee): void
    {
        $employee->delete();
    }
}
