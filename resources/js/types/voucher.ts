import type { Employee } from './employee';
import type { VoucherRedemption } from './voucher-redemption';

export interface Voucher {
    id: number;

    voucher_batch_id: number;
    employee_id: number;

    code: string;

    nominal: string;

    status: 'ACTIVE' | 'USED' | 'EXPIRED' | 'VOID';

    issued_at: string;
    expired_at: string;
    used_at: string | null;

    created_at: string;
    updated_at: string;

    employee?: Employee | null;

    redemption?: VoucherRedemption | null;
}
