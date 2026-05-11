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

    public function complete(Request $request, string $lesson): JsonResponse
    {
        $user = $request->user();

        $allowed = ['setup', 'validation', 'routing'];
        if (!in_array($lesson, $allowed)) {
            return response()->json(['message' => 'الدرس غير موجود'], 404);
        }

        if (!$this->progression->isLessonUnlocked($user, $lesson)) {
            return response()->json(['message' => 'هذا الدرس مقفل'], 403);
        }

        $result = $this->progression->completeLesson($user, $lesson);

        return response()->json($result);
    }

    public function status(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json(
            $this->progression->progressionData($user)
        );
    }
}
