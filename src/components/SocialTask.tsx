import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface SocialTaskProps {
  id: string;
  title: string;
  description: string;
  reward: number;
  url: string;
  completed: boolean;
}

export default function SocialTask({ id, title, description, reward, url, completed }: SocialTaskProps) {
  const { completeSocialTask, checkIfCompleted } = useGameStore();

  const handleClick = () => {
    // Open the URL in a new tab
    window.open(url, '_blank');

    // Check if the task has been completed by the user
    if (checkIfCompleted(id)) {
      completeSocialTask(id, reward); // Complete the task and grant the reward
    } else {
      // Optionally, you can show a message if the task is not completed
      alert("Please complete the task before claiming the reward.");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`card cursor-pointer ${completed ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
          <p className="text-yellow-400 mt-2">+{reward} coins</p>
        </div>
        {!completed && (
          <ExternalLink className="text-pink-500" />
        )}
      </div>
    </motion.div>
  );
}
