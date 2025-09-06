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
