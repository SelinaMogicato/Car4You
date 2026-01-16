import React, { useState, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { insuranceOptions, extraOptions } from '../data/mockData';

const steps = [
  { path: '/', label: 'Location' },
  { path: '/preferences', label: 'Preferences' },
  { path: '/vehicles', label: 'Vehicle' },
  { path: '/extras', label: 'Extras' },
  { path: '/summary', label: 'Summary' }
];

const BottomBar: React.FC = () => {
  const { totalPrice, state, days } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const canGoBack = currentStepIndex > 0;
  const canGoForward = currentStepIndex < steps.length - 1;

  const selectedInsurance = insuranceOptions.find(i => i.id === state.selectedInsurance);
  const selectedExtrasList = extraOptions.filter(e => state.selectedExtras.includes(e.id));

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp && !isExpanded) {
      setIsExpanded(true);
    } else if (isSwipeDown && isExpanded) {
      setIsExpanded(false);
    }
  };

  const isStepValid = () => {
    switch (currentStepIndex) {
      case 0:
        return state.pickupLocation && state.returnLocation && state.pickupDate && state.returnDate;
      case 1:
        return state.priceRange.length === 2;
      case 2:
        return !!state.selectedVehicle;
      case 3:
        return !!state.selectedInsurance;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      navigate(steps[currentStepIndex - 1].path);
    }
  };

  const handleNext = () => {
    if (currentStepIndex === steps.length - 1) {
      const form = document.getElementById('booking-form') as HTMLFormElement;
      if (form) form.requestSubmit();
    } else if (canGoForward) {
      navigate(steps[currentStepIndex + 1].path);
    }
  };

  const getButtonText = () => {
    if (currentStepIndex === steps.length - 1) return 'Complete';
    return 'Continue';
  };

  const hasDetailsToShow = state.selectedVehicle || (currentStepIndex >= 1 && days > 0);

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 transition-all duration-300 ease-out rounded-t-2xl ${
          isExpanded ? 'max-h-[70vh]' : 'max-h-32'
        }`}
      >
        {/* iOS-style drag handle */}
        <div
          className="flex justify-center pt-2 pb-1 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Expandable content */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[50vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-4 overflow-y-auto max-h-[45vh]">
            <h3 className="font-bold text-gray-900 mb-3 text-center">Booking Summary</h3>

            {/* Rental Duration */}
            {days > 0 && (
              <div className="py-3 border-b border-gray-100">
                <div className="text-sm text-gray-600">Rental Duration</div>
                <div className="font-bold text-purple-700">{days} {days === 1 ? 'day' : 'days'}</div>
              </div>
            )}

            {/* Price Range (for preferences step) */}
            {currentStepIndex >= 1 && (
              <div className="py-3 border-b border-gray-100">
                <div className="text-sm text-gray-600">Price Range per Day</div>
                <div className="font-bold text-purple-700">CHF {state.priceRange[0]} - CHF {state.priceRange[1]}</div>
              </div>
            )}

            {/* Priority */}
            {state.priority && (
              <div className="py-3 border-b border-gray-100">
                <div className="text-sm text-gray-600">Priority</div>
                <div className="font-bold text-purple-700">{state.priority}</div>
              </div>
            )}

            {/* Vehicle */}
            {state.selectedVehicle && (
              <div className="py-3 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{state.selectedVehicle.name}</div>
                    <div className="text-sm text-gray-500">{state.selectedVehicle.category} Class</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">CHF {state.selectedVehicle.pricePerDay * days}</div>
                    <div className="text-xs text-gray-500">{days} days x CHF {state.selectedVehicle.pricePerDay}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Insurance */}
            {selectedInsurance && selectedInsurance.pricePerDay > 0 && (
              <div className="py-3 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">Insurance</div>
                    <div className="text-sm text-gray-500">{selectedInsurance.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">CHF {selectedInsurance.pricePerDay * days}</div>
                    <div className="text-xs text-gray-500">{days} days x CHF {selectedInsurance.pricePerDay}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Extras */}
            {selectedExtrasList.length > 0 && (
              <div className="py-3 border-b border-gray-100">
                <div className="font-medium text-gray-900 mb-2">Extras</div>
                <div className="space-y-1">
                  {selectedExtrasList.map(extra => (
                    <div key={extra.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{extra.name}</span>
                      <span>CHF {extra.pricePerDay! * days}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main bottom bar content */}
        <div className="p-4 pt-2">
          <div className="flex items-center justify-between gap-3">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => hasDetailsToShow && setIsExpanded(!isExpanded)}
            >
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-lg font-bold text-purple-700">CHF {totalPrice}</div>
              {hasDetailsToShow && (
                <div className="text-xs text-purple-600">
                  {isExpanded ? 'Tap to collapse' : 'Tap for details'}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="p-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-5 py-3 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${
                  !isStepValid()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200'
                }`}
              >
                {getButtonText()}
                {canGoForward && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
