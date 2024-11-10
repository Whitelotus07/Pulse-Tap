// Constants for game levels
export const LEVELS = [
  { id: 0, name: "Beginner", requiredTaps: 0, bonus: 0, icon: "🌱", baseIncome: 1, skipPrice: 1 },
  { id: 1, name: "Novice", requiredTaps: 1000, bonus: 1000, icon: "⚡", baseIncome: 10, skipPrice: 7 },
  { id: 2, name: "Apprentice", requiredTaps: 10000, bonus: 10000, icon: "🔥", baseIncome: 100, skipPrice: 10 },
  { id: 3, name: "Expert", requiredTaps: 100000, bonus: 100000, icon: "💫", baseIncome: 1000, skipPrice: 15 },
  { id: 4, name: "Master", requiredTaps: 1000000, bonus: 1000000, icon: "🌟", baseIncome: 10000 },
  { id: 5, name: "Grand Master", requiredTaps: 100000000, bonus: 100000000, icon: "👑", baseIncome: 100000 },
  { id: 6, name: "Legend", requiredTaps: 100000000, bonus: 100000000, icon: "🏆", baseIncome: 1000000 },
  { id: 7, name: "Mythical", requiredTaps: 10000000000, bonus: 10000000000, icon: "🌈", baseIncome: 10000000 },
  { id: 8, name: "Divine", requiredTaps: 50000000000, bonus: 50000000000, icon: "⭐", baseIncome: 100000000 },
  { id: 9, name: "Immortal", requiredTaps: 90000000000, bonus: 90000000000, icon: "🌌", baseIncome: 1000000000 }
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
    url: "https://youtube.com/watch?v=example3",
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

// Game state interface
export interface GameState {
  totalTaps: number;
  incomeMultiplier: number;
  baseIncomePerHour: number;
}

// Initial game state
export const initialState: GameState = {
  totalTaps: 0,
  incomeMultiplier: 1,
  baseIncomePerHour: 0
};

// Function to update game state
export function updateGameState(state: GameState, newTotalTaps: number, currentLevel: any): GameState {
  let updates: Partial<GameState> = {
    totalTaps: newTotalTaps,
    incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.TAP,
    baseIncomePerHour: currentLevel.baseIncome
  };

  return { ...state, ...updates };
   }
