import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactElement } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { toDateInputValue } from '@/lib/formatters';
import voucherBatches from '@/routes/voucher-batches';
import type { VoucherBatch } from '@/types';
import VoucherBatchForm from './components/voucher-batch-form';

interface Props {
    voucherBatch: VoucherBatch;
}

export default function EditVoucherBatch({ voucherBatch }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        batch_no: voucherBatch.batch_no,
        title: voucherBatch.title,
        description: voucherBatch.description ?? '',
        period_start: toDateInputValue(voucherBatch.period_start),
        period_end: toDateInputValue(voucherBatch.period_end),
        nominal: '',
        employee_ids: [] as number[],
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToastId = toast.loading('Sedang memperbarui voucher batch...');

        put(voucherBatches.update(voucherBatch.id).url, {
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
            <Head title={`Edit Voucher Batch - ${voucherBatch.title}`} />

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
                        <h1 className="text-3xl font-bold tracking-tight">Edit Voucher Batch</h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi judul, deskripsi, serta penyesuaian periode masa berlaku voucher batch.
                        </p>
                    </div>
                </div>

                <div className={`rounded-xl border bg-card text-card-foreground shadow-sm p-6 transition-opacity duration-200 ${processing ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}>
                    <VoucherBatchForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel={processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        cancelUrl={voucherBatches.index().url}
                        showNominal={false}
                        showEmployeeSelection={false}
                        showBatchNo={true}
                    />
                </div>
            </div>
        </>
    );
}

EditVoucherBatch.layout = (page: ReactElement) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Voucher Batches',
                href: voucherBatches.index().url,
            },
            {
                title: 'Edit Voucher Batch',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);