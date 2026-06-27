<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoucherBatchController;
use App\Http\Controllers\VoucherClaimController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\VoucherInquiryController;
use App\Http\Controllers\VoucherPrintController;
use App\Http\Controllers\VoucherRedeemController;
use App\Http\Controllers\VoucherReportController;
use Illuminate\Support\Facades\Route;

// Halaman Utama: Redirect langsung ke Dashboard (jika login) atau Login (jika guest)
Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

// Gerbang Autentikasi Aplikasi
Route::middleware([
    'auth',
    'verified',
])->group(function () {

    // Dashboard Internal
    Route::get(
        'dashboard',
        [DashboardController::class, 'index']
    )->name('dashboard');

    /**
     * --------------------------------------------------------------------------
     * Kelompok Modul: Utama & Transaksional Kasir
     * --------------------------------------------------------------------------
     */
    Route::prefix('vouchers')->name('vouchers.')->group(function () {
        // Alur Alokasi Penukaran Kasir (Redeem)
        Route::get('redeem', [VoucherRedeemController::class, 'create'])->name('redeem');
        Route::post('redeem/check', [VoucherRedeemController::class, 'check'])->name('redeem.check');
        Route::post('redeem', [VoucherRedeemController::class, 'store'])->name('redeem.store');
        Route::post('redemptions/{voucherRedemption}/void', [VoucherRedeemController::class, 'void'])->name('redemptions.void');

        // Alur Pengecekan Validitas Data (Inquiry)
        Route::get('inquiry', [VoucherInquiryController::class, 'create'])->name('inquiry');
        Route::post('inquiry', [VoucherInquiryController::class, 'search'])->name('inquiry.search');

        // Aksi Pembatalan (Void) Voucher
        Route::post('{voucher}/void', [VoucherController::class, 'void'])->name('void');
    });

    /**
     * --------------------------------------------------------------------------
     * Kelompok Modul: Manajemen & Distribusi Voucher
     * --------------------------------------------------------------------------
     */
    Route::resource('voucher-batches', VoucherBatchController::class);
    Route::get('voucher-print', VoucherPrintController::class)->name('voucher-print');

    // Analitik Auditing & Ekspor Data (Reports)
    Route::prefix('voucher-reports')->name('voucher-reports.')->group(function () {
        Route::get('/', [VoucherReportController::class, 'index'])->name('index');
        Route::get('/print', [VoucherReportController::class, 'print'])->name('print');
        Route::get('/export', [VoucherReportController::class, 'export'])->name('export');
    });

    // Validasi Klaim Kas / Otorisasi Akuntansi (Claims)
    Route::prefix('voucher-claims')->name('voucher-claims.')->group(function () {
        Route::get('/', [VoucherClaimController::class, 'index'])->name('index');
        Route::post('/bulk-claim', [VoucherClaimController::class, 'bulkClaim'])->name('bulk-claim');
        Route::post('/bulk-pay', [VoucherClaimController::class, 'bulkPay'])->name('bulk-pay');
        Route::get('/{voucherRedemption}', [VoucherClaimController::class, 'show'])->name('show');
        Route::post('/{voucherRedemption}/claim', [VoucherClaimController::class, 'claim'])->name('claim');
        Route::post('/{voucherRedemption}/pay', [VoucherClaimController::class, 'pay'])->name('pay');
        Route::post('/{voucherRedemption}/void-claim', [VoucherClaimController::class, 'voidClaim'])->name('void-claim');
        Route::post('/{voucherRedemption}/void-pay', [VoucherClaimController::class, 'voidPay'])->name('void-pay');
    });


    Route::put(
        'users/{user}/activate',
        [UserController::class, 'activate'],
    )->name('users.activate');

    Route::put(
        'users/{user}/deactivate',
        [UserController::class, 'deactivate'],
    )->name('users.deactivate');

    Route::put(
        'users/{user}/reset-password',
        [UserController::class, 'resetPassword'],
    )->name('users.reset-password');


    Route::prefix('activity-logs')
        ->name('activity-logs.')
        ->group(function () {
            Route::get('/', [ActivityLogController::class, 'index'])
                ->name('index');

            Route::get('/{activity}', [ActivityLogController::class, 'show'])
                ->name('show');
        });

    // Fallback/dummy routes for register to satisfy typescript build when registration is disabled in Fortify
    Route::get('/register', function () { abort(404); })->name('register');
    Route::post('/register', function () { abort(404); })->name('register.store');

    /**
     * --------------------------------------------------------------------------
     * Kelompok Modul: Pondasi Organisasi (Data Master)
     * --------------------------------------------------------------------------
     */
    Route::resource('stores', StoreController::class)->except('show');
    Route::resource('departments', DepartmentController::class)->except('show');
    Route::resource('employees', EmployeeController::class)->except('show');
    Route::resource('users', UserController::class)->except('show');
});

require __DIR__ . '/settings.php';
