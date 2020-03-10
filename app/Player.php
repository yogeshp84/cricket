<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['team_id', 'firstName', 'lastName', 'image', 'jerseyNumber', 'matchesPlayed', 'totalsRunScored', 'highestScore','fifties','hundreds','country'];
    /**
     * Get the team that owns the playe.
     */
    public function team()
    {
        return $this->belongsTo('App\Team');
    }
}
