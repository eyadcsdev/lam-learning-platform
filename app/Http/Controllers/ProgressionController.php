<?php

namespace App\Http\Controllers;

use App\Services\ProgressionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    public function __construct(
        protected ProgressionService $progression
    ) {}

    public function complete(Request $request, string $technology, string $lesson): JsonResponse
    {
        $user = $request->user();

        if (!$this->progression->isLessonUnlocked($user, $technology, $lesson)) {
            return response()->json(['message' => 'هذا الدرس مقفل'], 403);
        }

        $result = $this->progression->completeLesson($user, $technology, $lesson);

        return response()->json($result);
    }

    public function status(Request $request, string $technology): JsonResponse
    {
        $user = $request->user();
        return response()->json(
            $this->progression->progressionData($user, $technology)
        );
    }
}
