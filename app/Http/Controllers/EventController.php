<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function adminIndex(){
        if(auth()->user()->role !== 'admin'){
            abort(403, 'Acces refuse : Espace reserve a l\'admin.');
        }

        $events = Event::withCount('reservations')->latest()->get();
        return view('admin.events.index', compact('events'));
    }

    public function create(){
        if(auth()->user()->role !== 'admin'){
            abort(403, 'Acces refuse : Espace reserve a l\'admin.');
        }
        return view('admin.events.create');
    }
}
