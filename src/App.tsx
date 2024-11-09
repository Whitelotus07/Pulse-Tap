import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from './pages/Game';
import Loading from './pages/Loading';
import Stats from './pages/Stats';
import Shop from './pages/Shop';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route element={<Layout />}>
            {/* Render TonConnect inside Layout to ensure it appears above tabs */}
            <Route path="/game" element={<><TonConnect /><Game /></>} />
            <Route path="/stats" element={<><TonConnect /><Stats /></>} />
            <Route path="/shop" element={<><TonConnect /><Shop /></>} />
            <Route path="/leaderboard" element={<><TonConnect /><Leaderboard /></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
