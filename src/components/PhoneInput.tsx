import React, { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const countryCodes = [
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+43', country: 'AT', flag: '🇦🇹' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
];

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState(value.replace(/^\+\d+\s*/, ''));

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setSelectedCode(newCode);
    onChange(`${newCode} ${phoneNumber}`);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/[^\d\s]/g, ''); // Only digits and spaces
    setPhoneNumber(newPhone);
    onChange(`${selectedCode} ${newPhone}`);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <select
          value={selectedCode}
          onChange={handleCodeChange}
          className="w-32 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="79 123 45 67"
          className={`flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">
        Example: {selectedCode} 79 123 45 67
      </p>
    </div>
  );
};

export default PhoneInput;
