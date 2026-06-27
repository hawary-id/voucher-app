import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import employees from '@/routes/employees';
import type { BreadcrumbItem, Department } from '@/types';
import EmployeeForm from './components/employee-form';

interface Props {
    departments: Department[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Karyawan',
        href: employees.index().url,
    },
    {
        title: 'Tambah Karyawan',
        href: '#',
    },
];

export default function CreateEmployee({ departments }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        name: '',
        department_id: '',
        position: '',
        phone: '',
        is_active: true,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang menyimpan data karyawan...');

        post(employees.store().url, {
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
            <Head title="Tambah Karyawan Baru" />

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
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Karyawan</h1>
                        <p className="text-sm text-muted-foreground">
                            Daftarkan identitas karyawan baru, penempatan departemen, serta detail jabatan.
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
                        submitLabel={processing ? 'Menyimpan...' : 'Tambah Karyawan'}
                        cancelUrl={employees.index().url}
                    />
                </div>
            </div>
        </>
    );
}

CreateEmployee.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);