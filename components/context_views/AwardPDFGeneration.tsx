import React from 'react';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

export const AwardPDFGeneration: React.FC = () => {
    return (
        <div>
            <PanelHeader title="Generating Award Document" subtitle="Please wait while the system processes the request." />
            <div className="p-6">
                <div className="flex justify-center">
                    <ol className="flex items-center w-full max-w-md">
                        <li className="flex w-full items-center text-green-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-green-200 after:border-1 after:inline-block">
                            <span className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                                <svg className="w-4 h-4 text-green-600 lg:w-6 lg:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M19.5 0H.5A.5.5 0 0 0 0 .5v15a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5ZM8 12.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1ZM8 9.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1ZM8 6.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1ZM15.5 12.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1ZM15.5 9.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1ZM15.5 6.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1Z"/>
                                </svg>
                            </span>
                        </li>
                        <li className="flex items-center w-full">
                            <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                                <svg className="w-4 h-4 text-walmart-blue lg:w-6 lg:h-6 animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"/>
                                </svg>
                            </span>
                        </li>
                    </ol>
                </div>
                 <div className="flex justify-center mt-2 text-sm font-medium text-slate-600 max-w-md mx-auto">
                    <div className="text-center w-full text-green-700">Finalization</div>
                    <div className="text-center w-full text-walmart-blue">PDF Generation</div>
                </div>
            </div>
        </div>
    );
};