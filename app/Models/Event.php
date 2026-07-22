<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'description', 'date', 'heure',
        'lieu', 'prix', 'jauge_max', 'user_id'
    ];
    public function admin(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
