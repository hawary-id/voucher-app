<?php

namespace App\Services;

use App\Models\Voucher;
use Barryvdh\DomPDF\Facade\Pdf;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\Response;

class VoucherPrintService
{
    public function print(
        array $voucherIds,
    ): Response {
        $logoPath = \App\Models\BusinessSetting::get('app_logo');
        $logoBase64 = null;
        if ($logoPath && \Illuminate\Support\Facades\Storage::disk('public')->exists($logoPath)) {
            $logoBase64 = base64_encode(\Illuminate\Support\Facades\Storage::disk('public')->get($logoPath));
        }

        $appName = \App\Models\BusinessSetting::get('app_name', 'Voucher App');

        $vouchers = $this->findForPrint(
            $voucherIds,
        )->map(function ($voucher) {

            $voucher->qr_code = $this->generateQrCodeBase64(
                $voucher->code,
            );

            return $voucher;
        });

        return Pdf::loadView(
            'pdf.vouchers',
            [
                'vouchers' => $vouchers,
                'logo_base64' => $logoBase64,
                'app_name' => $appName,
            ],
        )
            ->setPaper('a4')
            ->stream('vouchers.pdf');
    }

    public function findForPrint(
        array $voucherIds,
    ): Collection {
        return Voucher::query()
            ->with([
                'employee.department',
                'batch',
            ])
            ->whereIn(
                'id',
                $voucherIds,
            )
            ->orderBy('id')
            ->get();
    }

    private function generateQrCodeBase64(
        string $data,
    ): string {
        $writer = new PngWriter();

        $qrCode = new QrCode(
            data: $data,
            size: 200,
            margin: 10,
        );

        $result = $writer->write(
            $qrCode,
        );

        return base64_encode(
            $result->getString(),
        );
    }
}
