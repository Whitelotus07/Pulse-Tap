import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { DAILY_BONUSES } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';

export default function DailyBonusCard() {
  const { currentDay, lastDailyBonus, claimDailyBonus } = useGameStore();
  const todayBonus = DAILY_BONUSES[currentDay - 1];
  const nextBonus = DAILY_BONUSES[currentDay];
  
  const lastClaim = lastDailyBonus ? new Date(lastDailyBonus) : null;
  const canClaim = !lastClaim || new Date().getDate() !== lastClaim.getDate();

  return (
    <div className="card p-4 sm:p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-pink-500" />
        <h2 className="text-xl font-bold">Daily Bonus</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300">Day {currentDay}/30</p>
            <p className="text-lg font-bold text-yellow-400">
              +{todayBonus.amount.toLocaleString()} coins
            </p>
          </div>
          {canClaim && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => claimDailyBonus()}
              className="btn-primary"
            >
              Claim
            </motion.button>
          )}
        </div>

        {nextBonus && (
          <div className="text-sm text-gray-300">
            Next bonus: +{nextBonus.amount.toLocaleString()} coins
          </div>
        )}
      </div>
    </div>
  );
}
