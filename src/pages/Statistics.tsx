// src/pages/Statistics.tsx

import React, { useState } from 'react';
import Stats from './Stats'; // Import the existing Stats component
import Leaderboard from './Leaderboard'; // Import the existing Leaderboard component

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('stats'); // State to manage the active tab

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'leaderboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 'stats' && <Stats />} {/* Render Stats component */}
      {activeTab === 'leaderboard' && <Leaderboard />} {/* Render Leaderboard component */}
    </div>
  );
}
