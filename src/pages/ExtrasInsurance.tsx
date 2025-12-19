import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import InsuranceCard from '../components/InsuranceCard';
import ExtraCheckbox from '../components/ExtraCheckbox';

const ExtrasInsurance: React.FC = () => {
  const { state, setInsurance, toggleExtra } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Protection & Extras</h1>
        <p className="text-gray-600">Travel with peace of mind and comfort.</p>
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

      {/* Desktop Next Button */}
      <div className="hidden md:flex justify-end mt-8">
        <button
          onClick={() => navigate('/summary')}
          className="px-8 py-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transform hover:-translate-y-0.5 transition-all"
        >
          Continue to Summary
        </button>
      </div>
    </div>
  );
};

export default ExtrasInsurance;
