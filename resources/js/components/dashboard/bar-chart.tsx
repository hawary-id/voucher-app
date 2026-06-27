import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

interface Props {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
    variant?: 'primary' | 'blue' | 'violet' | 'emerald' | 'amber';
}

export default function DashboardBarChart({ labels, datasets, variant = 'primary' }: Props) {
    const data = labels.map((label, index) => ({
        name: label,
        value: datasets[0]?.data[index] ?? 0,
    }));

    const colorMap = {
        primary: {
            id: 'colorPrimary',
            start: 'hsl(var(--primary))',
            stop: 'hsl(var(--primary))',
        },
        blue: {
            id: 'colorBlue',
            start: 'rgb(59, 130, 246)',
            stop: 'rgb(59, 130, 246)',
        },
        violet: {
            id: 'colorViolet',
            start: 'rgb(139, 92, 246)',
            stop: 'rgb(139, 92, 246)',
        },
        emerald: {
            id: 'colorEmerald',
            start: 'rgb(16, 185, 129)',
            stop: 'rgb(16, 185, 129)',
        },
        amber: {
            id: 'colorAmber',
            start: 'rgb(245, 158, 11)',
            stop: 'rgb(245, 158, 11)',
        },
    };

    const currentConfig = colorMap[variant] || colorMap.primary;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id={currentConfig.id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentConfig.start} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={currentConfig.stop} stopOpacity={0.15} />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground) / 0.12)"
                />

                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />

                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.75rem',
                        boxShadow:
                            '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))', fontWeight: 500, fontSize: '0.75rem' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600, fontSize: '0.875rem' }}
                    cursor={false}
                />

                <Bar
                    dataKey="value"
                    fill={`url(#${currentConfig.id})`}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
