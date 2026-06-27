import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Edit2,
    Printer,
    Calendar,
    FileText,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Info,
    Search,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import type { ReactElement } from 'react';

import ConfirmationDialog from '@/components/confirmation-dialog';
import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { formatCurrency, formatDate, formatDateTime } from '@/lib/formatters';
import { voucherPrint } from '@/routes';
import voucherBatches from '@/routes/voucher-batches';
import vouchersRoute from '@/routes/vouchers';
import type { Voucher, VoucherBatch } from '@/types';

interface VoucherBatchWithVouchers extends VoucherBatch {
    vouchers?: Voucher[];
}

interface Props {
    voucherBatch: VoucherBatchWithVouchers;
    summary: {
        total: number;
        active: number;
        used: number;
        expired: number;
    };
}

export default function ShowVoucherBatch({ voucherBatch, summary }: Props) {
    const { auth } = usePage().props as any;
    const canVoid = auth.permissions?.includes('voucher_batch.update');

    const handleVoidVoucher = (voucherId: number) => {
        router.post(
            vouchersRoute.void({ voucher: voucherId }).url,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const vouchers = useMemo(
        () => voucherBatch.vouchers ?? [],
        [voucherBatch.vouchers],
    );
    const [selectedVoucherIds, setSelectedVoucherIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredVouchers = useMemo(() => {
        let items = vouchers;

        if (statusFilter !== 'ALL') {
            items = items.filter(
                (v) => v.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        const query = searchQuery.toLowerCase().trim();
        if (query) {
            items = items.filter((voucher) => {
                const codeMatch = voucher.code?.toLowerCase().includes(query);
                const nameMatch = voucher.employee?.name
                    ?.toLowerCase()
                    .includes(query);
                const deptMatch = voucher.employee?.department?.name
                    ?.toLowerCase()
                    .includes(query);
                return codeMatch || nameMatch || deptMatch;
            });
        }

        return items;
    }, [vouchers, searchQuery, statusFilter]);

    const allSelected =
        filteredVouchers.length > 0 &&
        filteredVouchers.every((v) => selectedVoucherIds.includes(v.id));

    const isPartialSelected =
        filteredVouchers.some((v) => selectedVoucherIds.includes(v.id)) &&
        !allSelected;

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const filteredIds = filteredVouchers.map((v) => v.id);
            setSelectedVoucherIds((prev) =>
                Array.from(new Set([...prev, ...filteredIds])),
            );
        } else {
            const filteredIds = filteredVouchers.map((v) => v.id);
            setSelectedVoucherIds((prev) =>
                prev.filter((id) => !filteredIds.includes(id)),
            );
        }
    };

    const toggleVoucher = (voucherId: number, checked: boolean) => {
        if (checked) {
            setSelectedVoucherIds((prev) => [...prev, voucherId]);

            return;
        }

        setSelectedVoucherIds((prev) => prev.filter((id) => id !== voucherId));
    };

    const handlePrintSelected = () => {
        window.open(
            voucherPrint().url + `?ids=${selectedVoucherIds.join(',')}`,
            '_blank',
        );
    };

    const getStatusBadge = (status: string) => {
        const lowerStatus = status.toLowerCase();

        switch (lowerStatus) {
            case 'active':
            case 'aktif':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        Aktif
                    </Badge>
                );
            case 'used':
            case 'terpakai':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-blue-200/60 bg-blue-500/5 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-900/30 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                        Terpakai
                    </Badge>
                );
            case 'expired':
            case 'kadaluarsa':
                return (
                    <Badge
                        variant="outline"
                        className="rounded-full border-amber-200/60 bg-amber-500/5 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-900/30 dark:bg-amber-500/10 dark:text-amber-400"
                    >
                        Kadaluarsa
                    </Badge>
                );
            case 'void':
            case 'batal':
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
                    <Badge
                        variant="outline"
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <>
            <Head title={`Rincian Voucher Batch - ${voucherBatch.batch_no}`} />

            <div className="container mx-auto max-w-7xl space-y-6 p-6">
                {/* Header Action Section */}
                <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="mb-2 -ml-2 p-0 text-muted-foreground hover:bg-transparent"
                        >
                            <Link href={voucherBatches.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                                ke daftar
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Detail Voucher Batch
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Pantau distribusi kupon belanja karyawan, status
                            klaim, dan ringkasan penggunaan kasir.
                        </p>
                    </div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <Button
                            variant="outline"
                            asChild
                            className="w-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/5 sm:w-auto"
                        >
                            <Link
                                href={voucherBatches.edit(voucherBatch.id).url}
                            >
                                <Edit2 className="mr-2 h-4 w-4" /> Edit Konten
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Dashboard Summary Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                        <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-muted-foreground/5 blur-xl" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Total Voucher
                            </p>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight">
                                {summary.total}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                        <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <p className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                                Voucher Aktif
                            </p>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight text-emerald-600">
                                {summary.active}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                        <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-blue-500/5 blur-xl" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                                Telah Diklaim
                            </p>
                            <p className="text-3xl font-bold tracking-tight text-blue-600">
                                {summary.used}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight text-blue-600">
                                {summary.used}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                        <div className="pointer-events-none absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-destructive/5 blur-xl" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <p className="text-xs font-semibold tracking-wider text-destructive uppercase">
                                Kadaluarsa
                            </p>
                            <XCircle className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight text-destructive">
                                {summary.expired}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata Details Card */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-2 border-b bg-muted/10 px-6 py-4">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Informasi Utama Batch
                        </h2>
                    </div>
                    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Nomor Batch
                            </span>
                            <p className="w-fit rounded bg-muted px-2.5 py-1 font-mono text-sm font-bold tracking-wide">
                                {voucherBatch.batch_no}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Judul Program
                            </span>
                            <p className="text-sm font-semibold">
                                {voucherBatch.title}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Nilai Nominal Per Voucher
                            </span>
                            <p className="text-sm font-bold text-primary">
                                {formatCurrency(voucherBatch.nominal)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Kuota Penerima
                            </span>
                            <p className="text-sm font-semibold">
                                {voucherBatch.total_employee} Orang Karyawan
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Masa Berlaku Kupon
                            </span>
                            <p className="flex items-center gap-1.5 text-sm font-semibold">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                {formatDate(voucherBatch.period_start)} –{' '}
                                {formatDate(voucherBatch.period_end)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                                Tanggal Diterbitkan
                            </span>
                            <p className="text-sm font-semibold">
                                {formatDateTime(voucherBatch.created_at)}
                            </p>
                        </div>
                        <div className="space-y-1 border-t border-border/60 pt-4 sm:col-span-2 md:col-span-3">
                            <span className="text-xs font-medium text-muted-foreground">
                                Keterangan / Catatan
                            </span>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {voucherBatch.description ??
                                    'Tidak ada catatan tambahan.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Voucher Datatable Container */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
                    <div className="flex flex-col gap-4 border-b bg-muted/10 p-5 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold tracking-tight text-foreground/90 uppercase">
                                Daftar Manifest Kupon
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Menampilkan {filteredVouchers.length} data
                                voucher hasil filter lokal.
                            </p>
                        </div>

                        {/* Toolbar: Searchbar Lokal & Cetak Button */}
                        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari kode, nama karyawan..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="h-9 pr-4 pl-9 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                                />
                            </div>
                            <div className="w-full sm:w-40">
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">Semua Status</SelectItem>
                                        <SelectItem value="ACTIVE">Aktif</SelectItem>
                                        <SelectItem value="USED">Terpakai</SelectItem>
                                        <SelectItem value="EXPIRED">Kedaluwarsa</SelectItem>
                                        <SelectItem value="VOID">Batal (Void)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handlePrintSelected}
                                disabled={selectedVoucherIds.length === 0}
                                size="sm"
                                className="h-9 shrink-0 font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <Printer className="mr-2 h-4 w-4" /> Cetak
                                Pilihan ({selectedVoucherIds.length})
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable Container Table: Vertikal (max-h) & Horizontal */}
                    <div className="relative max-h-[500px] scrollbar-thin overflow-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 z-10 bg-muted/95 shadow-sm backdrop-blur-sm">
                                <tr className="border-b text-[10px] font-bold font-medium tracking-wider text-muted-foreground uppercase">
                                    <th className="w-12 p-4 text-center">
                                        <Checkbox
                                            checked={allSelected}
                                            className={
                                                isPartialSelected
                                                    ? 'data-[state=unchecked]:bg-transparent'
                                                    : ''
                                            }
                                            onCheckedChange={(checked) =>
                                                toggleSelectAll(
                                                    Boolean(checked),
                                                )
                                            }
                                        />
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kode Unik
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Karyawan
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Departemen
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Nominal
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kedaluwarsa
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Status
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Lokasi Toko
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Kasir Penindak
                                    </th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">
                                        Waktu Penukaran
                                    </th>
                                    {canVoid && (
                                        <th className="p-4 text-right font-semibold whitespace-nowrap">
                                            Aksi
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60 bg-card">
                                {filteredVouchers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="p-12 text-center text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <AlertTriangle className="h-8 w-8 text-muted-foreground/50" />
                                                <p className="text-sm font-medium">
                                                    Data voucher tidak ditemukan
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Tidak ada data kupon yang
                                                    cocok dengan kata kunci
                                                    pencarian Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVouchers.map((voucher) => (
                                        <tr
                                            key={voucher.id}
                                            className="transition-colors hover:bg-muted/10"
                                        >
                                            <td className="p-4 text-center">
                                                <Checkbox
                                                    checked={selectedVoucherIds.includes(
                                                        voucher.id,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        toggleVoucher(
                                                            voucher.id,
                                                            Boolean(checked),
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <CopyButton
                                                    value={voucher.code}
                                                />
                                            </td>
                                            <td className="p-4 font-medium whitespace-nowrap">
                                                {voucher.employee?.name ?? '-'}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-muted-foreground">
                                                {voucher.employee?.department
                                                    ?.name ?? '-'}
                                            </td>
                                            <td className="p-4 font-bold whitespace-nowrap text-primary">
                                                {formatCurrency(
                                                    voucher.nominal,
                                                )}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-muted-foreground/80">
                                                {formatDate(voucher.expired_at)}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {getStatusBadge(voucher.status)}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-muted-foreground">
                                                {voucher.redemption?.store
                                                    ?.name ?? '-'}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-muted-foreground">
                                                {voucher.redemption?.cashier
                                                    ?.name ?? '-'}
                                            </td>
                                            <td className="p-4 font-medium whitespace-nowrap text-muted-foreground/80">
                                                {voucher.redemption?.redeemed_at
                                                    ? formatDateTime(
                                                          voucher.redemption
                                                              .redeemed_at,
                                                      )
                                                    : '-'}
                                            </td>
                                            {canVoid && (
                                                <td className="p-4 text-right whitespace-nowrap">
                                                    {voucher.status.toLowerCase() ===
                                                        'active' && (
                                                        <ConfirmationDialog
                                                            title="Batalkan Voucher"
                                                            description={`Apakah Anda yakin ingin membatalkan (void) voucher ${voucher.code}? Voucher yang dibatalkan tidak akan dapat digunakan oleh karyawan.`}
                                                            confirmLabel="Ya, Batalkan"
                                                            cancelLabel="Batal"
                                                            confirmVariant="destructive"
                                                            onConfirm={() =>
                                                                handleVoidVoucher(
                                                                    voucher.id,
                                                                )
                                                            }
                                                            trigger={
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <XCircle className="h-3.5 w-3.5" />
                                                                    Batalkan
                                                                </Button>
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowVoucherBatch.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Voucher Batches',
                href: voucherBatches.index().url,
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
