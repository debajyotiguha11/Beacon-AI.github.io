
import React, { useState } from 'react';
import { DETAILED_SUPPLIER_INFO } from '../../constants';

interface SupplierComparisonProps {
  shortlistedSuppliers: Set<string>;
  rfqSupplier: string | null;
  onSelectRfqSupplier: (name: string) => void;
  isAgreementSent?: boolean;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200 bg-white">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const icons = {
  crown: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  cart: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>,
  location: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  company: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>,
  category: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>,
  coverage: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
  chevronDown: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
  view: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>,
  analytics: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
  hash: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v8a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-.504-.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  globe: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.973c.418-.165.845-.27 1.298-.331a6.002 6.002 0 01-1.912 2.706C13.488 9.27 13.026 9 12.5 9a1.5 1.5 0 01-1.5-1.5V7a2 2 0 00-4 0 2 2 0 01-1.527 1.973 6.002 6.002 0 01-2.14-2.946z" clipRule="evenodd" /></svg>,
  dollar: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.168-.217c-.32.006-.576.044-.78.114.268.39.605.772.973 1.152.32.338.608.648.829.934.221-.286.509-.596.829-.934.368-.38.705-.762.973-1.152-.204-.07-.46-.108-.78-.114a2.5 2.5 0 00-1.168.217V7.151c.221.07.412.164.567.267C12.338 7.16 14 8.36 14 10c0 .993-.564 1.834-1.395 2.404C13.564 12.834 14 13.675 14 14.5c0 .993-.564 1.834-1.395 2.404-.831.57-1.928.946-3.105.946-.237 0-.479-.01-.715-.029a1 1 0 00-1.14 1.053 8.001 8.001 0 100-15.906 1 1 0 001.14 1.053c.236-.019.478-.029.715-.029 1.177 0 2.274.376 3.105.946C13.436 8.166 14 9.007 14 10c0-.993-.564-1.834-1.395-2.404C11.69 7.166 10.16 6 8.5 6c-1.66 0-3.19.166-4.105.596C3.564 7.166 3 8.007 3 9c0 .993.564 1.834 1.395 2.404C3.564 11.834 3 12.675 3 13.5c0 .993.564 1.834 1.395 2.404.831.57 1.928.946 3.105.946.237 0 .479-.01.715-.029a1 1 0 001.14-1.053 8.001 8.001 0 00-9.424-9.424 1 1 0 001.053 1.14c.02.236.029.478.029.715 0 1.177.376 2.274.946 3.105C6.166 13.436 7.007 14 8 14c.993 0 1.834-.564 2.404-1.395C10.834 11.564 11 10.675 11 10.5c0-.993.564-1.834 1.395-2.404C12.834 7.564 13 6.675 13 6.5c0-.993-.564-1.834-1.395-2.404C10.774 3.564 9.675 3 8.5 3c-.993 0-1.834.564-2.404 1.395C5.666 5.334 5.5 6.225 5.5 6.5c0 .175.066.325.114.458-.268-.39-.605-.772-.973-1.152-.32-.338-.608-.648-.829-.934C4.037 4.586 4.006 4.29 4.006 4c0-1.64 1.66-3 3.494-3S11 2.36 11 4c0 .29-.03.586-.088.872.221.286.509.596.829.934.368.38.705.762.973 1.152.048-.133.114-.283.114-.458z" /></svg>,
  adSpend: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a.5.5 0 01.5.5v11.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 11.708-.708L11.5 13.793V2a.5.5 0 01.5-.5z" clipRule="evenodd" /></svg>,
  growth: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 18.5a.5.5 0 01-.5-.5V6.207l-3.146 3.147a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0l4 4a.5.5 0 01-.708.708L8.5 6.207V18a.5.5 0 01-.5-.5z" clipRule="evenodd" /></svg>,
};

const getDetailIcon = (label: string) => {
  if (label.includes('Supplier')) return icons.hash;
  if (label.includes('Country')) return icons.company;
  if (label.includes('Market')) return icons.globe;
  if (label.includes('Sales')) return icons.dollar;
  if (label.includes('Spend')) return icons.adSpend;
  if (label.includes('Growth')) return icons.growth;
  return null;
};

const DetailItem: React.FC<{ label: string; value: string; isHighlighted?: boolean }> = ({ label, value, isHighlighted }) => (
    <div>
        <div className="text-xs text-slate-500 flex items-center">
            <span className="mr-1.5">{getDetailIcon(label)}</span>
            {label}
        </div>
        <p className={`text-sm font-semibold mt-0.5 ${isHighlighted ? 'text-walmart-blue' : 'text-slate-800'}`}>{value}</p>
    </div>
);

const SupplierCard: React.FC<{ data: any; isSelected: boolean; onSelect: () => void; disabled?: boolean; }> = ({ data, isSelected, onSelect, disabled }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    let riskColor = 'bg-red-100 text-red-800';
    if (data.risk === 'Low') {
        riskColor = 'bg-yellow-100 text-yellow-800';
    } else if (data.risk === 'Medium') {
        riskColor = 'bg-orange-100 text-orange-800';
    } else if (data.risk === 'Strategic') {
        riskColor = 'bg-green-100 text-green-800';
    }


    return (
        <div 
            onClick={!disabled ? onSelect : undefined}
            className={`bg-white rounded-xl shadow-md border ${isSelected ? 'border-walmart-blue ring-2 ring-walmart-blue' : 'border-slate-200'} flex flex-col font-sans transition-all duration-300 ${disabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}`}>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-800">{data.name}</h3>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        disabled={disabled}
                        className="h-5 w-5 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue pointer-events-none"
                    />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    {data.risk === 'Strategic' && (
                        <span className="flex items-center text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {icons.crown}
                            <span className="ml-1.5">Best Match</span>
                        </span>
                    )}
                    {data.tags.map((tag: string) => (
                        <span key={tag} className="flex items-center text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {tag.toLowerCase().includes('walmart') ? icons.cart : icons.crown}
                            <span className="ml-1.5">{tag}</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-4 pb-3">
                <div className="bg-slate-50 rounded-md p-3 flex justify-between items-center border border-slate-200">
                    <div className="flex items-center">
                        <span className="text-green-600">{icons.check}</span>
                        <span className="ml-2 text-sm font-bold text-slate-700">SER Score: <span className="text-green-700">{data.serScore}/100</span></span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${riskColor}`}>{data.risk}</span>
                </div>
            </div>

            <div className="p-4 space-y-4 flex-grow">
                <div>
                    <h4 className="text-sm font-bold text-slate-600 flex items-center mb-3">
                        {icons.company}
                        <span className="ml-2">Company Details</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <DetailItem label="Supplier #" value={data.companyDetails['Supplier #']} />
                        <DetailItem label="Annual Sales 2024" value={data.companyDetails['Annual Sales 2024']} isHighlighted />
                        <DetailItem label="Country" value={data.companyDetails['Country']} />
                        <DetailItem label="Ad Spend" value={data.companyDetails['Ad Spend']} isHighlighted />
                        <DetailItem label="Retail Market" value={data.companyDetails['Retail Market']} />
                        <DetailItem label="Growth" value={data.companyDetails['Growth']} isHighlighted />
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold text-slate-600 flex items-center mb-2">{icons.category}<span className="ml-2">Product Categories</span></h4>
                    <div className="flex flex-wrap gap-2">
                        {data.productCategories.map((cat: string) => <span key={cat} className="text-xs text-slate-700 bg-white border border-slate-300 px-2 py-1 rounded-md">{cat}</span>)}
                    </div>
                </div>
                
                <div>
                    <h4 className="text-sm font-bold text-slate-600 flex items-center mb-2">{icons.coverage}<span className="ml-2">Business Unit Coverage</span></h4>
                    <span className="text-xs text-slate-700 bg-white border border-slate-300 px-2 py-1 rounded-md">{data.businessUnitCoverage}</span>
                </div>

                <div>
                    <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="w-full flex justify-between items-center text-left p-2 rounded-md border border-slate-200 hover:bg-slate-50">
                        <span className="text-sm font-semibold text-slate-700">Additional Details</span>
                        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>{icons.chevronDown}</span>
                    </button>
                    {isExpanded && <div className="p-3 mt-1 bg-slate-50 text-sm text-slate-600 rounded-md">More information about logistics, audits, and compliance would be displayed here.</div>}
                </div>
            </div>

            <div className="p-3 border-t border-slate-200 mt-auto bg-slate-50/50 rounded-b-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center text-sm font-semibold text-walmart-blue hover:underline">{icons.view}<span className="ml-1">View Details</span></button>
                        <button className="flex items-center text-sm font-semibold text-walmart-blue hover:underline">{icons.analytics}<span className="ml-1">Analytics</span></button>
                    </div>
                    <span className="text-base font-bold text-slate-700">{data.value}</span>
                </div>
            </div>
        </div>
    );
};

export const SupplierComparison: React.FC<SupplierComparisonProps> = ({ shortlistedSuppliers, rfqSupplier, onSelectRfqSupplier, isAgreementSent }) => {
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
    <div className="h-full bg-slate-50">
      <PanelHeader title="Supplier Comparison" subtitle={isAgreementSent ? "Agreement sent. Selection is locked." : "Select a supplier to proceed."} />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {suppliersToCompare.map(supplierName => {
          const supplierData = DETAILED_SUPPLIER_INFO[supplierName];
          if (!supplierData) {
            console.warn(`No detailed info found for supplier: ${supplierName}`);
            return null;
          };
          return <SupplierCard 
                    key={supplierName} 
                    data={{name: supplierName, ...supplierData}} 
                    isSelected={rfqSupplier === supplierName}
                    onSelect={() => onSelectRfqSupplier(supplierName)}
                    disabled={isAgreementSent}
                 />;
        })}
      </div>
    </div>
  );
};
