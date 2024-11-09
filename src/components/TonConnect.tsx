import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

export default function TonConnect() {
  const handleConnectionChange = (isConnected) => {
    if (isConnected) {
      toast.success('Wallet connected!');
    } else {
      toast.error('Wallet disconnected.');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <TonConnectButton onClick={() => handleConnectionChange(true)} />
      {/* Display a message based on your connection state logic */}
      <div className="mt-2 text-sm text-gray-400 text-right">
        Connect wallet to unlock features
      </div>
    </div>
  );
}
