<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mes Billets - BDE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 p-6 md:p-10 min-h-screen font-sans">
    <div class="max-w-4xl mx-auto">

        <div class="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-md border border-pink-200/60 p-6 rounded-3xl shadow-sm">
            <div>
                <h1 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                    Mes Billets
                </h1>
                <p class="text-slate-400 text-sm mt-0.5">Vos réservations confirmées</p>
            </div>
            <a href="{{ route('events.index') }}" class="bg-white text-pink-500 hover:bg-pink-50 border border-pink-200 px-5 py-2.5 rounded-full transition-all text-sm font-bold shadow-sm">
                ← Événements
            </a>
        </div>

        <div class="space-y-4">
            @forelse($reservations as $reservation)
                <div class="bg-white/90 border border-pink-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="space-y-1">
                        <span class="px-3 py-1 rounded-full text-xs font-bold border bg-sky-50 text-sky-500 border-sky-200">
                            Billet Confirmé
                        </span>
                        <h2 class="text-xl font-bold text-slate-800 mt-2">{{ $reservation->event->titre }}</h2>
                        <p class="text-xs text-slate-500"> {{ $reservation->event->lieu }} |  {{ $reservation->event->date }} à {{ $reservation->event->heure }}</p>
                    </div>

                    <div class="flex items-center gap-3 w-full md:w-auto justify-end">
                        <form action="{{ route('events.cancel', $reservation->event->id) }}" method="POST" onsubmit="return confirm('Voulez-vous vraiment annuler ce billet ?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="bg-pink-50 hover:bg-pink-100 text-pink-500 border border-pink-200 px-4 py-2 rounded-full text-xs font-bold transition">
                                Annuler Billet
                            </button>
                        </form>
                    </div>
                </div>
            @empty
                <div class="bg-white/80 border border-pink-100 p-12 rounded-3xl text-center text-slate-400">
                    Vous n'avez aucun billet pour le moment 🎫
                </div>
            @endforelse
        </div>

    </div>
</body>
</html>
