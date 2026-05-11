<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function setup(): Response
    {
        return Inertia::render('Lessons/Setup');
    }

    public function validation(): Response
    {
        return Inertia::render('Lessons/Validation');
    }

    public function docs(): Response
    {
        return Inertia::render('Lessons/ValidationDocs');
    }
}
