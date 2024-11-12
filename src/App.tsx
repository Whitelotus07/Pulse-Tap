import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from './pages/Game';
import Loading from './pages/Loading';
import Shop from './pages/Shop';
import Layout from './components/Layout';
import ConnectWallet from './pages/ConnectWallet'; // Import the new ConnectWallet page
import Levels from './pages/Levels'; // Import the new Levels page
import Statistics from './pages/Statistics'; // Import the new Statistics page

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route element={<Layout />}>
            <Route path="/connect-wallet" element={<ConnectWallet />} /> {/* New route for Connect Wallet */}
            <Route path="/game" element={<Game />} />
            <Route path="/levels" element={<Levels />} /> {/* New route for Levels */}
            <Route path="/statistics" element={<Statistics />} /> {/* New route for Statistics */}
            <Route path="/shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
