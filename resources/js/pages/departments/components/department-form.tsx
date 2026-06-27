import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DepartmentFormData {
    code: string;
    name: string;
    is_active: boolean;
}

interface DepartmentFormProps {
    data: DepartmentFormData;
    errors: Record<string, string>;
    processing: boolean;
    submitLabel?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (key: keyof DepartmentFormData, value: string | boolean) => void;
    cancelUrl?: string;
}

export default function DepartmentForm({
    data,
    errors,
    processing,
    submitLabel = 'Simpan',
    onSubmit,
    setData,
    cancelUrl,
}: DepartmentFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="code" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Kode Departemen</Label>
                    <Input
                        id="code"
                        placeholder="Contoh: HRD, IT, FIN"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.code ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.code} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nama Departemen</Label>
                    <Input
                        id="name"
                        placeholder="Masukkan nama departemen"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.name} />
                </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 shadow-sm bg-card transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] duration-300">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="is_active" className="text-sm font-semibold cursor-pointer">
                        Status Aktif
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Departemen yang aktif dapat segera ditautkan ke data karyawan dan sistem struktural.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-5 border-border/60">
                {cancelUrl && (
                    <Button type="button" variant="outline" asChild disabled={processing} className="px-5 transition-all hover:bg-muted/30">
                        <Link href={cancelUrl}>Batal</Link>
                    </Button>
                )}

                <Button type="submit" disabled={processing} className="px-5 min-w-[120px] font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}