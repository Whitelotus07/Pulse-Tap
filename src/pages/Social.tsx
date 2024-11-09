import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIAL_TASKS } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';

export default function Social() {
  const { socialTasksCompleted, completeSocialTask } = useGameStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="text-pink-500" />
        <h1 className="text-2xl font-bold">Social Tasks</h1>
      </div>

      <div className="grid gap-4">
        {SOCIAL_TASKS.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.02 }}
            className={`card cursor-pointer ${
              socialTasksCompleted.includes(task.id) ? 'opacity-50' : ''
            }`}
            onClick={() => {
              if (!socialTasksCompleted.includes(task.id)) {
                window.open(task.url, '_blank');
                completeSocialTask(task.id);
              }
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-300">{task.description}</p>
                <p className="text-yellow-400 mt-2">+{task.reward.toLocaleString()} coins</p>
              </div>
              {!socialTasksCompleted.includes(task.id) && (
                <Heart className="text-pink-500" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}