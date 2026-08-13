import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function UserTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role || user?.user?.role;
  const isAdmin = userRole === 'admin' || user?.is_admin === 1 || user?.is_admin === true;

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate]);

  const fetchTickets = async () => {
    if (isAdmin) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/user/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Impossible de charger vos tickets.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      fetchTickets();
    }
  }, [isAdmin]);

  const handleCancel = async (eventId) => {
    if (!window.confirm('Voulez-vous vraiment annuler votre réservation ?')) return;

    const token = localStorage.getItem('token');
    try {
      await api.delete(`/events/${eventId}/cancel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Réservation annulée.');
      setTickets(tickets.filter((t) => (t.event_id || t.event?.id) !== eventId));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'annulation.");
      setTimeout(() => setError(''), 3000);
    }
  };

  if (isAdmin) return null;

  if (loading) {
    return <div className="text-center text-white my-10">Chargement de vos tickets...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Mes Tickets</h1>

      {error && <div className="p-3 mb-4 bg-red-600/90 border border-red-500 rounded text-sm">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-600/90 border border-green-500 rounded text-sm">{success}</div>}

      {tickets.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-lg text-center text-slate-400 border border-slate-700">
          Vous n'avez réservé aucun événement pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((item) => {
            const event = item.event || item; 
            return (
              <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{event.titre}</h3>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Confirmé
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{event.description}</p>

                  <div className="space-y-1 text-sm text-slate-300 mb-4">
                    <p>📍 <strong>Lieu :</strong> {event.lieu || 'N/A'}</p>
                    <p>📅 <strong>Date :</strong> {event.date} {event.heure ? `à ${event.heure}` : ''}</p>
                    <p>💰 <strong>Prix :</strong> {event.prix == 0 || !event.prix ? 'Gratuit' : `${event.prix} DH`}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <button
                    onClick={() => handleCancel(event.id)}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded text-sm transition"
                  >
                    Annuler la réservation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}