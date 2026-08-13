import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminCreateEvent from './pages/AdminCreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import MyTickets from "./pages/MyTicket";
import EventsList from "./pages/EventsList"; 

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.role === 'admin' || user?.role_id === 1 || user?.is_admin === true;

  if (allowedRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRole && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function Navbar() {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin' || user?.role_id === 1 || user?.is_admin === true;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white">
      <Link to={isAdmin ? "/admin/dashboard" : "/"} className="text-xl font-bold text-indigo-400">
        🚀 {isAdmin ? "Admin Panel" : "BDE Events"}
      </Link>
      
      <div className="flex gap-4 items-center text-sm">
        {token && !isAdmin && (
          <>
            <Link to="/" className="hover:text-indigo-400">Événements</Link>
            <Link to="/profile/tickets" className="hover:text-indigo-400">Mes Tickets</Link>
          </>
        )}

        {token && isAdmin && (
          <div className="flex gap-2">
            <Link to="/admin/dashboard" className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-lg hover:bg-indigo-600/30">
              Dashboard Admin
            </Link>
            <Link to="/admin/events/create" className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500">
              + Créer Événement
            </Link>
          </div>
        )}

        {token ? (
          <button 
            onClick={handleLogout} 
            className="text-red-400 hover:text-red-300 font-semibold pl-2 border-l border-slate-700 transition duration-150"
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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 font-sans text-white">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <EventsList />
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

          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}