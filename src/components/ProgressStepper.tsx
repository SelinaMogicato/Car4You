import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const steps = [
  { path: '/', label: 'Location' },
  { path: '/preferences', label: 'Preferences' },
  { path: '/vehicles', label: 'Vehicle' },
  { path: '/extras', label: 'Extras' },
  { path: '/summary', label: 'Summary' }
];

interface ProgressStepperProps {
  isHeaderVisible: boolean;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ isHeaderVisible }) => {
  const location = useLocation();

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div
      className={`w-full py-6 bg-white border-b border-gray-200 sticky z-30 shadow-sm transition-all duration-300 ${
        isHeaderVisible ? 'top-16' : 'top-0'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 -z-10" />
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-purple-200 -z-10 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.path} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                    isCompleted
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : isCurrent
                        ? 'border-purple-600 text-purple-600'
                        : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {isCompleted ? <Check size={16} /> : <span>{index + 1}</span>}
                </div>
                <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  isCurrent ? 'text-purple-700' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
