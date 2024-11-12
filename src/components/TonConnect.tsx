// src/components/TonConnect.tsx

import React, { useState, useEffect } from 'react';
import { TonConnect, TonConnectUI } from '@tonconnect/sdk';

const tonConnect = new TonConnect({
  // You can specify options here if needed
  // e.g., network: 'testnet', etc.
});

const TonConnectComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const connection = await tonConnect.connect();
      if (connection) {
        setWalletAddress(connection.address);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    tonConnect.disconnect(); // Disconnect from the wallet
    setWalletAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connection = await tonConnect.getActiveConnection();
      if (connection) {
        setWalletAddress(connection.address);
        setIsConnected(true);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="mt-4">
      {isConnected ? (
        <div>
          <p className="text-green-500">Connected: {walletAddress}</p>
          <button onClick={disconnectWallet} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default TonConnectComponent;
