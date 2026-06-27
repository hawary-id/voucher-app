<?php

namespace App\Services;

use App\Models\Store;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class StoreService
{
    public function paginate(
        ?string $search = null,
        int $perPage = 10,
    ): LengthAwarePaginator {
        return Store::query()
            ->when(
                $search,
                fn($query) => $query->where(function ($query) use ($search) {
                    $query
                        ->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%");
                }),
            )
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Store
    {
        return Store::create($data);
    }

    public function update(
        Store $store,
        array $data,
    ): Store {
        $store->update($data);

        return $store->refresh();
    }

    public function delete(Store $store): void
    {
        $store->delete();
    }
}
