<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin - BDE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 p-6 md:p-10 min-h-screen font-sans">
    <div class="max-w-6xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-pink-200/60 shadow-sm">

        <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                    Dashboard Admin
                </h1>
                <p class="text-slate-400 text-sm mt-0.5">Gestion des événements du BDE</p>
            </div>
            <div class="flex items-center gap-3">
                <a href="{{ route('admin.events.create') }}" class="bg-gradient-to-r from-pink-300 via-pink-400 to-sky-300 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition shadow-sm">
                    + Créer un Événement
                </a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-pink-100/70 text-pink-500 hover:bg-pink-200/80 border border-pink-200 px-5 py-2.5 rounded-full font-bold text-sm transition">
                        Déconnexion
                    </button>
                </form>
            </div>
        </div>

        @if(session('success'))
            <div class="bg-sky-100/80 border border-sky-200 text-sky-700 p-4 rounded-2xl mb-6 font-medium text-sm shadow-sm">
                 {{ session('success') }}
            </div>
        @endif

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gradient-to-r from-pink-50 to-sky-50 text-slate-500 text-xs uppercase font-extrabold border-b border-pink-100">
                        <th class="p-4 rounded-l-2xl">Titre</th>
                        <th class="p-4">Date & Heure</th>
                        <th class="p-4">Lieu</th>
                        <th class="p-4">Prix</th>
                        <th class="p-4">Inscrits</th>
                        <th class="p-4">Places Restantes</th>
                        <th class="p-4 rounded-r-2xl text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-pink-50 text-sm font-medium">
                    @forelse($events as $event)
                        <tr class="hover:bg-pink-50/40 transition">
                            <td class="p-4 font-bold text-slate-800">{{ $event->titre }}</td>
                            <td class="p-4 text-slate-500">{{ $event->date }} à {{ $event->heure }}</td>
                            <td class="p-4 text-slate-500">{{ $event->lieu }}</td>
                            <td class="p-4 font-bold text-pink-400">{{ $event->prix == 0 ? 'Gratuit' : $event->prix . ' DH' }}</td>
                            <td class="p-4 font-extrabold text-sky-500">{{ $event->reservations_count }}</td>
                            <td class="p-4">
                                <span class="px-3 py-1 rounded-full text-xs font-bold border {{ $event->places_restantes > 0 ? 'bg-sky-50 text-sky-600 border-sky-200' : 'bg-pink-50 text-pink-600 border-pink-200' }}">
                                    {{ $event->places_restantes }} places
                                </span>
                            </td>
                            <td class="p-4">
                                <div class="flex items-center justify-center gap-2">
                                    <a href="{{ route('admin.events.edit', $event->id) }}" class="bg-sky-100 text-sky-600 hover:bg-sky-200 border border-sky-200 px-3.5 py-1.5 rounded-full text-xs font-bold transition">
                                        Modifier
                                    </a>
                                    <form action="{{ route('admin.events.destroy', $event->id) }}" method="POST" onsubmit="return confirm('Voulez-vous vraiment supprimer cet événement ?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="bg-pink-100 text-pink-600 hover:bg-pink-200 border border-pink-200 px-3.5 py-1.5 rounded-full text-xs font-bold transition">
                                            Supprimer
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="p-8 text-center text-slate-400">Aucun événement créé.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

    </div>
</body>
</html>
