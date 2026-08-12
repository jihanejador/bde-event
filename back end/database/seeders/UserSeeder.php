<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => 'Admin BDE',
            'email' => 'admin@bde.com',
            'password' =>Hash::make('password123'),
            'role' => 'admin',
        ]);
        User::create([
            'nom' => 'Jihane Etudiant',
            'email' => 'jihane@student.com',
            'password' => Hash::make('password123'),
            'role' => 'etudiant',
        ]);
    }
}
