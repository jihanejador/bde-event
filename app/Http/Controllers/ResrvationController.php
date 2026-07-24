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
    }
}
