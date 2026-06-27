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

export function VoucherMonthlyChart({ chart }: Props) {
    const { can } = useCan();

    if (!can('voucher.view')) {
        return null;
    }

    return (
        <ChartCard title="Tren Penerbitan Voucher Bulanan">
            <DashboardBarChart {...chart} variant="blue" />
        </ChartCard>
    );
}
