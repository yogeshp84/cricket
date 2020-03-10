<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $gaurded = ['id'];
    protected $fillable = ['name','logo','state'];
     /**
     * Get the Players for the team post.
     */
    public function Player()
    {
        return $this->hasMany('App\Player');
    }
}
