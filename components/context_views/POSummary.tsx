
import React from 'react';
import { AwardDetails } from '../../types';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const POSentConfirmation: React.FC = () => (
    <div>
        <PanelHeader title="Purchase Order Created" subtitle="The new PO has been successfully created and sent to the supplier." />
        <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 h-full">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">New PO Created</h3>
            <p className="mt-1 text-sm text-slate-600">The supplier has been notified. You can track the status in your dashboard.</p>
        </div>
    </div>
);

export const POSummary: React.FC<{ awardDetails: AwardDetails, isPoSent?: boolean }> = ({ awardDetails, isPoSent }) => {
    if (isPoSent) {
        return <POSentConfirmation />;
    }

    const subtotal = awardDetails.items?.reduce((acc, item) => {
        const quantity = parseInt(item.quantity, 10) || 0;
        const price = item.price || 0;
        return acc + (quantity * price);
    }, 0) || 0;

    const shipping = 550.00;
    const total = subtotal + shipping;
    
    const poNumber = `GTI-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    return (
        <div>
        <PanelHeader title="Purchase Order Draft" subtitle={`PO #${poNumber} for ${awardDetails.brand || 'Supplier'}`} />
        <div className="p-6">
            <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">Order Items</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th scope="col" className="py-2 px-3 text-left font-semibold text-slate-900">Description</th>
                                <th scope="col" className="py-2 px-3 text-right font-semibold text-slate-900">Quantity</th>
                                <th scope="col" className="py-2 px-3 text-right font-semibold text-slate-900">Unit Price</th>
                                <th scope="col" className="py-2 px-3 text-right font-semibold text-slate-900">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {awardDetails.items?.map((item, index) => {
                                const quantity = parseInt(item.quantity, 10) || 0;
                                const price = item.price || 0;
                                const itemTotal = quantity * price;
                                return (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-2 px-3 text-slate-700">{item.description}</td>
                                        <td className="whitespace-nowrap py-2 px-3 text-slate-500 text-right">{quantity.toLocaleString()}</td>
                                        <td className="whitespace-nowrap py-2 px-3 text-slate-500 text-right">{formatCurrency(price)}</td>
                                        <td className="whitespace-nowrap py-2 px-3 text-slate-700 font-medium text-right">{formatCurrency(itemTotal)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-6 border-t border-slate-200 pt-6">
                <dl className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                        <dt>Subtotal</dt>
                        <dd>{formatCurrency(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <dt>Est. Shipping & Handling</dt>
                        <dd>{formatCurrency(shipping)}</dd>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-slate-900">
                        <dt>Total</dt>
                        <dd>{formatCurrency(total)}</dd>
                    </div>
                </dl>
            </div>
        </div>
        </div>
    );
};
