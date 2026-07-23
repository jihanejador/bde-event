<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controller\AuthController;


Route::get('/', function(){
    return redirect()->route('login');
});

Route::middleware('guest')->group(function (){
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

});

Route::middleware('auth')->group(function (){
    Route::post('/login', [AuthController::class, 'logout'])->name('logout');
    

});
