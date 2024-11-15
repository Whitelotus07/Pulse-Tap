import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isAfter, startOfDay, differenceInHours } from 'date-fns';
import toast from 'react-hot-toast';
import { 
  LEVELS, 
  DAILY_BONUSES, 
  DAILY_VIDEOS, 
  SOCIAL_TASKS,
  AUTO_TAP_CONFIG,
  SKIP_PRICES_TON // Assuming you have defined skip prices in your config
} from '../config/gameConfig';
import { useWallet } from '../context/WalletContext'; // Import the wallet context

interface GameState {
  coins: number;
  tapPower: number;
  lastDailyBonus: string | null;
  lastTapTime: string | null;
  currentDay: number;
  level: number;
  totalTaps: number;
  referralBonus: number; // Add referral bonus to the state
  dailyVideos: Array<typeof DAILY_VIDEOS[0] & { completed: boolean }>;
  socialTasksCompleted: string[];
  autoTapEndTime: string | null;

  // Actions
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  incrementTaps: () => void;
  claimDailyBonus: () => void;
  completeVideo: (videoId: string) => void;
  completeSocialTask: (taskId: string) => void;
  addReferralBonus: (amount: number) => void; // New method to add referral bonus
  calculateIncomePerHour: () => number;
  setLastTapTime: (time: string) => void;
  purchaseAutoTap: () => Promise<void>; // Updated to return a Promise
  skipLevel: () => Promise<void>; // Updated to return a Promise
  checkPulseReminder: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 0,
      tapPower: 1,
      lastDailyBonus: null,
      lastTapTime: null,
      currentDay: 1,
      level: 0,
      totalTaps: 0,
      referralBonus: 0, // Initialize referral bonus
      dailyVideos: DAILY_VIDEOS.map(v => ({ ...v, completed: false })),
      socialTasksCompleted: [],
      autoTapEndTime: null,

      addCoins: (amount) => set((state) => {
        const newAmount = amount; // No multiplier applied here
        if (newAmount >= 1000) {
          toast.success(`+${Math.floor(newAmount).toLocaleString()} coins!`);
        }
        return { coins: state.coins + newAmount };
      }),

      removeCoins: (amount) => set((state) => ({
        coins: Math.max(0, state.coins - amount) // Prevent negative coins
      })),

      incrementTaps: () => set((state) => {
        const newTotalTaps = state.totalTaps + 1;
        const currentLevel = LEVELS[state.level];
        const nextLevel = LEVELS[state.level + 1];

        let updates: Partial<GameState> = {
          totalTaps: newTotalTaps,
        };

        if (nextLevel && newTotalTaps >= nextLevel.requiredTaps) {
          updates = {
            ...updates,
            level: nextLevel.id,
            coins: state.coins + nextLevel.bonus,
          };
          toast.success(`Level Up! You're now ${nextLevel.name}! 🎉`);
        }

        return updates as GameState;
      }),

      skipLevel: async () => {
        const { sendPayment } = useWallet(); // Access the payment function from the wallet context
        const state = get();
        const nextLevel = LEVELS[state.level + 1];
        if (!nextLevel) {
          toast.error("You're already at the maximum level!");
          return;
        }

        const skipPrice = SKIP_PRICES_TON[state.level + 1]; // Get the skip price for the next level in TON

        // Check if the player has enough coins
        if (state.coins < skipPrice) {
          toast.error(`You need ${skipPrice} TON to skip to ${nextLevel.name}!`);
          return;
        }

        const recipientAddress = 'UQC7JxkjGCWm99IUZGknnU_ctGNkngboRyfalkRPPMV-34M0'; // Specify recipient address

        try {
          // Send payment to skip level
          await sendPayment(recipientAddress, skipPrice);
        } catch (error) {
          toast.error('Payment failed. Please try again.');
          return; // Exit if payment fails
        }

        // Update the state to skip the level
        set((prevState) => ({
          level: nextLevel.id,
          totalTaps: nextLevel.requiredTaps,
          coins: prevState.coins - skipPrice // Deduct the skip price
        }));
        toast.success(`Skipped to ${nextLevel.name}! 🚀`);
      },

      claimDailyBonus: () => set((state) => {
        const now = new Date();
        const lastBonusDate = state.lastDailyBonus ? new Date(state.lastDailyBonus) : null;

        if (!lastBonusDate || isAfter(now, addDays(startOfDay(lastBonusDate), 1))) {
          const bonus = DAILY_BONUSES[state.currentDay - 1];
          toast.success(`Claimed daily bonus: ${bonus.amount.toLocaleString()} coins!`);
          return {
            coins: state.coins + bonus.amount,
            lastDailyBonus: now.toISOString(),
            currentDay: state.currentDay + 1 > DAILY_BONUSES.length ? 1 : state.currentDay + 1 // Reset to day 1 if at the end
          };
        }

        toast.error("You can only claim your daily bonus once every 24 hours!");
        return state;
      }),

      completeVideo: (videoId) => set((state) => {
        const videoIndex = state.dailyVideos.findIndex(v => v.id === videoId);
        if (videoIndex === -1 || state.dailyVideos[videoIndex].completed) {
          toast.error("Video already completed or not found!");
          return state;
        }

        const updatedVideos = [...state.dailyVideos];
        updatedVideos[videoIndex] = { ...updatedVideos[videoIndex], completed: true };
        
        toast.success(`Video completed: +${updatedVideos[videoIndex].reward.toLocaleString()} coins!`);
        
        return {
          dailyVideos: updatedVideos,
          coins: state.coins + updatedVideos[videoIndex].reward
        };
      }),

      completeSocialTask: (taskId) => set((state) => {
        if (state.socialTasksCompleted.includes(taskId)) {
          toast.error("Task already completed!");
          return state;
        }

        const task = SOCIAL_TASKS.find(t => t.id === taskId);
        if (!task) {
          toast.error("Task not found!");
          return state;
        }

        toast.success(`Task completed: +${task.reward.toLocaleString()} coins!`);
        
        return {
          socialTasksCompleted: [...state.socialTasksCompleted, taskId],
          coins: state.coins + task.reward
        };
      }),

      addReferralBonus: (amount) => set((state) => {
        toast.success(`Referral bonus: +${amount.toLocaleString()} coins!`);
        return {
          referralBonus: state.referralBonus + amount,
          coins: state.coins + amount
        };
      }),

      calculateIncomePerHour: () => {
        const state = get();
        const currentLevel = LEVELS[state.level];
        const dailyBonus = DAILY_BONUSES[state.currentDay - 1]?.amount || 0; // Get the daily bonus for the current day
        const totalIncome = (currentLevel ? currentLevel.baseIncome : 0) + dailyBonus + state.referralBonus; // Total income includes daily bonus and referral bonus

        return totalIncome; // Return total income without multipliers
      },

      setLastTapTime: (time) => set({ lastTapTime: time }),

      checkPulseReminder: () => {
        const state = get();
        if (state.lastTapTime) {
          const hoursSinceLastTap = differenceInHours(new Date(), new Date(state.lastTapTime));
          if (hoursSinceLastTap >= 24) {
            toast('Time for your daily pulse check! 💗', {
              duration: 5000,
              position: 'top-center',
              icon: '❤️'
            });
          }
        }
      },

      purchaseAutoTap: async () => {
        const { isConnected, walletAddress } = useWallet(); // Access wallet context
        if (!isConnected) {
          toast.error("Please connect your wallet to purchase!");
          return;
        }

        // Logic to handle auto-tap purchase
        const cost = AUTO_TAP_CONFIG.cost; // Assume cost is defined in your config
        if (get().coins < cost) {
          toast.error("Not enough coins to purchase auto-tap!");
          return;
        }

        // Deduct coins and handle purchase logic
        set((state) => ({
          coins: state.coins - cost,
          autoTapEndTime: new Date(Date.now() + AUTO_TAP_CONFIG.duration).toISOString() // Set end time for auto-tap
        }));
        toast.success("Auto-tap purchased successfully!");
      }
    }),
    {
      name: 'game-storage',
      getStorage: () => localStorage,
    }
  )
);

export { useGameStore };
export type { GameState };
