import React, { useState } from 'react';
import api from '../api/axios';

export default function AdminCreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    max_capacity: 50
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', formData);
      alert('Événement créé avec succès !');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('Accès refusé (403) : Vous devez être Administrateur BDE.');
      } else {
        alert('Erreur lors de la création de l\'événement.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-slate-800 rounded-2xl border border-slate-700 text-white shadow-2xl">
      <h2 className="text-2xl font-bold text-indigo-400 mb-6">US 1.1 : Créer un Nouvel Événement (Admin)</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1">Titre de l'événement</label>
          <input 
            type="text" 
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-1">Description</label>
          <textarea 
            rows="3"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Capacité Max</label>
            <input 
              type="number" 
              min="1"
              required
              value={formData.max_capacity}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              onChange={(e) => setFormData({...formData, max_capacity: parseInt(e.target.value)})}
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-1">Date</label>
            <input 
              type="datetime-local" 
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              onChange={(e) => setFormData({...formData, event_date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-1">Lieu</label>
          <input 
            type="text" 
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-3 rounded-lg transition duration-200 mt-4"
        >
          Publier l'Événement
        </button>
      </form>
    </div>
  );
}