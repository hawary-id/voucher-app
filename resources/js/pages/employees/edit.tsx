import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactElement } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import employees from '@/routes/employees';
import type { Department, Employee } from '@/types';
import EmployeeForm from './components/employee-form';

interface Props {
    employee: Employee;
    departments: Department[];
}

export default function EditEmployee({ employee, departments }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nik: employee.nik,
        name: employee.name,
        department_id: employee.department_id?.toString() ?? '',
        position: employee.position ?? '',
        phone: employee.phone ?? '',
        terminated_at: employee.terminated_at ?? '',
        is_active: employee.is_active,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang memperbarui data karyawan...');

        put(employees.update(employee.id).url, {
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
            <Head title={`Edit Karyawan - ${employee.name}`} />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground hover:bg-transparent p-0">
                            <Link href={employees.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Karyawan</h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui rincian berkas kerja, penempatan struktural, jabatan, atau riwayat kontrak karyawan.
                        </p>
                    </div>
                </div>

                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <EmployeeForm
                        data={data}
                        setData={setData}
                        departments={departments}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        cancelUrl={employees.index().url}
                    />
                </div>
            </div>
        </>
    );
}

EditEmployee.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Karyawan',
                href: employees.index().url,
            },
            {
                title: 'Edit Karyawan',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);