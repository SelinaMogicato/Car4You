import React from 'react';
import { Vehicle } from '../types';
import { Users, Briefcase, Gauge, Fuel } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  isSelected?: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, isSelected }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-2 flex flex-col h-full ${isSelected ? 'border-purple-600 ring-2 ring-purple-100' : 'border-transparent hover:border-purple-100'}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 shadow-sm">
          {vehicle.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
        <div className="text-sm text-gray-500 mb-4">{vehicle.category} Class</div>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-500" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-purple-500" />
            <span>{vehicle.luggage} Bags</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-purple-500" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel size={16} className="text-purple-500" />
            <span>{vehicle.fuelType}</span>
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-purple-700">CHF {vehicle.pricePerDay}</span>
            <span className="text-xs text-gray-500 ml-1">/ day</span>
          </div>
          <button
            onClick={() => onSelect(vehicle)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isSelected 
                ? 'bg-purple-700 text-white hover:bg-purple-800' 
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
