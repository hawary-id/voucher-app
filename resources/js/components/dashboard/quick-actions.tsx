import { Link } from '@inertiajs/react';
import { BarChart3, CreditCard, Plus, QrCode, Search } from 'lucide-react';

import { useCan } from '@/hooks/use-can';
import voucherBatches from '@/routes/voucher-batches';
import voucherClaims from '@/routes/voucher-claims';
import voucherReports from '@/routes/voucher-reports';
import vouchers from '@/routes/vouchers';

export function QuickActions() {
    const { can } = useCan();

    return (
        <div className="space-y-3">
            <h2 className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                Aksi Cepat Sistem
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {can('voucher_batch.create') && (
                    <Link
                        href={voucherBatches.create().url}
                        className="group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] duration-300"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-2.5 text-primary transition-transform group-hover:scale-110 duration-300">
                                <Plus className="size-5 stroke-[2.5]" />
                            </div>

                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold tracking-tight">
                                    Buat Batch Baru
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Rilis voucher massal
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {can('voucher.redeem') && (
                    <Link
                        href={vouchers.redeem().url}
                        className="group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] duration-300"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-2.5 text-blue-600 transition-transform group-hover:scale-110 duration-300">
                                <QrCode className="size-5" />
                            </div>

                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold tracking-tight">
                                    Redeem Kasir
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Validasi kupon belanja
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {can('voucher.inquiry') && (
                    <Link
                        href={vouchers.inquiry().url}
                        className="group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] duration-300"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 p-2.5 text-amber-600 transition-transform group-hover:scale-110 duration-300">
                                <Search className="size-5" />
                            </div>

                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold tracking-tight">
                                    Cek Status Kupon
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Inquiry manifes pemilik
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {can('voucher_report.view') && (
                    <Link
                        href={voucherReports.index().url}
                        className="group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] duration-300"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-2.5 text-emerald-600 transition-transform group-hover:scale-110 duration-300">
                                <BarChart3 className="size-5" />
                            </div>

                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold tracking-tight">
                                    Audit Laporan
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Rekap & analisis data
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {can('voucher_claim.view') && (
                    <Link
                        href={voucherClaims.index().url}
                        className="group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] duration-300"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/5 p-2.5 text-violet-600 transition-transform group-hover:scale-110 duration-300">
                                <CreditCard className="size-5" />
                            </div>

                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold tracking-tight">
                                    Klaim Keuangan
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    Otorisasi cair dana
                                </p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
