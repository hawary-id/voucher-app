import type { LucideIcon } from 'lucide-react';
import {
    Building2,
    FileBarChart2,
    HandCoins,
    History,
    Layers,
    LayoutGrid,
    QrCode,
    Search,
    Store,
    Ticket,
    UserRound,
    Users2,
} from 'lucide-react';

import { dashboard } from '@/routes';
import activityLogs from '@/routes/activity-logs';
import businessSetting from '@/routes/business-setting';
import departments from '@/routes/departments';
import employees from '@/routes/employees';
import stores from '@/routes/stores';
import users from '@/routes/users';
import voucherBatches from '@/routes/voucher-batches';
import voucherClaims from '@/routes/voucher-claims';
import voucherReports from '@/routes/voucher-reports';
import vouchers from '@/routes/vouchers';

export interface NavigationItem {
    title: string;
    href: string;
    icon: LucideIcon;
    permission: string;
}

export interface NavigationGroup {
    groupTitle: string;
    items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
    {
        groupTitle: 'Utama',
        items: [
            {
                title: 'Dashboard',
                href: dashboard().url,
                icon: LayoutGrid,
                permission: 'dashboard.view',
            },
            {
                title: 'Penukaran Voucher',
                href: vouchers.redeem().url,
                icon: QrCode,
                permission: 'voucher.redeem',
            },
            {
                title: 'Cek Status Voucher',
                href: vouchers.inquiry().url,
                icon: Search,
                permission: 'voucher.inquiry',
            },
        ],
    },
    {
        groupTitle: 'Manajemen Voucher',
        items: [
            {
                title: 'Voucher Batch',
                href: voucherBatches.index().url,
                icon: Ticket,
                permission: 'voucher_batch.view',
            },
            {
                title: 'Laporan Voucher',
                href: voucherReports.index().url,
                icon: FileBarChart2,
                permission: 'voucher_report.view',
            },
            {
                title: 'Klaim Voucher',
                href: voucherClaims.index().url,
                icon: HandCoins,
                permission: 'voucher_claim.view',
            },
        ],
    },
    {
        groupTitle: 'Data Master',
        items: [
            {
                title: 'Toko',
                href: stores.index().url,
                icon: Store,
                permission: 'store.view',
            },
            {
                title: 'Departemen',
                href: departments.index().url,
                icon: Layers,
                permission: 'department.view',
            },
            {
                title: 'Karyawan',
                href: employees.index().url,
                icon: Users2,
                permission: 'employee.view',
            },
            {
                title: 'Manajemen Pengguna',
                href: users.index().url,
                icon: UserRound,
                permission: 'user.view',
            },
        ],
    },
    {
        groupTitle: 'Sistem',
        items: [
            {
                title: 'Log Aktivitas',
                href: activityLogs.index().url,
                icon: History,
                permission: 'activity_log.view',
            },
            {
                title: 'Konfigurasi Bisnis',
                href: businessSetting.index().url,
                icon: Building2,
                permission: 'business_setting.manage',
            },
        ],
    },
];
