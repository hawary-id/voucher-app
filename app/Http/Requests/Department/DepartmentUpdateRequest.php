<?php

namespace App\Http\Requests\Department;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentUpdateRequest extends FormRequest
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
                'max:20',

                Rule::unique(
                    'departments',
                    'code',
                )->ignore(
                    $this->route('department'),
                ),
            ],

            'name' => [
                'required',
                'string',
                'max:255',
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
            'code.required' => 'Kode departemen wajib diisi.',
            'code.unique' => 'Kode departemen sudah digunakan.',
            'code.max' => 'Kode departemen maksimal 20 karakter.',

            'name.required' => 'Nama departemen wajib diisi.',
            'name.max' => 'Nama departemen maksimal 255 karakter.',

            'is_active.required' => 'Status aktif wajib dipilih.',
        ];
    }

    public function attributes(): array
    {
        return [
            'code' => 'kode departemen',
            'name' => 'nama departemen',
            'is_active' => 'status aktif',
        ];
    }
}
