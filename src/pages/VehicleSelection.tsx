import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { vehicles } from '../data/mockData';
import { VehicleCategory } from '../types';
import VehicleCard from '../components/VehicleCard';

const categories: VehicleCategory[] = ['City', 'Family', 'SUV', 'Sport', 'E-Car'];

const VehicleSelection: React.FC = () => {
  const { state, setVehicle } = useBooking();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<VehicleCategory | 'All'>('All');

  const filteredVehicles = activeCategory === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.category === activeCategory);

  const handleSelect = (vehicle: any) => {
    setVehicle(vehicle);
    // On mobile we might want to stay to show selection, but for flow let's just select.
    // User can click "Next" in bottom bar or we can auto-advance on desktop?
    // Let's just select.
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Vehicle</h1>
        <p className="text-gray-600">Choose the perfect car for your journey.</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === 'All' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Vehicles
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={handleSelect}
            isSelected={state.selectedVehicle?.id === vehicle.id}
          />
        ))}
      </div>

      {/* Desktop Next Button */}
      <div className="hidden md:flex justify-end mt-8">
        <button
          onClick={() => navigate('/details')}
          disabled={!state.selectedVehicle}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
            !state.selectedVehicle
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transform hover:-translate-y-0.5'
          }`}
        >
          Continue to Details
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;
