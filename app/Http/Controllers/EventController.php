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
    }
}
