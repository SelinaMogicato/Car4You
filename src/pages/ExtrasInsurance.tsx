import React from 'react';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import InsuranceCard from '../components/InsuranceCard';
import ExtraCheckbox from '../components/ExtraCheckbox';

const ExtrasInsurance: React.FC = () => {
  const { state, setInsurance, toggleExtra } = useBooking();

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Protection & Extras</h1>
        <p className="text-gray-600">Protect your journey and add extras for comfort.</p>
      </div>

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
