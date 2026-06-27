<?php

namespace App\Console\Commands;

use App\Services\VoucherExpirationService;
use Illuminate\Console\Command;

class ExpireVoucherCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'voucher:expire';

    /**
     * The console command description.
     */
    protected $description = 'Automatically expire active vouchers that have passed their expiration date';

    public function __construct(
        private readonly VoucherExpirationService $voucherExpirationService,
    ) {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $expiredCount = $this->voucherExpirationService->expire();

        $this->info(sprintf(
            '%d voucher(s) expired successfully.',
            $expiredCount,
        ));

        return self::SUCCESS;
    }
}
