<?php

namespace App\Http\Controllers;

use App\Services\BusinessSettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessSettingController extends Controller
{
    public function __construct(
        private readonly BusinessSettingService $service,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', \App\Models\BusinessSetting::class);

        $settings = $this->service->getAll();

        return Inertia::render('settings/business', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $this->authorize('update', \App\Models\BusinessSetting::class);

        $validated = $request->validate([
            'app_name'         => ['required', 'string', 'max:100'],
            'business_name'    => ['nullable', 'string', 'max:200'],
            'business_tagline' => ['nullable', 'string', 'max:255'],
            'business_phone'   => ['nullable', 'string', 'max:30'],
            'business_email'   => ['nullable', 'email', 'max:100'],
            'business_address' => ['nullable', 'string', 'max:500'],
            'business_city'    => ['nullable', 'string', 'max:100'],
            'app_logo'         => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:2048'],
        ]);

        $logoFile = $request->hasFile('app_logo') ? $request->file('app_logo') : null;

        $this->service->updateAll($validated, $logoFile);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Konfigurasi bisnis berhasil disimpan.',
        ]);
    }
}
