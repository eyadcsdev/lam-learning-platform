<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProgressionController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\ValidationDemoController;
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
    Route::get('roadmap', [RoadmapController::class, 'index'])->name('roadmap');

    Route::get('lessons/setup', [LessonController::class, 'setup'])->name('lessons.setup');
    Route::get('lessons/validation', [LessonController::class, 'validation'])->name('lessons.validation');
    Route::get('lessons/validation-docs', [LessonController::class, 'docs'])->name('lessons.validation-docs');
    Route::redirect('docs/validation', 'lessons/validation-docs', 301);

    Route::post('lessons/{lesson}/complete', [ProgressionController::class, 'complete'])->name('lessons.complete');
    Route::get('progression', [ProgressionController::class, 'status'])->name('progression.status');
    Route::post('validation-demo', [ValidationDemoController::class, 'demo'])->name('validation.demo');
});
