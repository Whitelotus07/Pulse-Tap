import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Zap, Coins } from 'lucide-react';
import DailyBonusCard from '../components/DailyBonusCard';
import LevelCard from '../components/LevelCard';
import AutoTapCard from '../components/AutoTapCard';

export default function Game() {
  const { 
    coins, 
    tapPower,
    addCoins, 
    incrementTaps,
    calculateIncomePerHour,
    lastTapTime,
    setLastTapTime,
    checkPulseReminder
  } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const incomePerHour = calculateIncomePerHour();
      if (incomePerHour > 0) {
        addCoins(incomePerHour / 3600);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [addCoins, calculateIncomePerHour]);

  useEffect(() => {
    checkPulseReminder();
    const interval = setInterval(checkPulseReminder, 3600000);
    return () => clearInterval(interval);
  }, [checkPulseReminder]);

  const handleTap = () => {
    addCoins(tapPower);
    incrementTaps();
    setLastTapTime(new Date().toISOString());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-3xl font-bold">
          <Coins className="text-yellow-400" />
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {Math.floor(coins).toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-gray-300 mt-1">
          Power: {tapPower}/tap | {calculateIncomePerHour().toLocaleString()}/hour
        </div>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
        className="tap-button mx-auto mb-8 w-full max-w-md" // Full width and max width for mobile
      >
        <Zap size={64} className="text-white relative z-10" />
      </motion.button>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Use responsive classes to change layout based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LevelCard />
          <AutoTapCard />
        </div>
        <DailyBonusCard />
      </motion.div>
    </div>
  );
      }
