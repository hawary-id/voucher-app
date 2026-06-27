import { Link } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { Role, Store } from '@/types';

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    store_id: string;
}

interface UserFormProps {
    data: UserFormData;
    errors: Record<string, string>;
    processing: boolean;
    roles: Role[];
    stores: Store[];
    submitLabel?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (key: keyof UserFormData, value: string) => void;
    cancelUrl?: string;
    isEdit?: boolean;
}

export default function UserForm({
    data,
    errors,
    processing,
    roles,
    stores,
    submitLabel = 'Simpan',
    onSubmit,
    setData,
    cancelUrl,
    isEdit = false,
}: UserFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Nama Pengguna</Label>
                    <Input
                        id="name"
                        placeholder="Masukkan nama lengkap pengguna"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Alamat Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Contoh: user@domain.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Role / Hak Akses</Label>
                    <select
                        id="role"
                        className="flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm transition-all focus:outline-none focus:border-primary/50 focus-visible:ring-primary/20"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                    >
                        <option value="">Pilih Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="store_id" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Toko / Penempatan</Label>
                    <select
                        id="store_id"
                        className="flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm transition-all focus:outline-none focus:border-primary/50 focus-visible:ring-primary/20"
                        value={data.store_id}
                        onChange={(e) => setData('store_id', e.target.value)}
                    >
                        <option value="">Semua Toko (Administrator)</option>
                        {stores.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.store_id} />
                </div>

                {!isEdit && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Minimal 8 karakter"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                Konfirmasi Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                placeholder="Ulangi password baru"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                className="h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                            />
                        </div>
                    </>
                )}
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
