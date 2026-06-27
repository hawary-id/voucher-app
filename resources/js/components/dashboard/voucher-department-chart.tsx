import { ChartCard } from '@/components/dashboard/chart-card';
import { useCan } from '@/hooks/use-can';
import DashboardBarChart from './bar-chart';

interface Props {
    chart: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        }[];
    };
}

export function VoucherDepartmentChart({ chart }: Props) {
    const { can } = useCan();

    if (!can('department.view')) {
        return null;
    }

    return (
        <ChartCard title="Distribusi Voucher per Departemen">
            <DashboardBarChart {...chart} variant="amber" />
        </ChartCard>
    );
}
