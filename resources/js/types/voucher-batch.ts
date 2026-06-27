import type { Voucher } from './voucher';

export interface VoucherBatch {
    id: number;

    batch_no: string;

    title: string;

    description: string | null;

    period_start: string;
    period_end: string;

    nominal: string;

    total_employee: number;

    created_by: number | null;

    created_at: string;
    updated_at: string;

    vouchers?: Voucher[];
}
