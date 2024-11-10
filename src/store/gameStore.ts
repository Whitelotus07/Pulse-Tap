import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isAfter, startOfDay, differenceInHours } from 'date-fns';
import toast from 'react-hot-toast';
import { 
  LEVELS, 
  DAILY_BONUSES, 
  DAILY_VIDEOS, 
  SOCIAL_TASKS,
  ACTIVITY_MULTIPLIERS, 
  AUTO_TAP_CONFIG
} from '../config/gameConfig';

interface GameState {
  coins: number;
  tapPower: number;
  baseIncomePerHour: number;
  lastDailyBonus: string | null;
  lastTapTime: string | null;
  currentDay: number;
  level: number;
  totalTaps: number;
  incomeMultiplier: number;
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
  calculateIncomePerHour: () => number;
  setLastTapTime: (time: string) => void;
  purchaseAutoTap: () => void;
  skipLevel: () => void;
  checkPulseReminder: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 0,
      tapPower: 1,
      baseIncomePerHour: 0,
      lastDailyBonus: null,
      lastTapTime: null,
      currentDay: 1,
      level: 0,
      totalTaps: 0,
      incomeMultiplier: 1,
      dailyVideos: DAILY_VIDEOS.map(v => ({ ...v, completed: false })),
      socialTasksCompleted: [],
      autoTapEndTime: null,

      addCoins: (amount) => set((state) => {
        const newAmount = amount * state.incomeMultiplier;
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
          incomeMultiplier: state.incomeMultiplier * ACTIVITY _MULTIPLIERS.TAP,
          baseIncomePerHour: currentLevel.baseIncome
        };

        if (nextLevel && newTotalTaps >= nextLevel.requiredTaps) {
          updates = {
            ...updates,
            level: nextLevel.id,
            coins: state.coins + nextLevel.bonus,
            incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.LEVEL_UP,
            baseIncomePerHour: nextLevel.baseIncome
          };
          toast.success(`Level Up! You're now ${nextLevel.name}! 🎉`);
        }

        return updates as GameState;
      }),

      skipLevel: () => set((state) => {
        const nextLevel = LEVELS[state.level + 1];
        if (!nextLevel) {
          toast.error("You're already at the maximum level!");
          return state;
        }

        return {
          level: nextLevel.id,
          totalTaps: nextLevel.requiredTaps,
          incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.LEVEL_UP,
          baseIncomePerHour: nextLevel.baseIncome
        };
      }),

      purchaseAutoTap: () => set((state) => {
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + AUTO_TAP_CONFIG.durationHours);
        
        return {
          autoTapEndTime: endTime.toISOString()
        };
      }),

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

      calculateIncomePerHour: () => {
        const state = get();
        return state.baseIncomePerHour * state.incomeMultiplier;
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
