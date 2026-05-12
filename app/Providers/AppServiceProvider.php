<?php

namespace App\Providers;

use App\Roadmaps\RoadmapRegistry;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(RoadmapRegistry::class, function () {
            return new RoadmapRegistry();
        });
    }

    public function boot(): void
    {
        //
    }
}
