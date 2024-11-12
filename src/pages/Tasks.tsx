// src/pages/Tasks.tsx
import React from 'react';
import { Heart, Video, Calendar } from 'lucide-react';
import SocialTask from '../components/SocialTask';
import DailyBonusCard from '../components/DailyBonusCard';
import VideoTasks from '../components/VideoTasks';
import { useGameStore } from '../store/gameStore';

export default function Tasks() {
  const { socialTasksCompleted } = useGameStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Heart className="text-pink-500" />
            Social Tasks
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Render Social Tasks */}
            {SOCIAL_TASKS.map((task) => (
              <SocialTask
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                reward={task.reward}
                url={task.url}
                completed={socialTasksCompleted.includes(task.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Video className="text-pink-500" />
            Daily Videos
          </h2>
          <VideoTasks />
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Calendar className="text-pink-500" />
            Daily Bonus
          </h2>
          <DailyBonusCard />
        </div>
      </div>
    </div>
  );
}
