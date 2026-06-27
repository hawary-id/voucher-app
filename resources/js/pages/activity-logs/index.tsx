import { Head, router } from '@inertiajs/react';
import {
    AlertTriangle,
    Eye,
    History,
    RotateCcw,
    Search,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatDateTime } from '@/lib/formatters';
import activityLogs from '@/routes/activity-logs';

import type {
    ActivityLog,
    BreadcrumbItem,
    PaginatedResponse,
} from '@/types';

interface Props {
    activities: PaginatedResponse<ActivityLog>;
    filters: {
        search?: string;
        log_name?: string;
        event?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Audit Log',
        href: activityLogs.index().url,
    },
];

export default function ActivityLogIndex({
    activities: paginatedActivities,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [logName, setLogName] = useState(filters.log_name || 'ALL');
    const [event, setEvent] = useState(filters.event || 'ALL');

    const [debouncedSearch] = useDebounce(search, 300);
    const [isSearching, setIsSearching] = useState(false);

    const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (
            debouncedSearch !== (filters.search ?? '') ||
            logName !== (filters.log_name ?? 'ALL') ||
            event !== (filters.event ?? 'ALL')
        ) {
            router.get(
                activityLogs.index().url,
                {
                    search: debouncedSearch,
                    log_name: logName === 'ALL' ? '' : logName,
                    event: event === 'ALL' ? '' : event,
                },
                {
                    preserveState: true,
                    replace: true,
                    onBefore: () => setIsSearching(true),
                    onFinish: () => setIsSearching(false),
                },
            );
        }
    }, [debouncedSearch, logName, event, filters.search, filters.log_name, filters.event]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(
            activityLogs.index().url,
            {
                search,
                log_name: logName === 'ALL' ? '' : logName,
                event: event === 'ALL' ? '' : event,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setLogName('ALL');
        setEvent('ALL');
        router.get(activityLogs.index().url, {}, { replace: true });
    };

    const badgeVariant = (eventVal?: string | null) => {
        switch (eventVal?.toLowerCase()) {
            case 'created':
                return 'default';
            case 'updated':
                return 'secondary';
            case 'deleted':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getEventBadgeClass = (eventVal?: string | null) => {
        switch (eventVal?.toLowerCase()) {
            case 'created':
                return 'rounded-full border-emerald-200/60 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'updated':
                return 'rounded-full border-blue-200/60 bg-blue-500/5 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-900/30 dark:bg-blue-500/10 dark:text-blue-400';
            case 'deleted':
                return 'rounded-full border-red-200/60 bg-red-500/5 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:border-red-900/30 dark:bg-red-500/10 dark:text-red-400';
            case 'claimed':
                return 'rounded-full border-amber-200/60 bg-amber-500/5 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-900/30 dark:bg-amber-500/10 dark:text-amber-400';
            case 'paid':
                return 'rounded-full border-violet-200/60 bg-violet-500/5 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-900/30 dark:bg-violet-500/10 dark:text-violet-400';
            default:
                return 'rounded-full px-2.5 py-0.5 text-xs font-medium';
        }
    };

    const getInitials = (nameStr: string) => {
        if (!nameStr) {
            return 'SYS';
        }

        return nameStr
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const openDetail = (activity: ActivityLog) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    };

    return (
        <>
            <Head title="Audit Log" />

            <div className="container mx-auto max-w-7xl space-y-6 p-6">
                {/* Header Title Section */}
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
                    <p className="text-sm text-muted-foreground">
                        Riwayat jejak audit aktivitas pengguna dan perubahan data penting pada sistem.
                    </p>
                </div>

                {/* Filter Toolbar */}
                <Card className="bg-muted/10 shadow-sm border border-border/60">
                    <CardContent className="p-4">
                        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari berdasarkan keterangan aktivitas..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 bg-card pl-9 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                                />
                            </div>

                            <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
                                <Select value={logName} onValueChange={setLogName}>
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[160px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Semua Modul" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">Semua Modul</SelectItem>
                                        <SelectItem value="auth">Autentikasi</SelectItem>
                                        <SelectItem value="user">Pengguna</SelectItem>
                                        <SelectItem value="store">Toko</SelectItem>
                                        <SelectItem value="department">Departemen</SelectItem>
                                        <SelectItem value="employee">Karyawan</SelectItem>
                                        <SelectItem value="voucher">Voucher</SelectItem>
                                        <SelectItem value="claim">Klaim & Bayar</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={event} onValueChange={setEvent}>
                                    <SelectTrigger className="h-10 w-full bg-card sm:w-[160px] transition-all focus:ring-primary/20">
                                        <SelectValue placeholder="Semua Event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">Semua Event</SelectItem>
                                        <SelectItem value="created">Created</SelectItem>
                                        <SelectItem value="updated">Updated</SelectItem>
                                        <SelectItem value="deleted">Deleted</SelectItem>
                                        <SelectItem value="claimed">Claimed</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="login">Login</SelectItem>
                                        <SelectItem value="logout">Logout</SelectItem>
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
                        <table
                            className={`w-full text-sm transition-opacity duration-200 ${isSearching ? 'opacity-50' : 'opacity-100'}`}
                        >
                            <thead>
                                <tr className="border-b bg-muted/20 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Waktu</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Pengguna</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Modul</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Event</th>
                                    <th className="p-4 text-left font-semibold whitespace-nowrap">Aktivitas</th>
                                    <th className="p-4 text-center font-semibold whitespace-nowrap">Tindakan</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/60">
                                {paginatedActivities.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <AlertTriangle className="h-8 w-8 text-muted-foreground/40" />
                                                <p className="text-sm font-medium">Belum ada aktivitas audit log</p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Silakan sesuaikan kata kunci pencarian atau filter Anda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedActivities.data.map((activity) => (
                                        <tr key={activity.id} className="transition-colors hover:bg-muted/10">
                                            <td className="p-4 whitespace-nowrap text-muted-foreground font-medium">
                                                {formatDateTime(activity.created_at)}
                                            </td>

                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary dark:bg-primary/20">
                                                        {getInitials(activity.causer?.name ?? '')}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-foreground/90 leading-tight">
                                                            {activity.causer?.name ?? 'Sistem'}
                                                        </span>
                                                        {activity.causer?.email && (
                                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                                {activity.causer.email}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4 whitespace-nowrap font-medium">
                                                <Badge variant="outline" className="rounded-full bg-card uppercase text-[10px] font-bold tracking-wider">
                                                    {activity.log_name}
                                                </Badge>
                                            </td>

                                            <td className="p-4 whitespace-nowrap">
                                                <span className={getEventBadgeClass(activity.event)}>
                                                    {activity.event ?? '-'}
                                                </span>
                                            </td>

                                            <td className="p-4 text-foreground/90 font-medium max-w-sm truncate">
                                                {activity.description}
                                            </td>

                                            <td className="p-4 text-center">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8 text-muted-foreground transition-all hover:bg-accent/10"
                                                    onClick={() => openDetail(activity)}
                                                    title="Lihat Detail Log"
                                                >
                                                    <Eye className="size-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Segment */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-foreground">{paginatedActivities.data.length}</span> dari{' '}
                        <span className="font-medium text-foreground">{paginatedActivities.total}</span> aktivitas
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                        {paginatedActivities.links.map((link, index) => (
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

            {/* Audit Log Detail Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl border-border/80 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
                            <History className="h-5 w-5 text-primary" /> Rincian Log Audit
                        </DialogTitle>
                        <DialogDescription>
                            Detail metadata dan parameter riwayat perubahan aktivitas sistem.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedActivity && (
                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-4 border border-border/50">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Waktu Aktivitas
                                    </span>
                                    <p className="text-sm font-semibold">{formatDateTime(selectedActivity.created_at)}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Modul & Event
                                    </span>
                                    <div className="flex items-center gap-1.5 pt-0.5">
                                        <Badge variant="outline" className="text-xs font-medium bg-card">
                                            {selectedActivity.log_name}
                                        </Badge>
                                        <Badge variant={badgeVariant(selectedActivity.event)} className="text-xs font-semibold">
                                            {selectedActivity.event ?? '-'}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Pelaku (Causer)
                                    </span>
                                    <p className="text-sm font-semibold">
                                        {selectedActivity.causer?.name ?? 'Sistem'}{' '}
                                        {selectedActivity.causer?.email ? `(${selectedActivity.causer.email})` : ''}
                                    </p>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        Keterangan Aktivitas
                                    </span>
                                    <p className="text-sm font-semibold text-foreground/90">{selectedActivity.description}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    Metadata Tambahan (JSON)
                                </span>
                                <div className="max-h-[250px] overflow-y-auto rounded-xl border border-border bg-slate-950 p-4 dark:bg-slate-900">
                                    {Object.keys(selectedActivity.properties || {}).length === 0 ? (
                                        <p className="text-xs font-mono text-slate-400 italic">Tidak ada metadata tambahan.</p>
                                    ) : (
                                        <pre className="text-xs font-mono text-slate-200">
                                            {JSON.stringify(selectedActivity.properties, null, 2)}
                                        </pre>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 font-semibold transition-all hover:bg-muted/30"
                                >
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

ActivityLogIndex.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
