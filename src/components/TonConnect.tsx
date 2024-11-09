import React, { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react'; // Import only the TonConnectButton
import toast from 'react-hot-toast';

export default function TonConnect() {
  const [isConnected, setIsConnected] = useState(false); // State to manage connection

  // Mock function to simulate checking wallet connection
  const someConnectionCheckFunction = async () => {
    return Math.random() > 0.5; // Simulate a connection status
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await someConnectionCheckFunction(); // Check if connected
      setIsConnected(connected);
      if (connected) {
        toast.success('Wallet connected!');
      } else {
        toast.error('Wallet disconnected.');
      }
    };

    checkConnection();

    return () => {
      // Cleanup logic here if you set up listeners
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
      <TonConnectButton className="w-full sm:w-auto" /> {/* Responsive width */}
      <div className="mt-2 text-sm text-gray-400 text-right">
        {isConnected ? 'Wallet connected!' : 'Connect wallet to unlock features'}
      </div>
    </div>
  );
}
