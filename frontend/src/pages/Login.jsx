import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      
      console.log("Réponse complète du serveur :", res.data);

      const token = res.data.token || res.data.access_token || res.data.authorisation?.token;
      const user = res.data.user;

      if (token) {
        localStorage.setItem('token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        alert('Connexion réussie ! Bienvenue.');
        
        if (user?.role === 'admin') {
          navigate('/admin/events/create');
        } else {
          navigate('/');
        }
      } else {
        alert("Erreur : Le jeton d'accès (token) n'a pas été fourni par le serveur.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Identifiants incorrects ou problème de connexion.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Connexion BDE Events</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Adresse E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="exemple@bde.com"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition duration-200 shadow-lg"
          >
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
}