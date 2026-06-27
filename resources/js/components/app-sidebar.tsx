import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { navigationGroups } from '@/config/navigation';
import { dashboard } from '@/routes';

export function AppSidebar() {
    const { url, props } = usePage();

    const permissions = (props.auth?.permissions ?? []) as string[];

    const visibleGroups = navigationGroups
        .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                permissions.includes(item.permission),
            ),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {visibleGroups.map((group) => (
                    <SidebarGroup key={group.groupTitle}>
                        <SidebarGroupLabel className="px-3 text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
                            {group.groupTitle}
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon;

                                    const currentPath = url.split('?')[0];

                                    const normalizedHref = item.href
                                        .replace(/^(https?:\/\/[^/]+)?/, '')
                                        .replace(/^\/|\/$/g, '');

                                    const normalizedCurrent =
                                        currentPath.replace(/^\/|\/$/g, '');

                                    const isActive =
                                        normalizedCurrent === normalizedHref ||
                                        (normalizedHref !== '' &&
                                            normalizedCurrent.startsWith(
                                                normalizedHref + '/',
                                            ));

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                className="transition-all duration-200"
                                            >
                                                <Link href={item.href} prefetch>
                                                    <Icon
                                                        className={`size-4 ${
                                                            isActive
                                                                ? 'text-primary'
                                                                : 'text-muted-foreground/80'
                                                        }`}
                                                    />

                                                    <span className="text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
