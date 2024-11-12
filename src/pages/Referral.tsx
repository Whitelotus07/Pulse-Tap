import React from 'react';
import { useGameStore } from '../store/gameStore';
import { REFERRAL_TASKS } from '../config/gameConfig';

export default function Referral() {
  const { referralTasksCompleted, completeReferralTask } = useGameStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Referral Tasks</h1>
      <div className="grid gap-4 mt-4">
        {REFERRAL_TASKS.map((task) => (
          <div key={task.id} className={`card ${referralTasksCompleted.includes(task.id) ? 'opacity-50' : ''}`}>
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-300">{task.description}</p>
            <p className="text-yellow-400 mt-2">+{task.reward.toLocaleString()} coins</p>
            {!referralTasksCompleted.includes(task.id) && (
              <button onClick={completeReferralTask} className="btn-primary mt-2">Complete Referral</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
