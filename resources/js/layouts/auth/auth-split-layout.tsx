import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { business } = usePage().props as any;
    const appName = business?.app_name || 'Voucher App';
    const appLogo = business?.app_logo;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium gap-2"
                >
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-white">
                        {appLogo ? (
                            <img src={appLogo} alt={appName} className="size-full object-contain p-1" />
                        ) : (
                            <AppLogoIcon className="size-6 fill-current text-black" />
                        )}
                    </div>
                    {appName}
                </Link>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground">
                            {appLogo ? (
                                <img src={appLogo} alt={appName} className="size-full object-contain p-1.5 bg-white" />
                            ) : (
                                <AppLogoIcon className="size-10 fill-current text-white dark:text-black" />
                            )}
                        </div>
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
