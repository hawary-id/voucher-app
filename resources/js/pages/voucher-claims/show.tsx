import { Head, Link, router, usePage } from '@inertiajs/react';
import { Check, CircleDollarSign, ArrowLeft, Ticket, User, Store, Clock } from 'lucide-react';
import type { ReactElement } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmationDialog from '@/components/confirmation-dialog';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDate } from '@/lib/formatters';
import voucherClaims from '@/routes/voucher-claims';
import type { VoucherRedemption } from '@/types';

interface Props {
    claim: VoucherRedemption;
}

export default function Show({ claim }: Props) {
    const { auth } = usePage().props as any;
    const canClaim = auth.permissions?.includes('voucher_claim.claim');
    const canPay = auth.permissions?.includes('voucher_claim.pay');

    const claimVoucher = () => {
        router.post(voucherClaims.claim(claim.id).url);
    };

    const payVoucher = () => {
        router.post(voucherClaims.pay(claim.id).url);
    };

    const voidClaim = () => {
        router.post((voucherClaims as any).voidClaim(claim.id).url);
    };

    const voidPay = () => {
        router.post((voucherClaims as any).voidPay(claim.id).url);
    };

    const getStatusBadge = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'PENDING':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-amber-200/60 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-900/30 dark:bg-amber-500/10 dark:text-amber-400"
                    >
                        Pending / Menunggu Verifikasi
                    </Badge>
                );
            case 'CLAIMED':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-blue-200/60 bg-blue-500/5 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/30 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                        Disetujui (Claimed)
                    </Badge>
                );
            case 'PAID':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        Lunas (Paid)
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium">
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title={`Detail Klaim Voucher - ${claim.voucher?.code}`} />

            <div className="container mx-auto space-y-6 p-6 max-w-4xl">
                {/* Header Actions */}
                <div className="flex flex-col gap-2 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2 text-muted-foreground hover:bg-transparent p-0">
                            <Link href={voucherClaims.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">Detail Dokumen Klaim</h1>
                        <p className="text-sm text-muted-foreground">
                            Periksa lampiran berkas manifes kupon belanja untuk proses pencairan dana toko rekanan.
                        </p>
                    </div>
                    <div className="shrink-0">
                        {getStatusBadge(claim.claim_status)}
                    </div>
                </div>

                {/* Main Information Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Card Kiri: Data Karyawan & Kupon */}
                    <Card className="shadow-sm border transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                        <CardHeader className="bg-card py-4 flex flex-row items-center gap-2 border-b">
                            <Ticket className="h-4 w-4 text-primary" />
                            <CardTitle className="text-sm font-bold uppercase tracking-tight text-foreground/90">Informasi Voucher</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nomor Seri Voucher</span>
                                <p className="font-mono font-bold text-sm tracking-wide bg-muted px-2.5 py-1.5 rounded w-fit">{claim.voucher?.code}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t pt-3 border-border/60">
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1"><User className="h-3 w-3" /> Nama Karyawan</span>
                                    <p className="text-sm font-semibold text-foreground/90">{claim.voucher?.employee?.name ?? '-'}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Departemen</span>
                                    <p className="text-sm font-medium text-muted-foreground">{claim.voucher?.employee?.department?.name ?? '-'}</p>
                                </div>
                            </div>
                            <div className="border-t pt-3 space-y-1 border-border/60">
                                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nominal Pencairan / Nilai Kupon</span>
                                <p className="text-2xl font-black text-primary tracking-tight">{formatCurrency(claim.redeemed_amount)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card Kanan: Riwayat Validasi Kasir */}
                    <Card className="shadow-sm border transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                        <CardHeader className="bg-card py-4 flex flex-row items-center gap-2 border-b">
                            <Store className="h-4 w-4 text-primary" />
                            <CardTitle className="text-sm font-bold uppercase tracking-tight text-foreground/90">Log Dokumen Toko</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Lokasi Toko Rekanan</span>
                                    <p className="text-sm font-bold text-foreground/90">{claim.store?.name ?? '-'}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Operator Kasir</span>
                                    <p className="text-sm font-semibold text-muted-foreground">{claim.cashier?.name ?? '-'}</p>
                                </div>
                            </div>

                            {/* Timeline Jejak Audit */}
                            <div className="border-t pt-3 space-y-3 border-border/60">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                    <Clock className="h-3.5 w-3.5" /> Riwayat Siklus Log
                                </div>
                                <div className="text-xs space-y-2.5 pl-1 font-medium text-muted-foreground/80">
                                    <div className="flex justify-between border-b border-dashed border-border/60 pb-1.5">
                                        <span>Waktu Transaksi Kasir:</span>
                                        <span className="text-foreground/90 font-semibold">{formatDate(claim.redeemed_at)}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dashed border-border/60 pb-1.5">
                                        <span>Persetujuan Verifikasi:</span>
                                        <span className="text-foreground/90 font-semibold">{claim.claimed_at ? formatDate(claim.claimed_at) : '-'}</span>
                                    </div>
                                    <div className="flex justify-between pb-0.5">
                                        <span>Tanggal Pelunasan Keuangan:</span>
                                        <span className="text-foreground/90 font-semibold">{claim.paid_at ? formatDate(claim.paid_at) : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Otorisasi Finansial Action */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    {claim.claim_status === 'PENDING' && canClaim && (
                        <Button
                            onClick={claimVoucher}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-sm h-11 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300"
                        >
                            <Check className="mr-2 size-4 stroke-[2.5]" /> Setujui Dokumen Klaim
                        </Button>
                    )}

                    {claim.claim_status === 'CLAIMED' && (
                        <>
                            {canClaim && (
                                <ConfirmationDialog
                                    title="Batalkan Persetujuan Klaim"
                                    description={`Apakah Anda yakin ingin membatalkan persetujuan klaim voucher ${claim.voucher?.code}? Status klaim akan dikembalikan menjadi PENDING.`}
                                    confirmLabel="Ya, Batalkan Klaim"
                                    cancelLabel="Batal"
                                    confirmVariant="destructive"
                                    onConfirm={voidClaim}
                                    trigger={
                                        <Button
                                            variant="outline"
                                            className="border-destructive/25 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold px-6 h-11 transition-all duration-300"
                                        >
                                            Batalkan Klaim (Void)
                                        </Button>
                                    }
                                />
                            )}
                            {canPay && (
                                <Button
                                    onClick={payVoucher}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-sm h-11 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300"
                                >
                                    <CircleDollarSign className="mr-2 size-4" /> Cairkan & Lunaskan Dana
                                </Button>
                            )}
                        </>
                    )}

                    {claim.claim_status === 'PAID' && canPay && (
                        <ConfirmationDialog
                            title="Batalkan Pembayaran Klaim"
                            description={`Apakah Anda yakin ingin membatalkan pembayaran klaim voucher ${claim.voucher?.code}? Status klaim akan dikembalikan menjadi CLAIMED.`}
                            confirmLabel="Ya, Batalkan Pembayaran"
                            cancelLabel="Batal"
                            confirmVariant="destructive"
                            onConfirm={voidPay}
                            trigger={
                                <Button
                                    variant="outline"
                                    className="border-destructive/25 text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold px-6 h-11 transition-all duration-300"
                                >
                                    Batalkan Pembayaran (Void)
                                </Button>
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
}

Show.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Klaim Voucher',
                href: voucherClaims.index().url,
            },
            {
                title: 'Detail',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);