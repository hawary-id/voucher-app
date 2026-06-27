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
    onConfirm: () => void;
    trigger?: ReactNode;
}

export default function DeleteConfirmDialog({
    title = 'Hapus Data',
    description = 'Data yang dihapus tidak dapat dikembalikan.',
    onConfirm,
    trigger,
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger || <Button variant="destructive">Hapus</Button>}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>

                    <AlertDialogAction onClick={onConfirm}>
                        Ya, Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
