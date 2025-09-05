import React from 'react';
import { Supplier } from '../../types';

interface SupplierShortlistProps {
  suppliers: Supplier[];
  selectedSuppliers: Set<string>;
  onToggleSupplier: (name: string) => void;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

export const SupplierShortlist: React.FC<SupplierShortlistProps> = ({ suppliers, selectedSuppliers, onToggleSupplier }) => {
  return (
    <div>
      <PanelHeader title="Qualified Suppliers" subtitle="8 suppliers remaining after filtering." />
      <div className="p-6">
        <ul role="list" className="divide-y divide-slate-200">
          {suppliers.map(supplier => (
            <li key={supplier.name} className="flex items-center py-4">
              <div className="mr-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue"
                  checked={selectedSuppliers.has(supplier.name)}
                  onChange={() => onToggleSupplier(supplier.name)}
                  aria-labelledby={`supplier-name-${supplier.name}`}
                />
              </div>
              <div className="ml-3 flex-1">
                <p id={`supplier-name-${supplier.name}`} className="text-sm font-medium text-slate-900">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.status}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    supplier.type === 'Internal' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                }`}>{supplier.type}</span>
                <p className="text-sm text-slate-500 mt-1">Score: {supplier.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};