// src/pages/ConnectWallet.tsx

import React from 'react';
import TonConnect from '../components/TonConnect'; // Import the TonConnect component

export default function ConnectWallet() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
      <TonConnect /> {/* Render the TonConnect component */}
      <p className="mt-4 text-gray-300">
        Connect your wallet to unlock all features of the app.
      </p>
    </div>
  );
}
