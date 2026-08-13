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

  const studentName = user?.name || user?.user?.name || `${user?.prenom || ''} ${user?.nom || ''}`.trim() || 'Étudiant';

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
      setTickets(response.data || []);
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

      setSuccess('Réservation annulée avec succès.');
      setTickets(tickets.filter((t) => (t.event_id || t.event?.id || t.id) !== eventId));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'annulation.");
      setTimeout(() => setError(''), 3000);
    }
  };

  if (isAdmin) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p>Chargement de vos billets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-400">🎟️ Mes Tickets</h1>
          <p className="text-slate-400 text-sm mt-1">
            Gérez vos réservations et présentez votre Pass lors de l'événement.
          </p>
        </header>

        {error && <div className="p-4 mb-6 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-sm">{error}</div>}
        {success && <div className="p-4 mb-6 bg-emerald-900/50 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm">{success}</div>}

        {tickets.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">Aucune réservation trouvée</h3>
            <p className="text-slate-500 text-sm">Vous n'avez réservé aucun événement pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {tickets.map((item) => {
              const event = item.event || item;
              const ticketCode = item.ticket_code || item.code || `TICK-${event.id || Math.floor(Math.random() * 1000)}`;

              return (
                <div 
                  key={item.id} 
                  className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row hover:border-indigo-500/50 transition-all duration-300"
                >
                  {}
                  <div className="bg-gradient-to-b from-indigo-600 to-sky-600 md:w-36 p-5 flex md:flex-col justify-between items-center text-white shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-90">
                      PASS ACCÈS
                    </span>
                    <div className="text-3xl font-black my-1">🎟️</div>
                    <span className="text-[11px] font-mono bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 px-2.5 py-1 rounded-full uppercase font-bold">
                      Confirmé
                    </span>
                  </div>

                  {}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{event.titre || event.title}</h2>
                      <p className="text-slate-400 text-sm line-clamp-2">{event.description || 'Aucune description.'}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-sm">
                      <div>
                        <span className="block text-slate-500 text-xs font-semibold">📍 Lieu</span>
                        <span className="font-medium text-slate-200">{event.lieu || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs font-semibold">📅 Date & Heure</span>
                        <span className="font-medium text-slate-200">
                          {event.date} {event.heure ? `à ${event.heure}` : ''}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs font-semibold">💰 Prix</span>
                        <span className="font-bold text-emerald-400">
                          {event.prix == 0 || !event.prix ? 'Gratuit' : `${event.prix} DH`}
                        </span>
                      </div>
                    </div>

                    {}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <span className="text-[11px] text-indigo-400 font-semibold block uppercase">Titulaire du Pass</span>
                        <p className="text-sm font-bold text-slate-200">👤 {studentName}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 font-semibold block uppercase">Code Billet Unique</span>
                        <span className="font-mono text-sm font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-lg inline-block mt-0.5">
                          #{ticketCode}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancel(event.id)}
                      className="w-full bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-red-300 hover:text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 mt-2"
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
    </div>
  );
}