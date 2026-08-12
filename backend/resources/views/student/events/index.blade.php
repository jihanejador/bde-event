<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements BDE - Espace Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 p-6 md:p-10 min-h-screen font-sans">
    <div class="max-w-5xl mx-auto">

        <div class="flex flex-col md:flex-row justify-between items-center mb-10 bg-white/80 backdrop-blur-md border border-pink-200/60 p-6 rounded-3xl shadow-sm gap-4">
            <div>
                <h1 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                    Événements BDE
                </h1>
                <p class="text-slate-400 text-sm mt-0.5">Bienvenue, <span class="font-bold text-pink-400">{{ auth()->user()->nom }}</span></p>
            </div>
            <div class="flex items-center gap-3">
                <a href="{{ route('tickets.index') }}" class="bg-white text-sky-500 hover:bg-sky-50 border border-sky-200 px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-bold shadow-sm hover:shadow flex items-center gap-2">
                     Mes Billets
                </a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-pink-100/70 text-pink-500 hover:bg-pink-200/80 border border-pink-200 px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-bold">
                        Déconnexion
                    </button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-sky-100/80 border border-sky-200 text-sky-700 p-4 rounded-2xl mb-6 font-medium text-sm shadow-sm flex items-center gap-2">
                 {{ session('success') }}
            </div>
        @endif

        @if(session('error'))
            <div class="bg-pink-100/80 border border-pink-200 text-pink-700 p-4 rounded-2xl mb-6 font-medium text-sm shadow-sm flex items-center gap-2">
                 {{ session('error') }}
            </div>
        @endif

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @forelse($events as $event)
                @php
                    $isComplet = $event->places_restantes <= 0;
                    $isInscrit = in_array($event->id, $userReservations);
                @endphp

                <div class="bg-white/90 border border-pink-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div>
                        <div class="flex justify-between items-start gap-3 mb-3">
                            <h2 class="text-xl font-bold text-slate-800">{{ $event->titre }}</h2>
                            <span class="px-3 py-1 rounded-full text-xs font-black tracking-wide shrink-0 border {{ $event->prix == 0 ? 'bg-pink-50 text-pink-500 border-pink-200' : 'bg-sky-50 text-sky-500 border-sky-200' }}">
                                {{ $event->prix == 0 ? 'Gratuit' : $event->prix . ' DH' }}
                            </span>
                        </div>
                        <p class="text-slate-500 text-sm mb-6 leading-relaxed">{{ $event->description }}</p>

                        <div class="bg-gradient-to-r from-pink-50/60 to-sky-50/60 rounded-2xl p-4 space-y-2 text-xs text-slate-600 mb-6 border border-pink-100/60">
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-400"> Lieu:</span>
                                <span class="font-semibold text-slate-700">{{ $event->lieu }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-400"> Date:</span>
                                <span class="font-semibold text-slate-700">{{ $event->date }} à {{ $event->heure }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-400"> Dispo:</span>
                                <span class="font-extrabold {{ $isComplet ? 'text-pink-500' : 'text-sky-500' }}">
                                    {{ $event->places_restantes }} / {{ $event->jauge_max }} places
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        @if($isInscrit)
                            <div class="space-y-2">
                                <div class="w-full bg-sky-100/80 text-sky-600 py-2.5 rounded-full font-bold text-center text-sm border border-sky-200">
                                    ✓ Déjà Inscrit
                                </div>
                                <form action="{{ route('events.cancel', $event->id) }}" method="POST" onsubmit="return confirm('Voulez-vous vraiment annuler votre réservation ?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="w-full bg-white hover:bg-pink-50 text-pink-400 border border-pink-200 py-2 rounded-full text-xs font-bold transition-all shadow-sm">
                                        Annuler ma réservation
                                    </button>
                                </form>
                            </div>
                        @elseif($isComplet)
                            <button disabled class="w-full bg-slate-100 text-slate-400 border border-slate-200 py-2.5 rounded-full font-bold text-sm cursor-not-allowed">
                                 Événement Complet
                            </button>
                        @else
                            <form action="{{ route('events.reserve', $event->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-gradient-to-r from-pink-300 via-pink-400 to-sky-300 hover:opacity-90 text-white py-3 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow">
                                    Réserver ma place
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            @empty
                <div class="col-span-2 bg-white/80 border border-pink-100 p-12 rounded-3xl text-center text-slate-400">
                    Aucun événement disponible pour le moment
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
