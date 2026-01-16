import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const newMin = inputValue === '' ? 0 : parseInt(inputValue, 10);
    const newValue: [number, number] = [newMin, localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const newMax = inputValue === '' ? 0 : parseInt(inputValue, 10);
    const newValue: [number, number] = [localValue[0], newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-medium text-gray-700">Preisrahmen pro Tag</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Min (CHF)</label>
          <input
            type="text"
            inputMode="numeric"
            value={localValue[0]}
            onChange={handleMinChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center font-medium"
            placeholder="0"
          />
        </div>
        <span className="text-gray-400 mt-5">—</span>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Max (CHF)</label>
          <input
            type="text"
            inputMode="numeric"
            value={localValue[1]}
            onChange={handleMaxChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center font-medium"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
