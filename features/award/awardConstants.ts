
import { AwardDetails } from './awardTypes';

export const REVIEW_AWARD_DETAILS: AwardDetails = {
    awardName: 'Brainy Builder Toys Pvt. Ltds Award - 2024',
    startDate: 'September 1, 2024',
    endDate: 'August 31, 2025',
    market: 'wm-us',
    vendorNumber: '987654321',
    brand: 'Brainy Builder Toys Pvt. Ltds',
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
        { upc: '1234567', itemNumber: 'SKU-A', description: 'STEM Blocks 500pcs', quantity: '250000', dc: 'DC7070', price: 7.85 },
        { upc: '1234568', itemNumber: 'SKU-B', description: 'Robotics Kit V2', quantity: '300000', dc: 'DC7070', price: 12.50 }
    ]
};