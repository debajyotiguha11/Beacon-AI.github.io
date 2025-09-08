import React, { useState } from 'react';

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

const ExpandableSectionHeader: React.FC<{ title: string, description: string, count: number, icon: React.ReactNode, isExpanded: boolean, onToggle: () => void }> = ({ title, description, count, icon, isExpanded, onToggle }) => (
    <button
        onClick={onToggle}
        className={`flex items-center w-full p-4 text-left bg-white border border-slate-200 hover:border-walmart-blue hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-walmart-blue focus:ring-offset-2 ${isExpanded ? 'rounded-t-lg border-b-0' : 'rounded-lg'}`}
        aria-expanded={isExpanded}
    >
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-walmart-blue">
            {icon}
        </div>
        <div className="ml-4 flex-grow">
            <p className="text-base font-semibold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white bg-walmart-blue">{count}</span>
            <div className="text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    </button>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusClasses: Record<string, string> = {
        'New': 'bg-blue-100 text-blue-800',
        'Awaiting Clarification': 'bg-yellow-100 text-yellow-800',
        'Ready for Sourcing': 'bg-green-100 text-green-800',
        'Decision Pending': 'bg-purple-100 text-purple-800',
        'Review Pending': 'bg-orange-100 text-orange-800',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-100 text-slate-800'}`}>
            {status}
        </span>
    );
};

const PendingItemRow: React.FC<{ title: string; subtitle: string; status: string }> = ({ title, subtitle, status }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="text-sm font-medium text-slate-800">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <StatusBadge status={status} />
    </div>
);

const pendingIntakeForms = [
    { title: "STEM Educational Toy Kit", subtitle: "Received today", status: "New" },
    { title: "Organic Cotton Baby Onesies", subtitle: "Received yesterday", status: "Awaiting Clarification" },
    { title: "Smart Home Security Camera", subtitle: "Received 2 days ago", status: "Ready for Sourcing" },
];

const pendingAwards = [
    { title: "STEM Educational Toy Kit Award", subtitle: "Received today", status: "Review Pending" },
    { title: "HealthPlus Annual Award", subtitle: "Supplier: Maitri", status: "Decision Pending" },
    { title: "Vitamins & Supplements 2025", subtitle: "Supplier: Nestle", status: "Decision Pending" },
];

export const InitialView: React.FC<{ onActionClick: (action: string) => void; }> = ({ onActionClick }) => {
    const greeting = getGreeting();
    const [intakeFormsExpanded, setIntakeFormsExpanded] = useState(false);
    const [awardsExpanded, setAwardsExpanded] = useState(false);

    return (
        <div className="h-full bg-slate-50">
            <div className="p-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{greeting}, Jony.</h1>
                    <p className="text-slate-600 mt-1">I'm here to help you streamline your sourcing process.</p>
                </div>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Continue where you left off</h2>
                    <div className="space-y-4">
                        <div>
                            <ExpandableSectionHeader
                                title="Pending Intake Forms"
                                description="Awaiting your review and finalization."
                                count={pendingIntakeForms.length}
                                isExpanded={intakeFormsExpanded}
                                onToggle={() => setIntakeFormsExpanded(!intakeFormsExpanded)}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                }
                            />
                            {intakeFormsExpanded && (
                                <div className="bg-white border-x border-b border-slate-200 rounded-b-lg px-4 divide-y divide-slate-100">
                                    {pendingIntakeForms.map(item => <PendingItemRow key={item.title} {...item} />)}
                                </div>
                            )}
                        </div>
                        <div>
                            <ExpandableSectionHeader
                                title="Pending Awards"
                                description="Awaiting supplier decisions."
                                count={pendingAwards.length}
                                isExpanded={awardsExpanded}
                                onToggle={() => setAwardsExpanded(!awardsExpanded)}
                                icon={
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                }
                            />
                            {awardsExpanded && (
                                <div className="bg-white border-x border-b border-slate-200 rounded-b-lg px-4 divide-y divide-slate-100">
                                    {pendingAwards.map(item => <PendingItemRow key={item.title} {...item} />)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Start something new</h2>
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
                            description="Generate an award for a supplier."
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