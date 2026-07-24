<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Événements BDE - Espace Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-800 p-8 min-h-screen">
    <div class="max-w-5xl mx-auto">

        <div class="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-md border border-pink-200/60 p-6 rounded-2xl shadow-sm">
            <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
                    Événements BDE ✨
                </h1>
                <p class="text-slate-500 text-sm mt-0.5">Bienvenue, <span class="font-semibold text-pink-500">{{ auth()->user()->nom }}</span></p>
            </div>
            <div class="flex gap-3">
                <a href="{{ route('tickets.index') }}" class="bg-sky-100/80 text-sky-700 hover:bg-sky-200/80 border border-sky-200 px-4 py-2 rounded-xl transition text-sm font-semibold flex items-center gap-2">
                     Mes Billets
                </a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-pink-100/80 text-pink-700 hover:bg-pink-200/80 border border-pink-200 px-4 py-2 rounded-xl transition text-sm font-semibold">
                        Déconnexion
                    </button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-sky-100 border border-sky-200 text-sky-800 p-4 rounded-xl mb-6 font-medium text-sm">{{ session('success') }}</div>
        @endif

        @if(session('error'))
            <div class="bg-pink-100 border border-pink-200 text-pink-800 p-4 rounded-xl mb-6 font-medium text-sm">{{ session('error') }}</div>
        @endif

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @forelse($events as $event)
                @php
                    $isComplet = $event->places_restantes <= 0;
                    $isInscrit = in_array($event->id, $userReservations);
                @endphp

                <div class="bg-white/90 border border-pink-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                    <div>
                        <div class="flex justify-between items-start gap-3 mb-3">
                            <h2 class="text-xl font-bold text-slate-800">{{ $event->titre }}</h2>
                            <span class="px-3 py-1 rounded-full text-xs font-bold shrink-0 {{ $event->prix == 0 ? 'bg-pink-100 text-pink-700 border border-pink-200' : 'bg-sky-100 text-sky-700 border border-sky-200' }}">
                                {{ $event->prix == 0 ? 'Gratuit' : $event->prix . ' DH' }}
                            </span>
                        </div>
                        <p class="text-slate-600 text-sm mb-6 leading-relaxed">{{ $event->description }}</p>

                        <div class="bg-gradient-to-r from-pink-50/50 to-sky-50/50 rounded-xl p-4 space-y-2 text-xs text-slate-600 mb-6 border border-pink-100/60">
                            <div class="flex items-center gap-2">
                                <span class="font-medium">📍 Lieu:</span>
                                <span class="text-slate-700">{{ $event->lieu }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-medium"> Date:</span>
                                <span class="text-slate-700">{{ $event->date }} à {{ $event->heure }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-medium"> Dispo:</span>
                                <span class="font-bold {{ $isComplet ? 'text-pink-600' : 'text-sky-600' }}">
                                    {{ $event->places_restantes }} / {{ $event->jauge_max }} places
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        @if($isInscrit)
                            <div class="space-y-2">
                                <div class="w-full bg-sky-100 text-sky-800 py-2.5 rounded-xl font-semibold text-center text-sm border border-sky-200">
                                    ✓ Déjà Inscrit
                                </div>
                                <form action="{{ route('events.cancel', $event->id) }}" method="POST" onsubmit="return confirm('Voulez-vous vraiment annuler votre réservation ?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="w-full bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 py-2 rounded-xl text-xs font-semibold transition-all">
                                        Annuler ma réservation
                                    </button>
                                </form>
                            </div>
                        @elseif($isComplet)
                            <button disabled class="w-full bg-slate-100 text-slate-400 border border-slate-200 py-2.5 rounded-xl font-semibold text-sm cursor-not-allowed">
                                 Événement Complet
                            </button>
                        @else
                            <form action="{{ route('events.reserve', $event->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm">
                                    Réserver ma place
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            @empty
                <div class="col-span-2 bg-white/80 border border-pink-100 p-10 rounded-2xl text-center text-slate-400">
                    Aucun événement disponible pour le moment.
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
