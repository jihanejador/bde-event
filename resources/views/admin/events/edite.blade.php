<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier l'Événement</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Modifier l'événement</h2>

        <form action="{{ route('admin.events.update', $event->id) }}" method="POST" class="space-y-4">
            @csrf
            @method('PUT')

            <div>
                <label class="block font-bold mb-1 text-gray-700">Titre</label>
                <input type="text" name="titre" value="{{ old('titre', $event->titre) }}" required class="w-full border p-2 rounded">
            </div>

            <div>
                <label class="block font-bold mb-1 text-gray-700">Description</label>
                <textarea name="description" rows="3" required class="w-full border p-2 rounded">{{ old('description', $event->description) }}</textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-bold mb-1 text-gray-700">Date</label>
                    <input type="date" name="date" value="{{ old('date', $event->date) }}" required class="w-full border p-2 rounded">
                </div>
                <div>
                    <label class="block font-bold mb-1 text-gray-700">Heure</label>
                    <input type="time" name="heure" value="{{ old('heure', $event->heure) }}" required class="w-full border p-2 rounded">
                </div>
            </div>

            <div>
                <label class="block font-bold mb-1 text-gray-700">Lieu</label>
                <input type="text" name="lieu" value="{{ old('lieu', $event->lieu) }}" required class="w-full border p-2 rounded">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-bold mb-1 text-gray-700">Prix (DH)</label>
                    <input type="number" step="0.01" name="prix" value="{{ old('prix', $event->prix) }}" required class="w-full border p-2 rounded">
                </div>
                <div>
                    <label class="block font-bold mb-1 text-gray-700">Jauge Max</label>
                    <input type="number" name="jauge_max" value="{{ old('jauge_max', $event->jauge_max) }}" min="1" required class="w-full border p-2 rounded">
                </div>
            </div>

            <div class="flex justify-between items-center mt-6">
                <a href="{{ route('admin.events.index') }}" class="text-gray-600 hover:underline">Annuler</a>
                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Mettre à jour</button>
            </div>
        </form>
    </div>
</body>
</html>
