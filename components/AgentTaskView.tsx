import React, { useState, useEffect } from 'react';

const tasks = [
    { text: 'Checking our supplier database...', icon: 'database' },
    { text: 'Matching product details with suppliers...', icon: 'brain' },
    { text: 'Looking at similar products and images...', icon: 'image' },
    { text: 'Exploring external marketplaces...', icon: 'globe' },
    { text: 'Applying filters to match your needs...', icon: 'filter' },
];

const icons: Record<string, React.ReactNode> = {
    database: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M10 2C6.134 2 3 3.343 3 5s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3z" />
        </svg>
    ),
    brain: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 1a1 1 0 000 2h.01a1 1 0 000-2H10zm-1 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm1 2a1 1 0 100 2h.01a1 1 0 100-2H10zm-1 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm1 2a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
        </svg>
    ),
    image: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
    ),
    globe: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.973c.418-.165.845-.27 1.298-.331a6.002 6.002 0 01-1.912 2.706C13.488 9.27 13.026 9 12.5 9a1.5 1.5 0 01-1.5-1.5V7a2 2 0 00-4 0 2 2 0 01-1.527 1.973 6.002 6.002 0 01-2.14-2.946z" clipRule="evenodd" />
        </svg>
    ),
    filter: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
    ),
};

const TaskStatus: React.FC<{ isCompleted: boolean, isCurrent: boolean }> = ({ isCompleted, isCurrent }) => {
    if (isCompleted) {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }
    if (isCurrent) {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-walmart-blue">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            </div>
        );
    }
    return <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-slate-50" />;
};


export const AgentTaskView: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const timers = tasks.map((_, index) =>
            setTimeout(() => {
                setCompletedCount(index + 1);
            }, index * 750)
        );

        const completionTimer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, tasks.length * 750);
        
        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(completionTimer);
        };
    }, [onComplete]);

    return (
        <div>
            <p className="font-medium mb-3">Starting supplier search...</p>
            <div className="flow-root">
                <ul role="list" className="-mb-4">
                    {tasks.map((task, index) => (
                         <li key={task.text}>
                            <div className="relative pb-4">
                               {index !== tasks.length - 1 ? (
                                    <span className={`absolute top-3 left-3 -ml-px h-full w-0.5 ${index < completedCount ? 'bg-green-400' : 'bg-slate-300'}`} aria-hidden="true" />
                               ) : null}
                                <div className="relative flex items-center space-x-3">
                                    <TaskStatus isCompleted={index < completedCount} isCurrent={index === completedCount} />
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                        <div className={`text-sm ${index <= completedCount ? 'text-slate-700' : 'text-slate-500'}`}>
                                            {task.text}
                                        </div>
                                        <div className="text-slate-400">
                                            {icons[task.icon]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};