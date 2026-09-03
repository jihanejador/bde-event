import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', formData);
      
      
      const token = response.data.token || response.data.access_token;
      const userData = response.data.user;

      if (!token) {
        throw new Error("Token non reçu du serveur.");
      }

      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      
      const isAdmin = 
        userData?.role?.toString().toLowerCase() === 'admin' || 
        userData?.role_id === 1 ||
        userData?.is_admin === true;

      
      if (isAdmin) {
        navigate('/admin/stats');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(
        err.response?.data?.message || 
        'Échec de la connexion. Veuillez vérifier vos identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Connexion
        </h2>

        {error && (
          <div className="p-3 mb-4 bg-red-600/90 border border-red-500 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Adresse Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition duration-150"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition duration-150"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg disabled:opacity-50 mt-2"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Vous n'avez pas encore de compte ?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}