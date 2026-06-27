import { Head } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { ClaimByStoreChart } from '@/components/dashboard/claim-by-store-chart';
import { LatestClaimTable } from '@/components/dashboard/latest-claim-table';
import { LatestVoucherTable } from '@/components/dashboard/latest-voucher-table';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RedeemMonthlyChart } from '@/components/dashboard/redeem-monthly-chart';
import { SummaryCards } from '@/components/dashboard/summary-card';
import { VoucherDepartmentChart } from '@/components/dashboard/voucher-department-chart';
import { VoucherMonthlyChart } from '@/components/dashboard/voucher-mobthly-chart';
import { useCan } from '@/hooks/use-can';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

import type { Voucher, VoucherRedemption } from '@/types';

interface Props {
    dashboardType: 'management' | 'store';
    summary: {
        // Management dashboard keys
        total_vouchers?: number;
        active_vouchers?: number;
        used_vouchers?: number;
        expired_vouchers?: number;

        // Store dashboard keys
        total_voucher_redeem?: number;
        total_nominal_redeem?: number;
        claimed_vouchers?: number;
        paid_vouchers?: number;

        // Shared keys
        total_claim_amount: number;
        paid_claim_amount: number;
    };
    latestVouchers: Voucher[];
    latestClaims: VoucherRedemption[];
    voucherMonthlyChart: {
        labels: string[];
        datasets: { label: string; data: number[] }[];
    };
    redeemMonthlyChart: {
        labels: string[];
        datasets: { label: string; data: number[] }[];
    };
    claimByStoreChart: {
        labels: string[];
        datasets: { label: string; data: number[] }[];
    };
    voucherByDepartmentChart: {
        labels: string[];
        datasets: { label: string; data: number[] }[];
    };
}

export default function Dashboard({
    dashboardType,
    summary,
    latestVouchers,
    latestClaims,
    voucherMonthlyChart,
    redeemMonthlyChart,
    claimByStoreChart,
    voucherByDepartmentChart,
}: Props) {
    const { can, canAny } = useCan();

    const canViewVoucherTable = dashboardType !== 'store' && can('voucher.view');
    const canViewClaimTable = dashboardType === 'store' || can('voucher_claim.view');

    const canViewCharts = canAny([
        'voucher.view',
        'voucher.redeem',
        'voucher_claim.view',
        'department.view',
    ]);

    return (
        <>
            <Head title="Panel Utama Dashboard" />

            <div className="container mx-auto max-w-7xl space-y-8 p-6">
                <div className="flex flex-col gap-1 border-b pb-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard Overview
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Ringkasan eksekutif distribusi aktivitas kupon,
                        pengawasan klaim keuangan, dan matriks performa toko.
                    </p>
                </div>

                <QuickActions />

                <SummaryCards summary={summary} dashboardType={dashboardType} />

                {(canViewVoucherTable || canViewClaimTable) && (
                    <div
                        className={`grid gap-6 ${
                            canViewVoucherTable && canViewClaimTable
                                ? 'lg:grid-cols-2'
                                : 'lg:grid-cols-1'
                        }`}
                    >
                        {canViewVoucherTable && (
                            <LatestVoucherTable latestVouchers={latestVouchers} />
                        )}

                        {canViewClaimTable && (
                            <LatestClaimTable
                                latestClaims={latestClaims}
                                dashboardType={dashboardType}
                            />
                        )}
                    </div>
                )}

                {canViewCharts && (
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                            Grafik & Analisis Tren Performa
                        </h2>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <VoucherMonthlyChart chart={voucherMonthlyChart} />

                            <RedeemMonthlyChart chart={redeemMonthlyChart} />

                            <ClaimByStoreChart chart={claimByStoreChart} />

                            <VoucherDepartmentChart
                                chart={voucherByDepartmentChart}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Dashboard Panel',
                href: dashboard().url,
            },
        ]}
    >
        {page}
    </AppLayout>
);
