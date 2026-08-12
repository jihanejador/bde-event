import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold text-indigo-400">
          🚀 BDE Events
        </h1>
        <p className="text-slate-300">
          React + Tailwind CSS kheddamin 100% b-seḥa!
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;