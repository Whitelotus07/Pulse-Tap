import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LeaderboardPlayer {
  id: string;
  username: string;
  level: number;
  totalTaps: number;
  lastActive: string;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          orderBy('totalTaps', 'desc'),
          limit(100)
        );
        
        const snapshot = await getDocs(q);
        const leaderboardData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LeaderboardPlayer[];

        setPlayers(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" />;
      case 2:
        return <Medal className="text-gray-400" />;
      case 3:
        return <Medal className="text-amber-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Trophy className="text-pink-500 animate-pulse" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-pink-500" />
        <h1 className="text-2xl font-bold">Global Leaderboard</h1>
      </div>

      <div className="space-y-4">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              {getRankIcon(index + 1) || (
                <span className="text-lg font-bold">#{index + 1}</span>
              )}
            </div>
            
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{player.username}</h3>
              <div className="flex gap-4 text-sm text-gray-300">
                <span>Level {player.level}</span>
                <span>{player.totalTaps.toLocaleString()} taps</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}