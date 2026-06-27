<?php

namespace App\Http\Requests\Voucher;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VoucherPrintRequest extends FormRequest
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
            'voucher_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'voucher_ids.*' => [
                'integer',
                'exists:vouchers,id',
            ],
        ];
    }
}
