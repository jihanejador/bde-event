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

    public function store(Request $request){
        if(auth()->user()->role !== 'admin'){
            abort(403, 'Acces refuse : Espace reserve a l\'admin.');

        }
        $request->validate([
            'titre' => 'required',
            'description' => 'required',
            'date' => 'required',
            'heure' => 'required',
            'lieu' => 'required',
            'prix' => 'required|numeric',
            'jauge_max' => 'required|integer|min:1',
        ]);

        Event::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'date' => $request->date,
            'heure' => $request->heure,
            'lieu' => $request->lieu,
            'prix' => $request->prix,
            'jauge_max' => $request->jauge_max,
            'user_id' => auth()->id(),
        ]);
        return redirect('/admin/events')->with('success', 'Événement créé !');
    }

    public function edit(Event $event){
        return view('admin.events.edit', compact('event'));
    }
}
