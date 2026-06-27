export function hasPermission(
    permissions: string[],
    permission: string,
): boolean {
    return permissions.includes(permission);
}

export function hasAnyPermission(
    permissions: string[],
    required: string[],
): boolean {
    return required.some((permission) => permissions.includes(permission));
}

export function hasAllPermissions(
    permissions: string[],
    required: string[],
): boolean {
    return required.every((permission) => permissions.includes(permission));
}
