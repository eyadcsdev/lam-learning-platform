<?php

namespace Database\Seeders;

use App\Models\Roadmap;
use App\Roadmaps\RoadmapRegistry;
use Illuminate\Database\Seeder;

class RoadmapSeeder extends Seeder
{
    public function run(): void
    {
        $registry = app(RoadmapRegistry::class);

        foreach ($registry->all() as $definition) {
            Roadmap::updateOrCreate(
                ['slug' => $definition->slug()],
                [
                    'title' => $definition->title(),
                    'subtitle' => $definition->subtitle(),
                    'description' => $definition->description(),
                    'icon' => $definition->icon(),
                    'color' => $definition->color(),
                    'order' => $definition->order(),
                    'is_active' => $definition->isActive(),
                ]
            );
        }
    }
}
