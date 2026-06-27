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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voucher_batch_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('code', 50)
                ->unique();
            $table->decimal('nominal', 15, 2);
            $table->enum('status', [
                'ACTIVE',
                'USED',
                'EXPIRED',
                'VOID',
            ])->default('ACTIVE');
            $table->timestamp('issued_at');
            $table->timestamp('expired_at');
            $table->timestamp('used_at')
                ->nullable();

            $table->timestamps();

            $table->unique([
                'voucher_batch_id',
                'employee_id',
            ]);

            $table->index('status');
            $table->index('expired_at');

            $table->index([
                'status',
                'expired_at',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
