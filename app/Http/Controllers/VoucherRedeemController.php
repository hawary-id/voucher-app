<?php

namespace App\Http\Controllers;

use App\Http\Requests\Voucher\VoucherRedeemRequest;
use App\Models\VoucherRedemption;
use App\Services\VoucherRedeemService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class VoucherRedeemController extends Controller
{
    public function __construct(
        private readonly VoucherRedeemService $voucherRedeemService,
    ) {}

    public function create(
        Request $request,
    ): Response {
        $this->authorize('create', VoucherRedemption::class);

        $voucher = null;

        $code = $request->string('code')->toString();

        if ($code !== '') {
            $voucher = $this->voucherRedeemService
                ->findByCode($code);
        }

        return Inertia::render('vouchers/redeem', [
            'voucher' => $voucher,
            'code' => $code,
        ]);
    }

    public function check(
        VoucherRedeemRequest $request,
    ): RedirectResponse {
        $this->authorize('create', VoucherRedemption::class);

        try {
            $this->voucherRedeemService->findByCode(
                $request->string('code')->toString(),
            );

            return redirect()->route(
                'vouchers.redeem',
                [
                    'code' => $request->string('code')->toString(),
                ]
            );
        } catch (ValidationException $e) {
            return redirect()
                ->route('vouchers.redeem')
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect(
                        $e->errors()
                    )->flatten()->first(),
                ]);
        }
    }

    public function store(
        VoucherRedeemRequest $request,
    ): RedirectResponse {
        $this->authorize('create', VoucherRedemption::class);

        try {
            $this->voucherRedeemService->redeem(
                code: $request->string('code')->toString(),
                cashier: $request->user(),
            );

            return redirect()
                ->route('vouchers.redeem')
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Voucher berhasil diredeem.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect(
                        $e->errors()
                    )->flatten()->first(),
                ]);
        }
    }

    public function void(
        VoucherRedemption $voucherRedemption,
        Request $request,
    ): RedirectResponse {
        $this->authorize('delete', $voucherRedemption);

        try {
            $this->voucherRedeemService->void(
                redemption: $voucherRedemption,
                user: $request->user(),
            );

            return redirect()
                ->route('vouchers.inquiry')
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Penukaran voucher berhasil dibatalkan. Status kupon kembali Aktif.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect(
                        $e->errors()
                    )->flatten()->first(),
                ]);
        }
    }
}
