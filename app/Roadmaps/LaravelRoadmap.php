<?php

namespace App\Roadmaps;

class LaravelRoadmap extends RoadmapDefinition
{
    public function slug(): string
    {
        return 'laravel';
    }

    public function title(): string
    {
        return 'Laravel';
    }

    public function subtitle(): string
    {
        return 'إطار عمل PHP الأقوى';
    }

    public function description(): string
    {
        return 'رحلة كاملة لإتقان Laravel من الصفر حتى بناء تطبيقات احترافية، موزّعة على مستويات تفاعلية ومحاكيات حية.';
    }

    public function icon(): string
    {
        return '🐘';
    }

    public function color(): string
    {
        return '#fb503b';
    }

    public function order(): int
    {
        return 1;
    }

    public function isActive(): bool
    {
        return true;
    }

    public function lessons(): array
    {
        return [
            [
                'title' => 'البداية',
                'subtitle' => 'إعداد البيئة وأساسيات Laravel',
                'slug' => 'setup',
                'difficulty' => 'مبتدئ',
                'xp_reward' => 100,
                'order' => 1,
            ],
            [
                'title' => 'التحقق من البيانات',
                'subtitle' => 'Validation في Laravel',
                'slug' => 'validation',
                'difficulty' => 'مبتدئ',
                'xp_reward' => 150,
                'order' => 2,
            ],
            [
                'title' => 'التوجيه',
                'subtitle' => 'Routing في Laravel',
                'slug' => 'routing',
                'difficulty' => 'مبتدئ',
                'xp_reward' => 150,
                'order' => 3,
            ],
            [
                'title' => 'قواعد البيانات',
                'subtitle' => 'Eloquent ORM و Migrations',
                'slug' => 'database',
                'difficulty' => 'متوسط',
                'xp_reward' => 200,
                'order' => 4,
            ],
            [
                'title' => 'المصادقة',
                'subtitle' => 'Authentication و Authorization',
                'slug' => 'auth',
                'difficulty' => 'متوسط',
                'xp_reward' => 200,
                'order' => 5,
            ],
        ];
    }
}
