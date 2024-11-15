// src/context/WalletContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import TonWeb from 'tonweb';

const tonWeb = new TonWeb(new TonWeb.HttpProvider('https://mainnet.toncenter.com/api/v2/jsonRPC'));

interface WalletContextProps {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendPayment: (recipientAddress: string, amount: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any>(null); // Store the wallet instance

  const connectWallet = async () => {
    try {
      // Create a wallet instance (replace with your wallet public key)
      const walletInstance = tonWeb.wallet.create({ publicKey: 'YOUR_PUBLIC_KEY' });
      const address = await walletInstance.getAddress();
      setWalletAddress(address.toString());
      setWallet(walletInstance);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWallet(null);
    setIsConnected(false);
  };

  const sendPayment = async (recipientAddress: string, amount: number) => {
    if (!isConnected || !walletAddress) {
      throw new Error('Wallet is not connected');
    }

    try {
      const payment = await wallet.send({
        to: recipientAddress,
        amount: TonWeb.utils.toNano(amount), // Convert amount to nanoTON
      });
      console.log('Payment successful:', payment);
    } catch (error) {
      console.error('Payment failed:', error);
      throw error; // Rethrow to handle it in the calling component
    }
  };

  useEffect(() => {
    // Optionally check for an existing wallet connection here
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet, sendPayment }}>
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
