import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isAfter, startOfDay, differenceInHours } from 'date-fns';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase'; // Import your Firestore instance
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions
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
  loadGameState: (userId: string) => Promise<void>; // Load game state from Firestore
  saveGameState: (userId: string) => Promise<void>; // Save game state to Firestore
}

const useGameStore = create<GameState>()(
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

    addCoins: async (amount) => {
      const newAmount = amount * get().incomeMultiplier;
      if (newAmount >= 1000) {
        toast.success(`+${Math.floor(newAmount).toLocaleString()} coins!`);
      }
      set((state) => ({ coins: state.coins + newAmount }));
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    removeCoins: async (amount) => {
      set((state) => ({
        coins: Math.max(0, state.coins - amount) // Prevent negative coins
      }));
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    incrementTaps: async () => {
      const state = get();
      const newTotalTaps = state.totalTaps + 1;
      const currentLevel = LEVELS[state.level];
      const nextLevel = LEVELS[state.level + 1];

      let updates: Partial<GameState> = {
        totalTaps: newTotalTaps,
        incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.TAP,
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
        toast.success(`Level Up! You're now ${next Level.name}! 🎉`);
      }

      set(updates as GameState);
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    skipLevel: async () => {
      const state = get();
      const nextLevel = LEVELS[state.level + 1];
      if (!nextLevel) {
        toast.error("You're already at the maximum level!");
        return;
      }

      set({
        level: nextLevel.id,
        totalTaps: nextLevel.requiredTaps,
        incomeMultiplier: state.incomeMultiplier * ACTIVITY_MULTIPLIERS.LEVEL_UP,
        baseIncomePerHour: nextLevel.baseIncome
      });
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    purchaseAutoTap: async () => {
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + AUTO_TAP_CONFIG.durationHours);
      
      set({ autoTapEndTime: endTime.toISOString() });
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    claimDailyBonus: async () => {
      const state = get();
      const now = new Date();
      const lastBonusDate = state.lastDailyBonus ? new Date(state.lastDailyBonus) : null;
      const isEligibleForBonus = !lastBonusDate || isAfter(now, addDays(startOfDay(lastBonusDate), 1));

      if (isEligibleForBonus) {
        const bonusAmount = DAILY_BONUSES[state.currentDay - 1] || 0;
        toast.success(`Claimed daily bonus of ${bonusAmount} coins!`);
        set({
          coins: state.coins + bonusAmount,
          lastDailyBonus: now.toISOString(),
          currentDay: (state.currentDay % DAILY_BONUSES.length) + 1 // Cycle through days
        });
        await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
      } else {
        toast.error("You can only claim your daily bonus once a day!");
      }
    },

    completeVideo: async (videoId) => {
      const state = get();
      const video = state.dailyVideos.find(v => v.id === videoId);
      if (video && !video.completed) {
        toast.success(`Completed video: ${video.title}`);
        set({
          dailyVideos: state.dailyVideos.map(v => 
            v.id === videoId ? { ...v, completed: true } : v
          )
        });
        await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
      }
    },

    completeSocialTask: async (taskId) => {
      const state = get();
      if (!state.socialTasksCompleted.includes(taskId)) {
        toast.success(`Completed social task: ${taskId}`);
        set({
          socialTasksCompleted: [...state.socialTasksCompleted, taskId]
        });
        await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
      }
    },

    calculateIncomePerHour: () => {
      const currentLevel = LEVELS[get().level];
      return currentLevel ? currentLevel.baseIncome * get().incomeMultiplier : 0;
    },

    setLastTapTime: async (time) => {
      set({ lastTapTime: time });
      await get().saveGameState('userId'); // Replace 'userId' with the actual user ID
    },

    checkPulseReminder: () => {
      const now = new Date();
      const lastTapTime = get().lastTapTime ? new Date(get().lastTapTime) : null;
      if (lastTapTime && differenceInHours(now, lastTapTime) >= 1) {
        toast.info("Don't forget to tap!");
      }
    },

    loadGameState: async (userId) => {
      const docRef = doc(db, 'gameStates', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set(docSnap.data() as GameState);
      } else {
        console.log("No such document!");
      }
    },

    saveGameState: async (userId) => {
      const docRef = doc(db, 'gameStates', userId);
      await setDoc(docRef, get());
    }
  })
);

export default useGameStore;
