// src/pages/Statistics.tsx

import React from 'react';
import Stats from './Stats'; // Import the existing Stats component
import Leaderboard from './Leaderboard'; // Import the existing Leaderboard component

export default function Statistics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Stats />
      <Leaderboard />
    </div>
  );
}
