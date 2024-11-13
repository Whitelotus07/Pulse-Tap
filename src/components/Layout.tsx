import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, BarChart2, Trophy, Wallet, BookOpen, Video } from 'lucide-react'; // Import the necessary icons
import { motion } from 'framer-motion';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/game', icon: Home, label: 'Tap', color: 'text-pink-500' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop', color: 'text-purple-500' },
    { path: '/statistics', icon: BarChart2, label: 'Statistics', color: 'text-blue-500' },
    { path: '/tasks', icon: Video, label: 'Tasks', color: 'text-yellow-500' },
    { path: '/connect-wallet', icon: Wallet, label: 'Connect Wallet', color: 'text-green-500' },
    { path: '/levels', icon: BookOpen, label: 'Levels', color: 'text-blue-500' }
  ];

  return (
    <div className="min-h-screen pb-24">
      <Outlet />
      
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-around py-2 space-x-4 md:space-x-8"> {/* Add spacing between tabs */}
            {navItems.map(({ path, icon: Icon, label, color }) => (
              <Link
                key={path}
                to={path}
                className={`nav-item flex flex-col items-center ${location.pathname === path ? 'active' : 'text-white/60'} py-2`}
              >
                <Icon size={24} className={location.pathname === path ? color : 'text-white/60'} />
                <span className="text-xs">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
