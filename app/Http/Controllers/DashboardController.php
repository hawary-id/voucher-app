<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private readonly DashboardService $dashboardService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'dashboardType' => auth()->user()->isStoreUser()
                ? 'store'
                : 'management',
            'summary' => $this->dashboardService->summary(),
            'latestVouchers' => $this->dashboardService->latestVouchers(),
            'latestClaims' => $this->dashboardService->latestClaims(),
            'voucherMonthlyChart' => $this->dashboardService->voucherMonthlyChart(),
            'redeemMonthlyChart' => $this->dashboardService->redeemMonthlyChart(),
            'claimByStoreChart' => $this->dashboardService->claimByStoreChart(),
            'voucherByDepartmentChart' => $this->dashboardService->voucherByDepartmentChart(),
        ]);
    }
}
