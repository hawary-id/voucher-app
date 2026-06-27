<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nik' => [
                'required',
                'string',
                'max:50',
                Rule::unique('employees', 'nik')->ignore($this->route('employee')),
            ],
            'name' => ['required', 'string', 'max:255'],
            'department_id' => ['nullable', 'exists:departments,id'],
            'position' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'terminated_at' => ['nullable', 'date'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    public function attributes(): array
    {
        return [
            'nik' => 'NIK',
            'name' => 'nama',
            'department_id' => 'departemen',
            'position' => 'jabatan',
            'phone' => 'nomor telepon',
            'terminated_at' => 'tanggal keluar',
            'is_active' => 'status aktif',
        ];
    }
}
