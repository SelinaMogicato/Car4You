import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BookingState, Vehicle } from '../types';
import { vehicles, insuranceOptions, extraOptions } from '../data/mockData';

interface BookingContextType {
  state: BookingState;
  setVehicle: (vehicle: Vehicle) => void;
  setDates: (pickup: Date, returnDate: Date) => void;
  setLocation: (location: string) => void;
  setTransmission: (transmission: 'Manual' | 'Automatic' | null) => void;
  setColor: (color: string) => void;
  setInsurance: (insuranceId: string) => void;
  toggleExtra: (extraId: string) => void;
  setContactDetails: (details: BookingState['contactDetails']) => void;
  totalPrice: number;
  days: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  selectedVehicle: null,
  pickupLocation: '',
  pickupDate: null,
  returnDate: null,
  transmissionPreference: null,
  colorPreference: 'No Preference',
  selectedInsurance: null,
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

  const setLocation = (location: string) => {
    setState(prev => ({ ...prev, pickupLocation: location }));
  };

  const setTransmission = (transmission: 'Manual' | 'Automatic' | null) => {
    setState(prev => ({ ...prev, transmissionPreference: transmission }));
  };

  const setColor = (color: string) => {
    setState(prev => ({ ...prev, colorPreference: color }));
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

  // Calculate total price
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (state.pickupDate && state.returnDate && state.selectedVehicle) {
      const diffTime = Math.abs(state.returnDate.getTime() - state.pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const rentalDays = diffDays > 0 ? diffDays : 1; // Minimum 1 day
      setDays(rentalDays);

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
      setDays(0);
    }
  }, [state]);

  return (
    <BookingContext.Provider value={{
      state,
      setVehicle,
      setDates,
      setLocation,
      setTransmission,
      setColor,
      setInsurance,
      toggleExtra,
      setContactDetails,
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
