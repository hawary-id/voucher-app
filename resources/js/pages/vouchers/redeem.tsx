import { Head, useForm } from '@inertiajs/react';
import { Ticket, User, Layers, CircleDollarSign, Calendar, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDate } from '@/lib/formatters';
import vouchers from '@/routes/vouchers';
import type { BreadcrumbItem } from '@/types';
import VoucherRedeemForm from './components/voucher-redeem-form';

interface Props {
    voucher: any | null;
    code: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vouchers',
        href: vouchers.redeem().url,
    },
    {
        title: 'Redeem',
        href: vouchers.redeem().url,
    },
];

export default function RedeemVoucher({ voucher, code }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        code: code ?? '',
    });
    const canRedeem = voucher?.status === 'ACTIVE';

    const checkVoucher = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(vouchers.redeem.check().url);
    };

    const redeemVoucher = () => {
        post(vouchers.redeem.store().url);
    };

    const getStatusBadge = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        Aktif / Siap Pakai
                    </Badge>
                );
            case 'USED':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-blue-200/60 bg-blue-500/5 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-900/30 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                        Terpakai
                    </Badge>
                );
            case 'EXPIRED':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-amber-200/60 bg-amber-500/5 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-900/30 dark:bg-amber-500/10 dark:text-amber-400"
                    >
                        Kedaluwarsa
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="Penukaran Kupon Belanja (Redeem)" />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                {/* Header Title Section */}
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">Penukaran Voucher</h1>
                    <p className="text-sm text-muted-foreground">
                        Validasi kode unik lembar fisik voucher belanja karyawan dan lakukan proses klaim transaksi kasir.
                    </p>
                </div>

                {/* Form Pencarian Voucher */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <VoucherRedeemForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={checkVoucher}
                        submitLabel={processing ? 'Memeriksa...' : 'Cari Voucher'}
                    />
                </div>

                {/* Hasil Scan / Detail Validasi Manifes Voucher */}
                {voucher && (
                    <Card
                        className={`relative overflow-visible border shadow-sm transition-all duration-300 ${
                            canRedeem
                                ? 'border-emerald-500/20 shadow-[0_12px_30px_rgba(16,185,129,0.03)]'
                                : 'border-destructive/20 shadow-[0_12px_30px_rgba(239,68,68,0.03)]'
                        }`}
                    >
                        <CardHeader className="bg-card py-4 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Ticket className="h-4 w-4 text-primary" />
                                <CardTitle className="text-sm font-bold font-mono tracking-wider text-muted-foreground uppercase">
                                    {voucher.code}
                                </CardTitle>
                            </div>
                            {getStatusBadge(voucher.status)}
                        </CardHeader>

                        {/* Perforated Divider Section */}
                        <div className="relative py-2">
                            {/* Left Notch */}
                            <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 size-5 rounded-full bg-background border-r border-border pointer-events-none" />
                            {/* Right Notch */}
                            <div className="absolute -right-[11px] top-1/2 -translate-y-1/2 size-5 rounded-full bg-background border-l border-border pointer-events-none" />
                            {/* Perforated Line */}
                            <div className="border-t border-dashed border-border/85 w-full" />
                        </div>
                        
                        <CardContent className="p-6 pt-2 space-y-6">
                            {/* Grid Detail Informasi Pemilik */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/10 border-border/60">
                                    <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <div className="space-y-0.5">
                                        <span className="text-xs text-muted-foreground font-medium">Nama Karyawan</span>
                                        <p className="text-sm font-semibold">{voucher.employee?.name ?? '-'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/10 border-border/60">
                                    <Layers className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <div className="space-y-0.5">
                                        <span className="text-xs text-muted-foreground font-medium">Departemen Kerja</span>
                                        <p className="text-sm font-semibold">{voucher.employee?.department?.name ?? '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Komponen Ringkasan Anggaran Keuangan */}
                            <div className="grid gap-4 sm:grid-cols-3 border-t pt-4 border-border/50">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <CircleDollarSign className="h-3.5 w-3.5 text-muted-foreground/80" /> Nilai Tukar Belanja
                                    </span>
                                    <p className="text-xl font-bold text-primary">{formatCurrency(voucher.nominal)}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/80" /> Tanggal Diterbitkan
                                    </span>
                                    <p className="text-sm font-semibold">{formatDate(voucher.issued_at)}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-muted-foreground/80" /> Batas Kedaluwarsa
                                    </span>
                                    <p className="text-sm font-semibold text-destructive/80">{formatDate(voucher.expired_at)}</p>
                                </div>
                            </div>

                            {/* Kotak Peringatan Status / Tombol Submit Utama */}
                            <div className="border-t pt-5 border-border/50">
                                {voucher.status === 'USED' && (
                                    <div className="flex items-center gap-3 rounded-lg border border-blue-200/60 bg-blue-500/5 p-4 text-blue-800 dark:border-blue-900/30 dark:text-blue-400 mb-4">
                                        <AlertCircle className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                        <p className="text-xs font-semibold">
                                            Gagal penukaran: Voucher ini sudah digunakan sebelumnya dan berstatus terpakai.
                                        </p>
                                    </div>
                                )}

                                {voucher.status === 'EXPIRED' && (
                                    <div className="flex items-center gap-3 rounded-lg border border-amber-200/60 bg-amber-500/5 p-4 text-amber-800 dark:border-amber-900/30 dark:text-amber-400 mb-4">
                                        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                        <p className="text-xs font-semibold">
                                            Gagal penukaran: Voucher ini tidak dapat digunakan karena sudah melewati batas kedaluwarsa.
                                        </p>
                                    </div>
                                )}

                                <Button
                                    type="button"
                                    onClick={redeemVoucher}
                                    disabled={!canRedeem || processing}
                                    className={`w-full h-12 text-sm font-semibold shadow-sm transition-all hover:shadow-md duration-300 ${
                                        canRedeem
                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:-translate-y-0.5'
                                            : ''
                                    }`}
                                    size="lg"
                                >
                                    {processing ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                    )}
                                    Konfirmasi & Tukarkan Voucher
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

RedeemVoucher.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);