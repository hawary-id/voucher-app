<?php

namespace App\Services;

use App\Models\BusinessSetting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BusinessSettingService
{
    /**
     * Default keys with their default values.
     */
    public static array $defaults = [
        'app_name'          => 'Voucher App',
        'app_logo'          => null,
        'business_name'     => '',
        'business_tagline'  => '',
        'business_phone'    => '',
        'business_email'    => '',
        'business_address'  => '',
        'business_city'     => '',
    ];

    /**
     * Get all business settings as key-value array (with defaults).
     */
    public function getAll(): array
    {
        $saved = BusinessSetting::getAllAsArray();
        return array_merge(self::$defaults, $saved);
    }

    /**
     * Update all settings, including logo upload.
     */
    public function updateAll(array $data, ?UploadedFile $logoFile = null): void
    {
        // Handle logo upload
        if ($logoFile && $logoFile->isValid()) {
            // Hapus logo lama jika ada — pastikan path tidak kosong/null
            $oldLogo = BusinessSetting::get('app_logo');
            if (filled($oldLogo) && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
            }

            $filename = Str::random(40) . '.' . $logoFile->getClientOriginalExtension();
            $path = 'logos/' . $filename;
            
            if (Storage::disk('public')->put($path, file_get_contents($logoFile->getPathname()))) {
                BusinessSetting::set('app_logo', $path);
            }
        }

        // Update all other fields
        $fields = ['app_name', 'business_name', 'business_tagline', 'business_phone', 'business_email', 'business_address', 'business_city'];

        foreach ($fields as $field) {
            if (array_key_exists($field, $data)) {
                BusinessSetting::set($field, $data[$field]);
            }
        }
    }
}
