import type { User } from './user';

export interface ActivityLog {
    id: number;

    log_name: string;

    description: string;

    event: string | null;

    properties: Record<string, unknown>;

    created_at: string;

    causer?: User | null;

    subject_type?: string | null;

    subject_id?: number | null;
}
