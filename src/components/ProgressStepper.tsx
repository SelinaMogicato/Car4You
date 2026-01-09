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
        <div className="relative">
          {/* Background line - full width behind all circles */}
          <div className="absolute left-0 right-0 top-4 flex items-center px-4">
            <div className="flex-1 h-0.5 bg-gray-200" />
          </div>

          {/* Progress line - animated based on current step */}
          <div
            className="absolute left-4 top-4 h-0.5 bg-purple-600 transition-all duration-500"
            style={{ width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 2rem + ${currentStepIndex * 8}px)` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.path} className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                      isCompleted
                        ? 'border-purple-600 bg-purple-600'
                        : isCurrent
                          ? 'border-purple-600 text-purple-600'
                          : 'border-gray-300 text-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-white stroke-2" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    isCurrent ? 'text-purple-700' : isCompleted ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
