import { Head, router } from '@inertiajs/react';
import type { ReactElement } from 'react';
import {
    Building2,
    ImagePlus,
    Save,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/business-setting';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Konfigurasi Bisnis', href: index().url },
];

interface BusinessSettings {
    app_name: string;
    app_logo: string | null;
    business_name: string;
    business_tagline: string;
    business_phone: string;
    business_email: string;
    business_address: string;
    business_city: string;
}

interface Props {
    settings: BusinessSettings;
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-xs text-destructive mt-1">{message}</p>;
}

export default function BusinessSettingPage({ settings }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<BusinessSettings>(settings);
    const [logoPreview, setLogoPreview] = useState<string | null>(
        settings.app_logo ? `/storage/${settings.app_logo}` : null,
    );
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof BusinessSettings, string>>>({});

    const handleChange = (key: keyof BusinessSettings, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, app_logo: undefined }));
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
        setForm((prev) => ({ ...prev, app_logo: null }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'app_logo') return; // ditangani terpisah sebagai file
            if (value !== null && value !== undefined) {
                data.append(key, String(value));
            }
        });
        if (logoFile) {
            data.append('app_logo', logoFile);
        }

        router.post(update().url, data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setProcessing(false),
            onError: (errs) => {
                setErrors(errs as typeof errors);
                setProcessing(false);
            },
        });
    };

    return (
        <>
            <Head title="Konfigurasi Bisnis" />

            <div className="container mx-auto space-y-6 p-6 max-w-4xl">

                {/* Page Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Konfigurasi Bisnis</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola identitas dan informasi bisnis yang tampil di seluruh aplikasi.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ── Card 1: Identitas Aplikasi ── */}
                    <Card className="overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2 px-6 py-4 border-b bg-muted/40">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Identitas Aplikasi
                            </h2>
                        </div>

                        <CardContent className="p-6 space-y-6">
                            {/* Logo Upload Row */}
                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                                {/* Preview Box */}
                                <div className="flex-shrink-0">
                                    <div
                                        className="relative h-24 w-24 rounded-xl border-2 border-dashed border-border bg-muted/40 flex items-center justify-center overflow-hidden group cursor-pointer transition-colors hover:border-primary/60 hover:bg-muted/60"
                                        onClick={() => fileInputRef.current?.click()}
                                        title="Klik untuk mengganti logo"
                                    >
                                        {logoPreview ? (
                                            <>
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo"
                                                    className="h-full w-full object-contain p-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeLogo(); }}
                                                    className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                    title="Hapus logo"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
                                                <ImagePlus className="h-7 w-7" />
                                                <span className="text-[10px] font-medium">Logo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload Info */}
                                <div className="flex-1 space-y-2 pt-1">
                                    <p className="text-sm font-medium">Logo Aplikasi</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Format JPG, PNG, WEBP, atau SVG. Ukuran maksimal 2 MB.<br />
                                        Disarankan rasio 1:1 untuk tampilan terbaik.
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="gap-1.5 h-8 text-xs"
                                        >
                                            <ImagePlus className="h-3.5 w-3.5" />
                                            {logoPreview ? 'Ganti Logo' : 'Unggah Logo'}
                                        </Button>
                                        {logoPreview && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={removeLogo}
                                                className="gap-1.5 h-8 text-xs text-destructive hover:text-destructive"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                                Hapus
                                            </Button>
                                        )}
                                    </div>
                                    <FieldError message={errors.app_logo} />
                                </div>
                            </div>

                            <Separator />

                            {/* Nama Aplikasi */}
                            <div className="grid gap-1.5 max-w-lg">
                                <Label htmlFor="app_name">
                                    Nama Aplikasi <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="app_name"
                                    value={form.app_name}
                                    onChange={(e) => handleChange('app_name', e.target.value)}
                                    placeholder="Contoh: VoucherPro"
                                    required
                                />
                                <FieldError message={errors.app_name} />
                                <p className="text-xs text-muted-foreground">
                                    Tampil di tab browser, halaman login, dan header aplikasi.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Card 2: Informasi Bisnis ── */}
                    <Card className="overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2 px-6 py-4 border-b bg-muted/40">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Informasi Bisnis
                            </h2>
                        </div>

                        <CardContent className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="business_name">Nama Bisnis / Perusahaan</Label>
                                    <Input
                                        id="business_name"
                                        value={form.business_name}
                                        onChange={(e) => handleChange('business_name', e.target.value)}
                                        placeholder="Contoh: PT. Maju Bersama"
                                    />
                                    <FieldError message={errors.business_name} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="business_tagline">Tagline / Slogan</Label>
                                    <Input
                                        id="business_tagline"
                                        value={form.business_tagline}
                                        onChange={(e) => handleChange('business_tagline', e.target.value)}
                                        placeholder="Contoh: Belanja Lebih Hemat"
                                    />
                                    <FieldError message={errors.business_tagline} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="business_phone">Nomor Telepon</Label>
                                    <Input
                                        id="business_phone"
                                        type="tel"
                                        value={form.business_phone}
                                        onChange={(e) => handleChange('business_phone', e.target.value)}
                                        placeholder="Contoh: +62 21 1234 5678"
                                    />
                                    <FieldError message={errors.business_phone} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="business_email">Email Bisnis</Label>
                                    <Input
                                        id="business_email"
                                        type="email"
                                        value={form.business_email}
                                        onChange={(e) => handleChange('business_email', e.target.value)}
                                        placeholder="Contoh: info@perusahaan.com"
                                    />
                                    <FieldError message={errors.business_email} />
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="grid gap-1.5 md:col-span-2">
                                    <Label htmlFor="business_address">Alamat Lengkap</Label>
                                    <Textarea
                                        id="business_address"
                                        value={form.business_address}
                                        onChange={(e) => handleChange('business_address', e.target.value)}
                                        placeholder="Contoh: Jl. Sudirman No. 123, Blok A"
                                        rows={3}
                                        className="resize-none"
                                    />
                                    <FieldError message={errors.business_address} />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="business_city">Kota</Label>
                                    <Input
                                        id="business_city"
                                        value={form.business_city}
                                        onChange={(e) => handleChange('business_city', e.target.value)}
                                        placeholder="Contoh: Jakarta Selatan"
                                    />
                                    <FieldError message={errors.business_city} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Footer Aksi ── */}
                    <div className="flex items-center justify-between rounded-xl border bg-card px-5 py-3.5 shadow-sm">
                        <p className="text-xs text-muted-foreground">
                            Perubahan berlaku langsung setelah disimpan.
                        </p>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="gap-2 min-w-[140px]"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

BusinessSettingPage.layout = (page: ReactElement) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
