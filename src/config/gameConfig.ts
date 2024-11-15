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

// Social tasks
export const SOCIAL_TASKS = [
  {
    id: "telegram",
    title: "Join Telegram Channel",
    description: "Join our official Telegram channel for updates",
    reward: 200,
    url: "https://t.me/pulsetap"
  },
  {
    id: "twitter_follow",
    title: "Follow on Twitter",
    description: "Follow our official Twitter account",
    reward: 200,
    url: "https://twitter.com/pulsetap"
  },
  {
    id: "twitter_retweet",
    title: "Retweet Latest Post",
    description: "Retweet our latest announcement",
    reward: 200,
    url: "https://twitter.com/pulsetap/status/latest"
  },
  {
    id: "discord",
    title: "Join Discord Server",
    description: "Join our community Discord server",
    reward: 200,
    url: "https://discord.gg/pulsetap"
  }
];

// Daily videos
export const DAILY_VIDEOS = [
  {
    id: "video1",
    title: "Daily Tips & Tricks",
    url: "https://youtube.com/watch?v=example1",
    reward: 200,
  },
  {
    id: "video2",
    title: "Strategy Guide",
    url: "https://youtube.com/watch?v=example2",
    reward: 200,
  },
  {
    id: "video3",
    title: "Community Showcase",
    url: "https://youtube.com/watch?v= example3",
    reward: 200,
  }
];

// Auto-tap configuration
export const AUTO_TAP_CONFIG = {
  tapsPerSecond: 1,
  durationHours: 24
};

// Activity multipliers
export const ACTIVITY_MULTIPLIERS = {
  TAP: 1.0,
  DAILY_BONUS: 1.1,
  VIDEO_WATCH: 1.2,
  SOCIAL_TASK: 1.5
};

// Referral bonus configuration
export const REFERRAL_BONUS = {
  bonusAmount: 500,
  requiredReferrals: 1,
};

// Define referral tasks
export const REFERRAL_TASKS = [
  {
    id: "refer_friend",
    title: "Refer a Friend",
    description: "Invite a friend to join the game and earn rewards!",
    reward: REFERRAL_BONUS.bonusAmount,
    completed: false,
  }
];

// Game state interface
export interface GameState {
  totalTaps: number;
  incomeMultiplier: number;
  baseIncomePerHour: number;
  coins: number;
  level: number;
  referralsCount: number;
  referralTasksCompleted: string[];
  autoTapEndTime: string | null; // Added for auto-tap tracking
}

// Initial game state
export const initialState: GameState = {
  totalTaps: 0,
  incomeMultiplier: 1,
  baseIncomePerHour: 0,
  coins: 0,
  level: 0,
  referralsCount: 0,
  referralTasksCompleted: [],
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
  if (state.coins < AUTO_TAP_PRICE_TON) {
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

// Function to complete a referral task
export const completeReferralTask = (state: GameState): GameState => {
  if (state.referralTasksCompleted.includes("refer_friend")) {
    toast.error("Referral task already completed!");
    return state;
  }

  const newCount = state.referralsCount + 1;
  const reward = REFERRAL_BONUS.bonusAmount;

  toast.success(`Referral task completed: +${reward.toLocaleString()} coins!`);

  return {
    ...state,
    referralsCount: newCount,
    referralTasksCompleted: [...state.referralTasksCompleted, "refer_friend"],
    coins: state.coins + reward,
  };
};

// Skip prices for levels 1 to 3 in TON
export const SKIP_PRICES_TON = [0, 1, 2, 3];

// Function to skip levels
export const skipLevel = async (state : GameState): Promise<GameState> => {
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
  SOCIAL_TASKS,
  DAILY_VIDEOS,
  REFERRAL_TASKS,
  initialState,
  purchaseAutoTap,
  skipLevel,
  updateGameState,
  completeReferralTask,
};
