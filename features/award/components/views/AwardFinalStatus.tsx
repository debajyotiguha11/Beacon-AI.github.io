import React from 'react';

interface AwardFinalStatusProps {
    supplierResponse: 'Accept' | 'Reject' | null;
    onReturnToDashboard: () => void;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

export const AwardFinalStatus: React.FC<AwardFinalStatusProps> = ({ supplierResponse, onReturnToDashboard }) => {
    const isAccepted = supplierResponse === 'Accept';
    const finalStatusText = isAccepted ? 'Accepted' : 'Rejected';
    const bgColor = isAccepted ? 'bg-green-100' : 'bg-red-100';
    const textColor = isAccepted ? 'text-green-800' : 'text-red-800';
    const iconColor = isAccepted ? 'text-green-500' : 'text-red-500';

    const icon = isAccepted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div>
            <PanelHeader title="Award Process Completed" subtitle={`The award has been marked as ${finalStatusText}.`} />
             <div className="p-8 flex flex-col items-center justify-center text-center">
                 <div className={`w-24 h-24 rounded-full ${bgColor} flex items-center justify-center`}>
                     {icon}
                 </div>
                 <h3 className="mt-4 text-lg font-semibold text-slate-800">Outcome Recorded</h3>
                 <p className={`mt-1 text-sm ${textColor}`}>The supplier has <span className="font-semibold">{finalStatusText.toLowerCase()}</span> the award.</p>
            </div>
        </div>
    );
};
