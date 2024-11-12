// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletProvider } from './context/WalletContext'; // Import the WalletProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider> {/* Wrap App with WalletProvider */}
      <App />
    </WalletProvider>
  </StrictMode>
);
