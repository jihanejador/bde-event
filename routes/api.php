<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ReservationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/events', [EventController::class, 'index']);
Route::get('.events/{id}', [EventController::class. 'show']);


Route::middleware('auth::sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/events/{id}/book', [ReservationController::class, 'store']);
    Route::delete('/events/{id}/cancel', [ReservationController::class, 'destroy']);
    Route::get('/user/tickets', [ReservationController::class, 'userTickets']);
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{event}', [EventController::class, 'update']);
        Route::delete('/events/{event}', [EventController::class, 'destroy']);
        Route::get('/events/stats', [EventController::class, 'stats']);
    });
});
