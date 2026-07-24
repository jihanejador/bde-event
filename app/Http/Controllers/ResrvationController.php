<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Support\Str;

class ResrvationController extends Controller
{
    public function index(){
        $events = Event::withCount('reservations')->latest()->get();
        $userReservations = Reservation::where('user_id', auth()->id())
            ->pluck('event_id')
            ->toArray();

        return view('student.events.index', compact('events', 'userReservations'));

    }

    public function store(Request $request, Event $event){
        $alreadyReserved = Reservation::where('user_id', auth()->id())
            ->where('events_id', $event->id)
            ->exists();

        if ($alreadyReserved){
            return back()->with('error', 'Vous etes deja inscrit a cet evenement !');
        }
    }
}
