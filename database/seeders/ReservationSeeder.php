<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;
use App\Models\Reservation;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $etudiant = User::where('role', 'etudiant')->first();
        $event = Event::first();

        if ($etudiant && $event) {
            Reservation::create([
                'user_id' => $etudiant->id,
                'event_id' => $event->id,
            ]);
        }
    }
}
