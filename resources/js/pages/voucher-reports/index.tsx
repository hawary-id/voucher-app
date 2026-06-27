import { Head, router } from '@inertiajs/react';
import {
    AlertTriangle,
    Ban,
    BarChart3,
    CheckCircle2,
    Clock,
    Download,
    FileSpreadsheet,
    Receipt,
    RotateCcw,
    Search,
} from 'lucide-react';
import type { ReactElement, FormEvent } from 'react';
import { useState } from 'react';

import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import voucherReports from '@/routes/voucher-reports';
import type {
    BreadcrumbItem,
    Department,
    PaginatedResponse,
    Store,
    Voucher,
} from '@/types';

interface Props {
    vouchers: PaginatedResponse<Voucher>;
    departments: Department[];
    stores: Store[];
    summary: {
        total_vouchers: number;
        total_nominal: number;
        active_vouchers: number;
        used_vouchers: number;
        expired_vouchers: number;
        void_vouchers: number;
    };
    filters: {
        search: string;
        status: string;
        department_id: number | null;
        store_id: number | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Voucher',
        href: voucherReports.index().url,
    },
];

export default function Index({
    vouchers,
    departments,
    stores,
    summary,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [departmentId, setDepartmentId] = useState(
        filters.department_id?.toString() || 'ALL',
    );
    const [storeId, setStoreId] = useState(
        filters.store_id?.toString() || 'ALL',
    );

    const resetFilters = () => {
        setSearch('');
        setStatus('ALL');
        setDepartmentId('ALL');
        setStoreId('ALL');

        router.get(voucherReports.index().url, {}, { replace: true });
    };

    const queryParams = {
        search,
        status: status === 'ALL' ? '' : status,
        department_id: departmentId === 'ALL' ? '' : departmentId,
        store_id: storeId === 'ALL' ? '' : storeId,
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get(voucherReports.index().url, queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const exportPdf = () => {
        window.open(voucherReports.print({ query: queryParams }).url, '_blank');
    };

    const exportExcel = () => {
        window.location.href = voucherReports.export({
            query: queryParams,
        }).url;
    };

    const getStatusBadge = (statusVal: string) => {
        switch (statusVal.toUpperCase()) {
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
                        {statusVal}
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
            <Head title="Laporan Analisis Voucher" />

            <div className="container mx-auto max-w-7xl space-y-6 p-6">
                {/* Header Title Section */}
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Laporan Voucher
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Analisis data distribusi kupon belanja, audit penukaran
                        kasir toko, dan pemantauan anggaran biaya.
                    </p>
                </div>

                {/* Dashboard Executive KPI Summary */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-muted-foreground/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Total Voucher
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">
                                {summary.total_vouchers}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Total Nilai
                            </CardTitle>
                            <Receipt className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold tracking-tight text-primary">
                                {formatCurrency(summary.total_nominal)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                                Status Aktif
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight text-emerald-600">
                                {summary.active_vouchers}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                                Telah Klaim
                            </CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight text-blue-600">
                                {summary.used_vouchers}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-amber-600 uppercase">
                                Kedaluwarsa
                            </CardTitle>
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight text-amber-600">
                                {summary.expired_vouchers}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-destructive/5 blur-xl pointer-events-none" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-semibold tracking-wider text-destructive uppercase">
                                Batal (Void)
                            </CardTitle>
                            <Ban className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight text-destructive">
                                {summary.void_vouchers}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter and Export Form Component Toolbar */}
                <Card className="bg-muted/10 shadow-sm border border-border/60">
                    <CardContent className="p-4">
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-3 lg:flex-row lg:items-center"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari berdasarkan kode voucher atau nama..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 bg-card pl-9 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                                />
                            </div>

                            <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-3">
                                <Select
                                    value={status}
                                    onValueChange={setStatus}
                                >
                                    <SelectTrigger className="h-10 w-full bg-card transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="ACTIVE">
                                            Aktif
                                        </SelectItem>
                                        <SelectItem value="USED">
                                            Terpakai
                                        </SelectItem>
                                        <SelectItem value="EXPIRED">
                                            Kedaluwarsa
                                        </SelectItem>
                                        <SelectItem value="VOID">
                                            Dibatalkan (Void)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={departmentId}
                                    onValueChange={setDepartmentId}
                                >
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[180px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">
                                            Semua Departemen
                                        </SelectItem>
                                        {departments.map((department) => (
                                            <SelectItem
                                                key={department.id}
                                                value={department.id.toString()}
                                            >
                                                {department.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={storeId}
                                    onValueChange={setStoreId}
                                >
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[180px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Lokasi Toko" />
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

                            <div className="flex items-center gap-2 border-t pt-3 lg:border-t-0 lg:pt-0 border-border/60">
                                <Button
                                    type="submit"
                                    className="h-10 flex-1 sm:flex-initial font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 duration-300"
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
                                <div className="mx-1 hidden h-6 w-px bg-border sm:block" />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={exportPdf}
                                    className="h-10 flex-1 gap-1.5 border bg-card hover:bg-muted/50 sm:flex-initial transition-all hover:shadow-sm hover:-translate-y-0.5 duration-300 font-semibold"
                                >
                                    <Download className="size-4 text-muted-foreground" />{' '}
                                    PDF
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={exportExcel}
                                    className="h-10 flex-1 gap-1.5 border bg-card hover:bg-muted/50 sm:flex-initial transition-all hover:shadow-sm hover:-translate-y-0.5 duration-300 font-semibold"
                                >
                                    <FileSpreadsheet className="size-4 text-emerald-600" />{' '}
                                    Excel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Main Datatable */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kode Voucher
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Nama Karyawan
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Departemen
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Toko
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kasir
                                    </th>

                                    <th className="p-4 text-right font-semibold whitespace-nowrap">
                                        Nominal
                                    </th>

                                    <th className="p-4 text-center font-semibold whitespace-nowrap">
                                        Status Voucher
                                    </th>

                                    <th className="p-4 text-center font-semibold whitespace-nowrap">
                                        Status Klaim
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Tanggal Terbit
                                    </th>

                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Tanggal Kedaluwarsa
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
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {vouchers.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={13}
                                            className="p-12 text-center text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <AlertTriangle className="h-8 w-8 text-muted-foreground/40" />
                                                <p className="text-sm font-medium">
                                                    Data laporan tidak ditemukan
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Silakan sesuaikan filter
                                                    pencarian atau parameter
                                                    Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    vouchers.data.map((voucher) => (
                                        <tr
                                            key={voucher.id}
                                            className="transition-colors hover:bg-muted/10"
                                        >
                                            <td className="p-4 whitespace-nowrap">
                                                <CopyButton
                                                    value={voucher.code}
                                                />
                                            </td>

                                            <td className="p-4 font-semibold whitespace-nowrap text-foreground/90">
                                                {voucher.employee?.name}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {
                                                    voucher.employee?.department
                                                        ?.name
                                                }
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/85 font-medium">
                                                {voucher.redemption?.store
                                                    ?.name ?? '-'}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {voucher.redemption?.cashier
                                                    ?.name ?? '-'}
                                            </td>

                                            <td className="p-4 text-right font-bold whitespace-nowrap text-primary">
                                                {formatCurrency(
                                                    voucher.nominal,
                                                )}
                                            </td>

                                            <td className="p-4 text-center whitespace-nowrap">
                                                {getStatusBadge(voucher.status)}
                                            </td>

                                            <td className="p-4 text-center whitespace-nowrap">
                                                {getClaimStatusBadge(voucher.redemption?.claim_status)}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {formatDateTime(
                                                    voucher.issued_at,
                                                )}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {formatDateTime(
                                                    voucher.expired_at,
                                                )}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80 font-medium">
                                                {voucher.used_at
                                                    ? formatDateTime(
                                                          voucher.used_at,
                                                      )
                                                    : '-'}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {voucher.redemption?.claimed_at
                                                    ? formatDateTime(
                                                          voucher.redemption
                                                              .claimed_at,
                                                      )
                                                    : '-'}
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {voucher.redemption?.paid_at
                                                    ? formatDateTime(
                                                          voucher.redemption
                                                              .paid_at,
                                                      )
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-foreground">{vouchers.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{vouchers.total}</span> data voucher
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {vouchers.links.map((link, index) => (
                            <Button
                                key={index}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url &&
                                    router.visit(link.url, { preserveState: true })
                                }
                                className="h-8 min-w-[32px] px-2.5 text-xs font-semibold hover:shadow-sm"
                            >
                                <span
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: ReactElement) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
