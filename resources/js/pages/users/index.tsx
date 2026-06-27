import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Edit2,
    KeyRound,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    UserCheck,
    Users,
    UserX,
} from 'lucide-react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import ConfirmationDialog from '@/components/confirmation-dialog';
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
import users from '@/routes/users';

import type { PaginatedResponse } from '@/types';
import type { User } from '@/types/user';
import ResetPasswordDialog from './components/reset-password-dialog';

interface Props {
    users: PaginatedResponse<User>;
    filters: {
        search?: string;
    };
}

export default function UserIndex({ users: paginatedUsers, filters }: Props) {
    const { auth } = usePage().props as any;
    const isCurrentUserSuperAdmin = auth.user?.roles?.some((role: any) => role.name === 'SUPER_ADMIN');

    const [search, setSearch] = useState(filters.search ?? '');
    const [debouncedSearch] = useDebounce(search, 300);
    const [isSearching, setIsSearching] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [openResetDialog, setOpenResetDialog] = useState(false);

    useEffect(() => {
        if (debouncedSearch !== (filters.search ?? '')) {
            router.get(
                users.index().url,
                { search: debouncedSearch },
                {
                    preserveState: true,
                    replace: true,
                    onBefore: () => setIsSearching(true),
                    onFinish: () => setIsSearching(false),
                },
            );
        }
    }, [debouncedSearch, filters.search]);

    return (
        <>
            <Head title="Manajemen Pengguna" />

            <div className="container mx-auto max-w-7xl space-y-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Pengguna
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola akun pengguna aplikasi, hak akses, penempatan
                            toko, dan peran pengguna.
                        </p>
                    </div>
                    <Button asChild className="w-full sm:w-auto transition-all hover:bg-primary/95 hover:shadow-md hover:-translate-y-0.5 duration-300">
                        <Link href={users.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
                        </Link>
                    </Button>
                </div>

                {/* Filter Toolbar */}
                <div className="relative flex max-w-md items-center gap-2">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari pengguna berdasarkan nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-12 pl-9 h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                    />
                    {isSearching && (
                        <span className="absolute top-1/2 right-3 -translate-y-1/2 animate-pulse text-xs text-muted-foreground">
                            Memuat...
                        </span>
                    )}
                </div>

                {/* Modern Table Layout */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
                    <div className="overflow-x-auto">
                        <table
                            className={`w-full text-sm transition-opacity duration-200 ${isSearching ? 'opacity-50' : 'opacity-100'}`}
                        >
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 text-left font-semibold">
                                        Nama
                                    </th>

                                    <th className="p-4 text-left font-semibold">
                                        Email
                                    </th>

                                    <th className="p-4 text-left font-semibold">
                                        Role
                                    </th>

                                    <th className="p-4 text-left font-semibold">
                                        Toko
                                    </th>

                                    <th className="p-4 text-left font-semibold">
                                        Status
                                    </th>

                                    <th className="p-4 text-right font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {paginatedUsers.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-8 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <Users className="h-8 w-8 text-muted-foreground/60" />

                                                <p className="font-medium text-muted-foreground text-sm">
                                                    Data pengguna tidak ditemukan
                                                </p>

                                                <p className="text-xs text-muted-foreground/80">
                                                    Coba sesuaikan kata kunci
                                                    pencarian Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.data.map((user) => {
                                        const isSuperAdminUser = user.roles?.[0]?.name === 'SUPER_ADMIN';

                                        return (
                                            <tr
                                                key={user.id}
                                                className="transition-colors hover:bg-muted/10"
                                            >
                                                <td className="p-4 font-semibold text-foreground/90">
                                                    {user.name}
                                                </td>

                                                <td className="p-4 text-muted-foreground/80">
                                                    {user.email}
                                                </td>

                                                <td className="p-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-full border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary dark:border-primary/30 dark:bg-primary/10"
                                                    >
                                                        {user.roles?.[0]?.name ??
                                                            '-'}
                                                    </Badge>
                                                </td>

                                                <td className="p-4 text-muted-foreground/80 font-medium">
                                                    {user.store?.name ??
                                                        'Semua Toko'}
                                                </td>

                                                <td className="p-4">
                                                    <Badge
                                                        variant="outline"
                                                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                            user.is_active
                                                                ? 'border-emerald-200/60 bg-emerald-500/5 text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                                : 'border-muted/60 bg-muted/10 text-muted-foreground dark:border-muted/80 dark:bg-muted/15'
                                                        }`}
                                                    >
                                                        {user.is_active
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </Badge>
                                                </td>

                                                <td className="p-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">
                                                            {!(isSuperAdminUser && !isCurrentUserSuperAdmin) && (
                                                                <DropdownMenuItem
                                                                    asChild
                                                                >
                                                                    <Link
                                                                        href={
                                                                            users.edit(
                                                                                user.id,
                                                                            ).url
                                                                        }
                                                                        className="flex items-center cursor-pointer"
                                                                    >
                                                                        <Edit2 className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                                        Edit Pengguna
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            )}

                                                            {!(isSuperAdminUser && !isCurrentUserSuperAdmin) && (
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setSelectedUser(
                                                                            user,
                                                                        );
                                                                        setOpenResetDialog(
                                                                            true,
                                                                        );
                                                                    }}
                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <KeyRound className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                                    Reset Password
                                                                </DropdownMenuItem>
                                                            )}

                                                            {!isSuperAdminUser && (
                                                                <>
                                                                    {user.is_active ? (
                                                                        <ConfirmationDialog
                                                                            title="Nonaktifkan Pengguna"
                                                                            description={`Apakah Anda yakin ingin menonaktifkan "${user.name}"? Pengguna tidak dapat login sampai diaktifkan kembali.`}
                                                                            confirmLabel="Ya, Nonaktifkan"
                                                                            onConfirm={() =>
                                                                                router.put(
                                                                                    users.deactivate(
                                                                                        user.id,
                                                                                    ).url,
                                                                                )
                                                                            }
                                                                            trigger={
                                                                                <DropdownMenuItem
                                                                                    onSelect={(
                                                                                        e,
                                                                                    ) =>
                                                                                        e.preventDefault()
                                                                                    }
                                                                                    className="flex items-center cursor-pointer"
                                                                                >
                                                                                    <UserX className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                                                    Nonaktifkan
                                                                                    Pengguna
                                                                                </DropdownMenuItem>
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <ConfirmationDialog
                                                                            title="Aktifkan Pengguna"
                                                                            description={`Apakah Anda yakin ingin mengaktifkan kembali akun "${user.name}"?`}
                                                                            confirmLabel="Ya, Aktifkan"
                                                                            onConfirm={() =>
                                                                                router.put(
                                                                                    users.activate(
                                                                                        user.id,
                                                                                    ).url,
                                                                                )
                                                                            }
                                                                            trigger={
                                                                                <DropdownMenuItem
                                                                                    onSelect={(
                                                                                        e,
                                                                                    ) =>
                                                                                        e.preventDefault()
                                                                                    }
                                                                                    className="flex items-center cursor-pointer"
                                                                                >
                                                                                    <UserCheck className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                                                    Aktifkan
                                                                                    Pengguna
                                                                                </DropdownMenuItem>
                                                                            }
                                                                        />
                                                                    )}

                                                                    <ConfirmationDialog
                                                                        title="Hapus Pengguna"
                                                                        description={`Apakah Anda yakin ingin menghapus pengguna "${user.name}"? Data yang dihapus tidak dapat dikembalikan.`}
                                                                        confirmLabel="Ya, Hapus"
                                                                        confirmVariant="destructive"
                                                                        onConfirm={() =>
                                                                            router.delete(
                                                                                users.destroy(
                                                                                    user.id,
                                                                                ).url,
                                                                            )
                                                                        }
                                                                        trigger={
                                                                            <DropdownMenuItem
                                                                                onSelect={(
                                                                                    e,
                                                                                ) =>
                                                                                    e.preventDefault()
                                                                                }
                                                                                className="text-destructive focus:text-destructive flex items-center cursor-pointer"
                                                                            >
                                                                                <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                                                Hapus
                                                                                Pengguna
                                                                            </DropdownMenuItem>
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
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
                        Menampilkan <span className="font-medium text-foreground">{paginatedUsers.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{paginatedUsers.total}</span> pengguna
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {paginatedUsers.links.map((link, index) => (
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
                {selectedUser && (
                    <ResetPasswordDialog
                        open={openResetDialog}
                        onOpenChange={setOpenResetDialog}
                        userId={selectedUser.id}
                        userName={selectedUser.name}
                    />
                )}
            </div>
        </>
    );
}

UserIndex.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Pengguna',
                href: users.index().url,
            },
        ]}
    >
        {page}
    </AppLayout>
);
