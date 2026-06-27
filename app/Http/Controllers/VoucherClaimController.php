<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\VoucherRedemption;
use App\Services\VoucherClaimService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class VoucherClaimController extends Controller
{
    public function __construct(
        private readonly VoucherClaimService $voucherClaimService,
    ) {}

    public function index(
        Request $request,
    ): Response {
        $this->authorize('viewAny', VoucherRedemption::class);

        $search = $request->string('search')->toString();

        $status = $request->string('status')->toString();

        $storeId = $request->filled('store_id')
            ? $request->integer('store_id')
            : null;

        return Inertia::render('voucher-claims/index', [
            'claims' => $this->voucherClaimService->paginate(
                search: $search,
                status: $status,
                storeId: $storeId,
            ),

            'stores' => Store::query()
                ->orderBy('name')
                ->get(),

            'filters' => [
                'search' => $search,
                'status' => $status,
                'store_id' => $storeId,
            ],
        ]);
    }

    public function show(
        VoucherRedemption $voucherRedemption,
    ): Response {
        $this->authorize('view', $voucherRedemption);

        return Inertia::render('voucher-claims/show', [
            'claim' => $this->voucherClaimService->find(
                $voucherRedemption,
            ),
        ]);
    }

    public function claim(
        VoucherRedemption $voucherRedemption,
        Request $request,
    ): RedirectResponse {
        $this->authorize('claim', $voucherRedemption);

        try {
            $this->voucherClaimService->claim(
                voucherRedemption: $voucherRedemption,
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Claim berhasil diproses.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect(
                        $e->errors()
                    )->flatten()->first(),
                ]);
        }
    }

    public function pay(
        VoucherRedemption $voucherRedemption,
        Request $request,
    ): RedirectResponse {
        $this->authorize('pay', $voucherRedemption);

        try {
            $this->voucherClaimService->pay(
                voucherRedemption: $voucherRedemption,
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Pembayaran claim berhasil.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect(
                        $e->errors()
                    )->flatten()->first(),
                ]);
        }
    }

    public function bulkClaim(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:voucher_redemptions,id',
        ]);

        $redemptions = VoucherRedemption::query()->whereIn('id', $validated['ids'])->get();

        foreach ($redemptions as $redemption) {
            $this->authorize('claim', $redemption);
        }

        try {
            $this->voucherClaimService->bulkClaim(
                ids: $validated['ids'],
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => count($validated['ids']) . ' klaim berhasil diproses.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect($e->errors())->flatten()->first(),
                ]);
        }
    }

    public function bulkPay(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:voucher_redemptions,id',
        ]);

        $redemptions = VoucherRedemption::query()->whereIn('id', $validated['ids'])->get();

        foreach ($redemptions as $redemption) {
            $this->authorize('pay', $redemption);
        }

        try {
            $this->voucherClaimService->bulkPay(
                ids: $validated['ids'],
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Pembayaran ' . count($validated['ids']) . ' klaim berhasil.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect($e->errors())->flatten()->first(),
                ]);
        }
    }

    public function voidClaim(
        VoucherRedemption $voucherRedemption,
        Request $request,
    ): RedirectResponse {
        $this->authorize('voidClaim', $voucherRedemption);

        try {
            $this->voucherClaimService->voidClaim(
                voucherRedemption: $voucherRedemption,
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Persetujuan klaim berhasil dibatalkan.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect($e->errors())->flatten()->first(),
                ]);
        }
    }

    public function voidPay(
        VoucherRedemption $voucherRedemption,
        Request $request,
    ): RedirectResponse {
        $this->authorize('voidPay', $voucherRedemption);

        try {
            $this->voucherClaimService->voidPay(
                voucherRedemption: $voucherRedemption,
                user: $request->user(),
            );

            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'success',
                    'message' => 'Status pembayaran klaim berhasil dibatalkan.',
                ]);
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('toast', [
                    'type' => 'error',
                    'message' => collect($e->errors())->flatten()->first(),
                ]);
        }
    }
}