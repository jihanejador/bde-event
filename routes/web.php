<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ResrvationController;
use App\Http\Controllers\TicketController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/events', function () {
        return "Bienvenue " . auth()->user()->nom . " (" . auth()->user()->role . ") !";
    })->name('events.index');

    Route::get('/admin/events', [EventController::class, 'adminIndex'])->name('admin.events.index');
    Route::get('/admin/events/create', [EventController::class, 'create'])->name('admin.events.create');
    Route::post('/admin/events', [EventController::class, 'store'])->name('admin.events.store');
    Route::get('/events', [ResrvationController::class, 'index'])->name('events.index');
    Route::post('/events/{event}/reserve', [ResrvationController::class, 'store'])->name('events.reserve');
});
