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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->string('nik', 50)->unique();

            $table->string('name');

            $table->foreignId('department_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('position')->nullable();

            $table->string('phone', 50)->nullable();

            $table->timestamp('terminated_at')->nullable();

            $table->boolean('is_active')->default(true);

            $table->softDeletes();
            $table->timestamps();

            $table->index('department_id');
            $table->index('is_active');
            $table->index('terminated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
