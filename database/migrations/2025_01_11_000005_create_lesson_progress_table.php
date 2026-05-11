<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('level')->default(1)->after('xp');
        });

        Schema::create('lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('lesson_slug');
            $table->timestamp('completed_at')->nullable();
            $table->integer('xp_awarded')->default(0);
            $table->timestamps();
            $table->unique(['user_id', 'lesson_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_progress');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('level');
        });
    }
};
