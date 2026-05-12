<?php

namespace App\Roadmaps;

class RoadmapRegistry
{
    /** @var array<string, RoadmapDefinition> */
    private array $roadmaps = [];

    public function __construct()
    {
        $this->register(new LaravelRoadmap());
        $this->register(new ComingSoonRoadmap(
            slug: 'react',
            title: 'React',
            subtitle: 'مكتبة واجهات المستخدم',
            description: 'تعلّم React من الأساسيات إلى بناء تطبيقات تفاعلية متكاملة مع Hooks و Context و Router.',
            icon: '⚛️',
            color: '#61dafb',
            order: 2,
        ));
        $this->register(new ComingSoonRoadmap(
            slug: 'nextjs',
            title: 'Next.js',
            subtitle: 'إطار عمل React للإنتاج',
            description: 'تعلّم Next.js لبناء تطبيقات React كاملة مع SSR و SSG و App Router.',
            icon: '▲',
            color: '#000000',
            order: 3,
        ));
        $this->register(new ComingSoonRoadmap(
            slug: 'vue',
            title: 'Vue.js',
            subtitle: 'إطار عمل JavaScript التقدمي',
            description: 'تعلّم Vue.js من البداية — Composition API و Pinia و Router.',
            icon: '💚',
            color: '#4fc08d',
            order: 4,
        ));
    }

    public function register(RoadmapDefinition $roadmap): void
    {
        $this->roadmaps[$roadmap->slug()] = $roadmap;
    }

    public function all(): array
    {
        return array_values($this->roadmaps);
    }

    public function allOrdered(): array
    {
        $list = $this->all();
        usort($list, fn (RoadmapDefinition $a, RoadmapDefinition $b) => $a->order() <=> $b->order());
        return $list;
    }

    public function active(): array
    {
        return array_values(array_filter($this->roadmaps, fn (RoadmapDefinition $r) => $r->isActive()));
    }

    public function find(string $slug): ?RoadmapDefinition
    {
        return $this->roadmaps[$slug] ?? null;
    }

    /** @return array<int, array<string, mixed>> */
    public function allToArray(): array
    {
        return array_map(fn (RoadmapDefinition $r) => $r->toArray(), $this->allOrdered());
    }
}
