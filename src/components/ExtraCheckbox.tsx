import React from 'react';
import { ExtraOption } from '../types';
import { Check } from 'lucide-react';

interface ExtraCheckboxProps {
  extra: ExtraOption;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ExtraCheckbox: React.FC<ExtraCheckboxProps> = ({ extra, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(extra.id)}
      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-200 hover:border-purple-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'
        }`}>
          {isSelected && <Check size={12} className="text-white" />}
        </div>
        <div>
          <div className="font-medium text-gray-900">{extra.name}</div>
          <div className="text-xs text-gray-500">{extra.description}</div>
        </div>
      </div>
      <div className="font-semibold text-purple-700">
        CHF {extra.pricePerDay} <span className="text-xs text-gray-500 font-normal">/ day</span>
      </div>
    </div>
  );
};

export default ExtraCheckbox;
