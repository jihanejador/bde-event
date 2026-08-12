<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        if($admin){
            Event::create([
                'titre' =>'Soiree d\'Integration BDE 2026',
                'description' => 'Soirée d\'accueil des nouveaux étudiants avec animations et buffet.',
                'date' => '2026-09-15',
                'heure' => '18:00',
                'lieu' => 'Grand Amphithéâtre',
                'prix' => 0.00,
                'jauge_max' => 50,
                'user_id' => $admin->id,
            ]);
            Event::create([
                'titre' => 'Tournoi Gaming E-Sport',
                'description' => 'Compétition FC24 et Valorant inter-filières.',
                'date' => '2026-10-05',
                'heure' => '14:00',
                'lieu' => 'Salle Informatique 3',
                'prix' => 0.00,
                'jauge_max' => 16,
                'user_id' => $admin->id,
            ]);
        }
    }
}
