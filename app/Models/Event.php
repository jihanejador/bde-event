<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'date',
        'heure',
        'lieu',
        'prix',
        'jauge_max',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function getPlacesRestantesAttribute()
    {
        return $this->jauge_max - $this->reservations()->count();
    }
}
