<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roadmap extends Model
{
    protected $fillable = ['title', 'subtitle', 'description', 'icon', 'color', 'slug', 'order'];

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }
}
