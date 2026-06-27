<?php

namespace App\Http\Controllers;

use App\Http\Requests\Voucher\VoucherInquiryRequest;
use App\Models\Voucher;
use App\Services\VoucherInquiryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class VoucherInquiryController extends Controller
{
    public function __construct(
        private readonly VoucherInquiryService $voucherInquiryService,
    ) {}

    public function create(
        Request $request,
    ): Response {
        $this->authorize('inquiry', Voucher::class);

        $voucher = null;

        $code = $request->string('code')->toString();

        if ($code !== '') {
            $voucher = $this->voucherInquiryService
                ->findByCode($code);
        }

        return Inertia::render('vouchers/inquiry', [
            'voucher' => $voucher,
            'code' => $code,
        ]);
    }

    public function search(
        VoucherInquiryRequest $request,
    ): RedirectResponse {
        $this->authorize('inquiry', Voucher::class);

        return redirect()->route(
            'vouchers.inquiry',
            [
                'code' => $request->string('code')->toString(),
            ]
        );
    }
}
