import { AwardDetails } from './awardTypes';

export const REVIEW_AWARD_DETAILS: AwardDetails = {
    market: 'wm-us',
    vendorNumber: '987654321',
    brand: 'STEM Toys',
    hierarchy: "SBU: Toys → Dept: Educational → Category: Building Blocks",
    awardType: 'Standard',
    freightTerms: 'Prepaid',
    awardLength: 'Annual',
    costIndex: '2.1',
    pricingMethod: 'Fixed',
    volumeCommitment: true,
    rofr: false,
    autoRenewal: true,
    items: [
        { upc: '1234567', itemNumber: 'SKU-A', description: 'STEM Blocks 500pcs', quantity: '5000', dc: 'DC7070' },
        { upc: '1234568', itemNumber: 'SKU-B', description: 'Robotics Kit V2', quantity: '2500', dc: 'DC7070' }
    ]
};
