import type { User } from './auth';
import type { Store } from './store';
import type { Voucher } from './voucher';

export interface VoucherRedemption {
    id: number;

    voucher_id: number;

    store_id: number;

    cashier_id: number;

    claimed_by: number | null;

    paid_by: number | null;

    redeemed_amount: string;

    claim_status: 'PENDING' | 'CLAIMED' | 'PAID';

    redeemed_at: string;

    claimed_at: string | null;

    paid_at: string | null;

    notes: string | null;

    created_at: string;

    updated_at: string;

    voucher?: Voucher | null;

    store?: Store | null;

    cashier?: User | null;

    claimedBy?: User | null;

    paidBy?: User | null;
}