import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import RentalDetails from './pages/RentalDetails';
import Preferences from './pages/Preferences';
import VehicleSelection from './pages/VehicleSelection';
import ExtrasInsurance from './pages/ExtrasInsurance';
import Summary from './pages/Summary';
import ProgressStepper from './components/ProgressStepper';
import PriceSummary from './components/PriceSummary';
import BottomBar from './components/BottomBar';
import { Car } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsHeaderVisible(true);
      }
      // Hide header when scrolling down and not at top
      else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 font-sans">
      {/* Header */}
      <header
        className={`bg-white shadow-sm sticky top-0 z-40 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2 text-purple-700">
            <Car size={32} />
            <span className="text-2xl font-bold tracking-tight">Car4You</span>
          </div>
        </div>
      </header>

      <ProgressStepper isHeaderVisible={isHeaderVisible} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {children}
          </div>

          {/* Sidebar Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <PriceSummary isHeaderVisible={isHeaderVisible} />
          </div>
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<RentalDetails />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/vehicles" element={<VehicleSelection />} />
            <Route path="/extras" element={<ExtrasInsurance />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Layout>
      </Router>
    </BookingProvider>
  );
}

export default App;
