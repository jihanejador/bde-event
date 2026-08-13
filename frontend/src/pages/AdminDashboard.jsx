import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    date: '',
    heure: '',
    lieu: '',
    jauge_max: '',
    prix: ''
  });

  useEffect(() => {
    fetchAdminEvents();
  }, []);

  const fetchAdminEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const eventsRes = await axios.get('http://127.0.0.1:8000/api/events', { headers });
      let eventsList = eventsRes.data.events || eventsRes.data;

      try {
        const statsRes = await axios.get('http://127.0.0.1:8000/api/admin/events/stats', { headers });
        const statsList = statsRes.data.events || statsRes.data;

        if (Array.isArray(statsList) && Array.isArray(eventsList)) {
          eventsList = eventsList.map(ev => {
            const statObj = statsList.find(s => s.id === ev.id);
            return {
              ...ev,
              bookings_count: statObj?.bookings_count || statObj?.reservations_count || ev.bookings_count || 0
            };
          });
        }
      } catch (statErr) {
        console.warn("Stats API non disponible, utilisation des données directes:", statErr);
      }

      setEvents(eventsList);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement des événements:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event.id);

    setEditForm({
      title: event.title || event.titre || '',
      description: event.description || '',
      date: event.date || event.date_event || '',
      heure: event.heure || event.time || '',
      lieu: event.lieu || event.location || event.ville || '',
      jauge_max: event.jauge_max || event.jaugeMax || event.max_capacity || event.capacite_max || '',
      prix: event.prix || event.price || 0
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      title: editForm.title,
      titre: editForm.title,
      description: editForm.description,
      date: editForm.date,
      date_event: editForm.date,
      heure: editForm.heure,
      time: editForm.heure,
      lieu: editForm.lieu,
      location: editForm.lieu,
      jauge_max: parseInt(editForm.jauge_max) || 0,
      jaugeMax: parseInt(editForm.jauge_max) || 0,
      capacite_max: parseInt(editForm.jauge_max) || 0,
      max_capacity: parseInt(editForm.jauge_max) || 0,
      prix: parseFloat(editForm.prix) || 0
    };

    try {
      await axios.put(`http://127.0.0.1:8000/api/admin/events/${editingEvent}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingEvent(null);
      fetchAdminEvents();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || JSON.stringify(err.response?.data?.errors) || "Erreur lors de la modification.";
      alert(`Erreur: ${msg}`);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-400">Chargement du Tableau de Bord...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">📊 Tableau de Bord Admin (Gestion & Stats)</h1>

      {editingEvent && (
        <form onSubmit={handleUpdate} className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-white">✏️ Modifier l'événement</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs mb-1">Titre de l'événement</label>
              <input
                type="text"
                placeholder="Titre"
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1">Date</label>
              <input
                type="date"
                value={editForm.date}
                onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1">Heure</label>
              <input
                type="time"
                value={editForm.heure}
                onChange={e => setEditForm({ ...editForm, heure: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1">Lieu</label>
              <input
                type="text"
                placeholder="Lieu"
                value={editForm.lieu}
                onChange={e => setEditForm({ ...editForm, lieu: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1">Jauge Max (Capacité)</label>
              <input
                type="number"
                placeholder="Jauge Max"
                value={editForm.jauge_max}
                onChange={e => setEditForm({ ...editForm, jauge_max: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1">Prix (DH)</label>
              <input
                type="number"
                placeholder="Prix"
                value={editForm.prix}
                onChange={e => setEditForm({ ...editForm, prix: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
              />
            </div>

            <div className="col-span-full">
              <label className="block text-slate-400 text-xs mb-1">Description</label>
              <textarea
                placeholder="Description de l'événement..."
                rows="3"
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors">
              Enregistrer Les Modifications
            </button>
            <button type="button" onClick={() => setEditingEvent(null)} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-5 py-2.5 rounded-lg transition-colors">
              Annuler
            </button>
          </div>
        </form>
      )}

      {}
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => {
          const maxCap = parseInt(event.jauge_max || event.jaugeMax || event.max_capacity || event.capacite_max || 0);
          const bookings = parseInt(event.bookings_count || event.reservations_count || (event.tickets ? event.tickets.length : 0));
          const placesRestantes = Math.max(0, maxCap - bookings);
          const percentage = maxCap > 0 ? Math.min(100, Math.round((bookings / maxCap) * 100)) : 0;
          const displayDate = event.date || event.date_event || 'Non spécifié';
          const displayLieu = event.lieu || event.location || event.ville || 'Non spécifié';

          return (
            <div key={event.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{event.title || event.titre}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    📅 {displayDate} {event.heure ? `à ${event.heure}` : ''} | 📍 {displayLieu}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(event)} className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg text-sm transition-colors">
                    ✏️ Modifier
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded-lg text-sm transition-colors">
                    🗑️ Supprimer
                  </button>
                </div>
              </div>

              {}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700/50">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-indigo-400">Jauge des réservations ({percentage}%)</span>
                  <span className="text-slate-300">
                    Places rest. : <strong className="text-emerald-400">{placesRestantes}</strong> / {maxCap}
                  </span>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-3.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>Réservations : {bookings}</span>
                  <span>Jauge Max : {maxCap}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}