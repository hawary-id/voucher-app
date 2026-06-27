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

export function RedeemMonthlyChart({ chart }: Props) {
    const { can } = useCan();

    if (!can('voucher.redeem')) {
        return null;
    }

    return (
        <ChartCard title="Tren Penukaran (Redeem) Kasir">
            <DashboardBarChart {...chart} variant="violet" />
        </ChartCard>
    );
}
