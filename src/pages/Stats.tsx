import React from 'react';
import { BarChart2, Award, Share2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import SocialTask from '../components/SocialTask';

export default function Stats() {
  const { tasks, totalTaps, calculateIncomePerHour } = useGameStore();
  const socialTasks = tasks.filter(t => t.type === 'social');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="text-pink-500" />
        <h1 className="text-2xl font-bold">Statistics</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="text-yellow-400" />
            Achievements
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Taps</span>
              <span>{totalTaps.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Hourly Income</span>
              <span>{calculateIncomePerHour().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Share2 className="text-pink-500" />
            Social Tasks
          </h2>
          <div className="space-y-4">
            {socialTasks.map((task) => (
              <SocialTask
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                reward={task.reward}
                url={task.url!}
                completed={task.completed}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}