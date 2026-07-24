<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements BDE - Espace Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-4 md:p-8 min-h-screen">
    <div class="max-w-5xl mx-auto">

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Événements BDE 🎓</h1>
                <p class="text-gray-600">Bienvenue, <span class="font-semibold text-indigo-600">{{ auth()->user()->nom }}</span></p>
            </div>
            <div class="flex flex-wrap gap-3 w-full md:w-auto">
                <a href="{{ route('tickets.index') }}" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium shadow-sm">
                    🎟️ Mes Billets
                </a>
                <form action="{{ route('logout') }}" method="POST" class="inline">
                    @csrf
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium shadow-sm">
                        Déconnexion
                    </button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 font-medium shadow-sm flex items-center gap-2">
                ✅ {{ session('success') }}
            </div>
        @endif

        @if(session('error'))
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 font-medium shadow-sm flex items-center gap-2">
                ⚠️ {{ session('error') }}
            </div>
        @endif

        <form method="GET" action="{{ route('events.index') }}" class="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Rechercher un événement..."
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            </div>
            <div>
                <select name="type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <option value="">Tous les prix</option>
                    <option value="gratuit" {{ request('type') == 'gratuit' ? 'selected' : '' }}>Gratuit</option>
                    <option value="payant" {{ request('type') == 'payant' ? 'selected' : '' }}>Payant</option>
                </select>
            </div>
            <div>
                <button type="submit" class="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
                    Filtrer
                </button>
            </div>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @forelse($events as $event)
                @php
                    $isComplet = $event->places_restantes <= 0;
                    $isInscrit = in_array($event->id, $userReservations);
                    $qrabYsaliw = $event->places_restantes > 0 && $event->places_restantes <= 5;
                @endphp

                <div class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                @if(isset($event->categorie))
                                    <span class="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide mr-2">
                                        {{ $event->categorie }}
                                    </span>
                                @endif
                                <h2 class="text-xl font-bold text-gray-800 mt-1">{{ $event->titre }}</h2>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs font-bold shrink-0 {{ $event->prix == 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800' }}">
                                {{ $event->prix == 0 ? 'Gratuit' : number_format($event->prix, 2) . ' DH' }}
                            </span>
                        </div>

                        <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ $event->description }}</p>

                        <div class="text-sm text-gray-500 space-y-2 mb-6 bg-gray-50 p-3 rounded-lg">
                            <p class="flex items-center gap-2">📍 <strong>Lieu:</strong> {{ $event->lieu }}</p>
                            <p class="flex items-center gap-2">📅 <strong>Date:</strong>
                                {{ \Carbon\Carbon::parse($event->date)->format('d/m/Y') }} à {{ $event->heure }}
                            </p>
                            <p class="flex items-center gap-2">🎟️ <strong>Places restantes:</strong>
                                <span class="font-bold {{ $isComplet ? 'text-red-600' : ($qrabYsaliw ? 'text-orange-500' : 'text-green-600') }}">
                                    {{ $event->places_restantes }} / {{ $event->jauge_max }}
                                </span>
                                @if($qrabYsaliw)
                                    <span class="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">Presque complet!</span>
                                @endif
                            </p>
                        </div>
                    </div>

                    <div>
                        @if($isInscrit)
                            <button disabled class="w-full bg-gray-300 text-gray-600 py-2.5 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                                ✓ Déjà Inscrit
                            </button>
                        @elseif($isComplet)
                            <button disabled class="w-full bg-red-100 text-red-500 py-2.5 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                                ❌ Événement Complet
                            </button>
                        @else
                            <form action="{{ route('events.reserve', $event->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-2">
                                    S'inscrire à l'événement
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            @empty
                <div class="col-span-1 md:col-span-2 bg-white p-12 rounded-lg text-center text-gray-500 shadow-sm">
                    <p class="text-lg font-medium mb-1">Aucun événement disponible pour le moment 📭</p>
                    <p class="text-sm text-gray-400">Revenez plus tard ou modifiez vos filtres de recherche.</p>
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
