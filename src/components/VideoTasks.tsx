import React from 'react';
import { Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function VideoTasks() {
  const { dailyVideos, completeVideo, completeActivity } = useGameStore();

  // Additional activities for subscribing to YouTube and watching videos
  const additionalActivities = [
    {
      id: 'subscribe_youtube',
      title: 'Subscribe to YouTube Channel',
      url: 'https://www.youtube.com/channel/your_channel_id', // Replace with your YouTube channel link
      reward: 300, // Reward for subscribing
    },
    {
      id: 'watch_promotional_video',
      title: 'Watch Promotional Video',
      url: 'https://www.youtube.com/watch?v=your_video_id', // Replace with your promotional video link
      reward: 200, // Reward for watching
    },
    {
      id: 'watch_tutorial_video',
      title: 'Watch Tutorial Video',
      url: 'https://www.youtube.com/watch?v=your_tutorial_video_id', // Replace with your tutorial video link
      reward: 250, // Reward for watching
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Video className="text-pink-500" />
        <h2 className="text-xl font-bold">Daily Videos & Activities</h2>
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

        {/* Render additional activities */}
        {additionalActivities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg bg-white/5 cursor-pointer`}
            onClick={() => {
              window.open(activity.url, '_blank');
              completeActivity(activity.id, activity.reward); // Call the function to complete the activity
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{activity.title}</h3>
                <p className="text-yellow-400 text-sm">+{activity.reward} coins</p>
              </div>
              <Video size={20} className="text-pink-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
