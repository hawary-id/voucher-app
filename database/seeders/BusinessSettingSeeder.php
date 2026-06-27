<?php

namespace Database\Seeders;

use App\Models\BusinessSetting;
use Illuminate\Database\Seeder;

class BusinessSettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'app_name'          => 'Voucher App',
            'app_logo'          => null,
            'business_name'     => 'PT. Nama Perusahaan',
            'business_tagline'  => 'Tagline perusahaan Anda',
            'business_phone'    => '',
            'business_email'    => '',
            'business_address'  => '',
            'business_city'     => '',
        ];

        foreach ($defaults as $key => $value) {
            BusinessSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }
}
