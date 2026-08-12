<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier l'Événement - BDE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 p-6 md:p-10 min-h-screen font-sans flex items-center justify-center">
    <div class="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-pink-200/60 shadow-sm w-full max-w-2xl">
        <h2 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent mb-6">
            Modifier l'événement 
        </h2>

        <form action="{{ route('admin.events.update', $event->id) }}" method="POST" class="space-y-4 text-sm font-medium">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-slate-600 font-bold mb-1">Titre</label>
                <input type="text" name="titre" value="{{ old('titre', $event->titre) }}" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
            </div>

            <div>
                <label class="block text-slate-600 font-bold mb-1">Description</label>
                <textarea name="description" rows="3" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">{{ old('description', $event->description) }}</textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Date</label>
                    <input type="date" name="date" value="{{ old('date', $event->date) }}" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
                </div>
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Heure</label>
                    <input type="time" name="heure" value="{{ old('heure', $event->heure) }}" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
                </div>
            </div>

            <div>
                <label class="block text-slate-600 font-bold mb-1">Lieu</label>
                <input type="text" name="lieu" value="{{ old('lieu', $event->lieu) }}" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Prix (DH)</label>
                    <input type="number" step="0.01" name="prix" value="{{ old('prix', $event->prix) }}" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
                </div>
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Jauge Max</label>
                    <input type="number" name="jauge_max" value="{{ old('jauge_max', $event->jauge_max) }}" min="1" required class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300">
                </div>
            </div>

            <div class="flex justify-between items-center mt-6 pt-4 border-t border-pink-100">
                <a href="{{ route('admin.events.index') }}" class="text-slate-400 hover:text-slate-600 font-bold text-xs">Annuler</a>
                <button type="submit" class="bg-gradient-to-r from-pink-300 via-pink-400 to-sky-300 hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm transition">
                    Mettre à jour
                </button>
            </div>
        </form>
    </div>
</body>
</html>
