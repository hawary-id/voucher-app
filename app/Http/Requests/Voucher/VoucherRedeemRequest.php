<?php

namespace App\Http\Requests\Voucher;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VoucherRedeemRequest extends FormRequest
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
                'max:100',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode voucher wajib diisi.',
            'code.string' => 'Kode voucher harus berupa teks.',
            'code.max' => 'Kode voucher maksimal 100 karakter.',
        ];
    }

    public function attributes(): array
    {
        return [
            'code' => 'kode voucher',
        ];
    }
}
