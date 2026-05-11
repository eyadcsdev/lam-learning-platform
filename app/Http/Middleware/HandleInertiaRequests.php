<?php

namespace App\Http\Middleware;

use App\Services\ProgressionService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $progression = [];
        if ($user) {
            $service = app(ProgressionService::class);
            $progression = $service->progressionData($user);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'xp' => $user->xp ?? 0,
                    'level' => $user->level ?? 1,
                    'avatar' => $user->avatar,
                    'completed_lessons' => $progression['completed_lessons'] ?? [],
                    'unlocked_lessons' => $progression['unlocked_lessons'] ?? [],
                    'current_lesson' => $progression['current_lesson'] ?? 'setup',
                ] : null,
            ],
        ];
    }
}
