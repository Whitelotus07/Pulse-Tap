import React, { useEffect, useState } from 'react';
import { TonConnectButton, useTonConnect } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

export default function TonConnect() {
  const { connected } = useTonConnect(); // Assuming useTonConnect provides connection state
  const [isConnected, setIsConnected] = useState(connected);

  useEffect(() => {
    setIsConnected(connected);
    if (connected) {
      toast.success('Wallet connected!');
    } else {
      toast.error('Wallet disconnected.');
    }
  }, [connected]);

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
      <TonConnectButton className="w-full" />
      <div className="mt-2 text-sm text-gray-400 text-right">
        {isConnected ? 'Wallet connected!' : 'Connect wallet to unlock features'}
      </div>
    </div>
  );
}
