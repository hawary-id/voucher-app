<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\StoreStoreRequest;
use App\Http\Requests\Store\StoreUpdateRequest;
use App\Models\Store;
use App\Services\StoreService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class StoreController extends Controller
{
    public function __construct(
        private readonly StoreService $storeService,
    ) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Store::class);

        $stores = $this->storeService->paginate(
            search: $request->string('search')->toString(),
        );

        return Inertia::render('stores/index', [
            'stores' => $stores,
            'filters' => [
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Store::class);

        return Inertia::render('stores/create');
    }

    public function store(
        StoreStoreRequest $request,
    ): RedirectResponse {
        $this->authorize('create', Store::class);

        $this->storeService->create(
            $request->validated(),
        );

        return redirect()
            ->route('stores.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Toko berhasil ditambahkan.',
            ]);
    }

    public function edit(
        Store $store,
    ): Response {
        $this->authorize('update', $store);

        return Inertia::render('stores/edit', [
            'store' => $store,
        ]);
    }

    public function update(
        StoreUpdateRequest $request,
        Store $store,
    ): RedirectResponse {
        $this->authorize('update', $store);

        $this->storeService->update(
            $store,
            $request->validated(),
        );

        return redirect()
            ->route('stores.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Toko berhasil diperbarui.',
            ]);
    }

    public function destroy(
        Store $store,
    ): RedirectResponse {
        $this->authorize('delete', $store);

        $this->storeService->delete($store);

        return redirect()
            ->route('stores.index')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Toko berhasil dihapus.',
            ]);
    }
}
