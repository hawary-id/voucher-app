import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface StoreFormData {
    code: string;
    name: string;
    business_type: string;
    address: string;
    phone: string;
    is_active: boolean;
}

interface StoreFormProps {
    data: StoreFormData;
    errors: Record<string, string>;
    processing: boolean;
    submitLabel?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (key: keyof StoreFormData, value: string | boolean) => void;
    cancelUrl?: string;
}

export default function StoreForm({
    data,
    errors,
    processing,
    submitLabel = 'Simpan',
    onSubmit,
    setData,
    cancelUrl,
}: StoreFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label
                        htmlFor="code"
                        className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        Kode Toko
                    </Label>
                    <Input
                        id="code"
                        placeholder="Contoh: TKO-001"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.code ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.code} />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="name"
                        className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        Nama Toko
                    </Label>
                    <Input
                        id="name"
                        placeholder="Masukkan nama lengkap toko"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.name} />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        Tipe Bisnis
                    </Label>
                    <Select
                        value={data.business_type}
                        onValueChange={(value) =>
                            setData('business_type', value)
                        }
                    >
                        <SelectTrigger
                            className={`h-11 transition-all focus:ring-primary/20 ${errors.business_type ? 'border-destructive focus:ring-destructive' : 'w-full'}`}
                        >
                            <SelectValue placeholder="Pilih tipe bisnis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SUPERMARKET">Supermarket</SelectItem>
                            <SelectItem value="MINIMARKET">Minimarket</SelectItem>
                            <SelectItem value="CAFE">Cafe</SelectItem>
                            <SelectItem value="RESTAURANT">Restoran</SelectItem>
                            <SelectItem value="BAKERY">Toko Roti / Bakery</SelectItem>
                            <SelectItem value="PHARMACY">Apotek</SelectItem>
                            <SelectItem value="OTHER">Lainnya</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.business_type} />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="phone"
                        className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        Nomor Telepon
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Contoh: 021XXXXXXXX"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.phone} />
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="address"
                    className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Alamat Lengkap
                </Label>
                <Textarea
                    id="address"
                    placeholder="Masukkan alamat operasional toko..."
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    className={`min-h-[100px] resize-none transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.address ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <InputError message={errors.address} />
            </div>

            <div className="flex items-center space-x-3 rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)]">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) =>
                        setData('is_active', Boolean(checked))
                    }
                />
                <div className="grid gap-1.5 leading-none">
                    <Label
                        htmlFor="is_active"
                        className="cursor-pointer text-sm font-semibold"
                    >
                        Status Aktif
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Toko yang aktif akan langsung muncul di dalam sistem
                        operasional dan kasir.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-5">
                {cancelUrl && (
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                        disabled={processing}
                        className="px-5 transition-all hover:bg-muted/30"
                    >
                        <Link href={cancelUrl}>Batal</Link>
                    </Button>
                )}

                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-[120px] px-5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                    {processing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
