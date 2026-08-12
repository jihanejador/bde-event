<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::withCount('reservations')->latest()->get();
        return response()->json($events);
    }

    public function show($id)
    {
        $event = Event::withCount('reservations')->findOrFail($id);
        return response()->json($event);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'heure' => 'required',
            'lieu' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'jauge_max' => 'required|integer|min:1',
        ]);

        $event = Event::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Événement créé avec succès !',
            'event' => $event
        ], 201);
    }

    public function update(Request $request, Event $event)
    {
        $totalReservations = $event->reservations()->count();

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'heure' => 'required',
            'lieu' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'jauge_max' => 'required|integer|min:' . $totalReservations,
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Événement mis à jour avec succès !',
            'event' => $event
        ]);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json([
            'message' => 'Événement supprimé avec succès !'
        ]);
    }

    public function stats()
    {
        $events = Event::withCount('reservations')->get()->map(function ($event) {
            return [
                'id' => $event->id,
                'titre' => $event->titre,
                'max_capacity' => $event->jauge_max,
                'bookings_count' => $event->reservations_count,
                'places_restantes' => $event->jauge_max - $event->reservations_count,
            ];
        });

        return response()->json($events);
    }
}