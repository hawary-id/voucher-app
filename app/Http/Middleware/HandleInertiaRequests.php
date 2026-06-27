<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'permissions' => fn() => $request->user()
                    ? $request->user()
                    ->getAllPermissions()
                    ->pluck('name')
                    ->values()
                    : [],
            ],
            'business' => fn() => [
                'app_name' => \App\Models\BusinessSetting::get('app_name', 'Voucher App'),
                'app_logo' => \App\Models\BusinessSetting::get('app_logo') ? asset('storage/' . \App\Models\BusinessSetting::get('app_logo')) : null,
                'business_name' => \App\Models\BusinessSetting::get('business_name'),
                'business_tagline' => \App\Models\BusinessSetting::get('business_tagline'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'toast' => fn() => session('toast'),
            ],
        ];
    }
}
