import React from 'react';

interface DateTimePickerProps {
  label: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
  label, 
  dateValue, 
  timeValue, 
  onDateChange, 
  onTimeChange,
  minDate 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="date"
          value={dateValue}
          min={minDate}
          onChange={onDateChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
        />
        <input
          type="time"
          value={timeValue}
          onChange={onTimeChange}
          className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
