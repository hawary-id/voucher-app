import type { Role } from './role';
import type { Store } from './store';

export interface User {
    id: number;

    store_id: number | null;

    name: string;

    email: string;

    is_active: boolean;

    store?: Store | null;

    roles: Role[];

    created_at?: string;

    updated_at?: string;
}
