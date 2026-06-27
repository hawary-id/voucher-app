import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, MoreHorizontal, Edit2, Trash2, Store as StoreIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useDebounce } from 'use-debounce';

import DeleteConfirmDialog from '@/components/delete-confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import stores from '@/routes/stores';

import type { PaginatedResponse, Store } from '@/types';

interface Props {
    stores: PaginatedResponse<Store>;
    filters: {
        search?: string;
    };
}

export default function StoreIndex({ stores: paginatedStores, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [debouncedSearch] = useDebounce(search, 300);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (debouncedSearch !== (filters.search ?? '')) {
            router.get(
                stores.index().url,
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
            <Head title="Manajemen Toko" />

            <div className="container mx-auto space-y-6 p-6 max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Toko</h1>
                        <p className="text-sm text-muted-foreground">
                            Manajemen toko, kode, dan status operasional.
                        </p>
                    </div>
                    <Button asChild className="sm:w-auto w-full transition-all hover:bg-primary/95 hover:shadow-md hover:-translate-y-0.5 duration-300">
                        <Link href={stores.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Toko
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-2 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari toko berdasarkan nama atau kode..."
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

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                    <div className="overflow-x-auto">
                        <table className={`w-full text-sm transition-opacity duration-200 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 text-left font-semibold">Kode Toko</th>
                                    <th className="p-4 text-left font-semibold">Nama Toko</th>
                                    <th className="p-4 text-left font-semibold">Jenis Bisnis</th>
                                    <th className="p-4 text-left font-semibold">Status</th>
                                    <th className="p-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {paginatedStores.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <StoreIcon className="h-8 w-8 text-muted-foreground/60" />
                                                <p className="font-medium text-muted-foreground text-sm">Toko tidak ditemukan</p>
                                                <p className="text-xs text-muted-foreground/80">Coba sesuaikan kata kunci pencarian Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedStores.data.map((store) => (
                                        <tr key={store.id} className="hover:bg-muted/10 transition-colors">
                                            <td className="p-4 font-mono text-xs font-semibold tracking-wider text-muted-foreground/80">
                                                {store.code}
                                            </td>
                                            <td className="p-4 font-medium">{store.name}</td>
                                            <td className="p-4 text-muted-foreground/80">{store.business_type}</td>
                                            <td className="p-4">
                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                        store.is_active
                                                            ? 'border-emerald-200/60 bg-emerald-500/5 text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                            : 'border-muted/60 bg-muted/10 text-muted-foreground dark:border-muted/80 dark:bg-muted/15'
                                                    }`}
                                                >
                                                    {store.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Buka menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={stores.edit(store.id).url} className="flex items-center cursor-pointer">
                                                                <Edit2 className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> Edit toko
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DeleteConfirmDialog
                                                            title="Hapus Toko"
                                                            description={`Apakah Anda yakin ingin menghapus toko "${store.name}"?`}
                                                            onConfirm={() =>
                                                                router.delete(stores.destroy(store.id).url)
                                                            }
                                                            trigger={
                                                                <DropdownMenuItem 
                                                                    onSelect={(e) => e.preventDefault()}
                                                                    className="text-destructive focus:text-destructive flex items-center cursor-pointer"
                                                                >
                                                                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Hapus toko
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

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-foreground">{paginatedStores.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{paginatedStores.total}</span> toko
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {paginatedStores.links.map((link, index) => (
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

StoreIndex.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Toko',
                href: stores.index().url,
            },
        ]}
    >
        {page}
    </AppLayout>
);