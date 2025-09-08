import React, { useState, useEffect } from 'react';

const SENDING_STEPS = [
  'Packaging RFQ documents...',
  'Dispatching to Brainy Builder Toys...'
];

export const SendingRFQAnimation: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const totalDuration = 4000;
    const stepDuration = totalDuration / SENDING_STEPS.length;
    
    if (currentStep >= SENDING_STEPS.length) {
      if (onComplete) {
        const timer = setTimeout(onComplete, 500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(c => c + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div>
      <p className="font-medium mb-3">Sending RFQ to suppliers...</p>
      <div className="space-y-2">
        {SENDING_STEPS.map((step, index) => (
          <div key={index} className="flex items-center text-sm">
            {index < currentStep ? (
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : index === currentStep ? (
              <svg className="animate-spin h-4 w-4 text-walmart-blue mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <div className="w-4 h-4 border-2 border-slate-300 rounded-full mr-2 flex-shrink-0"></div>
            )}
            <span className={index <= currentStep ? 'text-slate-700' : 'text-slate-500'}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};