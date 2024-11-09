import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Coins } from 'lucide-react';

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/game');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Coins size={48} className="text-yellow-400" />
          </motion.div>
        </div>

        <Zap size={84} className="mx-auto mb-6 text-pink-500 pulse-animation" />
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Pulse Tap
        </h1>
        
        <p className="text-gray-400 mb-8">Get ready to tap!</p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "240px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto"
        />
      </motion.div>
    </div>
  );
}