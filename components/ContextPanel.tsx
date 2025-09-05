import React from 'react';
import { ContextView, AwardDetails } from '../types';
import { QUALIFIED_SUPPLIERS } from '../constants';
import { InitialView } from './context_views/InitialView';
import { DraftIntakeForm } from './context_views/DraftIntakeForm';
import { FinalIntakeForm } from './context_views/FinalIntakeForm';
import { SupplierShortlist } from './context_views/SupplierShortlist';
import { SupplierDashboard } from './context_views/SupplierDashboard';
import { SupplierComparison } from './context_views/SupplierComparison';
import { POSummary } from './context_views/POSummary';
import { AwardCreationForm } from './context_views/AwardCreationForm';
import { AwardSummary } from './context_views/AwardSummary';
import { AwardPDFGeneration } from './context_views/AwardPDFGeneration';
import { AwardSupplierView } from './context_views/AwardSupplierView';
import { AwardFinalStatus } from './context_views/AwardFinalStatus';

interface ContextPanelProps {
  view: ContextView;
  selectedSuppliers: Set<string>;
  onToggleSupplier: (supplierName: string) => void;
  supplierStatuses: Record<string, string>;
  awardDetails: AwardDetails;
  onSupplierResponse: (response: 'Accept' | 'Reject') => void;
  supplierResponse: 'Accept' | 'Reject' | null;
  onAwardDetailsChange: (updates: Partial<AwardDetails>) => void;
  onFormSubmit: (response: string) => void;
  activeFormSection?: string;
}

const viewMap: Record<ContextView, React.ComponentType<any>> = {
  [ContextView.INITIAL]: InitialView,
  [ContextView.DRAFT_INTAKE_FORM]: DraftIntakeForm,
  [ContextView.FINAL_INTAKE_FORM]: FinalIntakeForm,
  [ContextView.SUPPLIER_SHORTLIST]: SupplierShortlist,
  [ContextView.SUPPLIER_DASHBOARD]: SupplierDashboard,
  [ContextView.SUPPLIER_COMPARISON]: SupplierComparison,
  [ContextView.PO_SUMMARY]: POSummary,
  [ContextView.AWARD_CREATION]: AwardCreationForm,
  [ContextView.AWARD_SUMMARY]: AwardSummary,
  [ContextView.AWARD_PDF_GENERATION]: AwardPDFGeneration,
  [ContextView.AWARD_SUPPLIER_VIEW]: AwardSupplierView,
  [ContextView.AWARD_FINAL_STATUS]: AwardFinalStatus,
};

export const ContextPanel: React.FC<ContextPanelProps> = ({ 
  view, 
  selectedSuppliers, 
  onToggleSupplier, 
  supplierStatuses, 
  awardDetails,
  onSupplierResponse,
  supplierResponse,
  onAwardDetailsChange,
  onFormSubmit,
  activeFormSection
}) => {
  const CurrentView = viewMap[view] || InitialView;

  const viewProps: any = {};
  if (view === ContextView.INITIAL) {
    viewProps.onActionClick = onFormSubmit;
  } else if (view === ContextView.SUPPLIER_SHORTLIST) {
    viewProps.suppliers = QUALIFIED_SUPPLIERS;
    viewProps.selectedSuppliers = selectedSuppliers;
    viewProps.onToggleSupplier = onToggleSupplier;
  } else if (view === ContextView.SUPPLIER_DASHBOARD) {
    viewProps.allSuppliers = QUALIFIED_SUPPLIERS;
    // FIX: Use the 'selectedSuppliers' prop, as 'shortlistedSuppliers' is not defined.
    viewProps.shortlistedSuppliers = selectedSuppliers;
    viewProps.supplierStatuses = supplierStatuses;
  } else if (view === ContextView.SUPPLIER_COMPARISON) {
    // FIX: Use the 'selectedSuppliers' prop, as 'shortlistedSuppliers' is not defined.
    viewProps.shortlistedSuppliers = selectedSuppliers;
  } else if (view === ContextView.AWARD_CREATION) {
    viewProps.awardDetails = awardDetails;
    viewProps.onDetailsChange = onAwardDetailsChange;
    viewProps.onFormSubmit = onFormSubmit;
    viewProps.activeSection = activeFormSection;
  } else if (view === ContextView.AWARD_SUMMARY) {
    viewProps.awardDetails = awardDetails;
  } else if (view === ContextView.AWARD_SUPPLIER_VIEW) {
    viewProps.awardDetails = awardDetails;
    viewProps.onSupplierResponse = onSupplierResponse;
  } else if (view === ContextView.AWARD_FINAL_STATUS) {
    viewProps.supplierResponse = supplierResponse;
  }


  return (
    <div className="h-full overflow-y-auto">
        <CurrentView {...viewProps} />
    </div>
  );
};
