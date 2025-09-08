import React, { useState, useEffect } from 'react';

const SENDING_STEPS = [
  'Preparing invitation template...',
  'Attaching custom questionnaires...',
  'Dispatching invites via secure channel...',
  'Awaiting delivery confirmation...',
];

export const SendingInviteAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 500; // ms per step
    if (currentStep >= SENDING_STEPS.length) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(c => c + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex items-end gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-walmart-darkblue flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="presentation">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
        </svg>
      </div>
      <div className="px-4 py-3 rounded-2xl max-w-lg text-sm bg-gray-100 text-slate-800 rounded-bl-none border border-dashed border-slate-300">
        <p className="font-medium mb-3">Sending invites...</p>
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
    </div>
  );
};