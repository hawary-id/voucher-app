import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogoutConfirm = () => {
        cleanup();
        router.flushAll();
        router.post(logout());
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onSelect={(e) => {
                    e.preventDefault();
                    setShowLogoutDialog(true);
                }}
                data-test="logout-button"
            >
                <LogOut className="mr-2" />
                Keluar
            </DropdownMenuItem>

            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin keluar dari aplikasi? Sesi Anda akan diakhiri dan Anda perlu masuk kembali untuk melanjutkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogoutConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Ya, Keluar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
