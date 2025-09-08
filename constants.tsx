
import React from 'react';
import { ConversationStep, UserType, ContextView, Supplier } from './types';
import { AgentTaskView } from './components/AgentTaskView';
import { DeepThinkingAnimation } from './components/DeepThinkingAnimation';
import { VendorDataFetchAnimation } from './components/VendorDataFetchAnimation';
import { AwardPDFCreationAnimation } from './features/award/components/animations/AwardPDFCreationAnimation';
import { ReviewAwardAnimation } from './features/award/components/animations/ReviewAwardAnimation';
import { AddingParticipantAnimation } from './components/AddingParticipantAnimation';
import { PreparingQuestionsAnimation } from './components/PreparingQuestionsAnimation';
import { SendingRFQAnimation } from './components/SendingRFQAnimation';
import { SendingAgreementAnimation } from './components/SendingAgreementAnimation';

export const USER_PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
export const AMBER_PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const USER_PROFILES: Record<UserType, { name: string, imageUrl: string, isAgent?: boolean }> = {
    [UserType.AGENT]: { name: 'Agent : Beacon', imageUrl: '', isAgent: true },
    [UserType.USER]: { name: 'Associate : Jony', imageUrl: USER_PROFILE_IMAGE_URL },
    [UserType.AMBER]: { name: 'Merchant : Amber', imageUrl: AMBER_PROFILE_IMAGE_URL },
    [UserType.SUPPLIER]: { name: 'Supplier', imageUrl: '' },
};


export const QUALIFIED_SUPPLIERS: Supplier[] = [
    { name: "ToyCrafters Inc.", type: "Walmart Supplier", score: 92, status: "Onboarded" },
    { name: "EduPlay Co.", type: "Walmart Supplier", score: 85, status: "Onboarded" },
    { name: "Innovate & Educate", type: "Walmart Seller", score: 88, status: "Onboarded" },
    { name: "Gizmo Gurus", type: "External", score: 75, status: "Requires Onboarding" },
    { name: "Brainy Builder Toys Pvt. Ltds", type: "External", score: 82, status: "Requires Onboarding" },
];

export const DETAILED_SUPPLIER_INFO: Record<string, any> = {
  'ToyCrafters Inc.': {
    tags: ['Walmart Supplier', 'Top Rated'],
    location: 'Bentonville, AR',
    serScore: 92,
    risk: 'Low',
    companyDetails: {
      'Supplier #': '73928461',
      'Annual Sales 2024': '$25.4 million',
      'Country': 'USA',
      'Ad Spend': '$1.2 million',
      'Retail Market': 'United States',
      'Growth': '8.5%',
    },
    productCategories: ['Educational Toys', 'Building Blocks', 'STEM Kits'],
    businessUnitCoverage: 'Toys (5/5)',
    value: '$75M+'
  },
  'Innovate & Educate': {
    name: "Innovate & Educate",
    tags: ['Walmart Seller', 'Eco-Friendly'],
    location: 'Shanghai, China',
    serScore: 88,
    risk: 'Low',
    companyDetails: {
      'Supplier #': '84392817',
      'Annual Sales 2024': '$18.9 million',
      'Country': 'China',
      'Ad Spend': '$850K',
      'Retail Market': 'Global',
      'Growth': '12.8%',
    },
    productCategories: ['Electronics', 'Mobile Devices', 'Home Appliances'],
    businessUnitCoverage: 'Electronics (6/6)',
    value: '$50M+'
  },
  'Gizmo Gurus': {
    name: "Gizmo Gurus",
    tags: ['External', 'New'],
    location: 'Hong Kong',
    serScore: 75,
    risk: 'Medium',
    companyDetails: {
      'Supplier #': 'N/A',
      'Annual Sales 2024': '$7.2 million',
      'Country': 'Hong Kong',
      'Ad Spend': '$300K',
      'Retail Market': 'Asia',
      'Growth': '15.2%',
    },
    productCategories: ['Gadgets', 'Electronic Toys', 'Accessories'],
    businessUnitCoverage: 'Toys (2/5)',
    value: '$10M+'
  },
  'EduPlay Co.': {
    name: "EduPlay Co.",
    tags: ['Walmart Supplier'],
    location: 'San Francisco, CA',
    serScore: 85,
    risk: 'Low',
    companyDetails: {
      'Supplier #': '28374651',
      'Annual Sales 2024': '$15.1 million',
      'Country': 'USA',
      'Ad Spend': '$950K',
      'Retail Market': 'United States',
      'Growth': '9.2%',
    },
    productCategories: ['Plush Toys', 'Board Games', 'Art Supplies'],
    businessUnitCoverage: 'Toys (4/5)',
    value: '$40M+'
  },
  'Brainy Builder Toys Pvt. Ltds': {
    name: "Brainy Builder Toys Pvt. Ltds",
    tags: ['External', 'Sustainable'],
    location: 'Toronto, Canada',
    serScore: 95,
    risk: 'Strategic',
    companyDetails: {
      'Supplier #': 'N/A',
      'Annual Sales 2024': '$102 million',
      'Country': 'Canada',
      'Ad Spend': '$500K',
      'Retail Market': 'Europe, US',
      'Growth': '11.3%',
    },
    productCategories: ['Wooden Toys', 'Puzzles', 'Educational Kits'],
    businessUnitCoverage: 'Toys (3/5)',
    value: '$20M+'
  },
};

export const CONVERSATION_SCRIPT: ConversationStep[] = [
  // Step 0 & 1
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Hey Jony 👋 welcome back! You have some pending tasks.</p>
            <ol className="list-decimal list-inside ml-2 mt-2 space-y-1">
                <li>Received Buy Plan from Amber</li>
                <li>Pending Awards Review.</li>
                <li>Create Purchase Order</li>
            </ol>
        </div>
    ),
    options: ["Retrieve Buy Plan"],
    thinkingTime: 1000,
  },
  {
    speaker: UserType.AGENT,
    text: "All set ✅. Intake form created and routed to your sourcing associate.",
    thinkingTime: 2000,
    contextView: ContextView.DRAFT_INTAKE_FORM,
    autoContinue: true,
  },
  // Step 2
  {
    speaker: UserType.AGENT,
    text: (
      <div>
        <p className="font-semibold text-slate-600">[Intake form summary]</p>
        <p>New intake form received: STEM Educational Toy Kit, ABS, ~250 pcs, ages 6–12, ASTM/EN71/CPSIA, recyclable packaging.</p>
        <p className="mt-2">Would you like to accept it directly, or ask the merchant a few clarifications first?</p>
      </div>
    ),
    options: ["Accept directly", "Ask a few clarifications."],
    thinkingTime: 1000,
  },
  // Steps 3, 4, 5: New Clarification Flow (triggered by user message)
  {
    speaker: UserType.AGENT,
    text: <AddingParticipantAnimation />,
    thinkingTime: 500,
    isThinkingMessage: true,
    awaitsCompletion: true,
  },
  {
    speaker: UserType.AGENT,
    text: null,
    waitingTime: 2500,
    autoContinue: true,
  },
  {
    speaker: UserType.AMBER,
    text: "Yes phthalate/lead-free, Non-sanctioned origins, Recyclable packaging.",
    autoContinue: true
  },
  // Step 6
   {
    speaker: UserType.AGENT,
    text: "Do you want me to lock it and move forward?",
    options: ["Yes, lock it."],
    thinkingTime: 1200,
  },
  // Step 7
  {
    speaker: UserType.AGENT,
    text: "Locked ✅. Intake form finalized. Moving on to supplier search.",
    thinkingTime: 2000,
    contextView: ContextView.FINAL_INTAKE_FORM,
    autoContinue: true,
  },
  // Step 8
  {
    speaker: UserType.AGENT,
    text: <DeepThinkingAnimation />,
    thinkingTime: 1000,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  // Step 9
  {
    speaker: UserType.AGENT,
    text: <AgentTaskView />,
    thinkingTime: 500,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  // Step 10
  {
    speaker: UserType.AGENT,
    text: 'Found 5 qualified suppliers (2 Walmart Suppliers, 1 Seller, 2 External). Select from the list on the left and confirm your shortlist.',
    options: ["Confirm Shortlist"],
    thinkingTime: 1800,
    contextView: ContextView.SUPPLIER_SHORTLIST
  },
  // Step 11
  {
    speaker: UserType.AGENT,
    text: "Done ✅. Selected suppliers have been shortlisted.",
    thinkingTime: 1000,
    autoContinue: true,
  },
  // Step 12
  {
    speaker: UserType.AGENT,
    text: "Some of the selected suppliers are already onboarded, while others are new. Want me to send onboarding invites?",
    options: ["Yes, send them."],
    thinkingTime: 800,
    contextView: ContextView.SUPPLIER_DASHBOARD
  },
  // Step 13: Start sending invites
  {
    speaker: UserType.AGENT,
    text: "Okay, I'm sending the invites now. I'll update you as they become ready for the agreement phase.",
    thinkingTime: 1000,
    autoContinue: true,
  },
  // Step 14: This is a special step that triggers the simulation in App.tsx
  {
    speaker: UserType.AGENT,
    text: null,
    customAction: 'SIMULATE_ONBOARDING',
    autoContinue: false, // The simulation will advance the step when done
  },
  // Step 15: Conclude onboarding and ask next question
  {
    speaker: UserType.AGENT,
    text: "The suppliers are ready for the next step. Would you like to ask some vetting questions?",
    options: ["Yes, ask some vetting questions."],
    thinkingTime: 1000,
  },
  // Step 16
  {
    speaker: UserType.AGENT,
    text: <PreparingQuestionsAnimation />,
    thinkingTime: 500,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  // Step 17
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>I've prepared a few standard follow-up questions based on the missing information. Should I send these?</p>
            <ul className="list-disc list-inside ml-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <li>Pricing for 250,000 units + volume discounts?</li>
                <li>Quality control & certifications?</li>
                <li>Sustainability practices?</li>
                <li>Ethics: labor, wages, safety?</li>
            </ul>
        </div>
    ),
    options: ["Yes, send them.", "Draft my own instead."],
    thinkingTime: 1000,
  },
  // Step 18
  {
      speaker: UserType.AGENT,
      text: "Okay, sending the questions now.",
      thinkingTime: 800,
      autoContinue: true,
  },
  // Step 19
  {
      speaker: UserType.AGENT,
      text: null, // This will just show the waiting indicator
      thinkingTime: 200,
      waitingTime: 3000,
      autoContinue: true,
  },
  // Step 20
  {
      speaker: UserType.AGENT,
      text: (
          <div>
              <p>We have got the responses:</p>
              <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  <li><span className="font-semibold">Gizmo Gurus →</span> Pricing at 5k units is $7.50/unit. QC docs available. Uses recycled ABS. SMETA audited.</li>
                  <li><span className="font-semibold">Brainy Builder Toys Pvt. Ltds →</span> Pricing at 250,000 units is $5/unit. QC docs available. Confirms phthalate-free. ISO 14001 certified. BSCI audited.</li>
              </ul>
          </div>
      ),
      autoContinue: false,
      thinkingTime: 500,
      options: ["Ask more", "Show comparison"],
  },
  // Step 21
  {
    speaker: UserType.AGENT,
    text: "Great. Please type your question for a specific supplier (e.g., 'To Brainy Builder Toys Pvt. Ltds: Do you support customized PMS, costs?').",
    thinkingTime: 800,
  },
  // Step 22
  {
    speaker: UserType.AGENT,
    text: "Brainy Builder Toys Pvt. Ltds confirms PMS customization, no added cost, MOQ unchanged.",
    options: ["Show the comparison."],
    thinkingTime: 1200,
  },
  // Step 23
  {
    speaker: UserType.AGENT,
    text: "Supplier profiles have been updated.",
    thinkingTime: 2000,
    contextView: ContextView.SUPPLIER_COMPARISON,
    autoContinue: true,
  },
  // Step 24 (Evaluation)
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Here is the consolidated comparison :</p>
            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li><span className="font-semibold">ToyCrafters Inc. — 92/100:</span> Strong compliance, high capacity, predictable. Weakness: higher price.</li>
                <li><span className="font-semibold">Brainy Builder Toys Pvt. Ltds — 95/100:</span> Good price, verified compliance, customization.</li>
                <li><span className="font-semibold">Gizmo Gurus — (N/A):</span> External supplier, best pricing, but compliance is only claimed, not verified.</li>
            </ul>
            <p className="mt-2">Do you want to send an agreement to the selected supplier?</p>
        </div>
    ),
    thinkingTime: 1400,
    autoContinue: false,
    options: ["Yes, send agreement"],
  },
  // Agreement Flow
  {
    speaker: UserType.AGENT,
    text: <SendingAgreementAnimation />,
    thinkingTime: 1000,
    isThinkingMessage: true,
    awaitsCompletion: true,
  },
  {
    speaker: UserType.AGENT,
    text: "Great, the agreement has been sent. Now waiting for the supplier to review and accept.",
    waitingTime: 4000,
    autoContinue: true,
    customAction: 'AGREEMENT_ACCEPTED'
  },
  {
    speaker: UserType.AGENT,
    text: null,
    dynamicText: 'agreementAccepted',
    thinkingTime: 1000,
    autoContinue: true,
  },
  // RFQ Flow
  {
    speaker: UserType.AGENT,
    text: null,
    dynamicText: 'rfqFormHeader',
    thinkingTime: 1200,
    contextView: ContextView.RFQ_FORM,
    options: ["Send RFQ"],
  },
  {
    speaker: UserType.AGENT,
    text: <SendingRFQAnimation />,
    thinkingTime: 1000,
    isThinkingMessage: true,
    awaitsCompletion: true,
  },
  {
    speaker: UserType.AGENT,
    text: "RFQ sent. Now waiting for supplier responses.",
    thinkingTime: 500,
    waitingTime: 4000,
    autoContinue: true,
  },
  {
    speaker: UserType.SUPPLIER,
    text: "I have filled the RFQ.",
    thinkingTime: 1500,
    autoContinue: true,
    customAction: 'RFQ_RESPONSE_RECEIVED',
  },
  {
    speaker: UserType.AGENT,
    text: null,
    dynamicText: 'rfqResponseReceived',
    thinkingTime: 1500,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: "Based on their positive response, I have prepared the award for you to review.",
    options: ["Create Award"],
    thinkingTime: 1200,
  },
  // START AWARD FLOW
  {
    speaker: UserType.AGENT,
    text: "Great! Let’s create the award. I’ll collect the required details, which will appear on the left as we go.",
    thinkingTime: 1500,
    contextView: ContextView.AWARD_CREATION,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: "First, please provide the Market, Vendor Number, and Brand.",
    options: ["Market: wm-us, Vendor: 123456789, Brand: HealthPlus"],
    thinkingTime: 800,
    formSection: 'initial',
  },
  {
    speaker: UserType.AGENT,
    text: <VendorDataFetchAnimation />,
    thinkingTime: 1000,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  {
      speaker: UserType.AGENT,
      text: "Thanks. Based on that, I've suggested a hierarchy: SBU: Health & Wellness → Dept: OTC Care → Category: Digestive Support. Do you accept this?",
      options: ["Accept Hierarchy"],
      thinkingTime: 1500,
      formSection: 'hierarchy',
  },
  {
      speaker: UserType.AGENT,
      text: "Perfect. Now, let's set the terms. What are the Award Type, Freight Terms, Award Length, Cost Index, and Pricing Method?",
      options: ["Type: Standard, Freight: Collect, Length: Annual, Index: , Pricing: Fixed"],
      thinkingTime: 800,
      formSection: 'terms',
  },
  {
      speaker: UserType.AGENT,
      text: "Got it. Are there any of the following clauses? Volume Commitment, ROFR/Exclusivity, Auto-Renewal.",
      options: ["Commitment: Yes, ROFR: No, Auto-Renewal: No"],
      thinkingTime: 800,
      formSection: 'clauses',
  },
  {
      speaker: UserType.AGENT,
      text: "Finally, let’s add the item lines. You can paste them in CSV format (UPC, Item#, Description, Qty, DC, Price).",
      thinkingTime: 800,
      formSection: 'items',
      options: ["8829103,1102,Vitamin D3 500ct,10000,DC6092,5.50\n8829104,1103,Vitamin C 1000mg,15000,DC6092,4.25"],
  },
  {
      speaker: UserType.AGENT,
      text: "I've validated the items. Everything looks good. Shall we move to the final review?",
      options: ["Yes, show the summary"],
      thinkingTime: 1200,
  },
  {
      speaker: UserType.AGENT,
      text: "Here is the final summary of the award. Please review the details on the left and confirm to generate the award PDF for the supplier.",
      thinkingTime: 1500,
      contextView: ContextView.AWARD_SUMMARY,
      options: ["Confirm and Generate PDF"],
  },
  {
      speaker: UserType.AGENT,
      text: <AwardPDFCreationAnimation />,
      thinkingTime: 1000,
      contextView: ContextView.AWARD_PDF_GENERATION,
      isThinkingMessage: true,
      awaitsCompletion: true,
  },
  {
      speaker: UserType.AGENT,
      text: "The award document has been generated. Would you like to send it to the supplier for approval?",
      thinkingTime: 500,
      contextView: ContextView.AWARD_PDF_GENERATION,
      options: ["Yes, send for approval", "No, start over"],
  },
  {
    speaker: UserType.AGENT,
    text: "Okay, I'm sending the award for approval. This will be sent to the supplier via the collab.",
    thinkingTime: 3000,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: null,
    dynamicText: 'awardCongrats',
    thinkingTime: 1500,
    contextView: ContextView.AWARD_SUPPLIER_VIEW,
    simulateSupplierResponse: true,
    waitingTime: 1000, // Small delay before waiting indicator
  },
  // START PO FLOW
  {
    speaker: UserType.AGENT,
    text: (
      <div>
        <p>Supplier has accepted the award.</p>
        <p className="mt-2">Shall we proceed to raise a Purchase Order?</p>
      </div>
    ),
    options: ["Yes, raise PO"],
    thinkingTime: 1000,
    contextView: ContextView.AWARD_FINAL_STATUS,
    customAction: 'AWARD_ACCEPTED_PROCEED_TO_PO'
  },
  {
      speaker: UserType.AGENT,
      text: "Excellent. I've drafted a Purchase Order based on the award details. Please review it on the left.",
      thinkingTime: 1500,
      contextView: ContextView.PO_SUMMARY,
      options: ["Confirm and Create PO"],
  },
  {
      speaker: UserType.AGENT,
      text: "Purchase Order sent to Brainy Builder Toys Pvt. Ltds. You'll be notified upon their confirmation.",
      thinkingTime: 1000,
      autoContinue: true,
  },
   {
      speaker: UserType.AGENT,
      text: "This completes the sourcing event. Is there anything else I can help you with today?",
      options: ["Return to Dashboard"],
      thinkingTime: 1000,
  },
  {
    speaker: UserType.AGENT,
    text: null, // This step is now silent and just for navigation
    customAction: 'START_REVIEW_FLOW',
    autoContinue: true,
    thinkingTime: 0,
  },
  {
      speaker: UserType.AGENT,
      text: <ReviewAwardAnimation />,
      thinkingTime: 1000,
      isThinkingMessage: true,
      awaitsCompletion: true,
  },
  {
      speaker: UserType.AGENT,
      text: "I've gathered all the details for the 'STEM Educational Toy Kit Award'. The summary is now available on the left for your review.",
      thinkingTime: 1500,
      contextView: ContextView.AWARD_SUMMARY,
      options: ["Confirm and Generate PDF"],
  }
];
