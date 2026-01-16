import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  min = 40,
  max = 200
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    const newValue: [number, number] = [newMin, Math.max(newMin, localValue[1])];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    const newValue: [number, number] = [Math.min(localValue[0], newMax), newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const percentage = ((localValue[1] - min) / (max - min)) * 100;
  const percentageMin = ((localValue[0] - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Price Range per Day</span>
        </div>
        <div className="text-sm font-bold text-purple-600">
          CHF {localValue[0]} - CHF {localValue[1]}
        </div>
      </div>

      <div className="relative pt-6 pb-2">
        {/* Track Background */}
        <div className="absolute top-6 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>

        {/* Active Track */}
        <div
          className="absolute top-6 h-2 bg-purple-600 rounded-full"
          style={{
            left: `${percentageMin}%`,
            right: `${100 - percentage}%`
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md hover:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:transition-transform"
          style={{ zIndex: localValue[0] > max - 10 ? 5 : 3 }}
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md hover:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:transition-transform"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>CHF {min}</span>
        <span>CHF {max}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
