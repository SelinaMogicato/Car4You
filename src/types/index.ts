export type VehicleCategory = 'City' | 'Family' | 'SUV' | 'Sport' | 'E-Car';

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  pricePerDay: number;
  image: string;
  seats: number;
  luggage: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
}

export interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  recommended?: boolean;
}

export interface ExtraOption {
  id: string;
  name: string;
  pricePerDay?: number; // Some extras might be one-time fee, but requirement says "price per day" for most things, let's assume per day or handle logic later.
  priceOneTime?: number;
  description?: string;
}

export type Priority = 'Preis' | 'Komfort' | 'Nachhaltigkeit' | 'Design';

export interface BookingState {
  selectedVehicle: Vehicle | null;
  pickupLocation: string;
  pickupDate: Date | null;
  returnDate: Date | null;
  transmissionPreference: 'Manual' | 'Automatic' | null; // User preference, might differ from vehicle actual
  colorPreference: string | null;
  priceRange: [number, number]; // CHF 40-120 per day
  priority: Priority | null; // User's main priority
  selectedInsurance: string | null; // ID of selected insurance
  selectedExtras: string[]; // IDs of selected extras
  contactDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
}
