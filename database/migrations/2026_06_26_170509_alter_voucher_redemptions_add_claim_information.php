<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('voucher_redemptions', function (Blueprint $table) {

            $table->foreignId('claimed_by')
                ->nullable()
                ->after('cashier_id')
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('claimed_at')
                ->nullable()
                ->after('claim_status');

            $table->foreignId('paid_by')
                ->nullable()
                ->after('claimed_by')
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('paid_at')
                ->nullable()
                ->after('claimed_at');
        });
    }

    public function down(): void
    {
        Schema::table('voucher_redemptions', function (Blueprint $table) {

            $table->dropConstrainedForeignId('claimed_by');

            $table->dropConstrainedForeignId('paid_by');

            $table->dropColumn([
                'claimed_at',
                'paid_at',
            ]);
        });
    }
};