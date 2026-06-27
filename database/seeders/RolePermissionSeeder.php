<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)
            ->forgetCachedPermissions();

        $permissions = [

            // Store
            'store.view',
            'store.create',
            'store.update',
            'store.delete',

            // Department
            'department.view',
            'department.create',
            'department.update',
            'department.delete',

            // Employee
            'employee.view',
            'employee.create',
            'employee.update',
            'employee.delete',

            // Voucher Batch
            'voucher_batch.view',
            'voucher_batch.create',
            'voucher_batch.update',
            'voucher_batch.delete',

            // Voucher
            'voucher.view',
            'voucher.redeem',
            'voucher.inquiry',

            // Voucher Report
            'voucher_report.view',

            // Voucher Claim
            'voucher_claim.view',
            'voucher_claim.claim',
            'voucher_claim.pay',

            // Dashboard
            'dashboard.view',

            // User
            'user.view',
            'user.create',
            'user.update',
            'user.delete',
            'user.reset_password',
            'user.activate',
            'user.deactivate',

            // Activity Log
            'activity_log.view',

            // Business Setting
            'business_setting.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $superAdmin = Role::firstOrCreate([
            'name' => 'SUPER_ADMIN',
            'guard_name' => 'web',
        ]);

        $hrd = Role::firstOrCreate([
            'name' => 'HRD',
            'guard_name' => 'web',
        ]);

        $adminStore = Role::firstOrCreate([
            'name' => 'ADMIN_STORE',
            'guard_name' => 'web',
        ]);

        $cashier = Role::firstOrCreate([
            'name' => 'CASHIER',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | SUPER ADMIN
        |--------------------------------------------------------------------------
        */

        $superAdmin->syncPermissions($permissions);

        /*
        |--------------------------------------------------------------------------
        | HRD
        |--------------------------------------------------------------------------
        */

        $hrd->syncPermissions([
            'dashboard.view',

            'department.view',
            'department.create',
            'department.update',
            'department.delete',

            'employee.view',
            'employee.create',
            'employee.update',
            'employee.delete',

            'voucher_batch.view',
            'voucher_batch.create',
            'voucher_batch.update',
            'voucher_batch.delete',

            'voucher.view',
            'voucher.inquiry',

            'voucher_report.view',

            'voucher_claim.view',
            'voucher_claim.claim',

            'user.view',
            'user.create',
            'user.update',
            'user.delete',
            'user.reset_password',
            'user.activate',
            'user.deactivate',
        ]);

        /*
        |--------------------------------------------------------------------------
        | ADMIN STORE
        |--------------------------------------------------------------------------
        */

        $adminStore->syncPermissions([
            'dashboard.view',

            'voucher.view',
            'voucher.redeem',
            'voucher.inquiry',

            'voucher_report.view',

            'voucher_claim.view',
            'voucher_claim.pay',
        ]);

        /*
        |--------------------------------------------------------------------------
        | CASHIER
        |--------------------------------------------------------------------------
        */

        $cashier->syncPermissions([
            'dashboard.view',

            'voucher.view',
            'voucher.redeem',
            'voucher.inquiry',
            'voucher_report.view',
        ]);
    }
}
