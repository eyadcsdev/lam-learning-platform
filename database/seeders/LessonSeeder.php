<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Roadmap;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $roadmaps = Roadmap::where('is_active', true)->get();

        foreach ($roadmaps as $roadmap) {
            $lessons = [];

            if ($roadmap->slug === 'laravel') {
                $lessons = [
                    ['title' => 'البداية', 'subtitle' => 'إعداد البيئة وأساسيات Laravel', 'slug' => 'setup', 'difficulty' => 'مبتدئ', 'xp_reward' => 100, 'order' => 1],
                    ['title' => 'التحقق من البيانات', 'subtitle' => 'Validation في Laravel', 'slug' => 'validation', 'difficulty' => 'مبتدئ', 'xp_reward' => 150, 'order' => 2],
                    ['title' => 'التوجيه', 'subtitle' => 'Routing في Laravel', 'slug' => 'routing', 'difficulty' => 'مبتدئ', 'xp_reward' => 150, 'order' => 3],
                    ['title' => 'قواعد البيانات', 'subtitle' => 'Eloquent ORM و Migrations', 'slug' => 'database', 'difficulty' => 'متوسط', 'xp_reward' => 200, 'order' => 4],
                    ['title' => 'المصادقة', 'subtitle' => 'Authentication و Authorization', 'slug' => 'auth', 'difficulty' => 'متوسط', 'xp_reward' => 200, 'order' => 5],
                ];
            }

            foreach ($lessons as $data) {
                Lesson::updateOrCreate(
                    ['roadmap_id' => $roadmap->id, 'slug' => $data['slug']],
                    $data
                );
            }
        }
    }
}
