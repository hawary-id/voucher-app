<?php

namespace App\Http\Controllers;

use App\Services\VoucherPrintService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VoucherPrintController extends Controller
{
    public function __construct(
        private readonly VoucherPrintService $voucherPrintService,
    ) {}

    public function __invoke(
        Request $request,
    ): Response {
        $voucherIds = collect(
            explode(',', $request->string('ids'))
        )
            ->filter()
            ->map(fn($id) => (int) $id)
            ->all();

        return $this->voucherPrintService
            ->print($voucherIds);
    }
}
