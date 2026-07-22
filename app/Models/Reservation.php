<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\str;

class Reservation extends Model
{
    protected $fillable =['numero_reservation', 'user_id', 'event_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function event(){
        return $this->belongsTo(Event::class);
    }
    protected static function boot(){
        parent::boot();

        static::creating(function ($reservation){
            if (empty($reservation->numero_reservation)){
                $reservation->numero_reservation = 'BDE-2026'.strtoupper(Str::random(5));
            }
        });
    }
}
