import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Coins } from 'lucide-react';

interface UpgradeCardProps {
  id: string;
  name: string;
  level: number;
  baseCost: number;
  multiplier: number;
  powerIncrease: number;
}

export default function UpgradeCard({ id, name, level, baseCost, multiplier, powerIncrease }: UpgradeCardProps) {
  const { coins, upgradeTapPower } = useGameStore();
  const cost = Math.floor(baseCost * Math.pow(multiplier, level));
  const canAfford = coins >= cost;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`card cursor-pointer ${!canAfford ? 'opacity-50' : ''}`}
      onClick={() => canAfford && upgradeTapPower(id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-gray-300">Level {level}</p>
          <p className="text-sm text-gray-300">+{powerIncrease} power</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Coins size={16} />
          <span>{cost}</span>
        </div>
      </div>
      <div className="mt-2 h-1 bg-white/20 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          style={{ width: `${Math.min((level / 20) * 100, 100)}%` }}
        />
      </div>
    </motion.div>
  );
}