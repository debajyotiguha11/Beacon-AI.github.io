
import React from 'react';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const SummaryItem: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between py-4 text-sm">
        <dt className="text-slate-500">{label}</dt>
        <dd className="text-slate-900 font-medium">{value}</dd>
    </div>
);

export const POSummary: React.FC = () => {
  return (
    <div>
      <PanelHeader title="Purchase Order Draft" subtitle="PO #GTI-2024-1138 for Supplier A" />
      <div className="p-6">
        <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-900">PO Details</h3>
            <dl className="mt-2 divide-y divide-slate-200">
                <SummaryItem label="Product" value="STEM Educational Toy Kit" />
                <SummaryItem label="Quantity" value="1,500 units" />
                <SummaryItem label="Unit Price" value="$8.20" />
                <SummaryItem label="Compliance" value="ASTM/EN71/CPSIA" />
                <SummaryItem label="Lead Time" value="21-28 days" />
                <SummaryItem label="Terms" value="Net-30, FOB" />
            </dl>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-6">
            <dl className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-600">
                    <dt>Subtotal</dt>
                    <dd>$12,300.00</dd>
                </div>
                 <div className="flex justify-between text-sm text-slate-600">
                    <dt>Est. Shipping & Handling</dt>
                    <dd>$550.00</dd>
                </div>
                <div className="flex justify-between text-base font-semibold text-slate-900">
                    <dt>Total</dt>
                    <dd>$12,850.00</dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
  );
};