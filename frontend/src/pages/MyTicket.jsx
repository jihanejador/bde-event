import React from 'react';

export default function MyTickets() {
  const tickets = [
    {
      id: 1,
      ticket_code: "BDE-2026-X89F2",
      event_title: "Soirée d'Intégration ENAA 2026",
      date: "15 Septembre 2026",
      time: "20:00",
      location: "Grand Amphithéâtre Campus ENAA",
      student_name: "Étudiant BDE"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 text-white space-y-6">
      <h2 className="text-2xl font-bold text-indigo-400">US 3.1 : Mes Billets Numériques</h2>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-gradient-to-r from-slate-800 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-indigo-600/30 text-indigo-300 text-xs px-3 py-1 rounded-full font-mono">PASS ÉTUDIANT</span>
            <h3 className="text-2xl font-extrabold text-white">{ticket.event_title}</h3>
            <p className="text-slate-300 text-sm">👤 Participant: {ticket.student_name}</p>
            <p className="text-slate-400 text-xs">📅 {ticket.date} à {ticket.time} • 📍 {ticket.location}</p>
          </div>

          <div className="bg-slate-900 border border-indigo-500/50 p-4 rounded-xl text-center space-y-1 min-w-[180px]">
            <span className="text-xs text-slate-400 block">CODE BILLET</span>
            <span className="font-mono text-lg font-bold text-indigo-400 tracking-wider">{ticket.ticket_code}</span>
          </div>
        </div>
      ))}
    </div>
  );
}