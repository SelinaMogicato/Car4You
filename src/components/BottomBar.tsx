import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomBar: React.FC = () => {
  const { totalPrice, state } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();

  const getNextPath = () => {
    switch (location.pathname) {
      case '/': return '/details';
      case '/details': return '/extras';
      case '/extras': return '/summary';
      default: return '/';
    }
  };

  const getButtonText = () => {
    if (location.pathname === '/summary') return 'Complete Reservation';
    return 'Next Step';
  };

  const isDisabled = () => {
    if (location.pathname === '/' && !state.selectedVehicle) return true;
    if (location.pathname === '/details' && (!state.pickupDate || !state.returnDate || !state.pickupLocation)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Total</div>
          <div className="text-xl font-bold text-purple-700">CHF {totalPrice}</div>
        </div>
        <button
          onClick={() => navigate(getNextPath())}
          disabled={isDisabled()}
          className={`px-6 py-3 rounded-lg font-bold text-white transition-colors ${
            isDisabled() 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200'
          }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
