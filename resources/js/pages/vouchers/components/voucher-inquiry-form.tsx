import { Loader2, Search } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VoucherInquiryFormData {
    code: string;
}

interface VoucherInquiryFormProps {
    data: VoucherInquiryFormData;
    errors: Record<string, string>;
    processing: boolean;
    submitLabel?: string;
    cancelUrl?: string; // Menjaga kompatibilitas properti yang dipanggil oleh induk
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setData: (key: keyof VoucherInquiryFormData, value: string) => void;
}

export default function VoucherInquiryForm({
    data,
    errors,
    processing,
    submitLabel = 'Cari Voucher',
    onSubmit,
    setData,
}: VoucherInquiryFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="space-y-2 flex-1 w-full">
                <Label htmlFor="code" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Kode Voucher
                </Label>
                <div className="relative">
                    <Input
                        id="code"
                        autoFocus
                        placeholder="Scan QR atau masukkan kode unik voucher..."
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className={`h-11 pr-4 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.code ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                </div>
                <InputError message={errors.code} />
            </div>

            <Button 
                type="submit" 
                disabled={processing || !data.code.trim()} 
                className="h-11 px-6 w-full sm:w-auto shrink-0 font-semibold shadow-sm transition-all hover:bg-primary/95"
            >
                {processing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Search className="mr-2 h-4 w-4" />
                )}
                {submitLabel}
            </Button>
        </form>
    );
}