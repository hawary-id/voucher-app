import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';

import type { BreadcrumbItem, Role, Store } from '@/types';
import UserForm from './components/user-form';

interface Props {
    roles: Role[];
    stores: Store[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: users.index().url,
    },
    {
        title: 'Tambah Pengguna',
        href: '#',
    },
];

export default function CreateUser({ roles, stores }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        store_id: '',
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToast = toast.loading('Sedang menyimpan data pengguna...');

        post(users.store().url, {
            onFinish: () => {
                toast.dismiss(loadingToast);
            },

            onError: () => {
                toast.error('Gagal menyimpan data pengguna.');
            },
        });
    };

    return (
        <>
            <Head title="Tambah Pengguna" />

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
                            Tambah Pengguna
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Tambahkan akun pengguna baru beserta role dan hak
                            aksesnya.
                        </p>
                    </div>
                </div>

                <div
                    className={`rounded-xl border bg-card p-6 shadow-sm transition-opacity ${
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
                            processing ? 'Menyimpan...' : 'Tambah Pengguna'
                        }
                        cancelUrl={users.index().url}
                    />
                </div>
            </div>
        </>
    );
}

CreateUser.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
