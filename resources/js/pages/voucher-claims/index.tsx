import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    Check,
    CircleDollarSign,
    Eye,
    RotateCcw,
    Search,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDateTime } from '@/lib/formatters';
import voucherClaims from '@/routes/voucher-claims';

import type {
    BreadcrumbItem,
    PaginatedResponse,
    Store,
    VoucherRedemption,
} from '@/types';

interface Props {
    claims: PaginatedResponse<VoucherRedemption>;
    stores: Store[];
    filters: {
        search: string;
        status: string;
        store_id: number | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Klaim Voucher',
        href: voucherClaims.index().url,
    },
];

export default function Index({ claims, stores, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [storeId, setStoreId] = useState(
        filters.store_id?.toString() || 'ALL',
    );

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get(
            voucherClaims.index().url,
            {
                search,
                status: status === 'ALL' ? '' : status,
                store_id: storeId === 'ALL' ? '' : storeId,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setStatus('ALL');
        setStoreId('ALL');
        setSelectedIds([]);

        router.get(voucherClaims.index().url, {}, { replace: true });
    };

    const claimVoucher = (voucherRedemptionId: number) => {
        router.post(voucherClaims.claim(voucherRedemptionId).url);
    };

    const payVoucher = (voucherRedemptionId: number) => {
        router.post(voucherClaims.pay(voucherRedemptionId).url);
    };

    const getSelectionType = () => {
        if (selectedIds.length === 0) {
            return null;
        }

        const firstSelected = claims.data.find((c) => selectedIds.includes(c.id));

        return firstSelected ? firstSelected.claim_status : null;
    };

    const selectionType = getSelectionType();

    const selectableClaims = claims.data.filter((claim) => {
        if (claim.claim_status === 'PAID') {
            return false;
        }

        if (selectionType) {
            return claim.claim_status === selectionType;
        }

        const firstSelectableStatus = claims.data.find(
            (c) => c.claim_status !== 'PAID',
        )?.claim_status;

        return claim.claim_status === firstSelectableStatus;
    });

    const isAllSelected =
        selectableClaims.length > 0 &&
        selectableClaims.every((c) => selectedIds.includes(c.id));

    const handleSelectAll = () => {
        if (isAllSelected) {
            const selectableIds = selectableClaims.map((c) => c.id);
            setSelectedIds((prev) => prev.filter((id) => !selectableIds.includes(id)));
        } else {
            const selectableIds = selectableClaims.map((c) => c.id);
            setSelectedIds((prev) => Array.from(new Set([...prev, ...selectableIds])));
        }
    };

    const handleSelectRow = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((item) => item !== id));
        }
    };

    const handleBulkClaim = () => {
        if (selectedIds.length === 0) {
            return;
        }

        router.post(
            voucherClaims.bulkClaim().url,
            { ids: selectedIds },
            {
                onSuccess: () => {
                    setSelectedIds([]);
                },
            },
        );
    };

    const handleBulkPay = () => {
        if (selectedIds.length === 0) {
            return;
        }

        router.post(
            voucherClaims.bulkPay().url,
            { ids: selectedIds },
            {
                onSuccess: () => {
                    setSelectedIds([]);
                },
            },
        );
    };

    const getStatusBadge = (statusVal: string) => {
        switch (statusVal?.toUpperCase()) {
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
                        Disetujui (Claimed)
                    </Badge>
                );
            case 'PAID':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        Lunas (Paid)
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {statusVal}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title="Verifikasi Klaim Dana Voucher" />

            <div className="container mx-auto max-w-7xl space-y-6 p-6 pb-24">
                {/* Header Title Section */}
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Klaim & Pencairan Voucher
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Otorisasi penukaran nota voucher kasir toko, verifikasi
                        klaim akuntansi, dan tindak lanjut mutasi pencairan
                        dana.
                    </p>
                </div>

                {/* Filter Toolbar */}
                <Card className="bg-muted/10 shadow-sm border border-border/60">
                    <CardContent className="p-4">
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari berdasarkan nomor kode voucher..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 bg-card pl-9 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                                />
                            </div>

                            <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
                                <Select
                                    value={status}
                                    onValueChange={(val) => {
                                        setStatus(val);
                                        setSelectedIds([]);
                                    }}
                                >
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[160px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Status Otorisasi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="PENDING">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="CLAIMED">
                                            Claimed
                                        </SelectItem>
                                        <SelectItem value="PAID">
                                            Paid
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={storeId}
                                    onValueChange={(val) => {
                                        setStoreId(val);
                                        setSelectedIds([]);
                                    }}
                                >
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[180px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Filter Toko" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">
                                            Semua Toko
                                        </SelectItem>
                                        {stores.map((store) => (
                                            <SelectItem
                                                key={store.id}
                                                value={store.id.toString()}
                                            >
                                                {store.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2 border-t pt-3 sm:border-t-0 sm:pt-0 border-border/60">
                                <Button
                                    type="submit"
                                    className="h-10 flex-1 px-5 sm:flex-initial font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 duration-300"
                                >
                                    Cari
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetFilters}
                                    className="h-10 px-3 transition-all hover:bg-muted/30"
                                    title="Reset Filter"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Main Responsive Datatable Wrapper */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 w-12 text-center">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={handleSelectAll}
                                            disabled={selectableClaims.length === 0}
                                        />
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kode Voucher
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Nama Karyawan
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Toko
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kasir
                                    </th>

                                    <th className="p-4 text-right font-semibold whitespace-nowrap">
                                        Nominal Klaim
                                    </th>

                                    <th className="p-4 text-center font-semibold whitespace-nowrap">
                                        Status Klaim
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Tanggal Penukaran
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Tanggal Klaim
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Tanggal Pembayaran
                                    </th>

                                    <th className="p-4 text-center font-semibold whitespace-nowrap">
                                        Tindakan
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {claims.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="p-12 text-center text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <AlertTriangle className="h-8 w-8 text-muted-foreground/40" />
                                                <p className="text-sm font-medium">
                                                    Data klaim voucher tidak ditemukan
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Silakan sesuaikan filter atau kata kunci pencarian Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    claims.data.map((claim) => {
                                        const isChecked = selectedIds.includes(claim.id);
                                        const isDisabled =
                                            claim.claim_status === 'PAID' ||
                                            (selectionType !== null &&
                                                claim.claim_status !== selectionType);

                                        return (
                                            <tr
                                                key={claim.id}
                                                className={`transition-colors hover:bg-muted/10 ${isChecked ? 'bg-primary/5 hover:bg-primary/10' : ''}`}
                                            >
                                                <td className="p-4 text-center">
                                                    <Checkbox
                                                        checked={isChecked}
                                                        disabled={isDisabled}
                                                        onCheckedChange={(checked) =>
                                                            handleSelectRow(claim.id, !!checked)
                                                        }
                                                    />
                                                </td>

                                                <td className="p-4 whitespace-nowrap">
                                                    <CopyButton value={claim.voucher?.code ?? ''} />
                                                </td>

                                                <td className="p-4 font-semibold whitespace-nowrap text-foreground/90">
                                                    {claim.voucher?.employee?.name ?? '-'}
                                                </td>

                                                <td className="p-4 whitespace-nowrap text-muted-foreground font-medium">
                                                    {claim.store?.name ?? '-'}
                                                </td>

                                                <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                    {claim.cashier?.name ?? '-'}
                                                </td>

                                                <td className="p-4 text-right font-bold whitespace-nowrap text-primary">
                                                    {formatCurrency(claim.redeemed_amount)}
                                                </td>

                                                <td className="p-4 text-center whitespace-nowrap">
                                                    {getStatusBadge(claim.claim_status)}
                                                </td>

                                                <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                    {formatDateTime(claim.redeemed_at)}
                                                </td>

                                                <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                    {claim.claimed_at
                                                        ? formatDateTime(claim.claimed_at)
                                                        : '-'}
                                                </td>

                                                <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                    {claim.paid_at
                                                        ? formatDateTime(claim.paid_at)
                                                        : '-'}
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Button
                                                            asChild
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-8 w-8 text-muted-foreground transition-all hover:bg-accent/10"
                                                            title="Lihat Detail"
                                                        >
                                                            <Link
                                                                href={
                                                                    voucherClaims.show(claim.id).url
                                                                }
                                                            >
                                                                <Eye className="size-4" />
                                                            </Link>
                                                        </Button>

                                                        {claim.claim_status === 'PENDING' && (
                                                            <Button
                                                                size="sm"
                                                                className="h-8 gap-1 bg-blue-600 px-2.5 text-white hover:bg-blue-700 font-semibold transition-all hover:shadow-sm hover:-translate-y-0.5 duration-300"
                                                                onClick={() => claimVoucher(claim.id)}
                                                            >
                                                                <Check className="size-3.5" />
                                                                Klaim
                                                            </Button>
                                                        )}

                                                        {claim.claim_status === 'CLAIMED' && (
                                                            <Button
                                                                size="sm"
                                                                className="h-8 gap-1 bg-emerald-600 px-2.5 text-white hover:bg-emerald-700 font-semibold transition-all hover:shadow-sm hover:-translate-y-0.5 duration-300"
                                                                onClick={() => payVoucher(claim.id)}
                                                            >
                                                                <CircleDollarSign className="size-3.5" />
                                                                Bayar
                                                            </Button>
                                                        )}

                                                        {claim.claim_status === 'PAID' && (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                disabled
                                                                className="h-8 w-8 text-emerald-600 disabled:opacity-100"
                                                                title="Klaim telah dibayar"
                                                            >
                                                                <Check className="size-4 stroke-[3]" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-foreground">{claims.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{claims.total}</span> klaim
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {claims.links.map((link, index) => (
                            <Button
                                key={index}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url, { preserveState: true })}
                                className="h-8 min-w-[32px] px-2.5 text-xs font-semibold hover:shadow-sm"
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Action Bar */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between gap-6 rounded-full border border-border/80 bg-background/95 p-4 shadow-lg backdrop-blur-md transition-all duration-300 md:min-w-[420px]">
                    <div className="text-sm font-medium pl-2">
                        <span className="font-bold text-primary mr-1">{selectedIds.length}</span>{' '}
                        item terpilih (Status: <span className="font-semibold text-primary">{selectionType}</span>)
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIds([])}
                            className="rounded-full h-9 px-4 transition-all hover:bg-muted/30"
                        >
                            Batal
                        </Button>
                        {selectionType === 'PENDING' && (
                            <Button
                                size="sm"
                                onClick={handleBulkClaim}
                                className="rounded-full h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:shadow-md duration-300 px-4 flex items-center gap-1.5"
                            >
                                <Check className="h-4 w-4" /> Klaim Terpilih
                            </Button>
                        )}
                        {selectionType === 'CLAIMED' && (
                            <Button
                                size="sm"
                                onClick={handleBulkPay}
                                className="rounded-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all hover:shadow-md duration-300 px-4 flex items-center gap-1.5"
                            >
                                <CircleDollarSign className="h-4 w-4" /> Bayar Terpilih
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = (page: ReactNode) => <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
