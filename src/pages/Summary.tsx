import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const Summary: React.FC = () => {
  const { state, setContactDetails, totalPrice } = useBooking();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(state.contactDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setContactDetails(formData);
      alert(`Booking Confirmed! Total: CHF ${totalPrice}\nThank you for choosing Car4You.`);
      // Reset or redirect
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalize Booking</h1>
        <p className="text-gray-600">Enter your details to complete the reservation.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
        
        <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+41 79 123 45 67"
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              maxLength={250}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.notes.length}/250
            </div>
          </div>
        </form>
      </div>

      {/* Desktop Complete Button */}
      <div className="hidden md:flex justify-end mt-8">
        <button
          type="submit"
          form="booking-form"
          className="px-8 py-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transform hover:-translate-y-0.5 transition-all"
        >
          Complete Reservation
        </button>
      </div>
    </div>
  );
};

export default Summary;
