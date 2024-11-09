import React, { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react'; // Import only the TonConnectButton
import toast from 'react-hot-toast';

export default function TonConnect() {
  const [isConnected, setIsConnected] = useState(false); // State to manage connection

  // Mock function to simulate checking wallet connection
  const someConnectionCheckFunction = async () => {
    // Implement your logic to check if the wallet is connected
    // For example, you might check a global state or call a wallet API
    // Here we just return a random boolean for demonstration purposes
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

    // Optionally, you can set up event listeners to update the connection status
    // e.g., if your wallet provider emits events on connection status changes

    // Clean up any listeners if necessary
    return () => {
      // Cleanup logic here if you set up listeners
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
      <TonConnectButton className="w-32 sm:w-auto" /> {/* Smaller width for mobile */}
      <div className="mt-2 text-sm text-gray-400 text-right">
        {isConnected ? 'Wallet connected!' : 'Connect wallet to unlock features'}
      </div>
    </div>
  );
}
