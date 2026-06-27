import type { Department } from './department';

export interface Employee {
    id: number;
    nik: string;
    name: string;
    department_id: number | null;
    position: string | null;
    phone: string | null;
    terminated_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;

    department?: Department | null;
}
