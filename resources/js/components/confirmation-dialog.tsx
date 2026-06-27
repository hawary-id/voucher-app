import type { ReactNode } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

interface Props {
    title?: string;

    description?: string;

    confirmLabel?: string;

    cancelLabel?: string;

    confirmVariant?: 'default' | 'destructive';

    onConfirm: () => void;

    trigger?: ReactNode;
}

export default function ConfirmationDialog({
    title = 'Konfirmasi',
    description = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
    confirmLabel = 'Ya, Lanjutkan',
    cancelLabel = 'Batal',
    confirmVariant = 'default',
    onConfirm,
    trigger,
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger ?? <Button>Konfirmasi</Button>}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>

                    <AlertDialogAction
                        className={
                            confirmVariant === 'destructive'
                                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                : undefined
                        }
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
