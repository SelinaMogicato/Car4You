import React, { useEffect, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { locations } from '../data/mockData';
import DateTimePicker from '../components/DateTimePicker';
import { MapPin } from 'lucide-react';

const RentalDetails: React.FC = () => {
  const { state, setLocation, setDates } = useBooking();

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
    </div>
  );
};

export default RentalDetails;
