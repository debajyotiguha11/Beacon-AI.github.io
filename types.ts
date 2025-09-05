export enum UserType {
  AGENT = 'AGENT',
  USER = 'USER',
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
  PO_SUMMARY = 'PO_SUMMARY',
  AWARD_CREATION = 'AWARD_CREATION',
  AWARD_SUMMARY = 'AWARD_SUMMARY',
  AWARD_PDF_GENERATION = 'AWARD_PDF_GENERATION',
  AWARD_SUPPLIER_VIEW = 'AWARD_SUPPLIER_VIEW',
  AWARD_FINAL_STATUS = 'AWARD_FINAL_STATUS',
}

export interface Supplier {
  name: string;
  type: string;
  score: number;
  status: string;
}

export interface AwardDetails {
  market?: string;
  hierarchy?: string;
  vendorNumber?: string;
  sourcingManager?: string;
  brand?: string;
  awardType?: string;
  freightTerms?: string;
  awardLength?: string;
  costIndex?: string;
  pricingMethod?: string;
  volumeCommitment?: boolean;
  rofr?: boolean;
  autoRenewal?: boolean;
  items?: { upc: string; itemNumber: string; description: string; quantity: string; dc: string; }[];
  [key: string]: any; // for easier updates
}

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
  customAction?: 'CREATE_AWARD_TAB';
  formSection?: 'initial' | 'hierarchy' | 'terms' | 'clauses' | 'items';
}