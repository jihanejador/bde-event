import React, { useState } from 'react';
import api from '../api/axios'; 
import { useNavigate } from 'react-router-dom';

export default function AdminCreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    max_capacity: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/events', formData);
      setSuccess('Événement créé avec succès !');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Accès refusé : Vous n'êtes pas administrateur !");
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la création.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-slate-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Créer un Nouvel Événement</h2>

      {error && <div className="p-3 mb-4 text-sm bg-red-600 rounded">{error}</div>}
      {success && <div className="p-3 mb-4 text-sm bg-green-600 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Titre</label>
          <input
            type="text"
            name="title"
            required
            className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            required
            rows="3"
            className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Heure</label>
            <input
              type="time"
              name="time"
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Lieu</label>
          <input
            type="text"
            name="location"
            required
            className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Capacité Maximale</label>
          <input
            type="number"
            name="max_capacity"
            min="1"
            required
            className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded font-bold transition duration-200"
        >
          Publier l'Événement
        </button>
      </form>
    </div>
  );
}