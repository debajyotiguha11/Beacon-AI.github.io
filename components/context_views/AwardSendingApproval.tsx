import React from 'react';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

interface AwardSendingApprovalProps {
    statusText?: string;
}

export const AwardSendingApproval: React.FC<AwardSendingApprovalProps> = ({ statusText }) => {
    return (
        <div>
            <PanelHeader title="Sending for Approval" subtitle="Establishing secure channel with supplier..." />
            <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 h-full">
                <div className="relative">
                    <svg className="animate-spin h-20 w-20 text-walmart-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-walmart-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                       </svg>
                    </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-800">{statusText || 'Initializing...'}</h3>
                <p className="mt-1 text-sm text-slate-600">This may take a few moments.</p>
            </div>
        </div>
    );
};
