import React, { useState, useEffect } from 'react';
import { AwardDetails } from '../../types';
import { HierarchySelector } from './HierarchySelector';

interface AwardCreationFormProps {
  awardDetails: AwardDetails;
  onDetailsChange: (updates: Partial<AwardDetails>) => void;
  onFormSubmit: (response: string) => void;
  activeSection?: string;
}

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode; isComplete?: boolean, isActive?: boolean }> = ({ title, children, isComplete, isActive }) => (
    <div className={`border rounded-lg transition-all duration-300 ${isActive ? 'border-walmart-blue shadow-md' : 'border-slate-200'} ${isComplete ? 'bg-white' : 'bg-slate-50'}`}>
        <div className={`flex items-center justify-between p-3 rounded-t-lg ${isComplete ? 'bg-green-50 border-b border-green-200' : isActive ? 'bg-blue-50 border-b border-blue-200' : 'bg-slate-100 border-b border-slate-200'}`}>
            <h3 className={`text-base font-semibold ${isComplete || isActive ? 'text-slate-800' : 'text-slate-500'}`}>{title}</h3>
            {isComplete && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                </span>
            )}
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

const InputField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean }> = 
({ label, name, value, onChange, disabled }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type="text"
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900
                       focus:outline-none focus:border-walmart-blue focus:ring-1 focus:ring-walmart-blue
                       disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        />
    </div>
);

const SelectField: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode, disabled?: boolean }> = 
({ label, name, value, onChange, children, disabled }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm text-slate-900
                       focus:outline-none focus:border-walmart-blue focus:ring-1 focus:ring-walmart-blue
                       disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
            {children}
        </select>
    </div>
);

const RadioGroup: React.FC<{ label: string, name: string, value: boolean, onChange: (updates: Partial<AwardDetails>) => void, disabled?: boolean }> = 
({ label, name, value, onChange, disabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="radio" name={name} checked={value === true} onChange={() => onChange({[name]: true})} disabled={disabled} className="h-4 w-4 text-walmart-blue focus:ring-walmart-blue border-slate-300" />
                <span className={value === true ? 'font-semibold text-walmart-blue' : 'text-slate-700'}>Yes</span>
            </label>
             <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="radio" name={name} checked={value === false} onChange={() => onChange({[name]: false})} disabled={disabled} className="h-4 w-4 text-walmart-blue focus:ring-walmart-blue border-slate-300" />
                <span className={value === false ? 'font-semibold text-walmart-blue' : 'text-slate-700'}>No</span>
            </label>
        </div>
    </div>
);


export const AwardCreationForm: React.FC<AwardCreationFormProps> = ({ awardDetails, onDetailsChange, onFormSubmit, activeSection }) => {
    const [itemsCsv, setItemsCsv] = useState('');
    const [isHierarchySelectorOpen, setIsHierarchySelectorOpen] = useState(false);
    
    useEffect(() => {
        // Pre-fill form from chat options for better UX
        if (awardDetails.items) {
            const csv = awardDetails.items.map(i => `${i.upc},${i.itemNumber},${i.description},${i.quantity},${i.dc}`).join('\n');
            setItemsCsv(csv);
        }
    }, [awardDetails.items]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onDetailsChange({ [e.target.name]: e.target.value });
    };

    const handleApplyHierarchy = (selection: string) => {
        onDetailsChange({ hierarchy: selection });
        setIsHierarchySelectorOpen(false);
        // If the chat bot suggested a hierarchy, this auto-confirms it.
        // If the user opened it manually, this won't break the flow.
        onFormSubmit('Accept Hierarchy');
    };

    const isStep1Complete = !!awardDetails.market && !!awardDetails.vendorNumber && !!awardDetails.brand;
    const isStep2Complete = !!awardDetails.hierarchy;
    const isStep3Complete = !!awardDetails.awardType && !!awardDetails.freightTerms && !!awardDetails.awardLength && !!awardDetails.costIndex && !!awardDetails.pricingMethod;
    const isStep4Complete = awardDetails.volumeCommitment !== undefined && awardDetails.rofr !== undefined && awardDetails.autoRenewal !== undefined;
    const isStep5Complete = !!awardDetails.items;
    
    const SubmitButton: React.FC<{ onClick: () => void, disabled: boolean }> = ({ onClick, disabled }) => (
        <div className="mt-4 text-right">
            <button
                onClick={onClick}
                disabled={disabled}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-walmart-blue hover:bg-walmart-darkblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                Submit
            </button>
        </div>
    );
    

    return (
        <div>
            {isHierarchySelectorOpen && (
                <HierarchySelector 
                    onApply={handleApplyHierarchy}
                    onCancel={() => setIsHierarchySelectorOpen(false)}
                />
            )}
            <PanelHeader title="Award Creation" subtitle="Fill the form below or use the chat to proceed." />
            <div className="p-6 space-y-4 bg-slate-50/50 h-full">
                <FormSection title="Initial Details" isComplete={isStep1Complete} isActive={activeSection === 'initial'}>
                    <div className="space-y-3">
                        <InputField label="Market" name="market" value={awardDetails.market} onChange={handleChange} disabled={activeSection !== 'initial'} />
                        <InputField label="Vendor Number" name="vendorNumber" value={awardDetails.vendorNumber} onChange={handleChange} disabled={activeSection !== 'initial'} />
                        <InputField label="Brand" name="brand" value={awardDetails.brand} onChange={handleChange} disabled={activeSection !== 'initial'} />
                    </div>
                    {activeSection === 'initial' && <SubmitButton onClick={() => onFormSubmit(`Market: ${awardDetails.market}, Vendor: ${awardDetails.vendorNumber}, Brand: ${awardDetails.brand}`)} disabled={!isStep1Complete} />}
                </FormSection>

                <FormSection title="Hierarchy" isComplete={isStep2Complete} isActive={activeSection === 'hierarchy'}>
                    <div className='bg-white p-2 border border-slate-200 rounded-md min-h-[40px] text-sm text-slate-700'>
                         {awardDetails.hierarchy || "Waiting for initial details..."}
                    </div>
                    {activeSection === 'hierarchy' && (
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setIsHierarchySelectorOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue"
                            >
                                { awardDetails.hierarchy ? 'Modify' : 'Select' } Hierarchy
                            </button>
                        </div>
                    )}
                </FormSection>

                <FormSection title="Award Terms" isComplete={isStep3Complete} isActive={activeSection === 'terms'}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField label="Award Type" name="awardType" value={awardDetails.awardType} onChange={handleChange} disabled={activeSection !== 'terms'}>
                            <option value="">Select...</option><option>Standard</option><option>Upstream</option><option>Volume</option>
                        </SelectField>
                         <SelectField label="Freight Terms" name="freightTerms" value={awardDetails.freightTerms} onChange={handleChange} disabled={activeSection !== 'terms'}>
                            <option value="">Select...</option><option>Collect</option><option>Prepaid</option><option>DI</option>
                        </SelectField>
                        <SelectField label="Award Length" name="awardLength" value={awardDetails.awardLength} onChange={handleChange} disabled={activeSection !== 'terms'}>
                             <option value="">Select...</option><option>&lt; 1 year</option><option>Multi Year</option><option>Forward Buy</option><option>Annual</option>
                        </SelectField>
                        <InputField label="Cost Index" name="costIndex" value={awardDetails.costIndex} onChange={handleChange} disabled={activeSection !== 'terms'} />
                         <SelectField label="Pricing Method" name="pricingMethod" value={awardDetails.pricingMethod} onChange={handleChange} disabled={activeSection !== 'terms'}>
                             <option value="">Select...</option><option>Fixed</option><option>Fluctuating</option>
                        </SelectField>
                    </div>
                    {activeSection === 'terms' && <SubmitButton onClick={() => onFormSubmit(`Type: ${awardDetails.awardType}, Freight: ${awardDetails.freightTerms}, Length: ${awardDetails.awardLength}, Index: ${awardDetails.costIndex || ''}, Pricing: ${awardDetails.pricingMethod}`)} disabled={!isStep3Complete} />}
                </FormSection>
                
                <FormSection title="Clauses" isComplete={isStep4Complete} isActive={activeSection === 'clauses'}>
                    <div className="space-y-4">
                        <RadioGroup label="Volume Commitment?" name="volumeCommitment" value={awardDetails.volumeCommitment} onChange={onDetailsChange} disabled={activeSection !== 'clauses'} />
                        <RadioGroup label="ROFR / Exclusivity?" name="rofr" value={awardDetails.rofr} onChange={onDetailsChange} disabled={activeSection !== 'clauses'} />
                        <RadioGroup label="Auto-Renewal?" name="autoRenewal" value={awardDetails.autoRenewal} onChange={onDetailsChange} disabled={activeSection !== 'clauses'} />
                    </div>
                    {activeSection === 'clauses' && <SubmitButton onClick={() => onFormSubmit(`Commitment: ${awardDetails.volumeCommitment ? 'Yes':'No'}, ROFR: ${awardDetails.rofr ? 'Yes':'No'}, Auto-Renewal: ${awardDetails.autoRenewal ? 'Yes':'No'}`)} disabled={!isStep4Complete} />}
                </FormSection>

                <FormSection title="Item Details" isComplete={isStep5Complete} isActive={activeSection === 'items'}>
                    <label htmlFor="items" className="block text-sm font-medium text-slate-700 mb-1">Paste Item Data (CSV)</label>
                    <textarea
                        id="items"
                        name="items"
                        rows={4}
                        value={itemsCsv}
                        onChange={(e) => setItemsCsv(e.target.value)}
                        disabled={activeSection !== 'items'}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900
                                   focus:outline-none focus:border-walmart-blue focus:ring-1 focus:ring-walmart-blue
                                   disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                        placeholder="e.g., 8829103,1102,Vitamin D3 500ct,10000,DC6092"
                    />
                    {activeSection === 'items' && <SubmitButton onClick={() => onFormSubmit(itemsCsv)} disabled={!itemsCsv.trim()} />}
                </FormSection>
            </div>
        </div>
    );
};