<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Roadmap;
use App\Models\User;

class ProgressionService
{
    public function unlockedLessons(User $user, string $roadmapSlug): array
    {
        $roadmap = $this->roadmap($roadmapSlug);
        if (!$roadmap) return [];

        $completed = $this->completedLessons($user, $roadmapSlug);
        $lessons = $this->roadmapLessons($roadmapSlug);

        $unlocked = [];
        foreach ($lessons as $i => $lesson) {
            if ($i === 0) {
                $unlocked[] = $lesson->slug;
            } elseif (in_array($lessons[$i - 1]->slug, $completed)) {
                $unlocked[] = $lesson->slug;
            } else {
                break;
            }
        }
        return $unlocked;
    }

    public function completedLessons(User $user, string $roadmapSlug): array
    {
        $roadmap = $this->roadmap($roadmapSlug);
        if (!$roadmap) return [];

        return LessonProgress::where('user_id', $user->id)
            ->where('roadmap_id', $roadmap->id)
            ->whereNotNull('completed_at')
            ->pluck('lesson_slug')
            ->toArray();
    }

    public function isLessonUnlocked(User $user, string $roadmapSlug, string $slug): bool
    {
        return in_array($slug, $this->unlockedLessons($user, $roadmapSlug));
    }

    public function isLessonCompleted(User $user, string $roadmapSlug, string $slug): bool
    {
        return in_array($slug, $this->completedLessons($user, $roadmapSlug));
    }

    public function completeLesson(User $user, string $roadmapSlug, string $slug): array
    {
        $roadmap = $this->roadmap($roadmapSlug);
        if (!$roadmap) {
            return ['success' => false, 'message' => 'المسار غير موجود'];
        }

        $lesson = Lesson::where('slug', $slug)
            ->where('roadmap_id', $roadmap->id)
            ->first();

        if (!$lesson) {
            return ['success' => false, 'message' => 'الدرس غير موجود'];
        }

        $existing = LessonProgress::where('user_id', $user->id)
            ->where('roadmap_id', $roadmap->id)
            ->where('lesson_slug', $slug)
            ->first();

        if ($existing && $existing->completed_at) {
            return [
                'success' => true,
                'already_completed' => true,
                'xp_awarded' => 0,
                'total_xp' => $user->xp,
            ];
        }

        $xpReward = $lesson->xp_reward;

        if ($existing) {
            $existing->update([
                'completed_at' => now(),
                'xp_awarded' => $xpReward,
            ]);
        } else {
            LessonProgress::create([
                'user_id' => $user->id,
                'roadmap_id' => $roadmap->id,
                'lesson_slug' => $slug,
                'completed_at' => now(),
                'xp_awarded' => $xpReward,
            ]);
        }

        $user->increment('xp', $xpReward);
        $user->save();

        $completedCount = LessonProgress::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->count();
        $newLevel = min(floor($completedCount / 3) + 1, 10);
        $user->update(['level' => $newLevel]);

        return [
            'success' => true,
            'already_completed' => false,
            'xp_awarded' => $xpReward,
            'total_xp' => $user->fresh()->xp,
            'level' => $newLevel,
        ];
    }

    public function currentLessonSlug(User $user, string $roadmapSlug): ?string
    {
        $completed = $this->completedLessons($user, $roadmapSlug);
        $lessons = $this->roadmapLessons($roadmapSlug);

        foreach ($lessons as $lesson) {
            if (!in_array($lesson->slug, $completed)) {
                return $lesson->slug;
            }
        }

        $last = $lessons->last();
        return $last?->slug;
    }

    public function nextLessonSlug(User $user, string $roadmapSlug): ?string
    {
        $completed = $this->completedLessons($user, $roadmapSlug);
        $lessons = $this->roadmapLessons($roadmapSlug);

        foreach ($lessons as $i => $lesson) {
            if (!in_array($lesson->slug, $completed)) {
                if ($i === 0) return $lesson->slug;
                if (in_array($lessons[$i - 1]->slug, $completed)) return $lesson->slug;
                return null;
            }
        }
        return null;
    }

    public function progressionData(User $user, string $roadmapSlug): array
    {
        $completed = $this->completedLessons($user, $roadmapSlug);
        $unlocked = $this->unlockedLessons($user, $roadmapSlug);

        return [
            'completed_lessons' => $completed,
            'unlocked_lessons' => $unlocked,
            'current_lesson' => $this->currentLessonSlug($user, $roadmapSlug),
            'next_lesson' => $this->nextLessonSlug($user, $roadmapSlug),
            'xp' => $user->xp,
            'level' => $user->level,
        ];
    }

    private function roadmap(string $slug): ?Roadmap
    {
        return Roadmap::where('slug', $slug)->first();
    }

    private function roadmapLessons(string $slug)
    {
        $roadmap = $this->roadmap($slug);
        if (!$roadmap) return collect();

        return Lesson::where('roadmap_id', $roadmap->id)
            ->orderBy('order')
            ->get();
    }
}
