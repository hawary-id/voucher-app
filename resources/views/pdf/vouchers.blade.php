<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Cetak Voucher Belanja</title>
    <style>
        @page {
            size: A4;
            margin: 8mm 10mm;
        }

        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, 'DejaVu Sans', sans-serif;
            font-size: 10px;
            color: #334155;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .page-container {
            display: table;
            width: 100%;
            height: 268mm;
            border-collapse: separate;
            border-spacing: 2.5mm;
            page-break-inside: avoid;
        }

        .page-break {
            page-break-after: always;
        }

        .row {
            display: table-row;
        }

        .voucher {
            display: table-cell;
            width: 50%;
            height: 40mm;
            border: 1.5px dashed #94a3b8;
            border-radius: 8px;
            padding: 7px 10px;
            vertical-align: top;
            box-sizing: border-box;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        .voucher-header {
            border-bottom: 1.5px solid #f1f5f9;
            padding-bottom: 2px;
            margin-bottom: 4px;
        }

        .app-logo {
            height: 16px;
            max-width: 80px;
            vertical-align: middle;
            display: inline-block;
            margin-right: 4px;
        }

        .app-name {
            font-weight: 800;
            font-size: 10px;
            color: #4f46e5;
            vertical-align: middle;
            margin-right: 4px;
            text-transform: uppercase;
        }

        .voucher-tag {
            font-size: 8px;
            font-weight: 700;
            color: #64748b;
            background-color: #f1f5f9;
            padding: 2px 5px;
            border-radius: 3px;
            vertical-align: middle;
            letter-spacing: 0.5px;
        }

        .nominal-tag {
            font-size: 13.5px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.3px;
        }

        .info-row {
            margin-bottom: 1px;
            font-size: 8.5px;
            color: #334155;
        }

        .info-label {
            color: #94a3b8;
            font-weight: 700;
            font-size: 7.5px;
            display: inline-block;
            width: 30px;
            letter-spacing: 0.3px;
        }

        .info-val {
            font-weight: 600;
            color: #1e293b;
        }

        .font-mono {
            font-family: Menlo, Monaco, Consolas, monospace;
        }

        .qr-box {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 2px;
            display: inline-block;
        }

        .qr-img {
            width: 90px;
            height: 90px;
            display: block;
        }

        .qr-code {
            font-size: 7.5px;
            color: #475569;
            margin-top: 2px;
            font-family: Menlo, Monaco, Consolas, monospace;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .watermark {
            position: absolute;
            top: 40%;
            left: 5%;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 4px;
            text-transform: uppercase;
            transform: rotate(-12deg);
            opacity: 0.07;
            pointer-events: none;
            user-select: none;
            width: 90%;
            text-align: center;
            z-index: 1;
        }

        .status-used {
            color: #10b981;
        }

        .status-expired {
            color: #f59e0b;
        }

        .status-void {
            color: #ef4444;
        }
    </style>
</head>

<body>
    @foreach ($vouchers->chunk(12) as $pageVouchers)
        <div class="page-container {{ !$loop->last ? 'page-break' : '' }}">

            @foreach ($pageVouchers->chunk(2) as $rowVouchers)
                <div class="row">

                    @foreach ($rowVouchers as $voucher)
                        <div class="voucher">

                            @if ($voucher->status && in_array(strtoupper($voucher->status->value), ['USED', 'EXPIRED', 'VOID']))
                                <div class="watermark status-{{ strtolower($voucher->status->value) }}">
                                    {{ $voucher->status->value }}
                                </div>
                            @endif

                            <div class="voucher-header">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="vertical-align: middle;">
                                            @if ($logo_base64)
                                                <img class="app-logo" src="data:image/png;base64,{{ $logo_base64 }}">
                                            @else
                                                <span class="app-name">{{ $app_name }}</span>
                                            @endif
                                            <span class="voucher-tag">KUPON BELANJA</span>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle;">
                                            <span class="nominal-tag">Rp
                                                {{ number_format($voucher->nominal, 0, ',', '.') }}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="voucher-body">
                                <table style="width: 100%; border-collapse: collapse; margin-top: 3px;">
                                    <tr>
                                        <!-- Kiri: Info Karyawan -->
                                        <td style="width: 65%; vertical-align: top; line-height: 1.4;">
                                            <div class="info-row">
                                                <span class="info-label" style="width: 48px;">NAMA</span>:
                                                <span class="info-val">{{ $voucher->employee->name }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label" style="width: 48px;">NIK</span>:
                                                <span class="info-val font-mono">{{ $voucher->employee->nik }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label" style="width: 48px;">DEPT</span>:
                                                <span
                                                    class="info-val">{{ $voucher->employee->department?->name ?? '-' }}</span>
                                            </div>
                                            <div class="info-row" style="margin-top: 4px;">
                                                <span class="info-label" style="width: 48px;">VALID THRU</span>:
                                                <span class="info-val font-mono"
                                                    style="color: #475569;">{{ \Carbon\Carbon::parse($voucher->expired_at)->format('d M Y') }}</span>
                                            </div>
                                        </td>
                                        <!-- Kanan: QR Code -->
                                        <td style="width: 35%; text-align: center; vertical-align: middle;">
                                            <div class="qr-box">
                                                <img class="qr-img"
                                                    src="data:image/png;base64,{{ $voucher->qr_code }}">
                                            </div>
                                            <div class="qr-code">{{ $voucher->code }}</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    @endforeach

                    @if ($rowVouchers->count() == 1)
                        <div class="voucher" style="border: none; background: transparent;"></div>
                    @endif

                </div>
            @endforeach

        </div>
    @endforeach
</body>

</html>
