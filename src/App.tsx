import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import TonWeb from 'tonweb'; // Import tonweb
import Game from './pages/Game';
import Loading from './pages/Loading';
import Shop from './pages/Shop';
import Layout from './components/Layout';
import ConnectWallet from './pages/ConnectWallet';
import Levels from './pages/Levels';
import Statistics from './pages/Statistics';
import Tasks from './pages/Tasks';
import Referral from './pages/Referral';

// Dynamic manifest URL based on the environment
const manifestUrl = process.env.REACT_APP_TON_MANIFEST_URL || "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

function App() {
  const [tonWeb, setTonWeb] = useState(null);

  useEffect(() => {
    // Initialize TonWeb
    const initializeTonWeb = async () => {
      const tonweb = new TonWeb(); // Initialize tonweb instance
      setTonWeb(tonweb);
    };

    initializeTonWeb();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route element={<Layout />}>
            <Route path="/connect-wallet" element={<ConnectWallet tonWeb={tonWeb} />} />
            <Route path="/game" element={<Game tonWeb={tonWeb} />} />
            <Route path="/levels" element={<Levels tonWeb={tonWeb} />} />
            <Route path="/statistics" element={<Statistics tonWeb={tonWeb} />} />
            <Route path="/shop" element={<Shop tonWeb={tonWeb} />} />
            <Route path="/tasks" element={<Tasks tonWeb={tonWeb} />} />
            <Route path="/referral" element={<Referral tonWeb={tonWeb} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
