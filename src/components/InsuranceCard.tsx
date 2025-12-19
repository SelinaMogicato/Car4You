import React from 'react';
import { InsuranceOption } from '../types';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface InsuranceCardProps {
  option: InsuranceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ option, isSelected, onSelect }) => {
  const getIcon = () => {
    switch (option.id) {
      case 'basic': return <ShieldAlert className="text-gray-400" size={24} />;
      case 'standard': return <Shield className="text-purple-500" size={24} />;
      case 'premium': return <ShieldCheck className="text-purple-700" size={24} />;
      default: return <Shield size={24} />;
    }
  };

  return (
    <div 
      onClick={() => onSelect(option.id)}
      className={`relative cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
        isSelected 
          ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-100' 
          : 'border-gray-200 hover:border-purple-200 bg-white'
      }`}
    >
      <div className={`mt-1 p-2 rounded-full ${isSelected ? 'bg-purple-100' : 'bg-gray-100'}`}>
        {getIcon()}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`font-bold ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
            {option.name}
          </h3>
          <div className="text-right">
            <div className="font-bold text-purple-700">
              {option.pricePerDay === 0 ? 'Included' : `CHF ${option.pricePerDay}`}
            </div>
            {option.pricePerDay > 0 && <div className="text-xs text-gray-500">/ day</div>}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {option.description}
        </p>
      </div>

      <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-purple-600' : 'border-gray-300'
      }`}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
      </div>
    </div>
  );
};

export default InsuranceCard;
