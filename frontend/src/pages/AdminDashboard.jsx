import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    titre: '',
    description: '',
    date: '',
    heure: '',
    lieu: '',
    prix: '',
    jauge_max: '',
  });


  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des événements.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await api.delete(`/admin/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Événement supprimé avec succès !');
      setEvents(events.filter((e) => e.id !== id));

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEditFormData({
      titre: event.titre || '',
      description: event.description || '',
      date: event.date || '',
      heure: event.heure || '',
      lieu: event.lieu || '',
      prix: event.prix || '',
      jauge_max: event.jauge_max || '',
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.put(`/admin/events/${editingEvent.id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Événement modifié avec succès !');
      setEditingEvent(null);
      fetchEvents();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <div className="text-center text-white my-10">Chargement des événements...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Gestion des Événements (Admin)</h1>

      {error && <div className="p-3 mb-4 bg-red-600/90 border border-red-500 rounded text-sm">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-600/90 border border-green-500 rounded text-sm">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{event.titre}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-1 text-sm text-slate-300 mb-4">
                <p>📍 <strong>Lieu :</strong> {event.lieu}</p>
                <p>📅 <strong>Date :</strong> {event.date} à {event.heure}</p>
                <p>💰 <strong>Prix :</strong> {event.prix == 0 ? 'Gratuit' : `${event.prix} DH`}</p>
                <p>👥 <strong>Capacité :</strong> {event.jauge_max} places</p>
              </div>
            </div>

            {}
            <div className="flex gap-2 pt-4 border-t border-slate-700">
              <button
                onClick={() => handleEditClick(event)}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 font-semibold rounded text-sm transition"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 font-semibold rounded text-sm transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg w-full max-w-lg text-white">
            <h2 className="text-xl font-bold mb-4 text-indigo-400">Modifier l'événement</h2>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <div>
                <label className="text-sm">Titre</label>
                <input
                  type="text"
                  value={editFormData.titre}
                  onChange={(e) => setEditFormData({ ...editFormData, titre: e.target.value })}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm">Description</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                  rows="2"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm">Date</label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm">Heure</label>
                  <input
                    type="time"
                    value={editFormData.heure}
                    onChange={(e) => setEditFormData({ ...editFormData, heure: e.target.value })}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="text-sm">Lieu</label>
                  <input
                    type="text"
                    value={editFormData.lieu}
                    onChange={(e) => setEditFormData({ ...editFormData, lieu: e.target.value })}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm">Prix (DH)</label>
                  <input
                    type="number"
                    value={editFormData.prix}
                    onChange={(e) => setEditFormData({ ...editFormData, prix: e.target.value })}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm">Capacité</label>
                  <input
                    type="number"
                    value={editFormData.jauge_max}
                    onChange={(e) => setEditFormData({ ...editFormData, jauge_max: e.target.value })}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="flex-1 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm font-semibold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}