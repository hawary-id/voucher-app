<?php

namespace App\Exports;

use App\Models\Voucher;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class VoucherReportExport implements
    FromCollection,
    WithHeadings,
    ShouldAutoSize,
    WithStyles,
    WithColumnFormatting
{
    public function __construct(
        private readonly Collection $vouchers,
    ) {}

    public function headings(): array
    {
        return [
            'Kode Voucher',
            'Nama Karyawan',
            'Departemen',
            'Toko',
            'Kasir',
            'Nominal',
            'Status Voucher',
            'Status Klaim',
            'Tanggal Terbit',
            'Tanggal Kedaluwarsa',
            'Tanggal Penukaran',
            'Tanggal Klaim',
            'Tanggal Pembayaran',
        ];
    }

    public function collection(): Collection
    {
        return $this->vouchers->map(
            fn (Voucher $voucher) => [
                $voucher->code,
                $voucher->employee?->name,
                $voucher->employee?->department?->name,
                $voucher->redemption?->store?->name ?? '-',
                $voucher->redemption?->cashier?->name ?? '-',
                $voucher->nominal,
                $voucher->status->value,
                $voucher->redemption?->claim_status?->value ?? '-',
                optional($voucher->issued_at)->format('d/m/Y'),
                optional($voucher->expired_at)->format('d/m/Y'),
                optional($voucher->used_at)?->format('d/m/Y H:i') ?? '-',
                optional($voucher->redemption?->claimed_at)?->format('d/m/Y H:i') ?? '-',
                optional($voucher->redemption?->paid_at)?->format('d/m/Y H:i') ?? '-',
            ]
        );
    }

    public function columnFormats(): array
    {
        return [
            'F' => '#,##0',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // 1. Style the header row (bold, white text, slate background)
        $sheet->getStyle('A1:M1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '334155'], // slate-700
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
            ]
        ]);

        // Set header row height
        $sheet->getRowDimension(1)->setRowHeight(24);

        // 2. Alignments
        // Align Nominal column to the right
        $sheet->getStyle('F')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
        // Align status and dates columns to the center
        $sheet->getStyle('A')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('G:M')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // 3. Grid cell borders
        $highestRow = $sheet->getHighestRow();
        $sheet->getStyle("A1:M{$highestRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CBD5E1'], // slate-300
                ],
            ],
        ]);

        // Vertically center align all data cells
        if ($highestRow > 1) {
            $sheet->getStyle("A2:M{$highestRow}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
            // Give data rows comfortable height
            for ($row = 2; $row <= $highestRow; $row++) {
                $sheet->getRowDimension($row)->setRowHeight(20);
            }
        }
    }
}