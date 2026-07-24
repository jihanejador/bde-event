<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Événements BDE - Espace Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto">

        <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Événements BDE</h1>
                <p class="text-gray-600">Bienvenue, {{ auth()->user()->nom }}</p>
            </div>
            <div class="flex gap-4">
                <a href="{{ route('tickets.index') }}" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center gap-2 font-medium">
                    🎟️ Mes Billets
                </a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Déconnexion</button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-green-100 text-green-700 p-4 rounded mb-6 font-semibold">{{ session('success') }}</div>
        @endif

        @if(session('error'))
            <div class="bg-red-100 text-red-700 p-4 rounded mb-6 font-semibold">{{ session('error') }}</div>
        @endif

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @forelse($events as $event)
                @php
                    $isComplet = $event->places_restantes <= 0;
                    $isInscrit = in_array($event->id, $userReservations);
                @endphp

                <div class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h2 class="text-xl font-bold text-gray-800">{{ $event->titre }}</h2>
                            <span class="px-3 py-1 rounded text-xs font-bold {{ $event->prix == 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800' }}">
                                {{ $event->prix == 0 ? 'Gratuit' : $event->prix . ' DH' }}
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">{{ $event->description }}</p>

                        <div class="text-sm text-gray-500 space-y-1 mb-4">
                            <p>📍 <strong>Lieu:</strong> {{ $event->lieu }}</p>
                            <p>📅 <strong>Date:</strong> {{ $event->date }} à {{ $event->heure }}</p>
                            <p>🎟️ <strong>Places restantes:</strong>
                                <span class="font-bold {{ $isComplet ? 'text-red-600' : 'text-green-600' }}">
                                    {{ $event->places_restantes }} / {{ $event->jauge_max }}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        @if($isInscrit)
                            <!-- Ila kan déjà inscrit: Déjà inscrit + Bouton Annuler -->
                            <div class="space-y-2">
                                <div class="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold text-center">
                                    ✓ Déjà Inscrit
                                </div>
                                <form action="{{ route('events.cancel', $event->id) }}" method="POST" onsubmit="return confirm('Voulez-vous vraiment annuler votre réservation ?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="w-full bg-red-100 text-red-700 py-1.5 rounded text-sm font-semibold hover:bg-red-200 transition">
                                        Annuler ma réservation
                                    </button>
                                </form>
                            </div>
                        @elseif($isComplet)
                            <button disabled class="w-full bg-red-400 text-white py-2 rounded font-semibold cursor-not-allowed">
                                ❌ Événement Complet
                            </button>
                        @else
                            <form action="{{ route('events.reserve', $event->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                                    S'inscrire
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            @empty
                <div class="col-span-2 bg-white p-6 rounded text-center text-gray-500">
                    Aucun événement disponible pour le moment.
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
