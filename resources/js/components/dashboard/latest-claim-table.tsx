import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCan } from '@/hooks/use-can';
import { formatCurrency, formatDateTime } from '@/lib/formatters';
import voucherClaims from '@/routes/voucher-claims';

import type { VoucherRedemption } from '@/types';

interface Props {
    latestClaims: VoucherRedemption[];
    dashboardType?: 'management' | 'store';
}

function getClaimBadge(status?: string) {
    switch (status?.toUpperCase()) {
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
                    -
                </Badge>
            );
    }
}

export function LatestClaimTable({ latestClaims, dashboardType }: Props) {
    const { can } = useCan();

    if (dashboardType !== 'store' && !can('voucher_claim.view')) {
        return null;
    }

    return (
        <Card className="overflow-hidden border shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-card py-4">
                <div className="space-y-0.5">
                    <CardTitle className="text-sm font-bold tracking-tight text-foreground/90 uppercase">
                        Klaim Toko Terbaru
                    </CardTitle>

                    <p className="text-xs text-muted-foreground">
                        Manifes log penukaran nota kasir toko retail teranyar.
                    </p>
                </div>

                {can('voucher_claim.view') && (
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="gap-1 text-xs text-primary hover:text-primary hover:bg-transparent p-0"
                    >
                        <Link href={voucherClaims.index().url}>
                            Lihat Semua
                            <ArrowRight className="size-3" />
                        </Link>
                    </Button>
                )}
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                <th className="p-3.5 text-left font-semibold">
                                    Kode Voucher
                                </th>

                                <th className="p-3.5 text-left font-semibold">
                                    Lokasi Toko
                                </th>

                                <th className="p-3.5 text-right font-semibold">
                                    Nominal
                                </th>

                                <th className="p-3.5 text-center font-semibold">
                                    Status Finansial
                                </th>

                                <th className="p-3.5 text-left font-semibold">
                                    Waktu Tukar
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/60">
                            {latestClaims.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-xs text-muted-foreground"
                                    >
                                        Belum ada rekaman log transaksi masuk.
                                    </td>
                                </tr>
                            ) : (
                                latestClaims.map((claim) => (
                                    <tr
                                        key={claim.id}
                                        className="transition-colors hover:bg-muted/10"
                                    >
                                        <td className="p-3 whitespace-nowrap">
                                            <CopyButton
                                                value={
                                                    claim.voucher?.code ?? ''
                                                }
                                            />
                                        </td>

                                        <td className="p-3 text-xs font-medium whitespace-nowrap">
                                            {claim.store?.name ?? '-'}
                                        </td>

                                        <td className="p-3 text-right text-xs font-bold whitespace-nowrap text-primary">
                                            {formatCurrency(
                                                claim.redeemed_amount,
                                            )}
                                        </td>

                                        <td className="p-3 text-center whitespace-nowrap">
                                            {getClaimBadge(claim.claim_status)}
                                        </td>

                                        <td className="p-3 text-xs whitespace-nowrap text-muted-foreground/80">
                                            {formatDateTime(claim.redeemed_at)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
