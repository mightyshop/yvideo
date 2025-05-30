import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import VideoPlayer from './components/VideoPlayer';
import { videos } from './data/videos';
import CountdownTimer from './components/CountdownTimer';
import Games from './pages/Games';
import Website from './pages/Website';
import Apps from './pages/Apps';
import Profile from './pages/Profile';
import Dashboard from './pages/business/Dashboard';
import Advertise from './pages/Advertise';
import Reports from './pages/Reports';
import Seller from './pages/Seller';
import BusinessOrders from './pages/business/Orders';
import BusinessSettings from './pages/business/Settings';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showEarningMessage, setShowEarningMessage] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let autoPlayTimer: number;
    
    if (autoPlay && isPlaying) {
      autoPlayTimer = window.setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      }, 60000); // Auto advance every 60 seconds
    }

    return () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    };
  }, [autoPlay, isPlaying]);

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setShowEarningMessage(true);
    setTimeout(() => {
      setShowEarningMessage(false);
    }, 3000);
  };

  const MainContent = () => (
    <div className={`h-full flex items-center justify-center bg-black relative ${isMobile ? 'min-h-screen' : ''}`}>
      {!isMobile && (
        <div className="fixed top-8 right-8 bg-black/90 rounded-xl backdrop-blur-md px-4 py-2 z-50">
          <span className="text-white font-bold">Balance: ${balance.toFixed(2)}</span>
        </div>
      )}

      {isMobile ? (
        <div className="w-full h-screen relative">
          <VideoPlayer 
            videos={videos} 
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentIndex={currentVideoIndex}
            setCurrentIndex={setCurrentVideoIndex}
          />
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50">
            <div className="w-20 h-20 bg-black/90 rounded-full backdrop-blur-md flex items-center justify-center">
              <CountdownTimer 
                onComplete={handleTimerComplete}
                isPlaying={isPlaying}
              />
            </div>
            <p className="text-white text-xs mt-2 max-w-[120px] text-center opacity-80">
              Earn $1.00
            </p>
          </div>

          {showEarningMessage && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full z-50 animate-fade-in-out">
              You earned $1.00!
            </div>
          )}

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="absolute bottom-20 right-4 bg-black/90 rounded-full px-4 py-2 text-white text-sm z-50"
          >
            {autoPlay ? 'Auto-Play: On' : 'Auto-Play: Off'}
          </button>
        </div>
      ) : (
        <div className="relative w-[390px] h-[844px] bg-white rounded-[55px] shadow-2xl overflow-hidden my-8 mx-auto">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 inset-x-0 h-[47px] bg-black">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[157px] h-[34px] bg-black rounded-b-[24px]"></div>
            </div>
            
            <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-8 text-white z-50">
              <span className="text-sm font-medium">9:03 PM</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm">5G</span>
                <div className="w-6 h-3 flex items-center">
                  <div className="w-1 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1 h-2 bg-white rounded-sm mx-0.5"></div>
                  <div className="w-1 h-2.5 bg-white rounded-sm"></div>
                  <div className="w-1 h-3 bg-white rounded-sm ml-0.5"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 inset-x-0 h-8 flex items-center justify-center">
              <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute top-[47px] inset-x-0 bottom-8 bg-black">
            <VideoPlayer 
              videos={videos} 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentIndex={currentVideoIndex}
              setCurrentIndex={setCurrentVideoIndex}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Business Routes */}
        <Route path="/business/dashboard" element={<Dashboard />} />
        <Route path="/business/advertise" element={<Advertise />} />
        <Route path="/business/reports" element={<Reports />} />
        <Route path="/business/seller" element={<Seller />} />
        <Route path="/business/orders" element={<BusinessOrders />} />
        <Route path="/business/settings" element={<BusinessSettings />} />

        {/* Main Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainContent />} />
          <Route path="/games" element={<Games />} />
          <Route path="/website" element={<Website />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;