<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voucher_redemptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('voucher_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('store_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('cashier_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->decimal('redeemed_amount', 15, 2);

            $table->enum('claim_status', [
                'PENDING',
                'CLAIMED',
                'PAID',
            ])->default('PENDING');

            $table->timestamp('redeemed_at');

            $table->text('notes')
                ->nullable();

            $table->timestamps();

            $table->index('store_id');

            $table->index('cashier_id');

            $table->index('claim_status');

            $table->index('redeemed_at');

            $table->index([
                'store_id',
                'redeemed_at',
            ]);

            $table->index([
                'store_id',
                'claim_status',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_redemptions');
    }
};
