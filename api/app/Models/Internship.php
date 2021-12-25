<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Internship extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get all of the students for the Internship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function students(): HasMany
    {
        return $this->hasMany(Profile::class, 'internship_id', 'id');
    }

    /**
     * Get the technologies that owns the Internship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function technologies(): BelongsTo
    {
        return $this->belongsTo(Technology::class);
    }

    /**
     * Get the supervisor that owns the Internship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id', 'id');
    }
}
