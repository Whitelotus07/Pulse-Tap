import React from 'react';
import { Trophy, FastForward } from 'lucide-react';
import { LEVELS } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';
import toast from 'react-hot-toast';

const TON_PRICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Price in dollars for each level

export default function LevelCard() {
  const { level, totalTaps, skipLevel } = useGameStore();
  const currentLevel = LEVELS.find(l => l.id === level);
  const nextLevel = LEVELS.find(l => l.id === level + 1);

  if (!currentLevel) return null;

  const handleSkipLevel = async () => {
    if (!nextLevel) {
      toast.error("You're at the maximum level!");
      return;
    }

    const price = TON_PRICES[level];
    
    try {
      // Here we would integrate with TON wallet
      toast.loading('Connecting to TON wallet...');
      // Simulated TON payment flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      skipLevel();
      toast.success(`Skipped to ${nextLevel.name}! 🚀`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-400" />
          <h2 className="text-xl font-bold">Level {level}</h2>
        </div>
        {nextLevel && (
          <button
            onClick={handleSkipLevel}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold
              bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 
              hover:to-teal-500 transition-all duration-200"
          >
            <FastForward size={16} />
            <span>${TON_PRICES[level]} TON</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentLevel.icon}</span>
          <span className="font-bold">{currentLevel.name}</span>
        </div>

        {nextLevel && (
          <>
            <div className="h-2 bg-white/20 rounded-full mt-4">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                style={{
                  width: `${Math.min(
                    ((totalTaps - currentLevel.requiredTaps) /
                    (nextLevel.requiredTaps - currentLevel.requiredTaps)) * 100,
                    100
                  )}%`
                }}
              />
            </div>
            <div className="text-sm text-gray-300">
              Next: {nextLevel.name} ({nextLevel.requiredTaps - totalTaps} taps remaining)
            </div>
          </>
        )}
      </div>
    </div>
  );
}