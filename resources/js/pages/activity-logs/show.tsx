import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, History } from 'lucide-react';
import type { ReactElement } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDateTime } from '@/lib/formatters';
import activityLogs from '@/routes/activity-logs';
import type { ActivityLog } from '@/types';

interface Props {
    activity: ActivityLog;
}

export default function ActivityLogShow({ activity }: Props) {
    const badgeVariant = (event?: string | null) => {
        switch (event) {
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

    return (
        <>
            <Head title="Rincian Log Audit" />

            <div className="container mx-auto max-w-3xl space-y-6 p-6">
                <div className="flex items-center gap-2">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-muted-foreground hover:bg-muted/30"
                    >
                        <Link href={activityLogs.index().url}>
                            <ArrowLeft className="h-4 w-4" /> Kembali
                        </Link>
                    </Button>
                </div>

                <Card className="shadow-md border-border/60">
                    <CardHeader className="border-b pb-5">
                        <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-primary" />
                            <CardTitle className="text-xl font-bold">Rincian Log Audit</CardTitle>
                        </div>
                        <CardDescription>
                            Detail parameter riwayat perubahan aktivitas sistem.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-4 border border-border/50">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Waktu Aktivitas
                                </span>
                                <p className="text-sm font-semibold">
                                    {formatDateTime(activity.created_at)}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Modul & Event
                                </span>
                                <div className="flex items-center gap-1.5 pt-0.5">
                                    <Badge variant="outline" className="text-xs font-medium">
                                        {activity.log_name}
                                    </Badge>
                                    <Badge
                                        variant={badgeVariant(activity.event)}
                                        className="text-xs font-semibold"
                                    >
                                        {activity.event ?? '-'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Pelaku (Causer)
                                </span>
                                <p className="text-sm font-semibold">
                                    {activity.causer?.name ?? 'Sistem'}{' '}
                                    {activity.causer?.email ? `(${activity.causer.email})` : ''}
                                </p>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Keterangan Aktivitas
                                </span>
                                <p className="text-sm font-semibold text-foreground/90">
                                    {activity.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Metadata Tambahan (JSON)
                            </span>
                            <div className="max-h-[350px] overflow-y-auto rounded-xl border border-border bg-slate-950 p-4 dark:bg-slate-900">
                                {Object.keys(activity.properties || {}).length === 0 ? (
                                    <p className="text-xs font-mono text-slate-400 italic">
                                        Tidak ada metadata tambahan.
                                    </p>
                                ) : (
                                    <pre className="text-xs font-mono text-slate-200">
                                        {JSON.stringify(activity.properties, null, 2)}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ActivityLogShow.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Audit Log',
                href: activityLogs.index().url,
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
