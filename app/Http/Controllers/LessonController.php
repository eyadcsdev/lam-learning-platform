<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Roadmap;
use App\Roadmaps\RoadmapRegistry;
use App\Services\ProgressionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function __construct(
        protected ProgressionService $progression,
        protected RoadmapRegistry $registry,
    ) {}

    public function show(string $technology, string $lesson): Response|RedirectResponse
    {
        $definition = $this->registry->find($technology);

        if (!$definition || !$definition->isActive()) {
            return Inertia::render('ComingSoon', [
                'technology' => $technology,
                'roadmaps' => $this->registry->allToArray(),
            ]);
        }

        $roadmap = Roadmap::where('slug', $technology)->firstOrFail();

        // Map route slugs to actual lesson slugs
        $lessonSlug = match ($lesson) {
            'validation-docs', 'validation' => 'validation',
            default => $lesson,
        };

        // Normalize the route lesson id for rendering
        $routeLesson = $lesson === 'validation' ? 'validation-docs' : $lesson;

        $lessonModel = Lesson::where('slug', $lessonSlug)
            ->where('roadmap_id', $roadmap->id)
            ->firstOrFail();

        $user = request()->user();
        $isUnlocked = $this->progression->isLessonUnlocked($user, $technology, $lessonSlug);

        if (!$isUnlocked) {
            return redirect()->route('roadmap', ['technology' => $technology])
                ->with('error', 'يجب إكمال الدرس السابق أولاً');
        }

        if ($routeLesson === 'setup') {
            return Inertia::render('Lessons/Setup', [
                'technology' => $technology,
                'lesson' => $lessonModel,
                'is_unlocked' => $isUnlocked,
            ]);
        }

        if ($routeLesson === 'validation-docs') {
            return Inertia::render('Lessons/ValidationDocs', [
                'technology' => $technology,
                'lesson' => $lessonModel,
                'is_unlocked' => $isUnlocked,
            ]);
        }

        abort(404, 'الدرس غير موجود');
    }
}
