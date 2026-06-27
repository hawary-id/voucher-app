import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, MoreHorizontal, Eye, Edit2, Trash2, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useDebounce } from 'use-debounce';

import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency, formatDate } from '@/lib/formatters';
import voucherBatches from '@/routes/voucher-batches';
import type { PaginatedResponse, VoucherBatch } from '@/types';

interface Props {
    voucherBatches: PaginatedResponse<VoucherBatch>;
    filters: {
        search?: string;
    };
}

export default function VoucherBatchIndex({
    voucherBatches: paginatedVoucherBatches,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [debouncedSearch] = useDebounce(search, 300);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (debouncedSearch !== (filters.search ?? '')) {
            router.get(
                voucherBatches.index().url,
                { search: debouncedSearch },
                {
                    preserveState: true,
                    replace: true,
                    onBefore: () => setIsSearching(true),
                    onFinish: () => setIsSearching(false),
                }
            );
        }
    }, [debouncedSearch, filters.search]);

    return (
        <>
            <Head title="Manajemen Voucher Batch" />

            <div className="container mx-auto space-y-6 p-6 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Voucher Batch</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola pembuatan batch voucher, nominal alokasi, jumlah karyawan, dan periode masa berlaku.
                        </p>
                    </div>
                    <Button asChild className="sm:w-auto w-full transition-all hover:bg-primary/95 hover:shadow-md hover:-translate-y-0.5 duration-300">
                        <Link href={voucherBatches.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Voucher Batch
                        </Link>
                    </Button>
                </div>

                {/* Filter Toolbar */}
                <div className="flex items-center gap-2 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari berdasarkan nomor batch atau judul..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-12 h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                    />
                    {isSearching && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground animate-pulse">
                            Memuat...
                        </span>
                    )}
                </div>

                {/* Modern Table Layout */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                    <div className="overflow-x-auto">
                        <table className={`w-full text-sm transition-opacity duration-200 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 text-left font-semibold">No. Batch</th>
                                    <th className="p-4 text-left font-semibold">Judul</th>
                                    <th className="p-4 text-left font-semibold">Nominal</th>
                                    <th className="p-4 text-left font-semibold">Total Karyawan</th>
                                    <th className="p-4 text-left font-semibold">Periode Aktif</th>
                                    <th className="p-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {paginatedVoucherBatches.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <Ticket className="h-8 w-8 text-muted-foreground/60" />
                                                <p className="font-medium text-muted-foreground text-sm">Voucher batch tidak ditemukan</p>
                                                <p className="text-xs text-muted-foreground/80">Coba sesuaikan kata kunci pencarian Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedVoucherBatches.data.map((voucherBatch) => (
                                        <tr key={voucherBatch.id} className="hover:bg-muted/10 transition-colors">
                                            <td className="p-4 font-mono text-xs font-semibold tracking-wider text-muted-foreground/80">
                                                {voucherBatch.batch_no}
                                            </td>
                                            <td className="p-4 font-medium">{voucherBatch.title}</td>
                                            <td className="p-4 font-bold text-primary">
                                                {formatCurrency(voucherBatch.nominal)}
                                            </td>
                                            <td className="p-4 text-muted-foreground/80">
                                                {voucherBatch.total_employee} Orang
                                            </td>
                                            <td className="p-4 text-xs">
                                                <div className="font-semibold text-foreground/90">
                                                    {formatDate(voucherBatch.period_start)}
                                                </div>
                                                <div className="text-muted-foreground/80">
                                                    s/d {formatDate(voucherBatch.period_end)}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Buka menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={voucherBatches.show(voucherBatch.id).url} className="flex items-center cursor-pointer">
                                                                <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> Lihat detail
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={voucherBatches.edit(voucherBatch.id).url} className="flex items-center cursor-pointer">
                                                                <Edit2 className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> Edit rincian
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DeleteConfirmDialog
                                                            title="Hapus Voucher Batch"
                                                            description={`Apakah Anda yakin ingin menghapus voucher batch "${voucherBatch.title}"?`}
                                                            onConfirm={() =>
                                                                router.delete(voucherBatches.destroy(voucherBatch.id).url)
                                                            }
                                                            trigger={
                                                                <DropdownMenuItem 
                                                                    onSelect={(e) => e.preventDefault()}
                                                                    className="text-destructive focus:text-destructive flex items-center cursor-pointer"
                                                                >
                                                                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Hapus batch
                                                                </DropdownMenuItem>
                                                            }
                                                        />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Stats */}
                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-foreground">{paginatedVoucherBatches.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{paginatedVoucherBatches.total}</span> voucher batch
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {paginatedVoucherBatches.links.map((link, index) => (
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
        </>
    );
}

VoucherBatchIndex.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Voucher Batches',
                href: voucherBatches.index().url,
            },
        ]}
    >
        {page}
    </AppLayout>
);