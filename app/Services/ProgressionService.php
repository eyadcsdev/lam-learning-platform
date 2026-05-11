<?php

namespace App\Services;

use App\Models\LessonProgress;
use App\Models\User;

class ProgressionService
{
    const LESSONS = [
        'setup'      => ['order' => 0, 'xp' => 100, 'title' => 'البداية'],
        'validation' => ['order' => 1, 'xp' => 150, 'title' => 'التحقق من البيانات'],
        'routing'    => ['order' => 2, 'xp' => 150, 'title' => 'التوجيه'],
    ];

    const LESSON_ORDER = ['setup', 'validation', 'routing'];

    public function unlockedLessons(User $user): array
    {
        $completed = $this->completedLessons($user);

        $unlocked = [];
        foreach (self::LESSON_ORDER as $i => $slug) {
            if ($i === 0) {
                $unlocked[] = $slug;
            } elseif (in_array(self::LESSON_ORDER[$i - 1], $completed)) {
                $unlocked[] = $slug;
            } else {
                break;
            }
        }
        return $unlocked;
    }

    public function completedLessons(User $user): array
    {
        return LessonProgress::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->pluck('lesson_slug')
            ->toArray();
    }

    public function isLessonUnlocked(User $user, string $slug): bool
    {
        return in_array($slug, $this->unlockedLessons($user));
    }

    public function isLessonCompleted(User $user, string $slug): bool
    {
        return in_array($slug, $this->completedLessons($user));
    }

    public function completeLesson(User $user, string $slug): array
    {
        $lessons = self::LESSONS;

        if (!isset($lessons[$slug])) {
            return ['success' => false, 'message' => 'الدرس غير موجود'];
        }

        $existing = LessonProgress::where('user_id', $user->id)
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

        $xpReward = $lessons[$slug]['xp'];

        if ($existing) {
            $existing->update([
                'completed_at' => now(),
                'xp_awarded' => $xpReward,
            ]);
        } else {
            LessonProgress::create([
                'user_id' => $user->id,
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

    public function currentLessonSlug(User $user): string
    {
        $completed = $this->completedLessons($user);
        foreach (self::LESSON_ORDER as $slug) {
            if (!in_array($slug, $completed)) {
                return $slug;
            }
        }
        return end(self::LESSON_ORDER);
    }

    public function nextLessonSlug(User $user): ?string
    {
        $completed = $this->completedLessons($user);
        foreach (self::LESSON_ORDER as $i => $slug) {
            if (!in_array($slug, $completed)) {
                if ($i === 0) return $slug;
                if (in_array(self::LESSON_ORDER[$i - 1], $completed)) return $slug;
                return null;
            }
        }
        return null;
    }

    public function progressionData(User $user): array
    {
        $completed = $this->completedLessons($user);
        $unlocked = $this->unlockedLessons($user);

        return [
            'completed_lessons' => $completed,
            'unlocked_lessons' => $unlocked,
            'current_lesson' => $this->currentLessonSlug($user),
            'next_lesson' => $this->nextLessonSlug($user),
            'xp' => $user->xp,
            'level' => $user->level,
        ];
    }
}
