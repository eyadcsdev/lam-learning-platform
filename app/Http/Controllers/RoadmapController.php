<?php

namespace App\Http\Controllers;

use App\Models\Roadmap;
use App\Roadmaps\RoadmapRegistry;
use App\Services\ProgressionService;
use Inertia\Inertia;
use Inertia\Response;

class RoadmapController extends Controller
{
    public function __construct(
        protected ProgressionService $progression,
        protected RoadmapRegistry $registry,
    ) {}

    public function index(string $technology = 'laravel'): Response
    {
        $definition = $this->registry->find($technology);

        if (!$definition || !$definition->isActive()) {
            return Inertia::render('ComingSoon', [
                'technology' => $technology,
                'roadmaps' => $this->registry->allToArray(),
            ]);
        }

        $roadmap = Roadmap::where('slug', $technology)->firstOrFail();

        return Inertia::render('Roadmap', [
            'technology' => $technology,
            'roadmap' => [
                'id' => $roadmap->id,
                'title' => $roadmap->title,
                'subtitle' => $roadmap->subtitle,
                'description' => $roadmap->description,
                'slug' => $roadmap->slug,
                'icon' => $roadmap->icon,
                'color' => $roadmap->color,
                'lessons' => $roadmap->lessons()->orderBy('order')->get()->map(fn ($l) => [
                    'id' => $l->id,
                    'title' => $l->title,
                    'subtitle' => $l->subtitle,
                    'slug' => $l->slug,
                    'difficulty' => $l->difficulty,
                    'xp_reward' => $l->xp_reward,
                    'order' => $l->order,
                ]),
            ],
            'all_roadmaps' => $this->registry->allToArray(),
            'progression' => request()->user()
                ? $this->progression->progressionData(request()->user(), $technology)
                : null,
        ]);
    }
}
