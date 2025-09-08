import React from 'react';
import { AwardDetails } from '../../../../types';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

interface AwardPDFGenerationProps {
    isGenerating?: boolean;
    awardDetails: AwardDetails;
}

export const AwardPDFGeneration: React.FC<AwardPDFGenerationProps> = ({ isGenerating, awardDetails }) => {
    const pdfFileName = awardDetails.brand
        ? `${awardDetails.brand.replace(/[\s,.]/g, '_')}_Award_${new Date().getFullYear()}.pdf`
        : 'Award_Document.pdf';

    if (isGenerating) {
        return (
            <div>
                <PanelHeader title="Generating Award Document" subtitle="Please wait while the document is being created..." />
                <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 h-full">
                    <div className="relative">
                        <svg className="animate-spin h-20 w-20 text-walmart-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-walmart-blue" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2-2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-slate-800">Creating PDF...</h3>
                    <p className="mt-1 text-sm text-slate-600">This may take a few moments.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <PanelHeader title="Award Document Generated" subtitle="The award PDF is ready for review before sending." />
            <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 h-full">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-walmart-blue" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2-2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Ready for Review</h3>
                <p className="mt-1 text-sm text-slate-600">Please respond in the chat to send the document to the supplier for approval.</p>
                 <div className="mt-6 w-full max-w-sm p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2-2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium text-sm text-slate-800">{pdfFileName}</p>
                            <p className="text-xs text-slate-500">248 KB</p>
                        </div>
                    </div>
                     <button className="text-slate-400 hover:text-walmart-blue">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                     </button>
                </div>
            </div>
        </div>
    );
};