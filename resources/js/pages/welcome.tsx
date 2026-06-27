import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    FileBarChart2,
    HandCoins,
    LayoutGrid,
    LogIn,
    QrCode,
    ShieldCheck,
    Ticket,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth, business } = usePage().props as any;
    const appName = business?.app_name || 'Voucher App';
    const businessName = business?.business_name || 'Perusahaan Kami';
    const businessTagline = business?.business_tagline || 'Solusi penukaran dan manajemen voucher belanja terintegrasi';

    const features = [
        {
            icon: QrCode,
            title: 'Penukaran Kasir',
            description: 'Validasi instan dan penukaran kode voucher di kasir toko rekanan secara aman dan real-time.',
        },
        {
            icon: Ticket,
            title: 'Manajemen Batch',
            description: 'Pembuatan batch voucher terstruktur untuk berbagai departemen dengan masa berlaku terkontrol.',
        },
        {
            icon: HandCoins,
            title: 'Klaim & Pembayaran',
            description: 'Aksi massal (bulk actions) untuk proses klaim dan pembayaran voucher ke toko rekanan secara transparan.',
        },
        {
            icon: FileBarChart2,
            title: 'Laporan Real-Time',
            description: 'Analisis akumulasi penggunaan voucher berdasarkan toko, periode, dan departemen secara instan.',
        },
    ];

    return (
        <>
            <Head title={`Sistem Voucher - ${appName}`} />
            
            <div className="min-h-screen bg-neutral-50/50 dark:bg-[#070708] flex flex-col font-sans transition-colors duration-300">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <AppLogo />
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Button asChild variant="default" className="gap-2 shadow-sm font-semibold hover:-translate-y-0.5 transition-all duration-300">
                                    <Link href={dashboard()}>
                                        <LayoutGrid className="h-4 w-4" />
                                        Masuk Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <Button asChild variant="default" className="gap-2 shadow-sm font-semibold hover:-translate-y-0.5 transition-all duration-300">
                                    <Link href={login()}>
                                        <LogIn className="h-4 w-4" />
                                        Masuk Aplikasi
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col justify-center">
                    <div className="relative overflow-hidden py-20 sm:py-32">
                        {/* Background Gradients */}
                        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/5 opacity-30 dark:opacity-20" />
                        </div>

                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Portal Transaksi Aman & Terverifikasi
                            </div>

                            <div className="space-y-4 max-w-3xl mx-auto">
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                                    Sistem Voucher <span className="text-primary font-black">{appName}</span>
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
                                    {businessTagline} di bawah naungan <span className="font-semibold text-foreground">{businessName}</span>.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {auth.user ? (
                                    <Button asChild size="lg" className="h-12 px-6 gap-2 text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                        <Link href={dashboard()}>
                                            Buka Dashboard <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild size="lg" className="h-12 px-6 gap-2 text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                        <Link href={login()}>
                                            Masuk ke Aplikasi <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* Features Grid */}
                            <div className="pt-16 sm:pt-24">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {features.map((feature, idx) => {
                                        const Icon = feature.icon;
                                        return (
                                            <Card key={idx} className="border bg-card/60 backdrop-blur-sm text-left hover:shadow-md hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1">
                                                <CardContent className="p-6 space-y-4">
                                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <h3 className="text-sm font-semibold tracking-tight text-foreground">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-border/40 py-6 bg-background/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>&copy; {new Date().getFullYear()} {businessName}. Hak Cipta Dilindungi.</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>Powered by</span>
                            <span className="font-semibold text-foreground">{appName}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
