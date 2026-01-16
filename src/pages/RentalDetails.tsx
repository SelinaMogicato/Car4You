import React, { useEffect, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { locations } from '../data/mockData';
import DateTimePicker from '../components/DateTimePicker';
import { MapPin, CornerDownRight } from 'lucide-react';

const RentalDetails: React.FC = () => {
  const { state, setPickupLocation, setReturnLocation, setDates } = useBooking();
  const [sameAsPickup, setSameAsPickup] = useState(true);

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
    // Check if return location differs from pickup
    if (state.returnLocation && state.returnLocation !== state.pickupLocation) {
      setSameAsPickup(false);
    }
  }, []);

  useEffect(() => {
    if (pickupDateStr && pickupTimeStr && returnDateStr && returnTimeStr) {
      const pickup = new Date(`${pickupDateStr}T${pickupTimeStr}`);
      const ret = new Date(`${returnDateStr}T${returnTimeStr}`);
      setDates(pickup, ret);
    }
  }, [pickupDateStr, pickupTimeStr, returnDateStr, returnTimeStr]);

  // Sync return location with pickup when checkbox is checked
  useEffect(() => {
    if (sameAsPickup && state.pickupLocation) {
      setReturnLocation(state.pickupLocation);
    }
  }, [sameAsPickup, state.pickupLocation]);

  const handlePickupLocationChange = (location: string) => {
    setPickupLocation(location);
    if (sameAsPickup) {
      setReturnLocation(location);
    }
  };

  const handleSameAsPickupChange = (checked: boolean) => {
    setSameAsPickup(checked);
    if (checked && state.pickupLocation) {
      setReturnLocation(state.pickupLocation);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Details</h1>
        <p className="text-gray-600">Where would you like to rent your car?</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        {/* Pickup Location */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MapPin className="text-purple-600" />
            Pickup Location
          </label>
          <select
            value={state.pickupLocation}
            onChange={(e) => handlePickupLocationChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
          >
            <option value="">Select pickup location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Return Location */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <CornerDownRight className="text-purple-600" />
            Return Location
          </label>

          {/* Same as pickup checkbox */}
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sameAsPickup}
              onChange={(e) => handleSameAsPickupChange(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-600">Same as pickup location</span>
          </label>

          {!sameAsPickup && (
            <select
              value={state.returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
            >
              <option value="">Select return location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          )}

          {sameAsPickup && state.pickupLocation && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              {state.pickupLocation}
            </div>
          )}
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
