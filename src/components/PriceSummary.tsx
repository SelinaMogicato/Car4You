import React from 'react';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import { ChevronUp, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = [
  { path: '/', label: 'Vehicle' },
  { path: '/details', label: 'Details' },
  { path: '/extras', label: 'Preferences' },
  { path: '/summary', label: 'Summary' }
];

interface PriceSummaryProps {
  isHeaderVisible: boolean;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ isHeaderVisible }) => {
  const { state, totalPrice, days } = useBooking();
  const [isOpen, setIsOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedInsurance = insuranceOptions.find(i => i.id === state.selectedInsurance);
  const selectedExtrasList = extraOptions.filter(e => state.selectedExtras.includes(e.id));

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const canGoBack = currentStepIndex > 0;
  const canGoForward = currentStepIndex < steps.length - 1;

  // Calculate sticky position based on header visibility
  // Header (64px) + ProgressStepper (~100px) = ~164px when visible
  // ProgressStepper (~100px) when header hidden
  const stickyTop = isHeaderVisible ? 'top-[164px]' : 'top-[100px]';

  const handleBack = () => {
    if (canGoBack) {
      navigate(steps[currentStepIndex - 1].path);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      navigate(steps[currentStepIndex + 1].path);
    }
  };

  // Determine button text and action based on current step
  const getNextButtonConfig = () => {
    if (currentStepIndex === steps.length - 1) {
      return { text: 'Complete Reservation', onClick: () => {
        // Handle form submission on Summary page
        const form = document.getElementById('booking-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      }};
    }
    return { text: 'Continue', onClick: handleNext };
  };

  const nextButtonConfig = getNextButtonConfig();

  if (!state.selectedVehicle) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky ${stickyTop} transition-all duration-300`}>
        <div className="text-center text-gray-500 py-8">
          <p>Select a vehicle to see the price summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky ${stickyTop} transition-all duration-300`}>
      <div 
        className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center cursor-pointer md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-gray-900">Booking Summary</h3>
        <button className="md:hidden text-gray-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div className={`p-6 space-y-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Vehicle */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <div className="font-bold text-gray-900">{state.selectedVehicle.name}</div>
            <div className="text-sm text-gray-500">{state.selectedVehicle.category} Class</div>
          </div>
          <div className="text-right">
            <div className="font-medium">CHF {state.selectedVehicle.pricePerDay * days}</div>
            <div className="text-xs text-gray-500">{days} days x CHF {state.selectedVehicle.pricePerDay}</div>
          </div>
        </div>

        {/* Insurance */}
        {selectedInsurance && selectedInsurance.pricePerDay > 0 && (
          <div className="flex justify-between items-start pb-4 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-900">Insurance</div>
              <div className="text-sm text-gray-500">{selectedInsurance.name}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">CHF {selectedInsurance.pricePerDay * days}</div>
              <div className="text-xs text-gray-500">{days} days x CHF {selectedInsurance.pricePerDay}</div>
            </div>
          </div>
        )}

        {/* Extras */}
        {selectedExtrasList.length > 0 && (
          <div className="pb-4 border-b border-gray-100">
            <div className="font-medium text-gray-900 mb-2">Extras</div>
            <div className="space-y-2">
              {selectedExtrasList.map(extra => (
                <div key={extra.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{extra.name}</span>
                  <span>CHF {extra.pricePerDay! * days}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-2 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-end">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-purple-700 text-2xl">CHF {totalPrice}</span>
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">
            Includes all taxes and fees
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          {canGoBack && (
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <button
            onClick={nextButtonConfig.onClick}
            disabled={currentStepIndex === 0 && !state.selectedVehicle}
            className={`${canGoBack ? 'flex-1' : 'w-full'} px-4 py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
              currentStepIndex === 0 && !state.selectedVehicle
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200'
            }`}
          >
            {nextButtonConfig.text}
            {canGoForward && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
