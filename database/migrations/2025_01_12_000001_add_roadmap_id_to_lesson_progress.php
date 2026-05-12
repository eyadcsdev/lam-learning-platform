<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lesson_progress', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropUnique(['user_id', 'lesson_slug']);
            $table->foreignId('roadmap_id')->after('user_id')->constrained()->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->unique(['user_id', 'roadmap_id', 'lesson_slug']);
        });
    }

    public function down(): void
    {
        Schema::table('lesson_progress', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropUnique(['user_id', 'roadmap_id', 'lesson_slug']);
            $table->dropForeign(['roadmap_id']);
            $table->dropColumn('roadmap_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->unique(['user_id', 'lesson_slug']);
        });
    }
};
