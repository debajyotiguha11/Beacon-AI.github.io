import React from 'react';
import { ContextView, AwardDetails } from '../types';
import { QUALIFIED_SUPPLIERS } from '../constants';

// Import views from their new locations
import { InitialView } from './context_views/InitialView';
import { DraftIntakeForm } from '../features/intake/components/views/DraftIntakeForm';
import { FinalIntakeForm } from '../features/intake/components/views/FinalIntakeForm';
import { SupplierShortlist } from './context_views/SupplierShortlist';
import { SupplierDashboard } from './context_views/SupplierDashboard';
import { SupplierComparison } from './context_views/SupplierComparison';
import { RFQForm } from './context_views/RFQForm';
import { POSummary } from './context_views/POSummary';
import { AwardCreationForm } from '../features/award/components/views/AwardCreationForm';
import { AwardSummary } from '../features/award/components/views/AwardSummary';
import { AwardPDFGeneration } from '../features/award/components/views/AwardPDFGeneration';
import { AwardSupplierView } from '../features/award/components/views/AwardSupplierView';
import { AwardFinalStatus } from '../features/award/components/views/AwardFinalStatus';
import { AwardFlowProgressBar } from '../features/award/components/views/AwardFlowProgressBar';
import { AwardSendingView } from '../features/award/components/views/AwardSendingView';


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
  isAgentThinking?: boolean;
  onReturnToDashboard: () => void;
  isReviewFlow?: boolean;
}

const viewMap: Record<ContextView, React.ComponentType<any>> = {
  [ContextView.INITIAL]: InitialView,
  [ContextView.DRAFT_INTAKE_FORM]: DraftIntakeForm,
  [ContextView.FINAL_INTAKE_FORM]: FinalIntakeForm,
  [ContextView.SUPPLIER_SHORTLIST]: SupplierShortlist,
  [ContextView.SUPPLIER_DASHBOARD]: SupplierDashboard,
  [ContextView.SUPPLIER_COMPARISON]: SupplierComparison,
  [ContextView.RFQ_FORM]: RFQForm,
  [ContextView.PO_SUMMARY]: POSummary,
  [ContextView.AWARD_CREATION]: AwardCreationForm,
  [ContextView.AWARD_SUMMARY]: AwardSummary,
  [ContextView.AWARD_PDF_GENERATION]: AwardPDFGeneration,
  [ContextView.AWARD_SENDING]: AwardSendingView,
  [ContextView.AWARD_SUPPLIER_VIEW]: AwardSupplierView,
  [ContextView.AWARD_FINAL_STATUS]: AwardFinalStatus,
};

const PanelHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
);

const AwardGatheringLoader: React.FC = () => (
    <div>
        <PanelHeader title="Award Finalization" subtitle="Please wait while the agent gathers information..." />
        <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 h-full">
            <svg className="animate-spin h-12 w-12 text-walmart-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="mt-4 text-base font-semibold text-slate-700">Gathering award data...</h3>
        </div>
    </div>
);


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
  activeFormSection,
  isAgentThinking,
  onReturnToDashboard,
  isReviewFlow,
}) => {
  const CurrentView = viewMap[view] || InitialView;

  const showProgressBar = [
    ContextView.AWARD_CREATION,
    ContextView.AWARD_SUMMARY,
    ContextView.AWARD_PDF_GENERATION,
    ContextView.AWARD_SENDING,
    ContextView.AWARD_SUPPLIER_VIEW,
    ContextView.AWARD_FINAL_STATUS,
  ].includes(view);

  // If we are in the review flow and the view is set for creation, it means we are in the data gathering phase.
  // Show a dedicated loader to prevent the form from flashing.
  const isReviewLoading = view === ContextView.AWARD_CREATION && isReviewFlow;

  if (isReviewLoading) {
      return (
          <div className="h-full flex flex-col">
              <AwardFlowProgressBar currentView={view} supplierResponse={supplierResponse} />
              <div className="flex-grow overflow-y-auto">
                  <AwardGatheringLoader />
              </div>
          </div>
      );
  }

  const viewProps: any = {};
  if (view === ContextView.INITIAL) {
    viewProps.onActionClick = onFormSubmit;
  } else if (view === ContextView.SUPPLIER_SHORTLIST) {
    viewProps.suppliers = QUALIFIED_SUPPLIERS;
    viewProps.selectedSuppliers = selectedSuppliers;
    viewProps.onToggleSupplier = onToggleSupplier;
  } else if (view === ContextView.SUPPLIER_DASHBOARD) {
    viewProps.allSuppliers = QUALIFIED_SUPPLIERS;
    viewProps.shortlistedSuppliers = selectedSuppliers;
    viewProps.supplierStatuses = supplierStatuses;
  } else if (view === ContextView.SUPPLIER_COMPARISON) {
    viewProps.shortlistedSuppliers = selectedSuppliers;
  } else if (view === ContextView.AWARD_CREATION) {
    viewProps.awardDetails = awardDetails;
    viewProps.onDetailsChange = onAwardDetailsChange;
    viewProps.onFormSubmit = onFormSubmit;
    viewProps.activeSection = activeFormSection;
    viewProps.isAgentThinking = isAgentThinking;
  } else if (view === ContextView.AWARD_SUMMARY) {
    viewProps.awardDetails = awardDetails;
  } else if (view === ContextView.AWARD_PDF_GENERATION) {
    viewProps.isGenerating = isAgentThinking;
  } else if (view === ContextView.AWARD_SUPPLIER_VIEW) {
    viewProps.awardDetails = awardDetails;
  } else if (view === ContextView.AWARD_FINAL_STATUS) {
    viewProps.supplierResponse = supplierResponse;
    viewProps.onReturnToDashboard = onReturnToDashboard;
  }

  return (
    <div className="h-full flex flex-col">
      {showProgressBar && <AwardFlowProgressBar currentView={view} supplierResponse={supplierResponse} />}
      <div className="flex-grow overflow-y-auto">
        <CurrentView {...viewProps} />
      </div>
    </div>
  );
};