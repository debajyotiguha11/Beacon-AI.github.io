
import React from 'react';
import { Supplier } from '../../types';

interface SupplierDashboardProps {
  allSuppliers: Supplier[];
  shortlistedSuppliers: Set<string>;
  supplierStatuses: Record<string, string>;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const StatusDisplay: React.FC<{ status: string }> = ({ status }) => {
    let colorClasses = 'bg-slate-100 text-slate-800';
    let icon: React.ReactNode = null;

    switch (status) {
        case 'Onboarded':
            colorClasses = 'bg-green-100 text-green-800';
            break;
        case 'Agreement Ready':
            colorClasses = 'bg-purple-100 text-purple-800';
            break;
        case 'Invite Pending':
            colorClasses = 'bg-yellow-100 text-yellow-800';
            break;
        case 'Invited':
            colorClasses = 'bg-blue-100 text-blue-800';
            break;
        case 'Sending Invite...':
            colorClasses = 'bg-blue-100 text-blue-800';
            icon = (
                <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            );
            break;
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
            {icon}
            {status}
        </span>
    );
};

export const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ allSuppliers, shortlistedSuppliers, supplierStatuses }) => {
  const suppliers = allSuppliers.filter(s => shortlistedSuppliers.has(s.name));

  return (
    <div>
      <PanelHeader title="Supplier Dashboard" subtitle="Tracking shortlisted supplier status." />
      <div className="p-6">
        {suppliers.length > 0 ? (
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {suppliers.map((supplier, index) => (
                <li key={supplier.name}>
                  <div className="relative pb-8">
                    {index !== suppliers.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-slate-700 font-medium">{supplier.name}</p>
                           <p className="text-sm text-slate-500">{supplier.type}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-slate-500">
                          <StatusDisplay status={supplierStatuses[supplier.name] || '...'} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No suppliers have been shortlisted yet.</p>
        )}
      </div>
    </div>
  );
};
