import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className = '' }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!value) {
            return;
        }

        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(value);
                triggerSuccess();

                return;
            } catch (err) {
                console.error('Gagal menyalin dengan Clipboard API:', err);
            }
        }

        try {
            const textArea = document.createElement('textarea');
            textArea.value = value;
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                triggerSuccess();
            } else {
                throw new Error('execCommand mengembalikan nilai salah');
            }
        } catch (err) {
            console.error('Metode fallback juga gagal:', err);
            toast.error('Gagal menyalin kode voucher');
        }
    };

    const triggerSuccess = () => {
        setIsCopied(true);
        toast.success('Kode voucher berhasil disalin');
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!value) {
        return <span className="text-muted-foreground">-</span>;
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 font-mono text-xs font-bold tracking-wider rounded-md border bg-muted/40 px-2.5 py-1 text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all group/copy ${className}`}
            title="Klik untuk menyalin"
        >
            <span>{value}</span>
            
            {isCopied ? (
                <Check className="h-3 w-3 text-emerald-500 animate-in fade-in zoom-in-50" />
            ) : (
                <Copy className="h-3 w-3 opacity-0 group-hover/copy:opacity-100 text-muted-foreground/60 transition-opacity" />
            )}
        </button>
    );
}