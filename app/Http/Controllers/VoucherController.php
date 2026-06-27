<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Enums\VoucherStatus;
use Illuminate\Support\Facades\DB;

class VoucherController extends Controller
{
    public function void(Voucher $voucher, Request $request): RedirectResponse
    {
        $this->authorize('void', $voucher);

        DB::transaction(function () use ($voucher, $request) {
            $voucher->update([
                'status' => VoucherStatus::VOID,
            ]);

            activity('voucher')
                ->performedOn($voucher)
                ->causedBy($request->user())
                ->event('voided')
                ->withProperties([
                    'voucher_code' => $voucher->code,
                    'employee' => $voucher->employee?->name,
                    'nominal' => $voucher->nominal,
                ])
                ->log("Membatalkan (void) voucher {$voucher->code}");
        });

        return back()->with('toast', [
            'type' => 'success',
            'message' => "Voucher {$voucher->code} berhasil dibatalkan.",
        ]);
    }
}
