import React from 'react';
import { Priority } from '../types';
import { DollarSign, Sparkles, Leaf, Palette } from 'lucide-react';

interface PrioritySelectorProps {
  value: Priority | null;
  onChange: (priority: Priority) => void;
}

const priorities: { value: Priority; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: 'Preis',
    label: 'Preis',
    icon: <DollarSign className="w-5 h-5" />,
    description: 'Bestes Preis-Leistungs-Verhältnis'
  },
  {
    value: 'Komfort',
    label: 'Komfort',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Höchster Komfort und Ausstattung'
  },
  {
    value: 'Nachhaltigkeit',
    label: 'Nachhaltigkeit',
    icon: <Leaf className="w-5 h-5" />,
    description: 'Umweltfreundliche Fahrzeuge'
  },
  {
    value: 'Design',
    label: 'Design',
    icon: <Palette className="w-5 h-5" />,
    description: 'Stilvolles und modernes Erscheinungsbild'
  }
];

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Wichtigste Priorität
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {priorities.map((priority) => (
          <label
            key={priority.value}
            className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value === priority.value
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <input
              type="radio"
              name="priority"
              value={priority.value}
              checked={value === priority.value}
              onChange={() => onChange(priority.value)}
              className="sr-only"
            />
            <div className="flex items-start gap-3 w-full">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                  value === priority.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {priority.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{priority.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      value === priority.value
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {value === priority.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{priority.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;
