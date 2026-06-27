import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import voucherBatches from '@/routes/voucher-batches';
import type { BreadcrumbItem, Employee } from '@/types';
import VoucherBatchForm from './components/voucher-batch-form';

interface Props {
    employees: Employee[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Voucher Batches',
        href: voucherBatches.index().url,
    },
    {
        title: 'Create Voucher Batch',
        href: voucherBatches.create().url,
    },
];

export default function CreateVoucherBatch({ employees }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        period_start: '',
        period_end: '',
        nominal: '',
        employee_ids: [] as number[],
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang memproses dan menerbitkan voucher batch...');

        post(voucherBatches.store().url, {
            onFinish: () => {
                toast.dismiss(loadingToastId);
            },
            onError: () => {
                toast.error('Gagal memproses. Silakan periksa kembali konfigurasi form Anda.');
            }
        });
    };

    return (
        <>
            <Head title="Buat Voucher Batch Baru" />

            <div className="container mx-auto space-y-6 p-6 max-w-3xl">
                
                <div className="flex flex-col gap-2 border-b pb-5">
                    <div className="mb-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
                            <Link href={voucherBatches.index().url}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke daftar
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Buat Voucher Batch</h1>
                        <p className="text-sm text-muted-foreground">
                            Terbitkan batch kupon/voucher baru, tentukan nilai nominal alokasi dana, serta distribusikan secara kolektif ke karyawan.
                        </p>
                    </div>
                </div>

                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <VoucherBatchForm
                        data={data}
                        employees={employees}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Memproses...' : 'Generate Voucher'}
                        cancelUrl={voucherBatches.index().url}
                        showNominal
                        showEmployeeSelection
                    />
                </div>
            </div>
        </>
    );
}

CreateVoucherBatch.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);