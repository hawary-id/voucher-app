<?php

namespace App\Http\Requests\Store;

use App\Enums\BusinessType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'max:50',
                'unique:stores,code',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'business_type' => [
                'required',
                new Enum(BusinessType::class),
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode toko wajib diisi.',
            'code.unique' => 'Kode toko sudah digunakan.',
            'code.max' => 'Kode toko maksimal 50 karakter.',
            'code.string' => 'Kode toko harus berupa teks.',

            'name.required' => 'Nama toko wajib diisi.',
            'name.max' => 'Nama toko maksimal 255 karakter.',
            'name.string' => 'Nama toko harus berupa teks.',

            'business_type.required' => 'Jenis usaha wajib dipilih.',

            'address.string' => 'Alamat harus berupa teks.',

            'phone.string' => 'Nomor telepon harus berupa teks.',
            'phone.max' => 'Nomor telepon maksimal 50 karakter.',

            'is_active.required' => 'Status aktif wajib dipilih.',
        ];
    }

    public function attributes(): array
    {
        return [
            'code' => 'kode toko',
            'name' => 'nama toko',
            'business_type' => 'jenis usaha',
            'address' => 'alamat',
            'phone' => 'nomor telepon',
            'is_active' => 'status aktif',
        ];
    }
}
