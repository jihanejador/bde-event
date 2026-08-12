<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - BDE Events</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-pink-50 via-sky-50 to-pink-100 text-slate-700 min-h-screen font-sans flex items-center justify-center p-6">
    <div class="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-pink-200/60 shadow-sm w-full max-w-md">

        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-tr from-pink-300 to-sky-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-sm">

            </div>
            <h1 class="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                BDE Events 
            </h1>
            <p class="text-slate-400 text-xs mt-1">Connectez-vous à votre espace étudiant / admin</p>
        </div>

        @if(session('status'))
            <div class="bg-sky-100/80 border border-sky-200 text-sky-700 p-3 rounded-2xl mb-6 text-xs font-medium text-center">
                {{ session('status') }}
            </div>
        @endif

        @if($errors->any())
            <div class="bg-pink-100/80 border border-pink-200 text-pink-700 p-3 rounded-2xl mb-6 text-xs font-medium text-center">
                Identifiants incorrects. Veuillez réessayer.
            </div>
        @endif

        <form action="{{ route('login') }}" method="POST" class="space-y-4 text-sm font-medium">
            @csrf

            <div>
                <label class="block text-slate-600 font-bold mb-1.5 text-xs uppercase tracking-wider">Adresse E-mail</label>
                <input type="email" name="email" value="{{ old('email') }}" placeholder="etudiant@ecole.ma" required autofocus
                       class="w-full bg-pink-50/30 border border-pink-200 p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition text-slate-700 placeholder-slate-300">
            </div>

            <div>
                <label class="block text-slate-600 font-bold mb-1.5 text-xs uppercase tracking-wider">Mot de passe</label>
                <input type="password" name="password" placeholder="••••••••" required
                       class="w-full bg-pink-50/30 border border-pink-200 p-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition text-slate-700 placeholder-slate-300">
            </div>

            <div class="flex items-center justify-between text-xs pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-slate-500">
                    <input type="checkbox" name="remember" class="rounded text-pink-400 focus:ring-pink-300 border-pink-200">
                    Se souvenir de moi
                </label>
            </div>

            <button type="submit" class="w-full bg-gradient-to-r from-pink-300 via-pink-400 to-sky-300 hover:opacity-90 text-white py-3.5 rounded-full font-bold text-sm shadow-sm transition-all duration-300 mt-2">
                Se Connecter
            </button>
        </form>

    </div>
</body>
</html>
