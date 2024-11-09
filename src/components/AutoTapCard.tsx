import React from 'react';
import { Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { AUTO_TAP_CONFIG } from '../config/gameConfig';
import toast from 'react-hot-toast';

const AUTO_TAP_PRICE = 5; // $5 in TON

export default function AutoTapCard() {
  const { autoTapEndTime, purchaseAutoTap } = useGameStore();
  const isActive = autoTapEndTime && new Date(autoTapEndTime) > new Date();
  
  const timeRemaining = isActive
    ? new Date(autoTapEndTime!).getTime() - new Date().getTime()
    : 0;
  
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  const handlePurchase = async () => {
    try {
      // Here we would integrate with TON wallet
      toast.loading('Connecting to TON wallet...');
      // Simulated TON payment flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      purchaseAutoTap();
      toast.success('Auto Tap activated! 🚀');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-yellow-400" />
        <h2 className="text-xl font-bold">Auto Tap</h2>
      </div>

      <div className="space-y-4">
        {isActive ? (
          <div className="flex items-center gap-2 text-green-400">
            <Clock size={20} />
            <span>
              {hoursRemaining}h {minutesRemaining}m remaining
            </span>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePurchase}
            className="w-full btn-primary"
          >
            Purchase (${AUTO_TAP_PRICE} TON)
          </motion.button>
        )}

        <div className="text-sm text-gray-300">
          <p>• {AUTO_TAP_CONFIG.tapsPerSecond} automatic taps per second</p>
          <p>• Lasts for {AUTO_TAP_CONFIG.durationHours} hours</p>
          <p>• {AUTO_TAP_CONFIG.tapsPerSecond * 3600} bonus taps per hour</p>
        </div>
      </div>
    </div>
  );
}