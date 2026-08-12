import React from 'react';

export default function AdminDashboard() {
  const stats = [
    { id: 1, title: "Soirée d'Intégration", max_capacity: 100, bookings_count: 75 },
    { id: 2, title: "Séminaire DevOps & Cloud", max_capacity: 50, bookings_count: 50 },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-slate-800 rounded-2xl border border-slate-700 text-white shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-indigo-400">US 1.2 : Tableau de Bord Admin</h2>

      <div className="space-y-6">
        {stats.map((event) => {
          const placesRestantes = event.max_capacity - event.bookings_count;
          const percentage = Math.round((event.bookings_count / event.max_capacity) * 100);

          return (
            <div key={event.id} className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <span className="text-sm font-mono text-indigo-300">
                  {placesRestantes} / {event.max_capacity} places restantes
                </span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
                <div 
                  className={`h-full transition-all duration-500 ${percentage === 100 ? 'bg-red-500' : 'bg-indigo-500'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}