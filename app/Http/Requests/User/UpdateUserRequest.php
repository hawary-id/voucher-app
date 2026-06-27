<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var User $user */
        $user = $this->route('user');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')
                    ->ignore($user),
            ],

            'password' => [
                'nullable',
                'string',
                'confirmed',
                'min:8',
            ],

            'store_id' => [
                Rule::requiredIf(fn () => in_array($this->input('role'), ['CASHIER', 'ADMIN_STORE'])),
                'nullable',
                'exists:stores,id',
            ],

            'role' => [
                'required',
                'exists:roles,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'store_id.required' => 'Pilihan toko wajib diisi jika role adalah Admin Toko (ADMIN_STORE) atau Kasir (CASHIER).',
        ];
    }
}
