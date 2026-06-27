<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        Department::query()
            ->each(function (Department $department) {

                Employee::factory()
                    ->count(20)
                    ->create([
                        'department_id' => $department->id,
                    ]);
            });
    }
}
