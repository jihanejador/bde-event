import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import api from './api/axios';
import Login from './pages/Login';
import AdminCreateEvent from './pages/AdminCreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import MyTickets from "./pages/MyTicket";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function Navbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold text-indigo-400">🚀 BDE Events</Link>
      <div className="flex gap-4 items-center text-sm">
        {token && (
          <>
            <Link to="/" className="hover:text-indigo-400">Événements</Link>
            <Link to="/profile/tickets" className="hover:text-indigo-400">Mes Tickets</Link>
          </>
        )}

        {token && user?.role === 'admin' && (
          <div className="flex gap-2 border-l border-slate-700 pl-4">
            <Link to="/admin/stats" className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-lg hover:bg-indigo-600/30">Dashboard Admin</Link>
            <Link to="/admin/events/create" className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500">+ Créer Événement</Link>
          </div>
        )}

        {token ? (
          <button 
            onClick={handleLogout} 
            className="text-red-400 hover:text-red-300 font-semibold pl-2 transition duration-150"
          >
            Déconnexion
          </button>
        ) : (
          <Link to="/login" className="text-slate-400 hover:text-white font-semibold">Connexion</Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des événements", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/book`);
      alert("Réservation confirmée ! Votre place a été réservée avec succès.");
      
      setBookedEvents([...bookedEvents, eventId]);
      fetchEvents();
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.message || "Vous êtes déjà inscrit ou l'événement est complet.");
      } else {
        alert("Veuillez vous connecter pour réserver une place.");
      }
    }
  };

  return (
    <div className="p-8 text-white max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-indigo-400">Événements à venir</h1>

      {loading ? (
        <p className="text-slate-400">Chargement des événements...</p>
      ) : events.length === 0 ? (
        <p className="text-slate-400">Aucun événement disponible pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => {
            const isBooked = bookedEvents.includes(event.id);
            const remainingPlaces = event.max_capacity - (event.bookings_count || 0);
            const isFull = remainingPlaces <= 0;

            return (
              <div key={event.id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{event.title}</h2>
                  <p className="text-slate-400 text-sm">📅 {event.event_date} • 📍 {event.location}</p>
                  <p className="text-slate-300 text-sm pt-2">{event.description}</p>
                  <div className="mt-3 text-xs bg-slate-900 border border-slate-700 inline-block px-3 py-1 rounded-full text-indigo-300 font-mono">
                    Places disponibles: {remainingPlaces} / {event.max_capacity}
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(event.id)}
                  disabled={isBooked || isFull}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition duration-200 ${
                    isBooked
                      ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 cursor-not-allowed'
                      : isFull
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                  }`}
                >
                  {isBooked ? '✓ Inscrit' : isFull ? 'Complet' : "S'inscrire"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 font-sans text-white">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/profile/tickets" element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          } />

          <Route path="/admin/events/create" element={
            <ProtectedRoute allowedRole="admin">
              <AdminCreateEvent />
            </ProtectedRoute>
          } />

          <Route path="/admin/stats" element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}