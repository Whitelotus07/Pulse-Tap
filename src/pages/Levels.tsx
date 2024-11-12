import React from 'react';
import { LEVELS } from '../config/gameConfig';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const Levels = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-pink-500" />
        <h1 className="text-2xl font-bold">Game Levels</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEVELS.map(level => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: level.id * 0.1 }}
            className="card p-4 sm:p-6 flex flex-col"
          >
            <h2 className="text-xl font-bold">{level.name}</h2>
            <p className="text-sm text-gray-300">Required Taps: {level.requiredTaps.toLocaleString()}</p>
            <p className="text-sm text-gray-300">Bonus: {level.bonus.toLocaleString()} coins</p>
            <p className="text-sm text-gray-300">Base Income: {level.baseIncome.toLocaleString()} coins/hour</p>
            <p className="text-sm text-gray-300">Icon: {level.icon}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
