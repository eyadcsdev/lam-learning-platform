<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProgressionController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\ValidationDemoController;
use App\Http\Controllers\XpController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GitHubAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('google.redirect');
    Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('google.callback');

    Route::get('auth/github/redirect', [GitHubAuthController::class, 'redirect'])->name('github.redirect');
    Route::get('auth/github/callback', [GitHubAuthController::class, 'callback'])->name('github.callback');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

    Route::get('roadmap/{technology?}', [RoadmapController::class, 'index'])
        ->name('roadmap')
        ->where('technology', '[a-z-]+')
        ->defaults('technology', 'laravel');

    Route::get('roadmap/{technology}/progression', [ProgressionController::class, 'status'])
        ->name('progression.status')
        ->where('technology', '[a-z-]+');

    Route::get('roadmap/{technology}/lessons/{lesson}', [LessonController::class, 'show'])
        ->name('lessons.show')
        ->where('technology', '[a-z-]+')
        ->where('lesson', '[a-z-]+');

    Route::post('roadmap/{technology}/lessons/{lesson}/complete', [ProgressionController::class, 'complete'])
        ->name('lessons.complete')
        ->where('technology', '[a-z-]+')
        ->where('lesson', '[a-z-]+');

    Route::post('xp/award', [XpController::class, 'award'])
        ->name('xp.award');

    Route::post('roadmap/{technology}/validation-demo', [ValidationDemoController::class, 'demo'])
        ->name('validation.demo')
        ->where('technology', '[a-z-]+');

    // Legacy redirects
    Route::redirect('lessons/setup', 'roadmap/laravel/lessons/setup', 301);
    Route::redirect('lessons/validation', 'roadmap/laravel/lessons/validation-docs', 301);
    Route::redirect('lessons/validation-docs', 'roadmap/laravel/lessons/validation-docs', 301);
    Route::redirect('docs/validation', 'roadmap/laravel/lessons/validation-docs', 301);
});
