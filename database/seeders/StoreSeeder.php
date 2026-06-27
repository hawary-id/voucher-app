<?php

namespace Database\Seeders;

use App\Enums\BusinessType;
use App\Models\Store;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $stores = [
            [
                'code' => 'SW001',
                'name' => 'Swalayan Bogor',
                'business_type' => BusinessType::SUPERMARKET,
                'address' => 'Bogor',
                'phone' => null,
                'is_active' => true,
            ],
            [
                'code' => 'CF001',
                'name' => 'Cafe Bogor',
                'business_type' => BusinessType::CAFE,
                'address' => 'Bogor',
                'phone' => null,
                'is_active' => true,
            ],
            [
                'code' => 'SW002',
                'name' => 'Swalayan Depok',
                'business_type' => BusinessType::SUPERMARKET,
                'address' => 'Depok',
                'phone' => null,
                'is_active' => true,
            ],
        ];

        foreach ($stores as $store) {
            Store::updateOrCreate(
                ['code' => $store['code']],
                $store,
            );
        }
    }
}
