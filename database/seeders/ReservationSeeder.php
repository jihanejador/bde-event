<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $etudiant = User::where('role', 'etudiant')->first();
        $event = Event::first();

        if ($etudiant && $event) {
            Reservation::create([
                'user_id' => $etudiant->id,
                'event_id' => $event->id,
                'numero_reservation' => 'BDE-2026-' . strtoupper(Str::random(6)),
            ]);
        }
    }
}
