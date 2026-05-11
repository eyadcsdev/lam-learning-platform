# Clean Architecture Refactoring Prompt

## Context

This is an Arabic educational platform "لام" (Lam) built with:
- **Backend**: Laravel 13 + Inertia 3
- **Frontend**: React 19 + Inertia.js + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: Laravel Breeze (customized)

The current codebase mixes concerns — controllers contain business logic, models are anemic, services are ad-hoc, and frontend components are flat with no feature boundaries.

## Goal

Refactor into a **Feature-Based Modular Architecture** on both backend and frontend without changing any UI, behavior, or user experience. Every visual pixel must remain identical.

## Constraints

- **DO NOT** modify UI components' rendered output, CSS classes, or layout structure
- **DO NOT** break existing functionality (progression, auth, XP, roadmap)
- **DO NOT** change database schema or migrations
- **DO NOT** change routes or page URLs
- **DO NOT** change package.json dependencies or composer.json packages
- All existing tests must pass after refactoring
- Build must complete with zero errors

---

## Target Backend Structure

```
app/
├── Actions/
│   ├── Auth/
│   │   ├── LoginAction.php
│   │   └── RegisterUserAction.php
│   └── Lessons/
│       ├── CompleteLessonAction.php
│       └── AwardLessonXpAction.php
├── DTOs/
│   ├── LessonProgressData.php
│   ├── ValidationResult.php
│   └── UserSessionData.php
├── Enums/
│   ├── LessonStatus.php       (locked, unlocked, completed)
│   ├── LessonSlug.php         (setup, validation, routing)
│   ├── Difficulty.php         (مبتدئ, متوسط, متقدم)
│   └── XpReward.php           (setup => 100, validation => 150, etc.)
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── LoginController.php
│   │   │   └── RegisterController.php
│   │   ├── Lessons/
│   │   │   ├── SetupLessonController.php
│   │   │   ├── ValidationLessonController.php
│   │   │   └── LessonDocsController.php
│   │   ├── Progress/
│   │   │   ├── CompleteLessonController.php
│   │   │   └── ProgressionStatusController.php
│   │   ├── RoadmapController.php
│   │   ├── HomeController.php
│   │   └── ValidationDemoController.php
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php
│   └── Requests/
│       ├── Auth/
│       │   ├── LoginRequest.php
│       │   └── RegisterRequest.php
│       ├── Lessons/
│       │   └── CompleteLessonRequest.php
│       └── ValidationDemoRequest.php
├── Models/
│   ├── User.php
│   ├── LessonProgress.php
│   ├── UserProgress.php
│   ├── Lesson.php
│   ├── Roadmap.php
│   └── Achievement.php
├── Services/
│   ├── Lesson/
│   │   ├── LessonProgressionService.php
│   │   ├── LessonUnlockService.php
│   │   └── LessonCompletionService.php
│   ├── XP/
│   │   ├── XpAwardService.php
│   │   └── XpCalculatorService.php
│   ├── Progression/
│   │   └── ProgressionService.php
│   └── Gamification/
│       ├── LevelService.php
│       └── AchievementService.php
├── Repositories/
│   ├── LessonProgressRepository.php
│   └── UserRepository.php
├── Support/
│   ├── helpers.php
│   └── AppConstants.php
└── Traits/
    ├── HasXp.php
    └── HasProgression.php
```

## Target Frontend Structure

```
resources/js/
├── app.jsx
│
├── core/
│   ├── api/
│   │   ├── client.js              (fetch wrapper with CSRF)
│   │   ├── lessons.js             (lesson API calls)
│   │   └── progression.js         (progression API calls)
│   ├── hooks/
│   │   ├── useProgression.ts
│   │   ├── useLesson.ts
│   │   ├── useXp.ts
│   │   └── useInertia.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── constants/
│   │   ├── lessons.ts
│   │   └── xp.ts
│   ├── providers/
│   │   └── ProgressionProvider.tsx
│   ├── store/
│   │   └── progression.ts
│   └── types/
│       ├── lesson.ts
│       ├── progression.ts
│       └── auth.ts
│
├── layouts/
│   ├── MainLayout/
│   │   ├── MainLayout.jsx
│   │   ├── MainHeader.tsx
│   │   └── MainFooter.tsx
│   └── LessonLayout/
│       └── LessonLayout.jsx
│
├── shared/
│   ├── components/
│   │   ├── LamLogo.tsx
│   │   ├── AmbientBackdrop.tsx
│   │   └── LoadingScreen.tsx
│   ├── ui/                        (shadcn/ui untouched)
│   ├── animations/
│   │   └── confetti.tsx
│   ├── effects/
│   │   └── floating-particles.tsx
│   ├── motion/
│   │   └── fade-in.tsx
│   └── icons/
│       └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── pages/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   │
│   ├── landing/
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroVisual.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Technologies.tsx
│   │   │   ├── Vision.tsx
│   │   │   └── LessonPreview.tsx
│   │   └── pages/
│   │       └── Landing.jsx
│   │
│   ├── roadmap/
│   │   ├── components/
│   │   │   ├── RoadmapMap.tsx
│   │   │   ├── RoadmapNode.tsx
│   │   │   ├── RoadmapHeader.tsx
│   │   │   ├── RoadmapSidebar.tsx
│   │   │   └── RoadmapCta.tsx
│   │   └── pages/
│   │       └── Roadmap.jsx
│   │
│   ├── lesson-setup/
│   │   ├── components/
│   │   │   ├── CinematicIntro.tsx
│   │   │   ├── TerminalSimulator.tsx
│   │   │   ├── ProjectExplorer.tsx
│   │   │   ├── RequestLifecycleViz.tsx
│   │   │   ├── ArtisanSection.tsx
│   │   │   ├── MiniMissions.tsx
│   │   │   ├── MiniDemo.tsx
│   │   │   └── FinalChallenge.tsx
│   │   ├── orchestrator/
│   │   │   └── SetupExperience.tsx
│   │   └── pages/
│   │       └── Setup.jsx
│   │
│   ├── lesson-validation/
│   │   ├── components/
│   │   │   ├── AstronautForm.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── RequestRadar.tsx
│   │   │   ├── ChallengeCard.tsx
│   │   │   ├── LessonHeader.tsx
│   │   │   ├── FailureExplainer.tsx
│   │   │   ├── LineAnnotations.tsx
│   │   │   └── MascotPanel.tsx
│   │   ├── orchestrator/
│   │   │   └── LessonExperience.tsx
│   │   └── pages/
│   │       └── Validation.jsx
│   │
│   └── lesson-docs/
│       ├── components/
│       │   ├── ChaptersSidebar.tsx
│       │   ├── ChapterContent.tsx
│       │   ├── ChapterRegistry.tsx
│       │   ├── SearchBar.tsx
│       │   ├── ProgressBar.tsx
│       │   └── Playground.tsx
│       └── pages/
│           └── ValidationDocs.jsx
│
├── Pages/                         (keep as thin wrappers ONLY — delegates to features)
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Lessons/
│   │   ├── Setup.jsx
│   │   ├── Validation.jsx
│   │   └── ValidationDocs.jsx
│   ├── Landing.jsx
│   └── Roadmap.jsx
│
├── app.jsx                        (entry)
└── css/
    └── app.css
```

---

## Migration Steps (ordered)

### Phase 1: Backend Foundation (no behavior changes)

**Step 1: Create directories**
```bash
mkdir -p app/{Actions/{Auth,Lessons},DTOs,Enums,Repositories,Support,Traits}
mkdir -p app/Http/Controllers/{Auth,Lessons,Progress}
mkdir -p app/Http/Requests/{Auth,Lessons}
mkdir -p app/Services/{Lesson,XP,Progression,Gamification}
```

**Step 2: Create Enums**

`app/Enums/LessonSlug.php`:
```php
<?php
namespace App\Enums;

enum LessonSlug: string
{
    case SETUP = 'setup';
    case VALIDATION = 'validation';
    case ROUTING = 'routing';

    public function xpReward(): int
    {
        return match ($this) {
            self::SETUP => 100,
            self::VALIDATION => 150,
            self::ROUTING => 150,
        };
    }

    public function title(): string
    {
        return match ($this) {
            self::SETUP => 'البداية',
            self::VALIDATION => 'التحقق من البيانات',
            self::ROUTING => 'التوجيه',
        };
    }

    public function order(): int
    {
        return match ($this) {
            self::SETUP => 0,
            self::VALIDATION => 1,
            self::ROUTING => 2,
        };
    }
}
```

`app/Enums/LessonStatus.php`:
```php
<?php
namespace App\Enums;

enum LessonStatus: string
{
    case LOCKED = 'locked';
    case UNLOCKED = 'unlocked';
    case COMPLETED = 'completed';
}
```

`app/Enums/Difficulty.php`:
```php
<?php
namespace App\Enums;

enum Difficulty: string
{
    case BEGINNER = 'مبتدئ';
    case INTERMEDIATE = 'متوسط';
    case ADVANCED = 'متقدم';
}
```

**Step 3: Create DTOs**

`app/DTOs/LessonProgressData.php`:
```php
<?php
namespace App\DTOs;

readonly class LessonProgressData
{
    public function __construct(
        public string $lessonSlug,
        public bool $completed,
        public ?string $completedAt,
        public int $xpAwarded,
    ) {}
}
```

`app/DTOs/UserSessionData.php`:
```php
<?php
namespace App\DTOs;

readonly class UserSessionData
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public int $xp,
        public int $level,
        public array $completedLessons,
        public array $unlockedLessons,
        public string $currentLesson,
        public ?string $avatar,
    ) {}
}
```

**Step 4: Create Traits**

`app/Traits/HasXp.php`:
```php
<?php
namespace App\Traits;

trait HasXp
{
    public function awardXp(int $amount): void
    {
        $this->increment('xp', $amount);
    }

    public function getTotalXp(): int
    {
        return $this->xp ?? 0;
    }
}
```

`app/Traits/HasProgression.php`:
```php
<?php
namespace App\Traits;

use App\Models\LessonProgress;

trait HasProgression
{
    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function hasCompleted(string $slug): bool
    {
        return $this->lessonProgress()
            ->where('lesson_slug', $slug)
            ->whereNotNull('completed_at')
            ->exists();
    }
}
```

**Step 5: Create Repositories**

`app/Repositories/LessonProgressRepository.php`:
```php
<?php
namespace App\Repositories;

use App\Models\LessonProgress;
use App\Models\User;

class LessonProgressRepository
{
    public function findForUser(User $user, string $slug): ?LessonProgress
    {
        return LessonProgress::where('user_id', $user->id)
            ->where('lesson_slug', $slug)
            ->first();
    }

    public function completedSlugs(User $user): array
    {
        return LessonProgress::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->pluck('lesson_slug')
            ->toArray();
    }

    public function createOrUpdate(User $user, string $slug, int $xp): LessonProgress
    {
        return LessonProgress::updateOrCreate(
            ['user_id' => $user->id, 'lesson_slug' => $slug],
            ['completed_at' => now(), 'xp_awarded' => $xp],
        );
    }

    public function completionCount(User $user): int
    {
        return LessonProgress::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->count();
    }
}
```

**Step 6: Extract Actions (thin, single-responsibility)**

`app/Actions/Lessons/CompleteLessonAction.php`:
```php
<?php
namespace App\Actions\Lessons;

use App\DTOs\LessonProgressData;
use App\Enums\LessonSlug;
use App\Models\User;
use App\Repositories\LessonProgressRepository;
use App\Services\XP\XpAwardService;
use App\Services\Gamification\LevelService;

readonly class CompleteLessonAction
{
    public function __construct(
        private LessonProgressRepository $progressRepo,
        private XpAwardService $xpService,
        private LevelService $levelService,
    ) {}

    public function execute(User $user, LessonSlug $slug): LessonProgressData
    {
        $existing = $this->progressRepo->findForUser($user, $slug->value);

        if ($existing && $existing->completed_at) {
            return new LessonProgressData(
                lessonSlug: $slug->value,
                completed: true,
                completedAt: $existing->completed_at->toISOString(),
                xpAwarded: 0,
            );
        }

        $xp = $slug->xpReward();
        $this->xpService->award($user, $xp);
        $progress = $this->progressRepo->createOrUpdate($user, $slug->value, $xp);
        $this->levelService->recalculate($user);

        return new LessonProgressData(
            lessonSlug: $slug->value,
            completed: true,
            completedAt: $progress->completed_at->toISOString(),
            xpAwarded: $xp,
        );
    }
}
```

**Step 7: Segment Services**

Move business logic from `ProgressionService` into focused services:

- `Services/Lesson/LessonUnlockService.php` — unlock rules logic
- `Services/Lesson/LessonCompletionService.php` — completion orchestration
- `Services/XP/XpAwardService.php` — XP award with anti-abuse
- `Services/XP/XpCalculatorService.php` — XP calculation formulas
- `Services/Progression/ProgressionService.php` — combined status queries
- `Services/Gamification/LevelService.php` — level calculation
- `Services/Gamification/AchievementService.php` — achievement checks

**Step 8: Slim Controllers**

Each controller becomes a thin pass-through:

```php
class CompleteLessonController extends Controller
{
    public function __construct(
        private CompleteLessonAction $completeLesson,
        private LessonUnlockService $unlockService,
    ) {}

    public function __invoke(Request $request, string $lesson): JsonResponse
    {
        $slug = LessonSlug::tryFrom($lesson);
        if (!$slug) {
            return response()->json(['message' => 'الدرس غير موجود'], 404);
        }

        if (!$this->unlockService->isUnlocked($request->user(), $slug)) {
            return response()->json(['message' => 'هذا الدرس مقفل'], 403);
        }

        $result = $this->completeLesson->execute($request->user(), $slug);

        return response()->json([
            'success' => true,
            'already_completed' => $result->xpAwarded === 0,
            'xp_awarded' => $result->xpAwarded,
            'total_xp' => $request->user()->fresh()->xp,
            'level' => $request->user()->level,
        ]);
    }
}
```

Similarly split:
- `LessonController` → `SetupLessonController`, `ValidationLessonController`, `LessonDocsController`
- `ProgressionController` → `CompleteLessonController`, `ProgressionStatusController`
- `Auth/LoginController`, `Auth/RegisterController` → keep but use Actions

**Step 9: Update Routes**

```php
// Lessons
Route::get('lessons/setup', [SetupLessonController::class, 'show'])->name('lessons.setup');
Route::get('lessons/validation', [ValidationLessonController::class, 'show'])->name('lessons.validation');
Route::get('lessons/validation-docs', [LessonDocsController::class, 'show'])->name('lessons.validation-docs');

// Progression
Route::post('lessons/{lesson}/complete', CompleteLessonController::class)->name('lessons.complete');
Route::get('progression', ProgressionStatusController::class)->name('progression.status');
```

**Step 10: Update HandleInertiaRequests**

Use `UserSessionData` DTO and `ProgressionService`:

```php
public function share(Request $request): array
{
    $user = $request->user();

    return [
        ...parent::share($request),
        'auth' => [
            'user' => $user
                ? (new UserSessionData(
                    id: $user->id,
                    name: $user->name,
                    email: $user->email,
                    xp: $user->xp ?? 0,
                    level: $user->level ?? 1,
                    completedLessons: app(ProgressionService::class)->completedLessons($user),
                    unlockedLessons: app(ProgressionService::class)->unlockedLessons($user),
                    currentLesson: app(ProgressionService::class)->currentLessonSlug($user),
                    avatar: null,
                ))->toArray()
                : null,
        ],
    ];
}
```

---

### Phase 2: Frontend Refactoring

**Step 0: Delete orphaned scaffolding (Next.js + duplicate components)**

**0a — Delete Next.js scaffolding**

The `resources/js/pages/` folder (lowercase `p`) is leftover from a previous Next.js setup. Inertia uses `resources/js/Pages/` (uppercase `P`). Delete the orphaned directory:

```bash
rm -rf resources/js/pages/
```

Files to remove:
| File | Reason |
|---|---|
| `resources/js/pages/globals.css` | Duplicate of `resources/css/app.css` |
| `resources/js/pages/layout.tsx` | Next.js layout — unused by Inertia |
| `resources/js/pages/page.tsx` | Next.js home page — unused |
| `resources/js/pages/lesson/page.tsx` | Next.js lesson page — unused |
| `resources/js/pages/login/page.tsx` | Next.js login page — unused |
| `resources/js/pages/register/page.tsx` | Next.js register page — unused |
| `resources/js/pages/roadmap/page.tsx` | Next.js roadmap page — unused |

Also remove any Next.js config files if present:
```bash
rm -f next.config.js next.config.ts next-env.d.ts
```

**0b — Delete duplicate root-level roadmap components**

The `resources/js/components/` directory has duplicate copies of roadmap components at the root level alongside the canonical versions in `resources/js/components/roadmap/`. The `Pages/Roadmap.jsx` only imports from `@/components/roadmap/`, so the root-level duplicates are dead code:

```bash
rm -f resources/js/components/roadmap-map.tsx
rm -f resources/js/components/roadmap-header.tsx
rm -f resources/js/components/roadmap-cta.tsx
rm -f resources/js/components/roadmap-sidebar.tsx
```

| File | Reason |
|---|---|
| `components/roadmap-map.tsx` | Duplicate of `components/roadmap/roadmap-map.tsx` — has `href: "/lesson"` (old route) vs the subdir version has `href: "/lessons/setup"` |
| `components/roadmap-header.tsx` | Duplicate of `components/roadmap/roadmap-header.tsx` |
| `components/roadmap-cta.tsx` | Duplicate of `components/roadmap/roadmap-cta.tsx` — has old `href: "/lesson"` link |
| `components/roadmap-sidebar.tsx` | Duplicate of `components/roadmap/roadmap-sidebar.tsx` |

Verify no imports reference these root-level duplicates:
```bash
rg "from '@/components/roadmap-map'" resources/js/
rg "from '@/components/roadmap-header'" resources/js/
rg "from '@/components/roadmap-cta'" resources/js/
rg "from '@/components/roadmap-sidebar'" resources/js/
```

All should return zero results — `Pages/Roadmap.jsx` imports from `@/components/roadmap/roadmap-map` (subdirectory path).

**Step 1: Create directories**
```bash
mkdir -p resources/js/{core/{api,hooks,utils,constants,providers,store,types},shared/{components,ui,animations,effects,motion,icons}}
mkdir -p resources/js/features/{auth/components/pages,landing/components/pages,roadmap/components/pages,lesson-setup/{components,orchestrator,pages},lesson-validation/{components,orchestrator,pages},lesson-docs/{components,pages}}
```

**Step 2: Core layer**

`core/api/client.ts` — fetch wrapper with CSRF, error handling, base URL:
```ts
const csrfToken = document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? ''

export async function apiPost<T>(url: string, body?: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new ApiError(res.status, await res.json())
  return res.json()
}
```

`core/api/progression.ts`:
```ts
export function completeLesson(slug: string) {
  return apiPost(`/lessons/${slug}/complete`)
}
```

`core/hooks/useProgression.ts` — typed hook wrapping `usePage().props.auth.user`:
```ts
import { usePage } from '@inertiajs/react'
import type { UserProgression } from '@/core/types/progression'

export function useProgression(): UserProgression {
  const { auth } = usePage().props as any
  return auth?.user ?? { xp: 0, level: 1, completed_lessons: [], unlocked_lessons: [], current_lesson: 'setup' }
}
```

`core/types/progression.ts`:
```ts
export interface UserProgression {
  id: number
  name: string
  email: string
  xp: number
  level: number
  completed_lessons: string[]
  unlocked_lessons: string[]
  current_lesson: string
  avatar: string | null
}
```

**Step 3: Move components into features**

File moves (content unchanged):

| Current Path | New Path |
|---|---|
| `components/landing/hero.tsx` | `features/landing/components/Hero.tsx` |
| `components/lesson/setup/terminal-simulator.tsx` | `features/lesson-setup/components/TerminalSimulator.tsx` |
| `components/lesson/lesson-experience.tsx` | `features/lesson-validation/orchestrator/LessonExperience.tsx` |
| `components/lesson/setup/setup-experience.tsx` | `features/lesson-setup/orchestrator/SetupExperience.tsx` |
| `components/lesson/docs/validation-docs.tsx` | `features/lesson-docs/pages/ValidationDocs.jsx` → kept as page |
| `components/lesson/docs/chapter-registry.tsx` | `features/lesson-docs/components/ChapterRegistry.tsx` |
| `components/roadmap/roadmap-map.tsx` | `features/roadmap/components/RoadmapMap.tsx` |
| `components/roadmap/roadmap-header.tsx` | `features/roadmap/components/RoadmapHeader.tsx` |
| `components/roadmap/roadmap-sidebar.tsx` | `features/roadmap/components/RoadmapSidebar.tsx` |
| `components/roadmap/roadmap-cta.tsx` | `features/roadmap/components/RoadmapCta.tsx` |

**Step 4: Update import paths**

Every component import across `Pages/` and `features/` must be updated to point to the new locations.

Example — `Pages/Roadmap.jsx` after:
```jsx
import { RoadmapHeader } from '@/features/roadmap/components/RoadmapHeader'
import { RoadmapMap } from '@/features/roadmap/components/RoadmapMap'
import { RoadmapSidebar } from '@/features/roadmap/components/RoadmapSidebar'
import { RoadmapCta } from '@/features/roadmap/components/RoadmapCta'
```

Example — `Pages/Lessons/Setup.jsx` after:
```jsx
import { SetupExperience } from '@/features/lesson-setup/orchestrator/SetupExperience'
```

**Step 5: Move shared components**

| Current Path | New Path |
|---|---|
| `components/lam-logo.tsx` | `shared/components/LamLogo.tsx` |
| `components/ambient-backdrop.tsx` | `shared/components/AmbientBackdrop.tsx` |
| `components/loading-screen.tsx` | `shared/components/LoadingScreen.tsx` |
| `components/confetti.tsx` | `shared/animations/confetti.tsx` |
| `components/ui/*` | `shared/ui/*` (keep as is) |
| `components/site-header.tsx` | `layouts/MainLayout/MainHeader.tsx` |
| `components/site-footer.tsx` | `layouts/MainLayout/MainFooter.tsx` |

**Step 6: Move layouts and utilities**

Move `resources/js/Layouts/` into the new layout structure:
```bash
mv resources/js/Layouts/MainLayout.jsx resources/js/layouts/MainLayout/
mv resources/js/Layouts/LessonLayout.jsx resources/js/layouts/LessonLayout/
rmdir resources/js/Layouts/
```

Merge `resources/js/lib/utils.ts` into `resources/js/core/utils/cn.ts`:
```bash
mkdir -p resources/js/core/utils
cp resources/js/lib/utils.ts resources/js/core/utils/cn.ts
```

Then update all imports of `@/lib/utils` to `@/core/utils/cn` across the codebase:
```bash
rg -l "from '@/lib/utils'" resources/js/ --type-add 'frontend:*.{ts,tsx,jsx,js}' -t frontend
```
For each file found, replace `from '@/lib/utils'` with `from '@/core/utils/cn'`.

**Step 7: Update `vite.config.js` aliases**

Ensure `@/` resolves to `resources/js/` so all imports continue working:

```js
resolve: {
  alias: {
    '@': '/resources/js',
  },
},
```

No changes needed if already configured — just ensure feature paths work.

**Step 7: Update `app.jsx` entry**

Keep as is — only the `resolve` callback for Inertia pages needs updating if page paths change. Since we keep `Pages/` as thin wrappers, no changes needed to `app.jsx`.

---

## Testing the Refactor

1. **Build**: `npm run build` — must succeed with zero errors
2. **PHPStan/Pint**: `./vendor/bin/pint --test` — must pass
3. **Visual regression**: manually verify each page renders identically:
   - Landing `/`
   - Login `/login`
   - Register `/register`
   - Roadmap `/roadmap`
   - Setup lesson `/lessons/setup`
   - Validation lesson `/lessons/validation`
   - Validation docs `/lessons/validation-docs`
4. **Progression flow**: complete Setup → verify Validation unlocks → verify roadmap updates
5. **XP persistence**: complete lesson → logout → login → verify XP retained
6. **Anti-abuse**: replay completed lesson → verify no additional XP

---

## Naming Conventions

- **Actions**: verb + noun + `Action` (e.g., `CompleteLessonAction`, `AwardXpAction`)
- **DTOs**: noun + `Data` (e.g., `LessonProgressData`)
- **Enums**: singular noun (e.g., `LessonSlug`, `LessonStatus`)
- **Services**: noun + `Service` (e.g., `XpAwardService`, `LevelService`)
- **Repositories**: noun + `Repository` (e.g., `LessonProgressRepository`)
- **Controllers**: plural resource + `Controller` (e.g., `SetupLessonController`)
- **Traits**: `Has` + noun (e.g., `HasXp`, `HasProgression`)
- **Frontend features**: `kebab-case` feature folder, `PascalCase` components
- **Frontend hooks**: `use` + noun (e.g., `useProgression`, `useLesson`)

---

## Verification Checklist

- [ ] `resources/js/pages/` (lowercase Next.js) deleted entirely
- [ ] `resources/js/components/roadmap-map.tsx` (root duplicate) deleted
- [ ] `resources/js/components/roadmap-header.tsx` (root duplicate) deleted
- [ ] `resources/js/components/roadmap-cta.tsx` (root duplicate) deleted
- [ ] `resources/js/components/roadmap-sidebar.tsx` (root duplicate) deleted
- [ ] No import references to any deleted file remain
- [ ] `resources/js/Layouts/` moved to `resources/js/layouts/`
- [ ] `resources/js/lib/utils.ts` merged into `resources/js/core/utils/cn.ts`, all imports updated
- [ ] All routes unchanged (URLs work the same)
- [ ] All Inertia page names unchanged (resolve paths correct)
- [ ] All frontend imports updated
- [ ] No UI/CSS changes
- [ ] Build passes (`npx vite build`)
- [ ] Auth flow works (login, register, logout)
- [ ] Setup lesson completes and awards XP
- [ ] Validation lesson unlocks after setup
- [ ] Roadmap shows correct dynamic states
- [ ] XP persists across sessions
- [ ] Replaying lesson awards zero XP
