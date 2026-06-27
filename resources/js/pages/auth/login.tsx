import { Form, Head } from '@inertiajs/react';
import { Loader2, ShieldAlert } from 'lucide-react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Masuk ke Sistem" />

            <PasskeyVerify />

            <Form
                action={store()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* Input Kolom Email */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="nama@perusahaan.com"
                                    className={
                                        errors.email
                                            ? 'border-destructive focus-visible:ring-destructive'
                                            : ''
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Input Kolom Password */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Password
                                    </Label>
                                    {/* {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-medium text-primary hover:underline"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )} */}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Masukkan password Anda"
                                    className={
                                        errors.password
                                            ? 'border-destructive focus-visible:ring-destructive'
                                            : ''
                                    }
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Fitur Remember Me */}
                            <div className="flex items-center space-x-2.5 px-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm font-normal text-muted-foreground select-none"
                                >
                                    Ingat akun saya di perangkat ini
                                </Label>
                            </div>

                            {/* Tombol Submit Utama */}
                            <Button
                                type="submit"
                                className="mt-2 h-11 w-full text-sm font-semibold shadow-sm"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Masuk ke Akun
                            </Button>
                        </div>

                        {/* Notice Box: Pengganti Register Link (Enterprise Standard Security) */}
                        <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3.5">
                            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <p className="text-xs leading-normal text-muted-foreground">
                                Pembuatan akun akses kasir toko atau manajemen
                                finansial dikelola terpusat oleh sistem
                                internal. Silakan hubungi tim **HRD / IT
                                Support** jika Anda belum memiliki kredensial.
                            </p>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Selamat Datang Kembali',
    description:
        'Masukkan email dan password terdaftar Anda untuk masuk ke sistem operasional voucher.',
};
