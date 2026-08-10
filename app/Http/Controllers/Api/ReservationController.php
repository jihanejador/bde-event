<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    public function store(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $userId = $request->user()->id;

        $alreadyReserved = Reservation::where('user_id', $userId)
            ->where('event_id', $event->id)
            ->exists();

        if ($alreadyReserved) {
            return response()->json([
                'message' => 'Vous êtes déjà inscrit à cet événement !'
            ], 400); 
        }

        if ($event->reservations()->count() >= $event->jauge_max) {
            return response()->json([
                'message' => 'Désolé, cet événement est complet !'
            ], 400); 
        }

        $reservation = Reservation::create([
            'user_id' => $userId,
            'event_id' => $event->id,
            'numero_reservation' => 'BDE-2026-' . strtoupper(Str::random(6)),
        ]);

        return response()->json([
            'message' => 'Inscription réussie ! Votre place est réservée.',
            'reservation' => $reservation->load('event')
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $deleted = Reservation::where('user_id', $request->user()->id)
            ->where('event_id', $id)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'message' => 'Aucune réservation trouvée à annuler.'
            ], 404);
        }

        return response()->json([
            'message' => 'Réservation annulée avec succès !'
        ]);
    }

    public function userTickets(Request $request)
    {
        $tickets = Reservation::with('event')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($tickets);
    }
}