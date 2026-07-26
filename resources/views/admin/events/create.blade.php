<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un Événement - BDE</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 p-6 md:p-10 min-h-screen font-sans flex items-center justify-center">
    <div class="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-pink-200/60 shadow-sm w-full max-w-2xl my-8">

        <!-- Header Form -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                    Nouveau Événement 
                </h2>
                <p class="text-slate-400 text-xs mt-1">Ajouter un événement pour les étudiants du BDE</p>
            </div>
            <a href="{{ route('admin.events.index') }}" class="bg-white text-slate-400 hover:text-slate-600 border border-pink-100 px-4 py-2 rounded-full text-xs font-bold transition shadow-sm">
                ← Retour
            </a>
        </div>

        @if($errors->any())
            <div class="bg-pink-100/80 border border-pink-200 text-pink-700 p-4 rounded-2xl mb-6 text-xs font-medium space-y-1">
                @foreach($errors->all() as $error)
                    <p>• {{ $error }}</p>
                @endforeach
            </div>
        @endif

        <form action="{{ route('admin.events.store') }}" method="POST" class="space-y-4 text-sm font-medium">
            @csrf

            <div>
                <label class="block text-slate-600 font-bold mb-1">Titre de l'événement</label>
                <input type="text" name="titre" value="{{ old('titre') }}" placeholder="Ex: Gala de Fin d'Année" required
                       class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
            </div>

            <div>
                <label class="block text-slate-600 font-bold mb-1">Description</label>
                <textarea name="description" rows="3" placeholder="Décrivez brièvement l'événement..." required
                          class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Date</label>
                    <input type="date" name="date" value="{{ old('date') }}" required
                           class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
                </div>
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Heure</label>
                    <input type="time" name="heure" value="{{ old('heure') }}" required
                           class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
                </div>
            </div>

            <div>
                <label class="block text-slate-600 font-bold mb-1">Lieu</label>
                <input type="text" name="lieu" value="{{ old('lieu') }}" placeholder="Ex: Amphi A / Campus" required
                       class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Prix (DH)</label>
                    <input type="number" step="0.01" name="prix" value="{{ old('prix', 0) }}" min="0" required
                           class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
                </div>
                <div>
                    <label class="block text-slate-600 font-bold mb-1">Jauge Maximale (Places)</label>
                    <input type="number" name="jauge_max" value="{{ old('jauge_max') }}" min="1" placeholder="Ex: 100" required
                           class="w-full bg-pink-50/30 border border-pink-200 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
                </div>
            </div>

            <div class="flex justify-between items-center mt-6 pt-4 border-t border-pink-100">
                <a href="{{ route('admin.events.index') }}" class="text-slate-400 hover:text-slate-600 font-bold text-xs">Annuler</a>
                <button type="submit" class="bg-gradient-to-r from-pink-300 via-pink-400 to-sky-300 hover:opacity-90 text-white px-7 py-3 rounded-full font-bold text-sm shadow-sm transition-all duration-300">
                    Enregistrer l'événement
                </button>
            </div>
        </form>
    </div>
</body>
</html>
