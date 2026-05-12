<?php

namespace App\Roadmaps;

class ComingSoonRoadmap extends RoadmapDefinition
{
    public function __construct(
        private readonly string $slug,
        private readonly string $title,
        private readonly string $subtitle,
        private readonly string $description,
        private readonly string $icon,
        private readonly string $color,
        private readonly int $order,
    ) {}

    public function slug(): string
    {
        return $this->slug;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function subtitle(): string
    {
        return $this->subtitle;
    }

    public function description(): string
    {
        return $this->description;
    }

    public function icon(): string
    {
        return $this->icon;
    }

    public function color(): string
    {
        return $this->color;
    }

    public function order(): int
    {
        return $this->order;
    }

    public function isActive(): bool
    {
        return false;
    }

    public function lessons(): array
    {
        return [];
    }
}
