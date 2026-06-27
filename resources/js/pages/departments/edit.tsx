import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactElement } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import departments from '@/routes/departments';
import type { Department } from '@/types';
import DepartmentForm from './components/department-form';

interface Props {
    department: Department;
}

export default function EditDepartment({ department }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        code: department.code,
        name: department.name,
        is_active: department.is_active,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang memperbarui data departemen...');

        put(departments.update(department.id).url, {
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
            <Head title={`Edit Departemen - ${department.name}`} />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground hover:bg-transparent p-0">
                            <Link href={departments.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Departemen</h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi kode, nama struktur, dan status operasional departemen aktif.
                        </p>
                    </div>
                </div>

                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <DepartmentForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        cancelUrl={departments.index().url}
                    />
                </div>
            </div>
        </>
    );
}

EditDepartment.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Departemen',
                href: departments.index().url,
            },
            {
                title: 'Edit Departemen',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);