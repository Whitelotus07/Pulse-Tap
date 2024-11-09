import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '@tonconnect/ui-react';
import toast from 'react-hot-toast';

export default function TonConnect() {
  const { connected } = useTonConnect();

  return (
    <div className="fixed top-4 right-4 z-50">
      <TonConnectButton />
      {!connected && (
        <div className="mt-2 text-sm text-gray-400 text-right">
          Connect wallet to unlock features
        </div>
      )}
    </div>
  );
}