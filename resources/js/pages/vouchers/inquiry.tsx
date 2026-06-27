import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Calendar, CircleDollarSign, Clock, Layers, Store, Ticket, User, UserCheck, XCircle } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/confirmation-dialog';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/formatters';
import vouchers from '@/routes/vouchers';
import type { BreadcrumbItem } from '@/types';
import VoucherInquiryForm from './components/voucher-inquiry-form';

interface Props {
    voucher: any | null;
    code: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vouchers',
        href: vouchers.inquiry().url,
    },
    {
        title: 'Inquiry',
        href: vouchers.inquiry().url,
    },
];

export default function VoucherInquiry({ voucher, code }: Props) {
    const { auth } = usePage().props as any;
    
    const canVoidRedeem = auth.permissions?.includes('voucher.redeem') && 
        (auth.user?.store_id === voucher?.redemption?.store_id || auth.permissions?.includes('user.delete'));

    const handleVoidRedeem = (redemptionId: number) => {
        router.post(
            (vouchers as any).redemptions.void({ voucherRedemption: redemptionId }).url,
            {},
            {
                onSuccess: () => {
                    router.get(vouchers.inquiry().url + `?code=${code}`);
                }
            }
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        code: code ?? '',
    });

    const searchVoucher = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(vouchers.inquiry.search().url);
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
            case 'VOID':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-destructive/20 bg-destructive/5 px-2.5 py-0.5 text-xs font-semibold text-destructive dark:border-destructive/30 dark:bg-destructive/10"
                    >
                        Batal
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

    const getClaimStatusBadge = (claimStatus?: string) => {
        switch (claimStatus?.toUpperCase()) {
            case 'PENDING':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-amber-200/60 bg-amber-500/5 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-900/30 dark:bg-amber-500/10 dark:text-amber-400"
                    >
                        Pending
                    </Badge>
                );
            case 'CLAIMED':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-blue-200/60 bg-blue-500/5 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-900/30 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                        Claimed
                    </Badge>
                );
            case 'PAID':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        Paid
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {claimStatus ?? '-'}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="Informasi Validasi Voucher" />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                {/* Header Title Section */}
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">Informasi Voucher</h1>
                    <p className="text-sm text-muted-foreground">
                        Lakukan pengecekan status lembar fisik kupon belanja, riwayat validasi, dan pemilik otoritas voucher.
                    </p>
                </div>

                {/* Search Form Wrapper */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <VoucherInquiryForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={searchVoucher}
                        submitLabel={processing ? 'Memproses...' : 'Cari Voucher'}
                    />
                </div>

                {/* Inquiry Result UI Card */}
                {voucher && (
                    <Card className="relative overflow-visible border shadow-sm transition-all duration-300">
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
                            {/* Section 1: Profil Penerima */}
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

                            {/* Section 2: Anggaran & Durasi */}
                            <div className="grid gap-4 sm:grid-cols-3 border-t pt-4 border-border/50">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <CircleDollarSign className="h-3.5 w-3.5 text-muted-foreground/80" /> Nominal Voucher
                                    </span>
                                    <p className="text-xl font-bold text-primary">{formatCurrency(voucher.nominal)}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/80" /> Tanggal Rilis
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

                            {/* Section 3: Log Transaksi Kasir (Hanya Muncul jika Terpakai) */}
                            {voucher.redemption && (
                                <div className="border-t pt-5 space-y-4 border-border/50">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        <Store className="h-4 w-4 text-primary" /> Riwayat Klaim Kasir / Toko
                                    </div>
                                    
                                    <div className="grid gap-4 sm:grid-cols-2 bg-muted/10 border border-border/60 rounded-xl p-4">
                                        <div className="space-y-3">
                                            <div className="space-y-0.5">
                                                <span className="text-xs text-muted-foreground font-medium">Lokasi Penukaran Toko</span>
                                                <p className="text-sm font-bold">{voucher.redemption.store?.name ?? '-'}</p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-xs text-muted-foreground font-medium">Waktu Transaksi Masuk</span>
                                                <p className="text-sm font-semibold flex items-center gap-1">
                                                    {voucher.redemption.redeemed_at ? formatDateTime(voucher.redemption.redeemed_at) : '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="space-y-0.5">
                                                <span className="text-xs text-muted-foreground font-medium">Petugas Kasir (Operator)</span>
                                                <p className="text-sm font-semibold flex items-center gap-1">
                                                    <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {voucher.redemption.cashier?.name ?? '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                                    Status Klaim Akuntansi
                                                </span>
                                                <div className="pt-0.5">
                                                    {getClaimStatusBadge(voucher.redemption.claim_status)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {voucher.redemption && voucher.redemption.claim_status.toUpperCase() === 'PENDING' && canVoidRedeem && (
                                <div className="border-t pt-5 flex justify-end">
                                    <ConfirmationDialog
                                        title="Batalkan Penukaran Voucher"
                                        description={`Apakah Anda yakin ingin membatalkan transaksi penukaran voucher ${voucher.code}? Status voucher akan dikembalikan menjadi AKTIF agar bisa digunakan kembali, dan riwayat penukaran ini akan dihapus.`}
                                        confirmLabel="Ya, Batalkan Penukaran"
                                        cancelLabel="Batal"
                                        confirmVariant="destructive"
                                        onConfirm={() => handleVoidRedeem(voucher.redemption.id)}
                                        trigger={
                                            <Button variant="destructive" className="w-full sm:w-auto font-semibold gap-1.5 shadow-sm">
                                                <XCircle className="h-4 w-4" />
                                                Batalkan Penukaran (Void)
                                            </Button>
                                        }
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

VoucherInquiry.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);