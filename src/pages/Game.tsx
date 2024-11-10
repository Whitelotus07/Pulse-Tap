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

  // Effect to update income every hour
  useEffect(() => {
    const updateIncome = () => {
      const incomePerHour = calculateIncomePerHour();
      if (incomePerHour > 0) {
        addCoins(incomePerHour); // No need to divide by 1
      }
    };

    // Call the update function immediately on mount
    updateIncome();

    // Set an interval to update every hour (3600000 milliseconds)
    const interval = setInterval(updateIncome, 3600000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [addCoins, calculateIncomePerHour]);

  // Effect to check pulse reminder every hour
  useEffect(() => {
    const checkReminder = () => {
      checkPulseReminder();
    };

    // Call immediately on mount
    checkReminder();

    // Set an interval to check reminder every hour
    const interval = setInterval(checkReminder, 3600000);

    // Cleanup function to clear the interval
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
        className="tap-button mx-auto mb-4 w-48 h-48 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-pink-500/25 transition-all duration-200"
      >
        <Zap size={64} className="text-white relative z -10" />
      </motion.button>

      <div className="mt-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LevelCard />
            <AutoTapCard />
          </div>
          <DailyBonusCard />
        </motion.div>
      </div>
    </div>
  );
  }
