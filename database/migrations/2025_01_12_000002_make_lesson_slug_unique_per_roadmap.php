<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->unique(['roadmap_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropUnique(['roadmap_id', 'slug']);
            $table->unique(['slug']);
        });
    }
};
