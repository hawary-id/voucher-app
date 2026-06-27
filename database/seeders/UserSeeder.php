<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@voucher.test',
                'role' => 'SUPER_ADMIN',
            ],
            [
                'name' => 'HRD User',
                'email' => 'hrd@voucher.test',
                'role' => 'HRD',
            ],
            [
                'name' => 'Store Admin',
                'email' => 'store@voucher.test',
                'role' => 'ADMIN_STORE',
            ],
            [
                'name' => 'Cashier User',
                'email' => 'cashier@voucher.test',
                'role' => 'CASHIER',
            ],
        ];

        foreach ($users as $item) {
            $user = User::updateOrCreate(
                [
                    'email' => $item['email'],
                ],
                [
                    'name' => $item['name'],
                    'password' => bcrypt('password'),
                ],
            );

            $user->syncRoles([
                $item['role'],
            ]);
        }
    }
}
