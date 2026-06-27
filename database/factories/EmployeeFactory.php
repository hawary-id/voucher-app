<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nik' => fake()->unique()->numerify('EMP######'),
            'name' => fake()->name(),
            'department_id' => Department::query()->inRandomOrder()->value('id'),
            'position' => fake()->randomElement([
                'Staff',
                'Supervisor',
                'Coordinator',
                'Manager',
            ]),
            'phone' => fake()->numerify('08##########'),
            'terminated_at' => null,
            'is_active' => true,
        ];
    }
}
