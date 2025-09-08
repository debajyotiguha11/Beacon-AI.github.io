
import React from 'react';
import { AwardDetails } from '../../types';

interface AwardSummaryProps {
  awardDetails: AwardDetails;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

const SummarySection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div>
        <h3 className="text-base font-semibold leading-6 text-slate-900">{title}</h3>
        <dl className="mt-2 divide-y divide-slate-200 border-t border-b border-slate-200">
            {children}
        </dl>
    </div>
);

const SummaryItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="py-3 grid grid-cols-3 gap-4 text-sm">
        <dt className="text-slate-500">{label}</dt>
        <dd className="text-slate-700 col-span-2 font-medium">{value}</dd>
    </div>
);

export const AwardSummary: React.FC<AwardSummaryProps> = ({ awardDetails }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div>
            <PanelHeader title="Award Summary" subtitle="Review details before generating the final document." />
            <div className="p-6 space-y-8">
                <SummarySection title="Award Details">
                    <SummaryItem label="Market" value={awardDetails.market} />
                    <SummaryItem label="Hierarchy" value={awardDetails.hierarchy} />
                    <SummaryItem label="Vendor" value={`${awardDetails.brand} (#${awardDetails.vendorNumber})`} />
                    <SummaryItem label="Sourcing Manager" value="Jony Farfan" />
                </SummarySection>

                <SummarySection title="Terms & Clauses">
                    <SummaryItem label="Award Type" value={awardDetails.awardType} />
                    <SummaryItem label="Freight Terms" value={awardDetails.freightTerms} />
                    <SummaryItem label="Award Length" value={awardDetails.awardLength} />
                    <SummaryItem label="Pricing Method" value={awardDetails.pricingMethod} />
                    <SummaryItem label="Volume Commitment" value={awardDetails.volumeCommitment ? 'Yes' : 'No'} />
                    <SummaryItem label="ROFR / Exclusivity" value={awardDetails.rofr ? 'Yes' : 'No'} />
                    <SummaryItem label="Auto-Renewal" value={awardDetails.autoRenewal ? 'Yes' : 'No'} />
                </SummarySection>

                <div>
                    <h3 className="text-base font-semibold leading-6 text-slate-900">Item Details</h3>
                    <div className="mt-2 border-t border-slate-200 overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-300 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="py-2 pl-4 pr-3 text-left font-semibold text-slate-900 sm:pl-2">UPC</th>
                                    <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-900">Item #</th>
                                    <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-900">Description</th>
                                    <th scope="col" className="px-3 py-2 text-right font-semibold text-slate-900">Quantity</th>
                                    <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-900">DC #</th>
                                    <th scope="col" className="px-3 py-2 text-right font-semibold text-slate-900">Price/Unit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {awardDetails.items?.map((item, index) => {
                                    const quantity = parseInt(item.quantity, 10) || 0;
                                    const price = item.price || 0;
                                    return (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-slate-500 sm:pl-2">{item.upc}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-slate-500">{item.itemNumber}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-slate-700">{item.description}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-slate-500 text-right">{quantity.toLocaleString()}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-slate-500">{item.dc}</td>
                                            <td className="whitespace-nowrap px-3 py-2 text-slate-500 text-right">{formatCurrency(price)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
