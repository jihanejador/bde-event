import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AdminCreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date: '',
    heure: '',
    lieu: '',
    prix: '',
    jauge_max: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Veuillez vous connecter pour effectuer cette action.');
      return;
    }

    try {
      await api.post('/events', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Événement créé avec succès !');

      setFormData({
        titre: '',
        description: '',
        date: '',
        heure: '',
        lieu: '',
        prix: '',
        jauge_max: '',
      });

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);

    } catch (err) {
      if (err.response) {
        if (err.response.status === 422) {
          const validationErrors = err.response.data.errors;
          if (validationErrors) {
            const firstKey = Object.keys(validationErrors)[0];
            setError(validationErrors[firstKey][0]);
          } else {
            setError('Veuillez vérifier les informations saisies.');
          }
        } else if (err.response.status === 403) {
          setError("Accès refusé : Vous n'avez pas les droits d'administrateur.");
        } else if (err.response.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
        } else {
          setError(err.response.data?.message || 'Une erreur est survenue lors de la création.');
        }
      } else {
        setError('Impossible de contacter le serveur.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-slate-800 text-white rounded-lg shadow-md border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Créer un Nouvel Événement</h2>

      {error && (
        <div className="p-3 mb-4 text-sm bg-red-600/90 text-white rounded border border-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 mb-4 text-sm bg-green-600/90 text-white rounded border border-green-500">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-slate-200">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
            placeholder="Ex: Voyage BDE"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-200">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
            placeholder="Description de l'événement..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-slate-200">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-200">Heure</label>
            <input
              type="time"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-200">Lieu</label>
          <input
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
            placeholder="Ex: Beni Mellal"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-slate-200">Prix (DH)</label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="0 (si gratuit)"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-200">Capacité Maximale</label>
            <input
              type="number"
              name="jauge_max"
              value={formData.jauge_max}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2.5 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
              placeholder="Ex: 50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition duration-200"
        >
          Publier l'Événement
        </button>
      </form>
    </div>
  );
}