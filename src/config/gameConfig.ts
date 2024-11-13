// src/config/gameConfig.ts

import TonWeb from 'tonweb'; // Import the TON Web library
import { toast } from 'react-hot-toast'; // Ensure you have toast for notifications

// Constants for game levels
export const LEVELS = [
  { id: 0, name: "Beginner", requiredTaps: 0, bonus: 0, icon: "🌱", baseIncome: 1, skipPrice: 1 },
  { id: 1, name: "Novice", requiredTaps: 1000, bonus: 1000, icon: "⚡", baseIncome: 10, skipPrice: 7 },
  { id: 2, name: "Apprentice", requiredTaps: 10000, bonus: 10000, icon: "🔥", baseIncome: 100, skipPrice: 10 },
  { id: 3, name: "Expert", requiredTaps: 100000, bonus: 100000, icon: "💫", baseIncome: 1000, skipPrice: 15 },
  { id: 4, name: "Master", requiredTaps: 1000000, bonus: 1000000, icon: "🌟", baseIncome: 10000 },
  { id: 5, name: "Grand Master", requiredTaps: 10000000, bonus: 10000000, icon: "👑", baseIncome: 100000 },
  { id: 6, name: "Legend", requiredTaps: 100000000, bonus: 100000000, icon: "🏆", baseIncome: 1000000 },
  { id: 7, name: "Mythical", requiredTaps: 1000000000, bonus: 1000000000, icon: "🌈", baseIncome: 10000000 },
  { id: 8, name: "Divine", requiredTaps: 50000000000, bonus: 50000000000, icon: "⭐", baseIncome: 1000000000 },
  { id: 9, name: "Immortal", requiredTaps: 90000000000, bonus: 90000000000, icon: "🌌", baseIncome: 10000000000 }
];

// Wallet and auto-tap configuration
export const TON_WALLET = "UQC7JxkjGCWm99IUZGknnU_ctGNkngboRyfalkRPPMV-34M0";
export const AUTO_TAP_PRICE_TON = 1; // 1 TON for auto-tap

// Daily bonuses
export const DAILY_BONUSES = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  amount: Math.floor(50 * Math.pow(1.1, i))
}));

// Game state interface
export interface GameState {
  totalTaps: number;
  incomeMultiplier: number;
  baseIncomePerHour: number;
  coins: number;
  level: number;
  autoTapEndTime: string | null; // Added for auto-tap tracking
}

// Initial game state
export const initialState: GameState = {
  totalTaps: 0,
  incomeMultiplier: 1,
  baseIncomePerHour: 0,
  coins: 0,
  level: 0,
  autoTapEndTime: null,
};

// Function to process payment
const processPayment = async (amount: number): Promise<boolean> => {
  try {
    toast.loading('Connecting to TON wallet...');

    // Initialize TON Web
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

    // Create a transaction
    const transaction = {
      to: TON_WALLET,
      value: TonWeb.utils.toNano(amount), // Convert amount to nanoTON
    };

    // Send the transaction
    const result = await tonweb.provider.sendTransaction(transaction);
    
    // Check the result of the transaction
    if (result && result.transaction.id) {
      toast.success(`Payment of ${amount} TON confirmed!`);
      return true;
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    console.error('Payment error:', error);
    toast.error("Payment failed. Please try again.");
    return false;
  }
};

// Function to purchase auto-tap
export const purchaseAutoTap = async (state: GameState): Promise<GameState> => {
  if (state.coins < AUTO_TAP _PRICE_TON) {
    toast.error(`You need ${AUTO_TAP_PRICE_TON} TON to purchase auto-tap!`);
    return state;
  }

  const paymentConfirmed = await processPayment(AUTO_TAP_PRICE_TON);
  if (!paymentConfirmed) {
    toast.error("Payment failed. Please try again.");
    return state;
  }

  const newEndTime = new Date(Date.now() + AUTO_TAP_CONFIG.durationHours * 60 * 60 * 1000).toISOString();

  toast.success("Auto-tap purchased successfully!");

  return {
    ...state,
    coins: state.coins - AUTO_TAP_PRICE_TON,
    autoTapEndTime: newEndTime,
  };
};

// Function to update game state
export function updateGameState(state: GameState, newTotalTaps: number, currentLevel: any): GameState {
  let updates: Partial<GameState> = {
    totalTaps: newTotalTaps,
    incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.TAP,
    baseIncomePerHour: currentLevel.baseIncome
  };

  return { ...state, ...updates };
};

// Function to skip levels
export const skipLevel = async (state: GameState): Promise<GameState> => {
  const nextLevel = LEVELS[state.level + 1];
  if (!nextLevel) {
    toast.error("You're already at the maximum level!");
    return state;
  }

  const skipPrice = SKIP_PRICES_TON[state.level + 1];

  if (state.coins < skipPrice) {
    toast.error(`You need ${skipPrice} TON to skip to ${nextLevel.name}!`);
    return state;
  }

  const paymentConfirmed = await processPayment(skipPrice);
  if (!paymentConfirmed) {
    toast.error("Payment failed. Please try again.");
    return state;
  }

  return {
    ...state,
    level: nextLevel.id,
    totalTaps: nextLevel.requiredTaps,
    incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.LEVEL_UP,
    baseIncomePerHour: nextLevel.baseIncome,
    coins: state.coins - skipPrice
  };
};

// Export all necessary functions and constants
export {
  LEVELS,
  TON_WALLET,
  AUTO_TAP_PRICE_TON,
  DAILY_BONUSES,
  initialState,
  purchaseAutoTap,
  skipLevel,
  updateGameState,
}; 
