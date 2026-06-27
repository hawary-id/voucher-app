import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCan } from '@/hooks/use-can';
import { formatDate } from '@/lib/formatters';
import voucherReports from '@/routes/voucher-reports';
import type { Voucher } from '@/types';

interface Props {
    latestVouchers: Voucher[];
}

function getVoucherBadge(status: string) {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return (
                <Badge
                    variant="outline"
                    className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                >
                    Aktif
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
                <Badge
                    variant="outline"
                    className="rounded-full border-destructive/20 bg-destructive/5 px-2.5 py-0.5 text-xs font-semibold text-destructive dark:border-destructive/30 dark:bg-destructive/10"
                >
                    Batal
                </Badge>
            );
    }
}

export function LatestVoucherTable({ latestVouchers }: Props) {
    const { can } = useCan();

    if (!can('voucher.view')) {
        return null;
    }

    return (
        <Card className="overflow-hidden border shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-card py-4">
                <div className="space-y-0.5">
                    <CardTitle className="text-sm font-bold tracking-tight text-foreground/90 uppercase">
                        Voucher Diterbitkan Terbaru
                    </CardTitle>

                    <p className="text-xs text-muted-foreground">
                        Manifes 5 data lembar kupon terakhir dari database.
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-1 text-xs text-primary hover:text-primary hover:bg-transparent p-0"
                >
                    <Link href={voucherReports.index().url}>
                        Lihat Semua
                        <ArrowRight className="size-3" />
                    </Link>
                </Button>
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
                                    Nama Karyawan
                                </th>

                                <th className="p-3.5 text-center font-semibold">
                                    Status
                                </th>

                                <th className="p-3.5 text-left font-semibold">
                                    Waktu Rilis
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/60">
                            {latestVouchers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-8 text-center text-xs text-muted-foreground"
                                    >
                                        Belum ada rilis manifes data voucher.
                                    </td>
                                </tr>
                            ) : (
                                latestVouchers.map((voucher) => (
                                    <tr
                                        key={voucher.id}
                                        className="transition-colors hover:bg-muted/10"
                                    >
                                        <td className="p-3 whitespace-nowrap">
                                            <CopyButton value={voucher.code} />
                                        </td>

                                        <td className="p-3 text-xs font-medium whitespace-nowrap">
                                            {voucher.employee?.name ?? '-'}
                                        </td>

                                        <td className="p-3 text-center whitespace-nowrap">
                                            {getVoucherBadge(voucher.status)}
                                        </td>

                                        <td className="p-3 text-xs whitespace-nowrap text-muted-foreground/80">
                                            {formatDate(voucher.issued_at)}
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
