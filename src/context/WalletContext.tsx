// src/context/WalletContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TonConnect } from '@tonconnect/sdk';

const tonConnect = new TonConnect();

interface WalletContextProps {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    tonConnect.disconnect();
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
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
