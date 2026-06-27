import { format } from 'date-fns';

export function toDateInputValue(value: string | null | undefined): string {
    if (!value) {
        return '';
    }

    return value.split('T')[0];
}

export function formatDate(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    return format(new Date(value), 'dd MMM yyyy');
}

export function formatCurrency(value: string | number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number(value));
}

export function formatDateTime(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    return format(new Date(value), 'dd MMM yyyy HH:mm');
}
