<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'code' => 'HRD',
                'name' => 'Human Resource Development',
                'is_active' => true,
            ],
            [
                'code' => 'FIN',
                'name' => 'Finance',
                'is_active' => true,
            ],
            [
                'code' => 'IT',
                'name' => 'Information Technology',
                'is_active' => true,
            ],
            [
                'code' => 'OPS',
                'name' => 'Operasional',
                'is_active' => true,
            ],
            [
                'code' => 'GA',
                'name' => 'General Affair',
                'is_active' => true,
            ],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['code' => $department['code']],
                $department,
            );
        }
    }
}
