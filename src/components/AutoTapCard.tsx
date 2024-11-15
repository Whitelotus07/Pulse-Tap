import React from 'react';
import { Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { AUTO_TAP_CONFIG } from '../config/gameConfig';
import toast from 'react-hot-toast';
import { useWallet } from '../context/WalletContext'; // Import the WalletContext

const AUTO_TAP_PRICE = 1; // Price in TON

export default function AutoTapCard() {
  const { autoTapEndTime, purchaseAutoTap } = useGameStore();
  const { sendPayment, walletAddress } = useWallet(); // Get sendPayment from context
  const isActive = autoTapEndTime && new Date(autoTapEndTime) > new Date();
  
  const timeRemaining = isActive
    ? new Date(autoTapEndTime!).getTime() - new Date().getTime()
    : 0;
  
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  const handlePurchase = async () => {
    try {
      toast.loading('Processing payment...');
      const recipientAddress = 'UQC7JxkjGCWm99IUZGknnU_ctGNkngboRyfalkRPPMV-34M0'; // Specified recipient address

      // Send payment for Auto Tap
      await sendPayment(recipientAddress, AUTO_TAP_PRICE);
      await purchaseAutoTap(); // Call the purchase function from the game store
      toast.success('Auto Tap activated! 🚀');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="card p-4 sm:p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-yellow-400" />
        <h2 className="text-xl font-bold">Auto Tap</h2>
      </div>

      <div className="space-y-4 flex-grow">
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
