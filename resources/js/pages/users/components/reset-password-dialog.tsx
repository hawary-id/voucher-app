import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import users from '@/routes/users';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: number;
    userName: string;
}

export default function ResetPasswordDialog({
    open,
    onOpenChange,
    userId,
    userName,
}: Props) {
    const { data, setData, put, processing, reset, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loading = toast.loading('Mereset password...');

        put(users.resetPassword(userId).url, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Password berhasil direset.');

                reset();

                onOpenChange(false);
            },

            onError: () => {
                toast.error('Gagal mereset password.');
            },

            onFinish: () => toast.dismiss(loading),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <form onSubmit={submit} className="space-y-5">
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>

                        <DialogDescription>
                            Masukkan password baru untuk{' '}
                            <strong>{userName}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Password Baru</Label>
                        <Input
                            type="password"
                            placeholder="Minimal 8 karakter"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Konfirmasi Password</Label>
                        <Input
                            type="password"
                            placeholder="Ulangi password baru"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                        />
                    </div>

                    <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-border/60 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="transition-all hover:bg-muted/30"
                        >
                            Batal
                        </Button>

                        <Button type="submit" disabled={processing} className="font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
                            Reset Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
