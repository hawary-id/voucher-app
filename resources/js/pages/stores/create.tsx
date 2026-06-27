import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import AppLayout from '@/layouts/app-layout';
import stores from '@/routes/stores';
import type { BreadcrumbItem } from '@/types';
import StoreForm from './components/store-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Toko',
        href: stores.index().url,
    },
    {
        title: 'Tambah Toko',
        href: '#',
    },
];

export default function CreateStore() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        business_type: '',
        address: '',
        phone: '',
        is_active: true,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const loadingToastId = toast.loading('Sedang menyimpan data ke server...');

        post(stores.store().url, {
            onFinish: () => {
                toast.dismiss(loadingToastId);
            },
            onError: () => {
                toast.error('Gagal menyimpan. Silakan periksa kembali form Anda.');
            }
        });
    };

    return (
        <>
            <Head title="Tambah Toko Baru" />
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
                        <h1 className="text-3xl font-bold tracking-tight">Buat Toko Baru</h1>
                        <p className="text-sm text-muted-foreground">
                            Registrasi lokasi toko baru dan konfigurasikan metadata defaultnya.
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
                        submitLabel={processing ? 'Sedang menyimpan...' : 'Buat Toko'}
                        cancelUrl={stores.index().url}
                    />
                </div>
            </div>
        </>
    );
}

CreateStore.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);