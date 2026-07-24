<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class TicketController extends Controller
{
    public function index(){
        $reservations = Reservation::with('event')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return view('student.tickets.index', compact('reservations'));
    }
}
