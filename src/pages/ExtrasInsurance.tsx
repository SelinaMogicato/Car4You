import React from 'react';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import InsuranceCard from '../components/InsuranceCard';
import ExtraCheckbox from '../components/ExtraCheckbox';
import PriceRangeSlider from '../components/PriceRangeSlider';
import PrioritySelector from '../components/PrioritySelector';

const ExtrasInsurance: React.FC = () => {
  const { state, setInsurance, toggleExtra, setPriceRange, setPriority } = useBooking();

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget & Preferences</h1>
        <p className="text-gray-600">Customize your rental experience.</p>
      </div>

      {/* Budget & Priority Section */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Budget & Prioritäten</h2>

        <PriceRangeSlider
          value={state.priceRange}
          onChange={setPriceRange}
          min={40}
          max={120}
        />

        <PrioritySelector
          value={state.priority}
          onChange={setPriority}
        />
      </section>

      {/* Insurance Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Insurance Coverage</h2>
        <div className="grid grid-cols-1 gap-4">
          {insuranceOptions.map(option => (
            <InsuranceCard
              key={option.id}
              option={option}
              isSelected={state.selectedInsurance === option.id}
              onSelect={setInsurance}
            />
          ))}
        </div>
      </section>

      {/* Extras Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Optional Extras</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {extraOptions.map(extra => (
              <ExtraCheckbox
                key={extra.id}
                extra={extra}
                isSelected={state.selectedExtras.includes(extra.id)}
                onToggle={toggleExtra}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtrasInsurance;
