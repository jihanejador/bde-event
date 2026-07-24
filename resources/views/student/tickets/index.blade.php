<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mes Billets - Pass Étudiant BDE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">

        <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">🎟️ Mes Billets & Pass Numériques</h1>
                <p class="text-gray-600">Étudiant : {{ auth()->user()->nom }}</p>
            </div>
            <div class="flex gap-4">
                <a href="{{ route('events.index') }}" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">← Tous les Événements</a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Déconnexion</button>
                </form>
            </div>
        </div>

        <div class="space-y-6">
            @forelse($reservations as $reservation)
                <div class="bg-white border-l-8 border-blue-600 rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div class="space-y-2">
                        <span class="inline-block bg-blue-100 text-blue-800 font-mono text-sm px-3 py-1 rounded-full font-bold">
                            N° : {{ $reservation->numero_reservation }}
                        </span>
                        <h2 class="text-xl font-bold text-gray-800">{{ $reservation->event->titre }}</h2>
                        <p class="text-gray-600 text-sm">📍 {{ $reservation->event->lieu }}</p>
                        <p class="text-gray-600 text-sm">📅 {{ $reservation->event->date }} à {{ $reservation->event->heure }}</p>
                    </div>

                    <div class="mt-4 md:mt-0 text-right bg-gray-50 p-4 rounded-lg border">
                        <p class="text-xs text-gray-500 uppercase font-semibold">Titulaire du Pass</p>
                        <p class="font-bold text-gray-800">{{ auth()->user()->nom }}</p>
                        <span class="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">✓ Billet Valide</span>
                    </div>
                </div>
            @empty
                <div class="bg-white p-8 text-center rounded-lg shadow-sm text-gray-500">
                    Vous n'avez encore réservé aucun billet.
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
