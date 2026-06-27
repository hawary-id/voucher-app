import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
    return (
        <Card className="overflow-hidden border shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] duration-300">
            <CardHeader className="border-b bg-muted/10 py-4">
                <CardTitle className="text-sm font-bold tracking-tight text-foreground/90 uppercase">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">{children}</CardContent>
        </Card>
    );
}
