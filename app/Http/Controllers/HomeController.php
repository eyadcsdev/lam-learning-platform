<?php

namespace App\Http\Controllers;

use App\Roadmaps\RoadmapRegistry;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        protected RoadmapRegistry $registry,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Landing', [
            'roadmaps' => $this->registry->allToArray(),
        ]);
    }
}
