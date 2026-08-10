<?php

namespace App\Http\Middeware;

closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin {
    public function handle(Request $request, Closure $next): Response{
        if($request->user() && $request->user()->role === 'admin'){
            return $next($request);
        }
        return response()->json([
            'message'=>'Acces refuse : Espave reserve exclusivement aux administrateur du BDE.'
        ], 403);
    }
}