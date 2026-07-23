<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard BDE - Événements</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">

        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Dashboard Admin - BDE</h1>
            <div class="flex gap-4">
                <a href="{{ route('admin.events.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Créer un Événement</a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Déconnexion</button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-green-100 text-green-700 p-3 rounded mb-4">{{ session('success') }}</div>
        @endif

        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-3 border">Titre</th>
                    <th class="p-3 border">Date & Heure</th>
                    <th class="p-3 border">Lieu</th>
                    <th class="p-3 border">Prix</th>
                    <th class="p-3 border">Jauge Max</th>
                    <th class="p-3 border">Inscrits</th>
                    <th class="p-3 border">Places Restantes</th>
                </tr>
            </thead>
            <tbody>
                @forelse($events as $event)
                    <tr class="border-b hover:bg-gray-50">
                        <td class="p-3 font-semibold">{{ $event->titre }}</td>
                        <td class="p-3">{{ $event->date }} à {{ $event->heure }}</td>
                        <td class="p-3">{{ $event->lieu }}</td>
                        <td class="p-3">{{ $event->prix == 0 ? 'Gratuit' : $event->prix . ' DH' }}</td>
                        <td class="p-3">{{ $event->jauge_max }}</td>
                        <td class="p-3 font-bold text-blue-600">{{ $event->reservations_count }}</td>
                        <td class="p-3">
                            <span class="px-2 py-1 rounded text-sm {{ $event->places_restantes > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $event->places_restantes }} places
                            </span>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="p-4 text-center text-gray-500">Aucun événement disponible.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

    </div>
</body>
</html>
