<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Store;
use App\Models\Voucher;
use App\Services\VoucherReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class VoucherReportController extends Controller
{
    public function __construct(
        private readonly VoucherReportService $voucherReportService,
    ) {}

    public function index(
        Request $request,
    ): Response {
        $this->authorize('viewAny', Voucher::class);

        $search = $request->string('search')->toString();

        $status = $request->string('status')->toString();

        $departmentId = $request->filled('department_id')
            ? $request->integer('department_id')
            : null;

        $storeId = $request->filled('store_id')
            ? $request->integer('store_id')
            : null;

        return Inertia::render('voucher-reports/index', [
            'vouchers' => $this->voucherReportService->paginate(
                search: $search,
                status: $status,
                departmentId: $departmentId,
                storeId: $storeId,
            ),

            'summary' => $this->voucherReportService->summary(),

            'departments' => Department::query()
                ->orderBy('name')
                ->get(),

            'stores' => Store::query()
                ->orderBy('name')
                ->get(),

            'filters' => [
                'search' => $search,
                'status' => $status,
                'department_id' => $departmentId,
                'store_id' => $storeId,
            ],
        ]);
    }

    public function print(
        Request $request,
    ): HttpResponse {
        $this->authorize('viewAny', Voucher::class);

        return $this->voucherReportService->printPdf(
            search: $request->string('search')->toString(),
            status: $request->string('status')->toString(),
            departmentId: $request->filled('department_id')
                ? $request->integer('department_id')
                : null,
            storeId: $request->filled('store_id')
                ? $request->integer('store_id')
                : null,
        );
    }

   public function export(
    Request $request,
    ): BinaryFileResponse
    {
        $this->authorize('viewAny', Voucher::class);

        return $this->voucherReportService->exportExcel(
            search: $request->string('search')->toString(),
            status: $request->string('status')->toString(),
            departmentId: $request->filled('department_id')
                ? $request->integer('department_id')
                : null,
            storeId: $request->filled('store_id')
                ? $request->integer('store_id')
                : null,
        );
    }
}