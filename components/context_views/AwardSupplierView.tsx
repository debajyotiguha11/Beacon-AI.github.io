import React from 'react';
import { AwardDetails } from '../../types';

interface AwardSupplierViewProps {
  awardDetails: AwardDetails;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

export const AwardSupplierView: React.FC<AwardSupplierViewProps> = ({ awardDetails }) => {
    const pdfFileName = awardDetails.brand
        ? `${awardDetails.brand.replace(/[\s,.]/g, '_')}_Award_${new Date().getFullYear()}.pdf`
        : 'Award_Document.pdf';

    return (
        <div>
            <PanelHeader title={`Award for ${awardDetails.brand}`} subtitle="Sent for supplier approval" />
            <div className="p-6">
                <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2-2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium text-slate-800">{pdfFileName}</p>
                            <p className="text-xs text-slate-500">248 KB - Final</p>
                        </div>
                    </div>
                     <button className="text-slate-400 hover:text-walmart-blue" title="Download PDF">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                     </button>
                </div>
                
                <div className="mt-6 border-t border-slate-200 pt-6 text-center">
                    <div className="flex justify-center items-center text-slate-600">
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm">Waiting for supplier confirmation...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};