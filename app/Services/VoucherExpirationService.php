<?php

namespace App\Services;

use App\Enums\VoucherStatus;
use App\Models\Voucher;
use Illuminate\Support\Facades\DB;

class VoucherExpirationService
{
    /**
     * Expire all active vouchers that have passed their expiration date.
     *
     * @return int Number of expired vouchers.
     */
    public function expire(): int
    {
        $expiredCount = 0;

        Voucher::query()
            ->active()
            ->where('expired_at', '<', now())
            ->with('employee')
            ->chunkById(100, function ($vouchers) use (&$expiredCount): void {

                DB::transaction(function () use ($vouchers, &$expiredCount): void {

                    foreach ($vouchers as $voucher) {

                        $voucher->update([
                            'status' => VoucherStatus::EXPIRED,
                        ]);

                        activity('voucher')
                            ->performedOn($voucher)
                            ->event('expired')
                            ->withProperties([
                                'voucher_code' => $voucher->code,
                                'employee_id' => $voucher->employee_id,
                                'employee_name' => $voucher->employee?->name,
                                'expired_at' => $voucher->expired_at,
                            ])
                            ->log("Voucher {$voucher->code} expired otomatis");

                        $expiredCount++;
                    }
                });
            });

        return $expiredCount;
    }
}
