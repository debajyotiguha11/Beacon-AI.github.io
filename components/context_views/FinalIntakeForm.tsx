import React from 'react';

const PanelHeader: React.FC<{ title: string, subtitle: string, locked?: boolean }> = ({ title, subtitle, locked }) => (
  <div className="p-6 border-b border-slate-200 flex justify-between items-center">
    <div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
    {locked && 
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <svg className="-ml-1 mr-1.5 h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Locked
      </span>
    }
  </div>
);

const FormField: React.FC<{ label: string, value: string, updated?: boolean }> = ({ label, value, updated }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className={`mt-1 text-sm sm:mt-0 sm:col-span-2 ${updated ? 'text-walmart-blue font-semibold' : 'text-slate-900'}`}>
        {value}
      </dd>
    </div>
);

export const FinalIntakeForm: React.FC = () => {
  return (
    <div>
      <PanelHeader title="Final Intake Form" subtitle="Locked and ready for sourcing." locked />
      <div className="p-6">
        <dl className="divide-y divide-slate-200">
            <FormField label="Product Name" value="STEM Educational Toy Kit" />
            <FormField label="Est. Piece Count" value="~250" />
            <FormField label="Material" value="ABS (phthalate- & lead-free)" />
            <FormField label="Target Age" value="6-12 years" />
            <FormField label="Compliance" value="ASTM F963, EN71, CPSIA" />
            <FormField label="Packaging" value="Recyclable" updated />
            <FormField label="Quantity" value="1,500 kits" updated />
            <FormField label="Supplier Origin" value="Non-sanctioned only" updated />
        </dl>
      </div>
    </div>
  );
};