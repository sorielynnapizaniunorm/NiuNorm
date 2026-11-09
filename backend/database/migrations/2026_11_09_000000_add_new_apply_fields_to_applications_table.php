<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $columns = [
            'contact_role' => fn (Blueprint $table) => $table->string('contact_role')->nullable(),
            'shop_link' => fn (Blueprint $table) => $table->string('shop_link', 500)->nullable(),
            'stage' => fn (Blueprint $table) => $table->string('stage', 100)->nullable(),
            'marketing_budget' => fn (Blueprint $table) => $table->string('marketing_budget', 50)->nullable(),
            'goal' => fn (Blueprint $table) => $table->text('goal')->nullable(),
            'mobile' => fn (Blueprint $table) => $table->string('mobile', 50)->nullable(),
            'start_when' => fn (Blueprint $table) => $table->string('start_when', 50)->nullable(),
            'source' => fn (Blueprint $table) => $table->string('source', 100)->nullable(),
            'referred_by' => fn (Blueprint $table) => $table->string('referred_by')->nullable(),
            'source_detail' => fn (Blueprint $table) => $table->string('source_detail')->nullable(),
            'suggested_package' => fn (Blueprint $table) => $table->string('suggested_package', 50)->nullable(),
            'match_score' => fn (Blueprint $table) => $table->unsignedTinyInteger('match_score')->nullable(),
        ];

        foreach ($columns as $name => $definition) {
            if (! Schema::hasColumn('applications', $name)) {
                Schema::table('applications', $definition);
            }
        }
    }

    public function down(): void
    {
        $columns = [
            'contact_role',
            'shop_link',
            'stage',
            'marketing_budget',
            'goal',
            'mobile',
            'start_when',
            'source',
            'referred_by',
            'source_detail',
            'suggested_package',
            'match_score',
        ];

        foreach ($columns as $column) {
            if (Schema::hasColumn('applications', $column)) {
                Schema::table('applications', fn (Blueprint $table) => $table->dropColumn($column));
            }
        }
    }
};
