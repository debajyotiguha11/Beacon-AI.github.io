import React from 'react';

interface InitialViewProps {
  onActionClick: (action: string) => void;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

const ActionButton: React.FC<{ title: string, description: string, icon: React.ReactNode, onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center w-full p-4 text-left bg-white rounded-lg border border-slate-200 hover:border-walmart-blue hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-walmart-blue focus:ring-offset-2"
    >
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-walmart-blue">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-base font-semibold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="ml-auto text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </div>
    </button>
);


export const InitialView: React.FC<InitialViewProps> = ({ onActionClick }) => {
    const greeting = getGreeting();

    return (
        <div className="h-full bg-slate-50">
            <div className="p-8">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-walmart-darkblue flex items-center justify-center flex-shrink-0">
                         <svg fill="#fbc02d" height="2em" viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.996 1c-.531 0-.953.297-.953.656l.328 3.664c.031.22.305.39.625.39.328 0 .602-.17.64-.39l.321-3.664c0-.36-.422-.656-.96-.656ZM2.988 4c-.312-.18-.781.04-1.047.5-.273.46-.226.977.094 1.156l3.328 1.555c.211.07.492-.078.657-.36.164-.28.148-.601-.024-.742L2.988 4Zm10.985 1.656c.312-.18.359-.695.093-1.156-.273-.46-.742-.68-1.054-.5l-3.008 2.11c-.172.14-.188.46-.024.742.165.28.446.43.657.359l3.336-1.555Zm-11.938 4.68c-.32.187-.367.703-.094 1.164.266.46.735.68 1.047.5l3.008-2.11c.172-.148.188-.468.024-.75-.165-.28-.446-.43-.657-.35l-3.328 1.546Zm8.602-1.547c-.211-.078-.492.07-.657.352-.164.28-.148.601-.024-.75L13.012 12c.312.18.781-.04 1.054-.5.266-.46-.22-.977-.093-1.164l-3.336-1.547Zm-2.633 1.5c-.328 0-.602.164-.633.383l-.328 3.664c0 .367.422.664.953.664.54 0 .961-.297.961-.664l-.32-3.664c-.04-.219-.313-.383-.633-.383Z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Beacon AI Assistant</h1>
                        <p className="text-slate-600">{greeting}, Jony. I'm here to help you streamline your sourcing process.</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">What would you like to do?</h2>
                    <div className="space-y-4">
                        <ActionButton
                            title="Start Intake Process"
                            description="Retrieve and finalize a buy plan to begin sourcing."
                            onClick={() => onActionClick('Retrieve it')}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                        />
                        <ActionButton
                            title="Create a New Award"
                            description="Generate an award for a supplier after a PO is created."
                            onClick={() => onActionClick('Create Award')}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    <path d="M5 14v6h14v-6" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
