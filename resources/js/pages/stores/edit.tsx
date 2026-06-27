import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactElement } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import stores from '@/routes/stores';
import type { Store } from '@/types';
import StoreForm from './components/store-form';

interface Props {
    store: Store;
}

export default function EditStore({ store }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        code: store.code,
        name: store.name,
        business_type: store.business_type,
        address: store.address ?? '',
        phone: store.phone ?? '',
        is_active: store.is_active,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang memperbarui data toko...');

        put(stores.update(store.id).url, {
            onFinish: () => {
                toast.dismiss(loadingToastId);
            },
            onError: () => {
                toast.error('Gagal memperbarui. Silakan periksa kembali isi form Anda.');
            }
        });
    };

    return (
        <>
            <Head title={`Edit Toko - ${store.name}`} />
            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground hover:bg-transparent p-0">
                            <Link href={stores.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Toko</h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi profil detail, lokasi, dan status operasional toko Anda.
                        </p>
                    </div>
                </div>

                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <StoreForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        cancelUrl={stores.index().url}
                    />
                </div>
            </div>
        </>
    );
}

EditStore.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Toko',
                href: stores.index().url,
            },
            {
                title: 'Edit Toko',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);