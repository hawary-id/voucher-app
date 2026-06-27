import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import type { FlashToast } from '@/types/ui';

interface PageProps {
    flash?: {
        toast?: FlashToast | null;
    };
}

export function FlashToast() {
    const page = usePage();

    const flash = (
        page.props as PageProps
    ).flash;

    useEffect(() => {
        if (!flash?.toast) {
            return;
        }

        toast[flash.toast.type](
            flash.toast.message,
        );
    }, [flash]);

    return null;
}
