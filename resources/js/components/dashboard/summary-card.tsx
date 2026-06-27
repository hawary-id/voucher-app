import {
    Activity,
    CheckCircle2,
    CreditCard,
    Ticket,
    Wallet,
    XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCan } from '@/hooks/use-can';
import { formatCurrency } from '@/lib/formatters';

interface Props {
    dashboardType: 'management' | 'store';
    summary: {
        // Management dashboard keys
        total_vouchers?: number;
        active_vouchers?: number;
        used_vouchers?: number;
        expired_vouchers?: number;

        // Store dashboard keys
        total_voucher_redeem?: number;
        total_nominal_redeem?: number;
        claimed_vouchers?: number;
        paid_vouchers?: number;

        // Shared keys
        total_claim_amount: number;
        paid_claim_amount: number;
    };
}

export function SummaryCards({ dashboardType, summary }: Props) {
    const { can } = useCan();

    if (dashboardType === 'store') {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-muted-foreground/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Total Voucher Redeem
                        </CardTitle>
                        <Ticket className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight">
                            {summary.total_voucher_redeem ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Total Nominal Redeem
                        </CardTitle>
                        <Wallet className="size-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold tracking-tight text-emerald-600">
                            {formatCurrency(summary.total_nominal_redeem ?? 0)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                            Voucher Sudah Diklaim
                        </CardTitle>
                        <Activity className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight text-blue-600">
                            {summary.claimed_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Voucher Sudah Dibayar
                        </CardTitle>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight text-emerald-600">
                            {summary.paid_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-primary uppercase">
                            Total Nominal Klaim
                        </CardTitle>
                        <CreditCard className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold tracking-tight text-primary">
                            {formatCurrency(summary.total_claim_amount)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Total Nominal Dibayar
                        </CardTitle>
                        <Wallet className="size-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold tracking-tight text-emerald-600">
                            {formatCurrency(summary.paid_claim_amount)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {can('voucher.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-muted-foreground/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Total Voucher
                        </CardTitle>
                        <Ticket className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight">
                            {summary.total_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>
            )}

            {can('voucher.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Voucher Aktif
                        </CardTitle>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight text-emerald-600">
                            {summary.active_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>
            )}

            {can('voucher.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                            Telah Digunakan
                        </CardTitle>
                        <Activity className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight text-blue-600">
                            {summary.used_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>
            )}

            {can('voucher.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-amber-600 uppercase">
                            Kedaluwarsa
                        </CardTitle>
                        <XCircle className="size-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold tracking-tight text-amber-600">
                            {summary.expired_vouchers ?? 0}
                        </div>
                    </CardContent>
                </Card>
            )}

            {can('voucher_claim.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Total Tagihan Klaim
                        </CardTitle>
                        <CreditCard className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold tracking-tight text-primary">
                            {formatCurrency(summary.total_claim_amount)}
                        </div>
                    </CardContent>
                </Card>
            )}

            {can('voucher_claim.view') && (
                <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                            Klaim Terbayar
                        </CardTitle>
                        <Wallet className="size-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold tracking-tight text-emerald-600">
                            {formatCurrency(summary.paid_claim_amount)}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
