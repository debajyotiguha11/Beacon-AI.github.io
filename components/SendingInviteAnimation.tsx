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
        <svg
          fill="#fbc02d"
          height="1em"
          viewBox="0 0 16 16"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <path
            fillRule="evenodd"
            d="M7.996 1c-.531 0-.953.297-.953.656l.328 3.664c.031.22.305.39.625.39.328 0 .602-.17.64-.39l.321-3.664c0-.36-.422-.656-.96-.656ZM2.988 4c-.312-.18-.781.04-1.047.5-.273.46-.226.977.094 1.156l3.328 1.555c.211.07.492-.078.657-.36.164-.28.148-.601-.024-.742L2.988 4Zm10.985 1.656c.312-.18.359-.695.093-1.156-.273-.46-.742-.68-1.054-.5l-3.008 2.11c-.172.14-.188.46-.024.742.165.28.446.43.657.359l3.336-1.555Zm-11.938 4.68c-.32.187-.367.703-.094 1.164.266.46.735.68 1.047.5l3.008-2.11c.172-.148.188-.468.024-.75-.165-.28-.446-.43-.657-.35l-3.328 1.546Zm8.602-1.547c-.211-.078-.492.07-.657.352-.164.28-.148.601-.024-.75L13.012 12c.312.18.781-.04 1.054-.5.266-.46.22-.977-.093-1.164l-3.336-1.547Zm-2.633 1.5c-.328 0-.602.164-.633.383l-.328 3.664c0 .367.422.664.953.664.54 0 .961-.297.961-.664l-.32-3.664c-.04-.219-.313-.383-.633-.383Z"
          />
        </svg>
      </div>
      <div className="px-4 py-3 rounded-2xl max-w-lg text-sm bg-gray-100 text-slate-800 rounded-bl-none border border-dashed border-slate-300">
        <p className="font-medium mb-3">Sending invites...</p>
        <div className="space-y-2">
          {SENDING_STEPS.map((step, index) => (
            <div key={index} className="flex items-center text-sm">
              {index < currentStep ? (
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 R0 001.414 0l4-4z" clipRule="evenodd" />
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