import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { insuranceOptions, extraOptions } from '../data/mockData';
import { CheckCircle, Car, Calendar, MapPin, Shield, Package, User, RotateCcw, X } from 'lucide-react';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const { state, totalPrice, days, resetBooking } = useBooking();

  const selectedInsurance = insuranceOptions.find(i => i.id === state.selectedInsurance);
  const selectedExtrasList = extraOptions.filter(e => state.selectedExtras.includes(e.id));

  const handleStartAgain = () => {
    resetBooking();
    navigate('/');
  };

  const handleExitSite = () => {
    window.close();
    // Fallback if window.close() doesn't work (some browsers block it)
    // Show a message or redirect to a blank page
    window.location.href = 'about:blank';
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Thank you for choosing Car4You. Your reservation has been successfully processed.</p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-purple-600 text-white p-4">
            <h2 className="text-xl font-bold">Booking Summary</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Customer Details</h3>
                <p className="text-gray-700">{state.contactDetails.firstName} {state.contactDetails.lastName}</p>
                <p className="text-sm text-gray-500">{state.contactDetails.email}</p>
                <p className="text-sm text-gray-500">{state.contactDetails.phone}</p>
                {state.contactDetails.notes && (
                  <p className="text-sm text-gray-500 mt-1 italic">Notes: {state.contactDetails.notes}</p>
                )}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Location & Dates */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Pickup & Return</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Pickup Location:</span>
                    <p className="text-gray-700 font-medium">{state.pickupLocation}</p>
                    <p className="text-gray-600 mt-1">{formatDate(state.pickupDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Return Location:</span>
                    <p className="text-gray-700 font-medium">{state.returnLocation}</p>
                    <p className="text-gray-600 mt-1">{formatDate(state.returnDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Vehicle */}
            {state.selectedVehicle && (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Car className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Vehicle</h3>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-700 font-medium">{state.selectedVehicle.name}</p>
                        <p className="text-sm text-gray-500">{state.selectedVehicle.category} Class • {state.selectedVehicle.transmission} • {state.selectedVehicle.fuelType}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">CHF {state.selectedVehicle.pricePerDay * days}</p>
                        <p className="text-xs text-gray-500">{days} days x CHF {state.selectedVehicle.pricePerDay}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />
              </>
            )}

            {/* Insurance */}
            {selectedInsurance && (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Insurance</h3>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-700 font-medium">{selectedInsurance.name}</p>
                        <p className="text-sm text-gray-500">{selectedInsurance.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {selectedInsurance.pricePerDay === 0 ? 'Included' : `CHF ${selectedInsurance.pricePerDay * days}`}
                        </p>
                        {selectedInsurance.pricePerDay > 0 && (
                          <p className="text-xs text-gray-500">{days} days x CHF {selectedInsurance.pricePerDay}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />
              </>
            )}

            {/* Extras */}
            {selectedExtrasList.length > 0 && (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Extras</h3>
                    <div className="space-y-2">
                      {selectedExtrasList.map(extra => (
                        <div key={extra.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-700">{extra.name}</p>
                            <p className="text-xs text-gray-500">{extra.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">CHF {extra.pricePerDay! * days}</p>
                            <p className="text-xs text-gray-500">{days} days x CHF {extra.pricePerDay}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />
              </>
            )}

            {/* Rental Duration */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Rental Duration</h3>
                <p className="text-gray-700">{days} {days === 1 ? 'day' : 'days'}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-purple-700">CHF {totalPrice}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Includes all taxes and fees</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStartAgain}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
          >
            <RotateCcw size={20} />
            New Booking
          </button>
          <button
            onClick={handleExitSite}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            <X size={20} />
            Close
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          A confirmation email has been sent to {state.contactDetails.email}
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
