import React from 'react';
import { useBooking } from '../context/BookingContext';
import PriceRangeSlider from '../components/PriceRangeSlider';
import PrioritySelector from '../components/PrioritySelector';

const Preferences: React.FC = () => {
  const { state, setPriceRange, setPriority } = useBooking();

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget & Preferences</h1>
        <p className="text-gray-600">Set your budget and priorities to find the perfect vehicle.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Your Preferences</h2>

        <PriceRangeSlider
          value={state.priceRange}
          onChange={setPriceRange}
        />

        <PrioritySelector
          value={state.priority}
          onChange={setPriority}
        />
      </div>
    </div>
  );
};

export default Preferences;
