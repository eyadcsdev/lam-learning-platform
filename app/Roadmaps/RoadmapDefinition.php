<?php

namespace App\Roadmaps;

abstract class RoadmapDefinition
{
    abstract public function slug(): string;

    abstract public function title(): string;

    abstract public function subtitle(): string;

    abstract public function description(): string;

    abstract public function icon(): string;

    abstract public function color(): string;

    abstract public function order(): int;

    abstract public function isActive(): bool;

    /** @return array<int, array{title: string, subtitle: string, slug: string, difficulty: string, xp_reward: int, order: int}> */
    abstract public function lessons(): array;

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'slug' => $this->slug(),
            'title' => $this->title(),
            'subtitle' => $this->subtitle(),
            'description' => $this->description(),
            'icon' => $this->icon(),
            'color' => $this->color(),
            'order' => $this->order(),
            'is_active' => $this->isActive(),
            'lessons' => $this->isActive() ? $this->lessons() : [],
        ];
    }
}
