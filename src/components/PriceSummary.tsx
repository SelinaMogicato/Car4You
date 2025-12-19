import React from 'react';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import { ChevronUp, ChevronDown } from 'lucide-react';

const PriceSummary: React.FC = () => {
  const { state, totalPrice, days } = useBooking();
  const [isOpen, setIsOpen] = React.useState(true);

  const selectedInsurance = insuranceOptions.find(i => i.id === state.selectedInsurance);
  const selectedExtrasList = extraOptions.filter(e => state.selectedExtras.includes(e.id));

  if (!state.selectedVehicle) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
        <div className="text-center text-gray-500 py-8">
          <p>Select a vehicle to see the price summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
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
        <div className="pt-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-purple-700 text-2xl">CHF {totalPrice}</span>
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">
            Includes all taxes and fees
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
