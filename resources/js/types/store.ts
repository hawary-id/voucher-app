export interface Store {
    id: number;
    code: string;
    name: string;
    business_type: 'SUPERMARKET' | 'CAFE';
    address: string | null;
    phone: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
