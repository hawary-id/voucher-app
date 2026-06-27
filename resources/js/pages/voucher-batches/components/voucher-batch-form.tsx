import { Link } from '@inertiajs/react';
import { Loader2, Search, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Employee } from '@/types';

export interface VoucherBatchFormData {
    batch_no?: string;
    title: string;
    description: string;
    period_start: string;
    period_end: string;
    nominal: string;
    employee_ids: number[];
}

interface VoucherBatchFormProps {
    data: VoucherBatchFormData;
    employees?: Employee[];
    errors: Record<string, string>;
    processing: boolean;
    submitLabel?: string;
    cancelUrl?: string;
    showNominal?: boolean;
    showEmployeeSelection?: boolean;
    showBatchNo?: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (
        key: keyof VoucherBatchFormData,
        value: string | number[],
    ) => void;
}

export default function VoucherBatchForm({
    data,
    employees = [],
    errors,
    processing,
    submitLabel = 'Simpan',
    cancelUrl,
    showNominal = true,
    showEmployeeSelection = true,
    showBatchNo = false,
    onSubmit,
    setData,
}: VoucherBatchFormProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployees = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) {
            return employees;
        }

        return employees.filter(
            (emp) =>
                emp.name?.toLowerCase().includes(query) ||
                emp.nik?.toLowerCase().includes(query) ||
                emp.position?.toLowerCase().includes(query) ||
                emp.department?.name?.toLowerCase().includes(query),
        );
    }, [searchQuery, employees]);

    const allFilteredSelected = useMemo(() => {
        if (filteredEmployees.length === 0) {
            return false;
        }

        return filteredEmployees.every((emp) =>
            data.employee_ids.includes(emp.id),
        );
    }, [filteredEmployees, data.employee_ids]);

    const isPartialSelected = useMemo(() => {
        if (filteredEmployees.length === 0) {
            return false;
        }

        const hasSome = filteredEmployees.some((emp) =>
            data.employee_ids.includes(emp.id),
        );

        return hasSome && !allFilteredSelected;
    }, [filteredEmployees, data.employee_ids, allFilteredSelected]);

    const toggleSelectAllFiltered = (checked: boolean) => {
        const filteredIds = filteredEmployees.map((emp) => emp.id);

        if (checked) {
            setData(
                'employee_ids',
                Array.from(new Set([...data.employee_ids, ...filteredIds])),
            );
        } else {
            setData(
                'employee_ids',
                data.employee_ids.filter((id) => !filteredIds.includes(id)),
            );
        }
    };

    const toggleEmployee = (employeeId: number, checked: boolean) => {
        if (checked) {
            setData('employee_ids', [...data.employee_ids, employeeId]);

            return;
        }

        setData(
            'employee_ids',
            data.employee_ids.filter((id) => id !== employeeId),
        );
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                {showBatchNo && data.batch_no && (
                    <div className="space-y-2">
                        <Label
                            htmlFor="batch_no"
                            className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                        >
                            No. Batch
                        </Label>
                        <Input
                            id="batch_no"
                            value={data.batch_no}
                            disabled
                            className="bg-muted font-mono h-11"
                        />
                    </div>
                )}

                <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="title" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        Judul Program / Batch
                    </Label>
                    <Input
                        id="title"
                        placeholder="Contoh: Voucher Belanja Bulanan Juni 2026"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${
                            errors.title
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }`}
                    />
                    <InputError message={errors.title} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Deskripsi / Keterangan
                </Label>
                <Textarea
                    id="description"
                    placeholder="Masukkan rincian informasi atau catatan mengenai penerbitan voucher ini..."
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={`min-h-[100px] resize-none transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label
                        htmlFor="period_start"
                        className="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        Tanggal Mulai Berlaku
                    </Label>
                    <Input
                        id="period_start"
                        type="date"
                        value={data.period_start}
                        onChange={(e) =>
                            setData('period_start', e.target.value)
                        }
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${
                            errors.period_start
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }`}
                    />
                    <InputError message={errors.period_start} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="period_end" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        Tanggal Kedaluwarsa
                    </Label>
                    <Input
                        id="period_end"
                        type="date"
                        value={data.period_end}
                        onChange={(e) => setData('period_end', e.target.value)}
                        className={`h-11 transition-all focus:border-primary/50 focus-visible:ring-primary/20 ${
                            errors.period_end
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }`}
                    />
                    <InputError message={errors.period_end} />
                </div>
            </div>

            {showNominal && (
                <div className="space-y-2">
                    <Label htmlFor="nominal" className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        Nominal Voucher
                    </Label>
                    <Select
                        value={data.nominal || undefined}
                        onValueChange={(value) => setData('nominal', value)}
                    >
                        <SelectTrigger
                            id="nominal"
                            className={`h-11 transition-all focus:ring-primary/20 ${
                                errors.nominal
                                    ? 'border-destructive focus:ring-destructive'
                                    : ''
                            }`}
                        >
                            <SelectValue placeholder="Pilih nominal pecahan voucher" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25000">Rp 25.000</SelectItem>
                            <SelectItem value="50000">Rp 50.000</SelectItem>
                            <SelectItem value="100000">Rp 100.000</SelectItem>
                            <SelectItem value="150000">Rp 150.000</SelectItem>
                            <SelectItem value="200000">Rp 200.000</SelectItem>
                            <SelectItem value="500000">Rp 500.000</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.nominal} />
                </div>
            )}
            {showEmployeeSelection && (
                <div className="space-y-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] duration-300">
                    <div className="flex flex-col gap-4 border-b pb-3 sm:flex-row sm:items-center sm:justify-between border-border/60">
                        <div className="space-y-1">
                            <Label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                Distribusi Karyawan Pilihan
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Terpilih{' '}
                                <span className="font-bold text-primary">
                                    {data.employee_ids.length}
                                </span>{' '}
                                dari{' '}
                                <span className="font-medium">
                                    {employees.length}
                                </span>{' '}
                                karyawan keseluruhan.
                            </p>
                        </div>

                        <div className="relative w-full shrink-0 sm:w-64">
                            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama, NIK, jabatan, atau departemen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-8 text-xs transition-all focus:border-primary/50 focus-visible:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 px-1 py-1">
                        <Checkbox
                            id="select_all_filtered"
                            checked={allFilteredSelected}
                            className={
                                isPartialSelected
                                    ? 'data-[state=unchecked]:bg-transparent'
                                    : ''
                            }
                            onCheckedChange={(checked) =>
                                toggleSelectAllFiltered(Boolean(checked))
                            }
                        />
                        <Label
                            htmlFor="select_all_filtered"
                            className="cursor-pointer text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {searchQuery
                                ? 'Pilih Semua Hasil Pencarian'
                                : 'Pilih Seluruh Karyawan'}
                        </Label>
                    </div>

                    <div className="divide-y divide-border/60 max-h-[280px] scrollbar-thin overflow-y-auto rounded-lg border bg-muted/5 px-1 border-border/60">
                        {filteredEmployees.length === 0 ? (
                            <div className="p-8 text-center text-xs text-muted-foreground">
                                Tidak ada data karyawan yang cocok.
                            </div>
                        ) : (
                            filteredEmployees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="flex items-center space-x-3 rounded-md p-2.5 transition-colors hover:bg-muted/10"
                                >
                                    <Checkbox
                                        id={`emp-${employee.id}`}
                                        checked={data.employee_ids.includes(
                                            employee.id,
                                        )}
                                        onCheckedChange={(checked) =>
                                            toggleEmployee(
                                                employee.id,
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`emp-${employee.id}`}
                                        className="flex flex-1 cursor-pointer flex-col gap-1 text-sm font-normal sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                    >
                                        <div className="space-y-0.5">
                                            <span className="block font-semibold sm:inline text-foreground/90">
                                                {employee.name}
                                            </span>
                                            <span className="block text-xs text-muted-foreground sm:ml-2 sm:inline">
                                                {employee.department?.name ??
                                                    '-'}{' '}
                                                • {employee.position ?? '-'}
                                            </span>
                                        </div>
                                        <span className="w-fit self-start rounded bg-muted/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:self-center font-bold">
                                            {employee.nik}
                                        </span>
                                    </Label>
                                </div>
                            ))
                        )}
                    </div>
                    <InputError message={errors.employee_ids} />
                </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t pt-5 border-border/60">
                {cancelUrl && (
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                        disabled={processing}
                        className="px-5 transition-all hover:bg-muted/30"
                    >
                        <Link href={cancelUrl}>Batal</Link>
                    </Button>
                )}

                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-[140px] px-5 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 font-semibold"
                >
                    {processing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
