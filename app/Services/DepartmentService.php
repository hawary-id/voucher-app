<?php

namespace App\Services;

use App\Models\Department;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DepartmentService
{
    public function paginate(
        ?string $search = null,
        int $perPage = 10,
    ): LengthAwarePaginator {
        return Department::query()
            ->when(
                $search,
                fn($query) => $query->where(function ($query) use ($search) {
                    $query
                        ->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%");
                }),
            )
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Department
    {
        return Department::create($data);
    }

    public function update(
        Department $department,
        array $data,
    ): Department {
        $department->update($data);

        return $department->refresh();
    }

    public function delete(
        Department $department,
    ): void {
        $department->delete();
    }
}
