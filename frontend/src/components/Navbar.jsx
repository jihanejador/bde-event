import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser); 
  }, [location]); 

  const isAdmin = 
    user?.role?.toLowerCase() === 'admin' || 
    user?.role_id === 1;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white border-b border-slate-800">
      <div className="flex items-center gap-6">
        <Link to="/events" className="text-xl font-bold text-indigo-400">
          🚀 BDE Events
        </Link>
        
        {}
        {user && !isAdmin && (
          <>
            <Link to="/events" className="hover:text-indigo-300 transition">
              Événements
            </Link>
            <Link to="/profile/tickets" className="hover:text-indigo-300 transition">
              Mes Tickets
            </Link>
          </>
        )}

        {}
        {isAdmin && (
          <>
            <Link 
              to="/admin/dashboard" 
              className="px-3 py-1.5 bg-indigo-900/50 text-indigo-300 border border-indigo-700 rounded hover:bg-indigo-800 transition text-sm"
            >
              Dashboard Admin
            </Link>
            <Link 
              to="/admin/create-event" 
              className="px-3 py-1.5 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition text-sm"
            >
              + Créer Événement
            </Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <button 
            onClick={handleLogout} 
            className="text-red-400 hover:text-red-300 font-medium text-sm transition"
          >
            Déconnexion ({user.name || user.email})
          </button>
        ) : (
          <Link to="/login" className="text-indigo-400 font-medium text-sm">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}