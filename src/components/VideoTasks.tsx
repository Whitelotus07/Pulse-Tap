import React from 'react';
import { Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function VideoTasks() {
  const { dailyVideos, completeVideo } = useGameStore();

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Video className="text-pink-500" />
        <h2 className="text-xl font-bold">Daily Videos</h2>
      </div>

      <div className="space-y-4">
        {dailyVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg bg-white/5 cursor-pointer
              ${video.completed ? 'opacity-50' : ''}`}
            onClick={() => {
              if (!video.completed) {
                window.open(video.url, '_blank');
                completeVideo(video.id);
              }
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{video.title}</h3>
                <p className="text-yellow-400 text-sm">+{video.reward} coins</p>
              </div>
              {!video.completed && <Video size={20} className="text-pink-500" />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}