
import React from 'react';

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const FormField: React.FC<{ label: string, value: string | React.ReactNode, badge?: string }> = ({ label, value, badge }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 flex items-center">
        <span>{value}</span>
        {badge && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-walmart-blue">{badge}</span>}
      </dd>
    </div>
);


export const DraftIntakeForm: React.FC = () => {
  return (
    <div>
      <PanelHeader title="Draft Intake Form" subtitle="Auto-filled from image analysis." />
      <div className="p-6">
        <dl className="divide-y divide-slate-200">
            <FormField label="Product Name" value="STEM Educational Toy Kit" />
            <FormField label="Quantity" value="~250,000" />
            <FormField label="Material" value="ABS (phthalate- & lead-free)" badge="Detected" />
            <FormField label="Target Age" value="6-12 years" badge="Detected" />
            <FormField label="Compliance" value="ASTM F963, EN71, CPSIA" badge="Inferred" />
            <FormField label="Packaging" value="Recyclable box + booklet" badge="Inferred" />
            <FormField label="Supplier Origin" value="-" />
            <FormField 
              label="Product Image" 
              value={
                  <img 
                      src="https://m.media-amazon.com/images/I/81AVVfnjGEL._SL1500_.jpg" 
                      alt="STEM Educational Toy Kit" 
                      className="rounded-lg border border-slate-200 h-32 w-auto object-contain" 
                  />
              } 
            />
        </dl>
      </div>
    </div>
  );
};