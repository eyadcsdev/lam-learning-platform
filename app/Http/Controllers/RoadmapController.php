<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class RoadmapController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Roadmap');
    }
}
