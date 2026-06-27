<?php

namespace App\Http\Requests\VoucherBatch;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VoucherBatchUpdateRequest extends FormRequest
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
            'batch_no' => [
                'required',
                'string',
                'max:50',

                Rule::unique(
                    'voucher_batches',
                    'batch_no',
                )->ignore(
                    $this->route('voucher_batch'),
                ),
            ],

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
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'judul batch',
            'description' => 'deskripsi',
            'period_start' => 'tanggal mulai',
            'period_end' => 'tanggal berakhir',
        ];
    }
}
