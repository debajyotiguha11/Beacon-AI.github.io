
import React from 'react';
import type { AwardDetails } from './features/award/awardTypes';

export enum UserType {
  AGENT = 'AGENT',
  USER = 'USER',
  AMBER = 'AMBER',
  SUPPLIER = 'SUPPLIER',
}

export interface Message {
  id: number;
  user: UserType;
  text: React.ReactNode;
  isThinkingMessage?: boolean;
}

export enum ContextView {
  INITIAL = 'INITIAL',
  DRAFT_INTAKE_FORM = 'DRAFT_INTAKE_FORM',
  FINAL_INTAKE_FORM = 'FINAL_INTAKE_FORM',
  SUPPLIER_SHORTLIST = 'SUPPLIER_SHORTLIST',
  SUPPLIER_DASHBOARD = 'SUPPLIER_DASHBOARD',
  SUPPLIER_COMPARISON = 'SUPPLIER_COMPARISON',
  RFQ_FORM = 'RFQ_FORM',
  PO_SUMMARY = 'PO_SUMMARY',
  AWARD_CREATION = 'AWARD_CREATION',
  AWARD_SUMMARY = 'AWARD_SUMMARY',
  AWARD_PDF_GENERATION = 'AWARD_PDF_GENERATION',
  AWARD_SENDING = 'AWARD_SENDING',
  AWARD_SUPPLIER_VIEW = 'AWARD_SUPPLIER_VIEW',
  AWARD_FINAL_STATUS = 'AWARD_FINAL_STATUS',
}

export interface Supplier {
  name: string;
  type: string;
  score: number;
  status: string;
}

export type { AwardDetails };

export interface ConversationStep {
  speaker: UserType;
  text: React.ReactNode;
  options?: string[];
  thinkingTime?: number;
  waitingTime?: number;
  contextView?: ContextView;
  isImageUpload?: boolean;
  autoContinue?: boolean;
  isThinkingMessage?: boolean;
  awaitsCompletion?: boolean;
  customAction?: 'START_REVIEW_FLOW' | 'AWARD_ACCEPTED_PROCEED_TO_PO' | 'AGREEMENT_ACCEPTED' | 'RFQ_RESPONSE_RECEIVED' | 'SIMULATE_ONBOARDING';
  formSection?: 'initial' | 'hierarchy' | 'terms' | 'clauses' | 'items';
  simulateSupplierResponse?: boolean;
  updateSupplierStatuses?: { supplierName: string; newStatus: string }[];
  dynamicText?: 'awardCongrats' | 'rfqFormHeader' | 'agreementAccepted' | 'rfqResponseReceived';
}
