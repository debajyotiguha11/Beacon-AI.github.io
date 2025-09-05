import React from 'react';

interface AwardFinalStatusProps {
    supplierResponse: 'Accept' | 'Reject' | null;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

const PipelineStep: React.FC<{
    isComplete: boolean;
    isLast?: boolean;
    statusColor: string;
    children: React.ReactNode;
}> = ({ isComplete, isLast, statusColor, children }) => {
    const colorClass = `text-${statusColor}-600`;
    const bgClass = `bg-${statusColor}-100`;
    const borderClass = `after:border-${statusColor}-200`;

    return (
        <li className={`flex w-full items-center ${colorClass} ${!isLast ? `after:content-[''] after:w-full after:h-1 after:border-b ${borderClass} after:border-1 after:inline-block` : ''}`}>
            <span className={`flex items-center justify-center w-10 h-10 ${bgClass} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                {isComplete && (
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                )}
            </span>
        </li>
    );
};


export const AwardFinalStatus: React.FC<AwardFinalStatusProps> = ({ supplierResponse }) => {
    const isAccepted = supplierResponse === 'Accept';
    const statusColor = isAccepted ? 'green' : 'red';
    const finalStatusText = isAccepted ? 'Accepted' : 'Rejected';

    return (
        <div>
            <PanelHeader title="Award Process Completed" subtitle={`The award has been marked as ${finalStatusText}.`} />
            <div className="p-6">
                <div className="flex justify-center my-4">
                    <ol className="flex items-center w-full max-w-2xl">
                        <PipelineStep isComplete statusColor="green">Finalization</PipelineStep>
                        <PipelineStep isComplete statusColor="green">PDF Generation</PipelineStep>
                        <PipelineStep isComplete statusColor="green">Supplier Comms</PipelineStep>
                        <PipelineStep isComplete statusColor={statusColor}>Supplier Decision</PipelineStep>
                        <PipelineStep isComplete statusColor={statusColor} isLast>Outcome Recorded</PipelineStep>
                    </ol>
                </div>
                <div className="flex justify-between mt-2 text-sm font-medium text-slate-600 max-w-2xl mx-auto">
                    <div className="text-center w-1/5 text-green-700">Finalization</div>
                    <div className="text-center w-1/5 text-green-700">Generation</div>
                    <div className="text-center w-1/5 text-green-700">Sent</div>
                    <div className={`text-center w-1/5 text-${statusColor}-700`}>{finalStatusText}</div>
                    <div className={`text-center w-1/5 text-${statusColor}-700`}>Recorded</div>
                </div>
            </div>
        </div>
    );
};