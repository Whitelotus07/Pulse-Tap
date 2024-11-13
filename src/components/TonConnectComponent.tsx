import React, { useState, useEffect } from 'react';
import TonWeb from 'tonweb';
import { useGameStore } from '../store/gameStore'; // Import the game store

const tonweb = new TonWeb(); // Initialize TonWeb

const TonConnectComponent = () => {
  const { setWalletAddress, setIsConnected } = useGameStore(); // Use Zustand store
  const [walletAddress, setLocalWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Request to connect to the TON wallet
      const wallet = tonweb.wallet.create({ publicKey: await tonweb.utils.getPublicKey() });
      const address = wallet.address.toString();

      // Here you would typically use a method to request the user's wallet to connect
      // For example, using a browser extension or a wallet provider
      setLocalWalletAddress(address);
      setWalletAddress(address); // Update Zustand store
      setIsConnected(true); // Update Zustand store
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setLocalWalletAddress(null);
    setWalletAddress(null); // Update Zustand store
    setIsConnected(false); // Update Zustand store
  };

  useEffect(() => {
    // This can be used to check if the user is already connected
    const checkConnection = async () => {
      // Implement logic to check for an existing wallet connection
      // This might involve checking local storage or a similar mechanism
      const storedAddress = localStorage.getItem('walletAddress');
      if (storedAddress) {
        setLocalWalletAddress(storedAddress);
        setWalletAddress(storedAddress); // Update Zustand store
        setIsConnected(true); // Update Zustand store
      }
    };

    checkConnection();
  }, [setWalletAddress, setIsConnected]);

  return (
    <div className="mt-4">
      {walletAddress ? (
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
