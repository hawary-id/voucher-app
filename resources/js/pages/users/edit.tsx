import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactElement } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';

import type { Role, Store } from '@/types';
import type { User } from '@/types/user';
import UserForm from './components/user-form';

interface Props {
    user: User;
    roles: Role[];
    stores: Store[];
}

export default function EditUser({ user, roles, stores }: Props) {
    const role = user.roles?.[0]?.name ?? '';

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role,
        store_id: user.store_id?.toString() ?? '',
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToast = toast.loading(
            'Sedang memperbarui data pengguna...',
        );

        put(users.update(user.id).url, {
            onFinish: () => {
                toast.dismiss(loadingToast);
            },

            onError: () => {
                toast.error('Gagal memperbarui data pengguna.');
            },
        });
    };

    return (
        <>
            <Head title={`Edit Pengguna - ${user.name}`} />

            <div className="container mx-auto max-w-3xl space-y-6 p-6">
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="-ml-2 text-muted-foreground hover:bg-transparent p-0"
                        >
                            <Link href={users.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke daftar
                            </Link>
                        </Button>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit Pengguna
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi akun, role, dan penempatan store
                            pengguna.
                        </p>
                    </div>
                </div>

                <div
                    className={`rounded-xl border bg-card p-6 shadow-sm transition-opacity duration-200 ${
                        processing
                            ? 'pointer-events-none opacity-70'
                            : 'opacity-100'
                    }`}
                >
                    <UserForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        roles={roles}
                        stores={stores}
                        onSubmit={submit}
                        submitLabel={
                            processing ? 'Menyimpan...' : 'Simpan Perubahan'
                        }
                        cancelUrl={users.index().url}
                        isEdit={true}
                    />
                </div>
            </div>
        </>
    );
}

EditUser.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Pengguna',
                href: users.index().url,
            },
            {
                title: 'Edit Pengguna',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);
