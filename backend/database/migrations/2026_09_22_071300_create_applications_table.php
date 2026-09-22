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
        if (Schema::hasTable('applications')) {
            if (! Schema::hasColumn('applications', 'updated_at')) {
                Schema::table('applications', function (Blueprint $table) {
                    $table->timestamp('updated_at')->nullable();
                });
            }

            return;
        }

        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name');
            $table->string('contact_name');
            $table->string('email');
            $table->string('tiktok_handle', 100)->nullable();
            $table->string('monthly_gmv', 50)->nullable();
            $table->string('category', 100)->nullable();
            $table->json('services')->nullable();
            $table->string('referral', 100)->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
