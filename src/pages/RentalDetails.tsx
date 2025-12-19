import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { locations, colors } from '../data/mockData';
import DateTimePicker from '../components/DateTimePicker';
import { MapPin, Palette, Settings } from 'lucide-react';

const RentalDetails: React.FC = () => {
  const { state, setLocation, setDates, setTransmission, setColor } = useBooking();
  const navigate = useNavigate();

  // Local state for inputs to handle date/time splitting
  const [pickupDateStr, setPickupDateStr] = useState('');
  const [pickupTimeStr, setPickupTimeStr] = useState('10:00');
  const [returnDateStr, setReturnDateStr] = useState('');
  const [returnTimeStr, setReturnTimeStr] = useState('10:00');

  useEffect(() => {
    if (state.pickupDate) {
      setPickupDateStr(state.pickupDate.toISOString().split('T')[0]);
      setPickupTimeStr(state.pickupDate.toTimeString().slice(0, 5));
    }
    if (state.returnDate) {
      setReturnDateStr(state.returnDate.toISOString().split('T')[0]);
      setReturnTimeStr(state.returnDate.toTimeString().slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (pickupDateStr && pickupTimeStr && returnDateStr && returnTimeStr) {
      const pickup = new Date(`${pickupDateStr}T${pickupTimeStr}`);
      const ret = new Date(`${returnDateStr}T${returnTimeStr}`);
      setDates(pickup, ret);
    }
  }, [pickupDateStr, pickupTimeStr, returnDateStr, returnTimeStr]);

  const today = new Date().toISOString().split('T')[0];

  const isValid = state.pickupLocation && state.pickupDate && state.returnDate && state.returnDate > state.pickupDate;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Details</h1>
        <p className="text-gray-600">When and where do you want to go?</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MapPin className="text-purple-600" />
            Pickup & Return Location
          </label>
          <select
            value={state.pickupLocation}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
          >
            <option value="">Select a location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateTimePicker
            label="Pickup Date & Time"
            dateValue={pickupDateStr}
            timeValue={pickupTimeStr}
            onDateChange={(e) => setPickupDateStr(e.target.value)}
            onTimeChange={(e) => setPickupTimeStr(e.target.value)}
            minDate={today}
          />
          <DateTimePicker
            label="Return Date & Time"
            dateValue={returnDateStr}
            timeValue={returnTimeStr}
            onDateChange={(e) => setReturnDateStr(e.target.value)}
            onTimeChange={(e) => setReturnTimeStr(e.target.value)}
            minDate={pickupDateStr || today}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
        
        {/* Transmission */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-3">
            <Settings size={20} className="text-purple-600" />
            Transmission Preference
          </label>
          <div className="flex gap-4">
            {['Manual', 'Automatic'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="transmission"
                  value={type}
                  checked={state.transmissionPreference === type}
                  onChange={() => setTransmission(type as 'Manual' | 'Automatic')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-3">
            <Palette size={20} className="text-purple-600" />
            Vehicle Color (Optional)
          </label>
          <select
            value={state.colorPreference || 'No Preference'}
            onChange={(e) => setColor(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
          >
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Next Button */}
      <div className="hidden md:flex justify-end mt-8">
        <button
          onClick={() => navigate('/extras')}
          disabled={!isValid}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
            !isValid
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transform hover:-translate-y-0.5'
          }`}
        >
          Continue to Extras
        </button>
      </div>
    </div>
  );
};

export default RentalDetails;
