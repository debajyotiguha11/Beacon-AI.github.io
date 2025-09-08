import React from 'react';

export const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
        </svg>
      </div>
      <div className="px-4 py-3 rounded-2xl max-w-lg text-sm bg-gray-100 text-slate-800 rounded-bl-none border border-dashed border-slate-300">
        <div className="flex items-center text-slate-600 font-medium text-xs">
            <span>💬</span>
            <span className="ml-1.5">Collab is thinking...</span>
        </div>
        <div className="text-slate-500 mt-1">
          Processing your input...
        </div>
      </div>
    </div>
  );
};