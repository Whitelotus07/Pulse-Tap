export interface Level {
  id: number;
  name: string;
  requiredTaps: number;
  bonus: number;
  icon: string;
}

export interface DailyBonus {
  day: number;
  amount: number;
}

export interface VideoTask {
  id: string;
  title: string;
  url: string;
  reward: number;
  completed: boolean;
}