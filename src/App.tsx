import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Game from './pages/Game';
import Loading from './pages/Loading';
import Shop from './pages/Shop';
import Layout from './components/Layout';
import ConnectWallet from './pages/ConnectWallet'; // Import the ConnectWallet page
import Levels from './pages/Levels'; // Import the Levels page
import Statistics from './pages/Statistics'; // Import the Statistics page
import Tasks from './pages/Tasks'; // Import the Tasks page
import Referral from './pages/Referral'; // Import the Referral page

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route element={<Layout />}>
            <Route path="/connect-wallet" element={<ConnectWallet />} /> {/* Route for Connect Wallet */}
            <Route path="/game" element={<Game />} />
            <Route path="/levels" element={<Levels />} /> {/* Route for Levels */}
            <Route path="/statistics" element={<Statistics />} /> {/* Route for Statistics */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/tasks" element={<Tasks />} /> {/* Route for Tasks */}
            <Route path="/referral" element={<Referral />} /> {/* Route for Referral */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
