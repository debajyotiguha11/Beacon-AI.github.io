import React from 'react';
import { ContextView } from '../types';

interface AwardFlowProgressBarProps {
    currentView: ContextView;
    supplierResponse: 'Accept' | 'Reject' | null;
}

export const AwardFlowProgressBar: React.FC<AwardFlowProgressBarProps> = ({ currentView, supplierResponse }) => {
    let decisionLabel = 'Decision Pending';
    if (supplierResponse) {
        decisionLabel = supplierResponse === 'Accept' ? 'Accepted' : 'Rejected';
    }
    
    const finalSteps = ['Award Finalization', 'Award Summary', 'PDF Generation', 'Sent For Approval', decisionLabel];

    const getStatus = (stepIndex: number): 'complete' | 'active' | 'pending' => {
        const viewToStep: Partial<Record<ContextView, number>> = {
            [ContextView.AWARD_CREATION]: 0,
            [ContextView.AWARD_SUMMARY]: 1,
            [ContextView.AWARD_PDF_GENERATION]: 2,
            [ContextView.AWARD_SENDING_APPROVAL]: 3,
            [ContextView.AWARD_SUPPLIER_VIEW]: 3,
            [ContextView.AWARD_FINAL_STATUS]: 4,
        };
        const activeIndex = viewToStep[currentView] ?? -1;
        if (activeIndex === -1) return 'pending';

        if (stepIndex < activeIndex) return 'complete';
        if (stepIndex === activeIndex) return 'active';
        
        return 'pending';
    };

    return (
        <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-start">
                {finalSteps.map((label, index) => {
                    const isLast = index === finalSteps.length - 1;
                    const status = getStatus(index);

                    let iconBg = 'bg-slate-200';
                    let iconContent: React.ReactNode = <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>;
                    let textColor = 'text-slate-500';
                    let connectorBg = 'bg-slate-300';
                    
                    if (status === 'complete') {
                        iconBg = 'bg-green-500';
                        iconContent = (
                            <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        );
                        textColor = 'text-slate-700';
                        connectorBg = 'bg-green-500';
                    } else if (status === 'active') {
                        iconBg = 'bg-walmart-blue';
                        iconContent = <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>;
                        textColor = 'text-walmart-blue font-semibold';
                        connectorBg = 'bg-slate-300';

                        if (isLast && supplierResponse) {
                            if (supplierResponse === 'Reject') {
                                iconBg = 'bg-red-500';
                                textColor = 'text-red-700 font-semibold';
                                connectorBg = 'bg-red-500'; // For completeness
                                iconContent = (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                );
                            } else { // Accepted
                                iconBg = 'bg-green-500';
                                textColor = 'text-green-800 font-semibold';
                                connectorBg = 'bg-green-500'; // For completeness
                                iconContent = (
                                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                );
                            }
                        }
                    }

                    return (
                        <React.Fragment key={label}>
                            <div className="flex flex-col items-center px-2 text-center w-32">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg} transition-colors`}>
                                    {iconContent}
                                </div>
                                <p className={`mt-2 text-xs ${textColor} transition-colors`}>{label}</p>
                            </div>
                            {!isLast && <div className={`flex-1 mt-4 h-0.5 ${connectorBg}`} />}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};