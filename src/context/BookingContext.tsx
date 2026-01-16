import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BookingState, Vehicle, Priority } from '../types';
import { insuranceOptions, extraOptions } from '../data/mockData';

interface BookingContextType {
  state: BookingState;
  setVehicle: (vehicle: Vehicle) => void;
  setDates: (pickup: Date, returnDate: Date) => void;
  setPickupLocation: (location: string) => void;
  setReturnLocation: (location: string) => void;
  setTransmission: (transmission: 'Manual' | 'Automatic' | null) => void;
  setColor: (color: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setPriority: (priority: Priority) => void;
  setInsurance: (insuranceId: string) => void;
  toggleExtra: (extraId: string) => void;
  setContactDetails: (details: BookingState['contactDetails']) => void;
  resetBooking: () => void;
  totalPrice: number;
  days: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  selectedVehicle: null,
  pickupLocation: '',
  returnLocation: '',
  pickupDate: null,
  returnDate: null,
  transmissionPreference: null,
  colorPreference: 'No Preference',
  priceRange: [40, 200],
  priority: null,
  selectedInsurance: 'basic', // Basic insurance is included by default
  selectedExtras: [],
  contactDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  }
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BookingState>(initialState);

  const setVehicle = (vehicle: Vehicle) => {
    setState(prev => ({ ...prev, selectedVehicle: vehicle }));
  };

  const setDates = (pickup: Date, returnDate: Date) => {
    setState(prev => ({ ...prev, pickupDate: pickup, returnDate: returnDate }));
  };

  const setPickupLocation = (location: string) => {
    setState(prev => ({ ...prev, pickupLocation: location }));
  };

  const setReturnLocation = (location: string) => {
    setState(prev => ({ ...prev, returnLocation: location }));
  };

  const setTransmission = (transmission: 'Manual' | 'Automatic' | null) => {
    setState(prev => ({ ...prev, transmissionPreference: transmission }));
  };

  const setColor = (color: string) => {
    setState(prev => ({ ...prev, colorPreference: color }));
  };

  const setPriceRange = (range: [number, number]) => {
    setState(prev => ({ ...prev, priceRange: range }));
  };

  const setPriority = (priority: Priority) => {
    setState(prev => ({ ...prev, priority: priority }));
  };

  const setInsurance = (insuranceId: string) => {
    setState(prev => ({ ...prev, selectedInsurance: insuranceId }));
  };

  const toggleExtra = (extraId: string) => {
    setState(prev => {
      const isSelected = prev.selectedExtras.includes(extraId);
      if (isSelected) {
        return { ...prev, selectedExtras: prev.selectedExtras.filter(id => id !== extraId) };
      } else {
        return { ...prev, selectedExtras: [...prev.selectedExtras, extraId] };
      }
    });
  };

  const setContactDetails = (details: BookingState['contactDetails']) => {
    setState(prev => ({ ...prev, contactDetails: details }));
  };

  const resetBooking = () => {
    setState(initialState);
  };

  // Calculate total price
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Calculate days first - this should work even without a vehicle
    if (state.pickupDate && state.returnDate) {
      const diffTime = Math.abs(state.returnDate.getTime() - state.pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const rentalDays = diffDays > 0 ? diffDays : 1; // Minimum 1 day
      setDays(rentalDays);

      // Only calculate price if vehicle is selected
      if (state.selectedVehicle) {
        let price = state.selectedVehicle.pricePerDay * rentalDays;

        // Add insurance
        if (state.selectedInsurance) {
          const insurance = insuranceOptions.find(i => i.id === state.selectedInsurance);
          if (insurance) {
            price += insurance.pricePerDay * rentalDays;
          }
        }

        // Add extras
        state.selectedExtras.forEach(extraId => {
          const extra = extraOptions.find(e => e.id === extraId);
          if (extra && extra.pricePerDay) {
            price += extra.pricePerDay * rentalDays;
          }
        });

        setTotalPrice(price);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
      setDays(0);
    }
  }, [state]);

  return (
    <BookingContext.Provider value={{
      state,
      setVehicle,
      setDates,
      setPickupLocation,
      setReturnLocation,
      setTransmission,
      setColor,
      setPriceRange,
      setPriority,
      setInsurance,
      toggleExtra,
      setContactDetails,
      resetBooking,
      totalPrice,
      days
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
