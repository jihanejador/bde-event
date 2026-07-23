<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controller\AuthController;


Route::get('/', function(){
    return redirect()->route('login');
});
