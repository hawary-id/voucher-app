<?php

namespace App\Services;

use App\Models\Voucher;
use Illuminate\Validation\ValidationException;

class VoucherInquiryService
{
    public function findByCode(string $code): Voucher
    {
        $voucher = Voucher::query()
            ->with([
                'employee.department',
                'redemption.store',
                'redemption.cashier',
            ])
            ->where('code', $code)
            ->first();

        if (! $voucher) {
            throw ValidationException::withMessages([
                'code' => 'Voucher tidak ditemukan.',
            ]);
        }

        return $voucher;
    }
}
