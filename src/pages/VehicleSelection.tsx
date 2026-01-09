import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { getVehiclesForLocation } from '../data/mockData';
import { VehicleCategory } from '../types';
import VehicleCard from '../components/VehicleCard';

const categories: VehicleCategory[] = ['City', 'Family', 'SUV', 'Sport', 'E-Car'];

const VehicleSelection: React.FC = () => {
  const { state, setVehicle } = useBooking();
  const [activeCategory, setActiveCategory] = useState<VehicleCategory | 'All'>('All');

  // Get vehicles available at selected location
  const locationVehicles = getVehiclesForLocation(state.pickupLocation);

  // Filter by category
  const categoryFilteredVehicles = activeCategory === 'All'
    ? locationVehicles
    : locationVehicles.filter(v => v.category === activeCategory);

  // Filter by price range
  const filteredVehicles = categoryFilteredVehicles.filter(
    v => v.pricePerDay >= state.priceRange[0] && v.pricePerDay <= state.priceRange[1]
  );

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
        <p className="text-gray-600">
          Available vehicles at <span className="font-semibold text-purple-700">{state.pickupLocation}</span>
        </p>
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

      {/* Price Filter Info */}
      {(state.priceRange[0] !== 40 || state.priceRange[1] !== 120) && (
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700">
            Showing vehicles in price range: <span className="font-bold">CHF {state.priceRange[0]} - CHF {state.priceRange[1]}</span> per day
            {filteredVehicles.length === 0 && (
              <span className="text-red-600 ml-2">• No vehicles found in this range</span>
            )}
          </p>
        </div>
      )}

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
    </div>
  );
};

export default VehicleSelection;
