import { usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { business } = usePage().props as any;
    const appName = business?.app_name || 'Voucher App';
    const appLogo = business?.app_logo;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {appLogo ? (
                    <img
                        src={appLogo}
                        alt={appName}
                        className="size-full bg-white object-contain p-1"
                    />
                ) : (
                    <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {appName}
                </span>
            </div>
        </>
    );
}
