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

export function ClaimByStoreChart({ chart }: Props) {
    const { can } = useCan();

    if (!can('voucher_claim.view')) {
        return null;
    }

    return (
        <ChartCard title="Akumulasi Klaim Berdasarkan Toko">
            <DashboardBarChart {...chart} variant="emerald" />
        </ChartCard>
    );
}
