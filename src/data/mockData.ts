import { Vehicle, InsuranceOption, ExtraOption } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Fiat 500',
    category: 'City',
    pricePerDay: 45,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    seats: 4,
    luggage: 1,
    transmission: 'Manual',
    fuelType: 'Petrol'
  },
  {
    id: '2',
    name: 'VW Polo',
    category: 'City',
    pricePerDay: 48,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    luggage: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    id: '3',
    name: 'VW Touran',
    category: 'Family',
    pricePerDay: 70,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800',
    seats: 7,
    luggage: 4,
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    id: '4',
    name: 'Skoda Octavia',
    category: 'Family',
    pricePerDay: 72,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    luggage: 4,
    transmission: 'Manual',
    fuelType: 'Diesel'
  },
  {
    id: '5',
    name: 'VW Tiguan',
    category: 'SUV',
    pricePerDay: 90,
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    id: '6',
    name: 'Volvo XC60',
    category: 'SUV',
    pricePerDay: 95,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    fuelType: 'Hybrid'
  },
  {
    id: '7',
    name: 'BMW Z4',
    category: 'Sport',
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=800',
    seats: 2,
    luggage: 1,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    id: '8',
    name: 'Audi TT',
    category: 'Sport',
    pricePerDay: 125,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    seats: 2,
    luggage: 1,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    id: '9',
    name: 'Tesla Model 3',
    category: 'E-Car',
    pricePerDay: 100,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    luggage: 2,
    transmission: 'Automatic',
    fuelType: 'Electric'
  },
  {
    id: '10',
    name: 'Renault Zoe',
    category: 'E-Car',
    pricePerDay: 95,
    image: 'https://images.unsplash.com/photo-1594535182308-8ff240fde7a1?auto=format&fit=crop&q=80&w=800',
    seats: 4,
    luggage: 1,
    transmission: 'Automatic',
    fuelType: 'Electric'
  }
];

export const insuranceOptions: InsuranceOption[] = [
  {
    id: 'basic',
    name: 'Basic Insurance',
    description: 'Third-party liability coverage. High deductible.',
    pricePerDay: 0,
    recommended: false
  },
  {
    id: 'standard',
    name: 'Standard Protection',
    description: 'Includes theft protection and collision damage waiver with reduced deductible.',
    pricePerDay: 15,
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Protection',
    description: 'Full coverage with zero deductible. Includes glass and tire protection.',
    pricePerDay: 30,
    recommended: false
  }
];

export const extraOptions: ExtraOption[] = [
  {
    id: 'child_seat',
    name: 'Child Seat',
    pricePerDay: 10,
    description: 'Safety seat for children up to 4 years'
  },
  {
    id: 'additional_driver',
    name: 'Additional Driver',
    pricePerDay: 12,
    description: 'Share the driving with another person'
  },
  {
    id: 'gps',
    name: 'GPS Navigation',
    pricePerDay: 8,
    description: 'Satellite navigation system'
  },
  {
    id: 'roof_box',
    name: 'Roof Box',
    pricePerDay: 15,
    description: 'Extra storage space for your luggage'
  },
  {
    id: 'full_insurance',
    name: 'Vollkasko',
    pricePerDay: 25,
    description: 'Comprehensive insurance coverage'
  }
];

export const locations = [
  'Zürich Airport',
  'Zürich HB',
  'Bern Station',
  'Geneva Airport',
  'Basel SBB',
  'Luzern Station'
];

export const colors = [
  'No Preference',
  'Black',
  'White',
  'Silver',
  'Blue',
  'Red'
];
