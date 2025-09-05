import React, { useState } from 'react';
import { AwardDetails } from '../../types';

interface AwardSupplierViewProps {
  awardDetails: AwardDetails;
  onSupplierResponse: (response: 'Accept' | 'Reject') => void;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

export const AwardSupplierView: React.FC<AwardSupplierViewProps> = ({ awardDetails, onSupplierResponse }) => {
    const [responded, setResponded] = useState(false);

    const handleResponse = (response: 'Accept' | 'Reject') => {
        if (responded) return;
        setResponded(true);
        onSupplierResponse(response);
    };

    return (
        <div>
            <PanelHeader title="Supplier Collaboration Portal" subtitle={`Award for ${awardDetails.brand}`} />
            <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-walmart-darkblue flex items-center justify-center flex-shrink-0">
                            <svg fill="#fbc02d" height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ fontSize: "1.5rem" }} >
                                <path fillRule="evenodd" d="M7.996 1c-.531 0-.953.297-.953.656l.328 3.664c.031.22.305.39.625.39.328 0 .602-.17.64-.39l.321-3.664c0-.36-.422-.656-.96-.656ZM2.988 4c-.312-.18-.781.04-1.047.5-.273.46-.226.977.094 1.156l3.328 1.555c.211.07.492-.078.657-.36.164-.28.148-.601-.024-.742L2.988 4Zm10.985 1.656c.312-.18.359-.695.093-1.156-.273-.46-.742-.68-1.054-.5l-3.008 2.11c-.172.14-.188.46-.024-.742.165.28.446.43.657.359l3.336-1.555Zm-11.938 4.68c-.32.187-.367.703-.094 1.164.266.46.735.68 1.047.5l3.008-2.11c.172-.148.188-.468.024-.75-.165-.28-.446-.43-.657-.35l-3.328 1.546Zm8.602-1.547c-.211-.078-.492.07-.657.352-.164-.28-.148-.601-.024-.75L13.012 12c.312.18.781-.04 1.054-.5.266-.46-.22-.977-.093-1.164l-3.336-1.547Zm-2.633 1.5c-.328 0-.602.164-.633.383l-.328 3.664c0 .367.422.664.953.664.54 0 .961-.297.961-.664l-.32-3.664c-.04-.219-.313-.383-.633-.383Z" />
                            </svg>
                        </div>
                        <div className="flex-1 text-sm">
                            <p className="font-semibold text-slate-800">Sourcing Agent</p>
                            <p className="text-slate-600 mt-1">
                                Congratulations! Your items have been selected for the {awardDetails.brand} Annual Award. The enclosed document contains quantities, costs, and projected store counts. Please review and confirm acceptance by EOD tomorrow.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2-2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium text-slate-800">Award_HealthPlus_Annual.pdf</p>
                            <p className="text-xs text-slate-500">248 KB - Final</p>
                        </div>
                    </div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                
                <div className="mt-6 border-t border-slate-200 pt-6">
                    <p className="text-sm text-center text-slate-600 mb-3">{responded ? 'Your response has been recorded.' : 'Please respond to the award offer.'}</p>
                    {!responded && (
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => handleResponse('Accept')}
                                className="w-32 flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Accept</span>
                            </button>
                            <button 
                                onClick={() => handleResponse('Reject')}
                                className="w-32 flex items-center justify-center space-x-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span>Reject</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};