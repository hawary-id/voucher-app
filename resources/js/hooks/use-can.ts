import { usePage } from '@inertiajs/react';

import { hasAllPermissions, hasAnyPermission, hasPermission } from '@/lib/can';

export function useCan() {
    const { props } = usePage();

    const permissions = (props.auth.permissions ?? []) as string[];

    return {
        permissions,

        can(permission: string) {
            return hasPermission(permissions, permission);
        },

        canAny(required: string[]) {
            return hasAnyPermission(permissions, required);
        },

        canAll(required: string[]) {
            return hasAllPermissions(permissions, required);
        },
    };
}
