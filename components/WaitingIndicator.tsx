import React from 'react';

export const WaitingIndicator: React.FC = () => {
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
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-slate-500">Awaiting response...</span>
          </div>
      </div>
    </div>
  );
};