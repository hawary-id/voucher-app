import { Link } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Department } from '@/types';

export interface EmployeeFormData {
    nik: string;
    name: string;
    department_id: string;
    position: string;
    phone: string;
    is_active: boolean;
}

interface EmployeeFormProps {
    data: EmployeeFormData;
    errors: Record<string, string>;
    processing: boolean;
    departments: Department[];
    submitLabel?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (
        key: keyof EmployeeFormData,
        value: string | number | boolean,
    ) => void;
    cancelUrl?: string;
}

export default function EmployeeForm({
    data,
    errors,
    processing,
    departments,
    submitLabel = 'Simpan',
    onSubmit,
    setData,
    cancelUrl,
}: EmployeeFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="nik" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">NIK</Label>
                    <Input
                        id="nik"
                        placeholder="Contoh: 202601001"
                        value={data.nik}
                        onChange={(e) => setData('nik', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.nik ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.nik} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nama Lengkap</Label>
                    <Input
                        id="name"
                        placeholder="Masukkan nama lengkap karyawan"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="department_id" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Departemen</Label>
                    <select
                        className="flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm transition-all focus:outline-none focus:border-primary/50 focus-visible:ring-primary/20"
                        value={data.department_id}
                        onChange={(e) =>
                            setData('department_id', e.target.value)
                        }
                    >
                        <option value="">Pilih Departemen</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.department_id} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Jabatan</Label>
                    <Input
                        id="position"
                        placeholder="Contoh: Staff IT, Supervisor HR"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.position ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.position} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nomor Telepon</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Contoh: 08XXXXXXXXXX"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.phone} />
                </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 shadow-sm bg-card transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] duration-300">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) =>
                        setData('is_active', Boolean(checked))
                    }
                />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="is_active" className="text-sm font-semibold cursor-pointer">
                        Status Aktif
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Karyawan yang aktif akan muncul di dalam daftar penerima voucher dan distribusi batch.
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
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
