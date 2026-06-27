<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoucherBatch\VoucherBatchStoreRequest;
use App\Http\Requests\VoucherBatch\VoucherBatchUpdateRequest;
use App\Models\Employee;
use App\Models\VoucherBatch;
use App\Services\VoucherBatchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class VoucherBatchController extends Controller
{
    public function __construct(
        private readonly VoucherBatchService $voucherBatchService,
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', VoucherBatch::class);

        $voucherBatches = $this->voucherBatchService->paginate(
            search: $request->string('search')->toString(),
        );

        return Inertia::render('voucher-batches/index', [
            'voucherBatches' => $voucherBatches,
            'filters' => [
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', VoucherBatch::class);

        return Inertia::render('voucher-batches/create', [
            'employees' => Employee::query()
                ->with('department')
                ->where('is_active', true)
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(
        VoucherBatchStoreRequest $request,
    ): RedirectResponse {
        $this->authorize('create', VoucherBatch::class);

        $this->voucherBatchService->create([
            ...$request->validated()
        ]);

        return redirect()
            ->route('voucher-batches.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Voucher batch berhasil ditambahkan.',
            ]);
    }

    public function edit(
        VoucherBatch $voucherBatch,
    ): Response {
        $this->authorize('update', $voucherBatch);

        return Inertia::render('voucher-batches/edit', [
            'voucherBatch' => $voucherBatch,
        ]);
    }

    public function update(
        VoucherBatchUpdateRequest $request,
        VoucherBatch $voucherBatch,
    ): RedirectResponse {
        $this->authorize('update', $voucherBatch);

        $this->voucherBatchService->update(
            $voucherBatch,
            $request->validated(),
        );

        return redirect()
            ->route('voucher-batches.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Voucher batch berhasil diperbarui.',
            ]);
    }

    public function destroy(
        VoucherBatch $voucherBatch,
    ): RedirectResponse {
        $this->authorize('delete', $voucherBatch);

        $this->voucherBatchService->delete(
            $voucherBatch,
        );

        return redirect()
            ->route('voucher-batches.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Voucher batch berhasil dihapus.',
            ]);
    }

    public function show(
        VoucherBatch $voucherBatch,
    ): Response {
        $this->authorize('view', $voucherBatch);

        return Inertia::render(
            'voucher-batches/show',
            $this->voucherBatchService
                ->findForShow($voucherBatch),
        );
    }
}
