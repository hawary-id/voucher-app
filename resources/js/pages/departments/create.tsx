import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import departments from '@/routes/departments';
import type { BreadcrumbItem } from '@/types';
import DepartmentForm from './components/department-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departemen',
        href: departments.index().url,
    },
    {
        title: 'Tambah Departemen',
        href: '#',
    },
];

export default function CreateDepartment() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        is_active: true,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang menyimpan data departemen...');

        post(departments.store().url, {
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
            <Head title="Tambah Departemen Baru" />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                
                {/* Header Section */}
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground hover:bg-transparent p-0">
                            <Link href={departments.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Departemen</h1>
                        <p className="text-sm text-muted-foreground">
                            Daftarkan departemen kerja baru untuk pemetaan operasional internal perusahaan.
                        </p>
                    </div>
                </div>

                {/* Form Card Wrapper */}
                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <DepartmentForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Menyimpan...' : 'Tambah Departemen'}
                        cancelUrl={departments.index().url}
                    />
                </div>
            </div>
        </>
    );
}

CreateDepartment.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);