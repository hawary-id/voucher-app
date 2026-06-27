<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Get a setting value by key.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        return $setting?->value ?? $default;
    }

    /**
     * Set a setting value by key.
     */
    public static function set(string $key, mixed $value): static
    {
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    /**
     * Get all settings as key-value array.
     */
    public static function getAllAsArray(): array
    {
        return static::all()->pluck('value', 'key')->toArray();
    }
}
