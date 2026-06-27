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
        Schema::create('voucher_batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_no', 50)->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('period_start');
            $table->date('period_end');
            $table->decimal('nominal', 15, 2);
            $table->unsignedInteger('total_employee')
                ->default(0);

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->softDeletes();

            $table->timestamps();

            $table->index([
                'period_start',
                'period_end',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_batches');
    }
};
