import React, { useEffect, useState } from 'react';
import GainersTable from './components/GainersTable';
import LosersTable from './components/LosersTable';
import TopBannerScroll from './components/TopBannerScroll';
import BottomBannerScroll from './components/BottomBannerScroll';
import { FiRefreshCw } from 'react-icons/fi';
import GainersTable1Min from './components/GainersTable1Min';

// Live data polling interval (ms)
const POLL_INTERVAL = 30000;


export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [countdown, setCountdown] = useState(POLL_INTERVAL / 1000);

  // Poll backend connection and update countdown
  useEffect(() => {
    let intervalId;
    let countdownId;
    const checkConnection = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api`);
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      }
    };
    checkConnection();
    intervalId = setInterval(() => {
      checkConnection();
      setLastUpdate(new Date()); // Trigger refresh in child components
      setCountdown(POLL_INTERVAL / 1000);
    }, POLL_INTERVAL);
    countdownId = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : POLL_INTERVAL / 1000));
    }, 1000);
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, []);

  const refreshGainersAndLosers = () => {
    setLastUpdate(new Date()); // Trigger refresh in child components
    setCountdown(POLL_INTERVAL / 1000);
  };

  return (
    <div className="min-h-screen bg-dark text-white relative">
      {/* Background Purple Rabbit - Centered */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/purple-rabbit-bg.png"
          alt="BHABIT Background"
          className="w-96 h-96 sm:w-[32rem] sm:h-[32rem] lg:w-[40rem] lg:h-[40rem]"
          style={{ opacity: 0.05 }}
        />
      </div>
      {/* Move status/counter to top right */}
      <div className="fixed top-6 right-4 z-50 flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-mono bg-black/40 px-3 py-1 rounded-full border border-gray-700">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></span>
            <span className="font-bold">{String(countdown).padStart(2, '0')}</span>
          </div>
          <button
            onClick={refreshGainersAndLosers}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-900 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            aria-label="Refresh"
          >
            <FiRefreshCw className="text-xl text-purple-500" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono bg-black/40 px-3 py-1 rounded-full border border-gray-700">
          <span className="text-gray-400">Latest:</span>
          <span className="font-bold">{lastUpdate.toLocaleTimeString()}</span>
          <span className="text-gray-400">on</span>
          <span className="font-bold">{lastUpdate.toLocaleDateString()}</span>
        </div>
        {/* New Refresh Button in Top Right */}
      </div>
      {/* Main Container with padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center pt-8 pb-6">
          <div className="mb-4">
            <img
              src="/bhabit-logo.png"
              alt="BHABIT"
              className="h-20 sm:h-24 lg:h-28 animate-breathing"
            />
          </div>
          <img
            src="/pbi.png"
            alt="PROFITS BY IMPULSE"
            className="h-10 sm:h-12 lg:h-14 mb-4 transition-all duration-300 hover:scale-105 hover:brightness-125"
          />
        </header>
        {/* Top Banner - 1H Price */}
        <div className="mb-8 -mx-16 sm:-mx-24 lg:-mx-32 xl:-mx-40">
          <TopBannerScroll refreshTrigger={lastUpdate} />
        </div>
        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
        </div>
        {/* Main Content - Side by Side Panels */}
        {/* 1-Minute Gainers Table - Full Width */}
        <div className="mb-8">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-headline font-bold text-blue tracking-wide">
                GAINERS (1MIN)
              </h2>
            </div>
            {/* Header underline decoration */}
            <div className="mb-4 flex justify-start">
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </div>
            <GainersTable1Min />
          </div>
        </div>
        {/* 3-Minute Gainers and Losers Tables - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Top Gainers (3min) */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-headline font-bold text-blue tracking-wide">
                GAINERS (3MIN)
              </h2>
            </div>
            {/* Header underline decoration */}
            <div className="mb-4 flex justify-start">
              <div className="w-36 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </div>
            <GainersTable refreshTrigger={lastUpdate} />
          </div>
          {/* Right Panel - Top Losers */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-headline font-bold text-pink tracking-wide">
                LOSERS (3MIN)
              </h2>
            </div>
            {/* Header underline decoration */}
            <div className="mb-4 flex justify-start">
              <div className="w-32 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"></div>
            </div>
            <LosersTable refreshTrigger={lastUpdate} />
          </div>
        </div>
        {/* Bottom Banner - 1H Volume */}
        <div className="mb-8 -mx-16 sm:-mx-24 lg:-mx-32 xl:-mx-40">
          <BottomBannerScroll refreshTrigger={lastUpdate} />
        </div>
        {/* Footer */}
        <footer className="text-center py-8 text-muted text-sm font-mono">
          <p>
            © 2025 GUISAN DESIGN
            &nbsp;
            <span className="inline-flex items-center align-middle">
              <span className="text-pink-400 text-lg" style={{fontWeight: 900}}>⋆</span>
              <span className="text-purple text-lg mx-0.5" style={{fontWeight: 900}}>⋆</span>
              <span className="text-orange text-lg" style={{fontWeight: 900}}>⋆</span>
              <span className="text-purple text-lg mx-0.5" style={{fontWeight: 900}}>⋆</span>
              <span className="text-pink-400 text-lg" style={{fontWeight: 900}}>⋆</span>
            </span>
            &nbsp; BHABIT &nbsp;
            <span className="inline-flex items-center align-middle">
              <span className="text-pink-400 text-lg" style={{fontWeight: 900}}>⋆</span>
              <span className="text-purple text-lg mx-0.5" style={{fontWeight: 900}}>⋆</span>
              <span className="text-orange text-lg" style={{fontWeight: 900}}>⋆</span>
              <span className="text-purple text-lg mx-0.5" style={{fontWeight: 900}}>⋆</span>
              <span className="text-pink-400 text-lg" style={{fontWeight: 900}}>⋆</span>
            </span>
            &nbsp; TOM PETRIE
          </p>
        </footer>
      </div>
    </div>
  );
}
