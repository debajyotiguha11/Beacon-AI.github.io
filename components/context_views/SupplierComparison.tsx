import React from 'react';
import { SUPPLIER_COMPARISON_DATA, COMPARISON_FEATURES } from '../../constants';

interface SupplierComparisonProps {
  shortlistedSuppliers: Set<string>;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

export const SupplierComparison: React.FC<SupplierComparisonProps> = ({ shortlistedSuppliers }) => {
  const suppliersToCompare = Array.from(shortlistedSuppliers);

  if (suppliersToCompare.length === 0) {
      return (
          <div>
              <PanelHeader title="Supplier Comparison" subtitle="Consolidated data from shortlisted suppliers." />
              <div className="p-6 text-slate-500">
                  No suppliers have been selected for comparison.
              </div>
          </div>
      );
  }

  return (
    <div>
      <PanelHeader title="Supplier Comparison" subtitle="Consolidated data from shortlisted suppliers." />
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-300">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Feature</th>
                {suppliersToCompare.map(header => (
                  <th key={header} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {COMPARISON_FEATURES.map(feature => (
                <tr key={feature}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-0">{feature}</td>
                  {suppliersToCompare.map((supplierName) => (
                    <td key={supplierName} className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">
                      {SUPPLIER_COMPARISON_DATA[supplierName]?.[feature] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};