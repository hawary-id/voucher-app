<?php

namespace App\Http\Requests\VoucherBatch;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VoucherBatchStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'period_start' => [
                'required',
                'date',
            ],

            'period_end' => [
                'required',
                'date',
                'after_or_equal:period_start',
            ],

            'nominal' => [
                'required',
                'numeric',
                'min:1',
            ],

            'employee_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'employee_ids.*' => [
                'integer',
                'distinct',
                'exists:employees,id',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul batch wajib diisi.',
            'title.string' => 'Judul batch harus berupa teks.',
            'title.max' => 'Judul batch maksimal 255 karakter.',

            'description.string' => 'Deskripsi harus berupa teks.',

            'period_start.required' => 'Tanggal mulai wajib diisi.',
            'period_start.date' => 'Tanggal mulai tidak valid.',

            'period_end.required' => 'Tanggal berakhir wajib diisi.',
            'period_end.date' => 'Tanggal berakhir tidak valid.',
            'period_end.after_or_equal' => 'Tanggal berakhir harus setelah atau sama dengan tanggal mulai.',

            'nominal.required' => 'Nominal voucher wajib diisi.',
            'nominal.numeric' => 'Nominal voucher harus berupa angka.',
            'nominal.min' => 'Nominal voucher minimal 1.',

            'employee_ids.required' => 'Minimal satu karyawan harus dipilih.',
            'employee_ids.array' => 'Data karyawan tidak valid.',
            'employee_ids.min' => 'Minimal satu karyawan harus dipilih.',

            'employee_ids.*.integer' => 'Data karyawan tidak valid.',
            'employee_ids.*.distinct' => 'Karyawan tidak boleh dipilih lebih dari satu kali.',
            'employee_ids.*.exists' => 'Karyawan yang dipilih tidak ditemukan.',
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'judul batch',
            'description' => 'deskripsi',
            'period_start' => 'tanggal mulai',
            'period_end' => 'tanggal berakhir',
            'nominal' => 'nominal voucher',
            'employee_ids' => 'karyawan',
        ];
    }
}
