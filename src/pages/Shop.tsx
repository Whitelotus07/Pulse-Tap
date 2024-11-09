import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import UpgradeCard from '../components/UpgradeCard';

export default function Shop() {
  const upgrades = useGameStore((state) => state.upgrades);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="text-pink-500" />
        <h1 className="text-2xl font-bold">Shop</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {upgrades.map((upgrade) => (
          <UpgradeCard key={upgrade.id} {...upgrade} />
        ))}
      </div>
    </div>
  );
}