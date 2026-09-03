import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function EventsList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookedEvents, setBookedEvents] = useState([]);

  
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem('token');

  const isAdmin = 
    user?.role?.toString().toLowerCase() === 'admin' || 
    user?.role_id === 1 ||
    user?.is_admin === true;

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

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

  const fetchUserTickets = async () => {
    if (!token || isAdmin) return;
    try {
      const response = await api.get('/user/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tickets = response.data;
      const bookedIds = tickets.map((t) => t.event_id || t.event?.id);
      setBookedEvents(bookedIds);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      fetchEvents();
      fetchUserTickets();
    }
  }, [isAdmin]);

  const handleBook = async (eventId) => {
    if (!token) {
      setError('Veuillez vous connecter pour réserver.');
      setTimeout(() => setError(''), 4000);
      return;
    }

    try {
      await api.post(`/events/${eventId}/book`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Réservation effectuée avec succès !');
      setBookedEvents((prev) => [...prev, eventId]);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réservation.');
      setTimeout(() => setError(''), 4000);
    }
  };

  if (loading) {
    return <div className="text-center text-white my-10">Chargement des événements...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Événements à venir</h1>

      {error && <div className="p-3 mb-4 bg-red-600/90 border border-red-500 rounded text-sm">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-600/90 border border-green-500 rounded text-sm">{success}</div>}

      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-slate-400">Aucun événement disponible pour le moment.</p>
        ) : (
          events.map((event) => {
            const isBooked = bookedEvents.includes(event.id);
            const capacity = event.jauge_max ?? event.capacite ?? event.places_disponibles ?? 0;

            return (
              <div 
                key={event.id} 
                className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex items-center justify-between shadow-lg"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>📅 {event.date} {event.heure ? `à ${event.heure}` : ''}</span>
                    <span>📍 {event.lieu || 'Non spécifié'}</span>
                    <span>💰 {event.prix == 0 || !event.prix ? 'Gratuit' : `${event.prix} DH`}</span>
                  </div>

                  <p className="text-lg font-medium text-slate-200">{event.titre || event.description}</p>

                  <div className="inline-block bg-slate-900/60 px-3 py-1 rounded text-xs text-indigo-300 font-mono border border-slate-700">
                    Places disponibles: {capacity}
                  </div>
                </div>

                <div>
                  {isBooked ? (
                    <button
                      disabled
                      className="px-6 py-2.5 bg-green-700/80 text-white font-medium rounded-lg text-sm cursor-not-allowed"
                    >
                      ✓ Déjà Inscrit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBook(event.id)}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition"
                    >
                      S'inscrire
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}