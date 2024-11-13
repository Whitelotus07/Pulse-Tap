import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from './pages/Game';
import Loading from './pages/Loading';
import Shop from './pages/Shop';
import Layout from './components/Layout';
import ConnectWallet from './pages/ConnectWallet';
import Levels from './pages/Levels';
import Statistics from './pages/Statistics';
import Tasks from './pages/Tasks';
import Referral from './pages/Referral';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route element={<Layout />}>
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/game" element={<Game />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/referral" element={<Referral />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
