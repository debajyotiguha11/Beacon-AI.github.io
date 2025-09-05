import React from 'react';
import { ConversationStep, UserType, ContextView, Supplier } from './types';
import { AgentTaskView } from './components/AgentTaskView';
import { DeepThinkingAnimation } from './components/DeepThinkingAnimation';
import { VendorDataFetchAnimation } from './components/VendorDataFetchAnimation';
import { AwardPDFCreationAnimation } from './components/AwardPDFCreationAnimation';
import { SendingForApprovalAnimation } from './components/SendingForApprovalAnimation';

export const USER_PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const QUALIFIED_SUPPLIERS: Supplier[] = [
    { name: "Maitri", type: "Internal", score: 92, status: "Onboarded" },
    { name: "Nestle", type: "New", score: 88, status: "Requires Onboarding" },
    { name: "Cadbury", type: "New", score: 85, status: "Requires Onboarding" },
    { name: "Supplier D", type: "Marketplace", score: 81, status: "Requires Onboarding" },
    { name: "Supplier E", type: "Internal", score: 79, status: "Onboarded" },
    { name: "Supplier F", type: "Marketplace", score: 75, status: "Requires Onboarding" },
    { name: "Supplier G", type: "Semantic", score: 74, status: "Requires Onboarding" },
    { name: "Supplier H", type: "Image Match", score: 70, status: "Requires Onboarding" },
];

export const COMPARISON_FEATURES = [
  'Price/Unit',
  'Price @ 5k+',
  'Capacity/Month',
  'Compliance',
  'Phthalate-Free',
  'Defect Rate',
  'Customization',
  'Logistics',
  'Audits',
];

export const SUPPLIER_COMPARISON_DATA: Record<string, Record<string, string>> = {
  'Maitri': {
    'Price/Unit': '$8.20', 'Price @ 5k+': '$8.20', 'Capacity/Month': '30k', 'Compliance': 'Verified',
    'Phthalate-Free': 'Verified', 'Defect Rate': '<2%', 'Customization': 'Limited', 'Logistics': 'FOB HK', 'Audits': 'N/A',
  },
  'Nestle': {
    'Price/Unit': '$7.90', 'Price @ 5k+': '$7.50', 'Capacity/Month': '20k', 'Compliance': 'Claimed',
    'Phthalate-Free': 'Verified', 'Defect Rate': '<1%', 'Customization': 'Yes (PMS)', 'Logistics': 'FOB HK', 'Audits': 'N/A',
  },
  'Cadbury': {
    'Price/Unit': 'Pending', 'Price @ 5k+': 'Pending', 'Capacity/Month': '15k', 'Compliance': 'Partial',
    'Phthalate-Free': 'Pending', 'Defect Rate': 'N/A', 'Customization': 'N/A', 'Logistics': 'FOB Ningbo', 'Audits': 'ISO, SMETA',
  },
  'Supplier D': {
    'Price/Unit': '$8.50', 'Price @ 5k+': '$8.30', 'Capacity/Month': '25k', 'Compliance': 'Verified',
    'Phthalate-Free': 'Verified', 'Defect Rate': '<1.5%', 'Customization': 'Yes', 'Logistics': 'FOB Shanghai', 'Audits': 'BSCI',
  },
  'Supplier E': {
    'Price/Unit': '$9.10', 'Price @ 5k+': '$9.00', 'Capacity/Month': '50k', 'Compliance': 'Verified',
    'Phthalate-Free': 'Verified', 'Defect Rate': '<2.5%', 'Customization': 'No', 'Logistics': 'FOB HK', 'Audits': 'N/A',
  },
  'Supplier F': {
    'Price/Unit': '$8.00', 'Price @ 5k+': '$7.80', 'Capacity/Month': '18k', 'Compliance': 'Claimed',
    'Phthalate-Free': 'Pending', 'Defect Rate': '<2%', 'Customization': 'Limited', 'Logistics': 'FOB Shenzhen', 'Audits': 'N/A',
  },
  'Supplier G': {
    'Price/Unit': 'Pending', 'Price @ 5k+': 'Pending', 'Capacity/Month': '16k', 'Compliance': 'Partial',
    'Phthalate-Free': 'Pending', 'Defect Rate': 'N/A', 'Customization': 'Yes', 'Logistics': 'FOB Qingdao', 'Audits': 'ISO 9001',
  },
  'Supplier H': {
    'Price/Unit': '$9.50', 'Price @ 5k+': '$9.20', 'Capacity/Month': '15k', 'Compliance': 'Claimed',
    'Phthalate-Free': 'Verified', 'Defect Rate': '<3%', 'Customization': 'No', 'Logistics': 'FOB Guangzhou', 'Audits': 'N/A',
  },
};


export const CONVERSATION_SCRIPT: ConversationStep[] = [
  // Step 0 & 1
  {
    speaker: UserType.AGENT,
    text: "Hey Jony 👋 welcome back! I see you already received a Buy Plan. Want me to retrive it.",
    options: ["Hi", "Retrieve it", "Create Award"],
    thinkingTime: 1000,
  },
  // {
  //   speaker: UserType.AGENT,
  //   text: "Found it: STEM Educational Toy Kit. Some details are missing — age range, compliance. Would you like to keep it as is, or upload an image so I can detect more details?",
  //   options: ["Keep as is."],
  //   isImageUpload: true,
  //   thinkingTime: 1400,
  // },
  // {
  //   speaker: UserType.AGENT,
  //   text: (
  //       <div>
  //           <p>From the photo I see about 250 pieces (blocks, gears, wheels, booklet). Looks like ABS plastic, probably for ages 6–12. Compliance info isn’t visible.</p>
  //           <p className="mt-2 font-medium">Should I fill the form with: ages 6–12, ABS (phthalate- & lead-free), compliance ASTM F963 / EN71 / CPSIA, packaging recyclable box + booklet?</p>
  //       </div>
  //   ),
  //   options: ["Yes, confirm and submit."],
  //   thinkingTime: 900,
  // },
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
    {
    speaker: UserType.AGENT,
    text: "You can share the open points which you have. I'll forward the question to merchant.",
    thinkingTime: 500,
    contextView: ContextView.DRAFT_INTAKE_FORM
  },
  {
    speaker: UserType.AGENT,
    text: (
      <div>
        <p className="font-semibold text-slate-600">[Message to Merchant]</p>
        <p>Could you confirm:</p>
        <ul className="list-disc list-inside ml-2 mt-1">
          <li>Do you need explicit phthalate/lead-free declarations?</li>
          <li>Supplier origin (non-sanctioned only)?</li>
          <li>Packaging details?</li>
        </ul>
      </div>
    ),
    thinkingTime: 500,
    waitingTime: 3000,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: (
      <div>
        <p className="font-semibold text-slate-600">[Merchant Replied]</p>
        <p>Yes phthalate/lead-free, Non-sanctioned origins, Recyclable packaging.</p>
      </div>
    ),
    autoContinue: true,
  },
   {
    speaker: UserType.AGENT,
    text: "The intake form has been finalized. Do you want me to lock it and move forward?",
    options: ["Yes, lock it."],
    thinkingTime: 1200,
  },
  {
    speaker: UserType.AGENT,
    text: "Locked ✅. Intake form finalized. Moving on to supplier search.",
    thinkingTime: 2000,
    contextView: ContextView.FINAL_INTAKE_FORM,
    autoContinue: true,
  },
  // Step 3
  {
    speaker: UserType.AGENT,
    text: <DeepThinkingAnimation />,
    thinkingTime: 1000,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  {
    speaker: UserType.AGENT,
    text: <AgentTaskView />,
    thinkingTime: 500,
    autoContinue: false,
    awaitsCompletion: true,
    isThinkingMessage: true,
  },
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Results:</p>
            <ul className="list-none ml-2 mt-1 space-y-1">
                <li><span className="font-semibold">4</span> internal</li>
                <li><span className="font-semibold">5</span> semantic</li>
                <li><span className="font-semibold">3</span> image similarity</li>
                <li><span className="font-semibold">6</span> marketplaces</li>
            </ul>
            <p className="mt-2">That’s 14 unique suppliers. After applying constraints, we’re left with 8 qualified suppliers.</p>
            <p className="mt-2">You can select which ones you’d like to shortlist from the list shown on the left, then confirm.</p>
        </div>
    ),
    options: ["Confirm Shortlist"],
    thinkingTime: 1800,
    contextView: ContextView.SUPPLIER_SHORTLIST
  },
  {
    speaker: UserType.AGENT,
    text: "Done ✅. Selected suppliers have been shortlisted.",
    thinkingTime: 1000,
    autoContinue: true,
  },
  // Step 4
  {
    speaker: UserType.AGENT,
    text: "Some of the selected suppliers are already onboarded, while others are new. Want me to send onboarding invites to the new ones?",
    options: ["Yes, send them."],
    thinkingTime: 800,
    contextView: ContextView.SUPPLIER_DASHBOARD
  },
  {
    speaker: UserType.AGENT,
    text: "Done ✅. Invites sent to the new suppliers.",
    thinkingTime: 2000,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Okay, I’ll include the default onboarding questions automatically (company profile, contacts), and also your custom ones. Which areas should I add for the new suppliers?</p>
            <p className="text-sm text-slate-500 mt-1">(Examples: safety, materials, capacity, quality, logistics, packaging, customization, pricing).</p>
        </div>
    ),
    options: [
        "For B: safety, materials, capacity, packaging, pricing. For C: safety, materials, quality, logistics.",
        "No, just send the defaults."
    ],
    thinkingTime: 1600,
  },
  // Step 5
  {
    speaker: UserType.AGENT,
    text: "Okay, I'm waiting for the suppliers to respond now. This might take a moment.",
    thinkingTime: 1000,
    waitingTime: 2500,
    autoContinue: true,
  },
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Responses are starting to come in:</p>
            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li><span className="font-semibold">Maitri →</span> onboarded, 30k/month, $8.20/unit, compliance verified.</li>
                <li><span className="font-semibold">Nestle →</span> ASTM/EN71 claimed, ABS lead/phthalate-free, 20k/month, recyclable packaging, $7.90/unit.</li>
                <li><span className="font-semibold">Cadbury →</span> EN71 provided, ABS lead-free (phthalate pending), ISO 9001, SMETA, FOB Ningbo (18–22 days), price not yet given.</li>
            </ul>
        </div>
    ),
    options: ["Draft follow-up questions.", "Review data now."],
    thinkingTime: 1500,
  },
  {
    speaker: UserType.AGENT,
    text: "Great. Please type your question for a specific supplier (e.g., 'To Cadbury: Do you support customized PMS, costs?').",
    thinkingTime: 800,
  },
  {
    speaker: UserType.AGENT,
    text: "Cadbury confirms PMS customization, no added cost, MOQ unchanged.",
    options: ["Ask more", "Show the comparison."],
    thinkingTime: 1200,
  },
  {
    speaker: UserType.AGENT,
    text: "Profiles updated. Here is the consolidated comparison.",
    thinkingTime: 2000,
    contextView: ContextView.SUPPLIER_COMPARISON,
    autoContinue: true,
  },
  // Step 6
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Here’s my evaluation:</p>
            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li><span className="font-semibold">Maitri — 84/100:</span> Strong compliance, high capacity, predictable. Weakness: higher price.</li>
                <li><span className="font-semibold">Nestle — 81/100:</span> Best pricing, &lt;1% defect, recyclable packaging, PMS customization. Weakness: missing phthalate cert.</li>
                <li><span className="font-semibold">Cadbury — 77/100:</span> Good audits/logistics, ethical. Weakness: incomplete compliance, no price yet.</li>
            </ul>
        </div>
    ),
    options: ["Proceed with A, keep B as backup."],
    thinkingTime: 1400,
  },
  {
    speaker: UserType.AGENT,
    text: "Noted ✅. Locking A as primary, flagging B as conditional. Preparing PO draft…",
    thinkingTime: 2000,
    autoContinue: true,
  },
  // Step 7
  {
    speaker: UserType.AGENT,
    text: (
        <div>
            <p>Draft PO for Maitri:</p>
            <ul className="list-none ml-2 mt-1 space-y-1">
                <li><span className="font-semibold w-28 inline-block">Product:</span> STEM Educational Toy Kit</li>
                <li><span className="font-semibold w-28 inline-block">Qty:</span> 1,500 units</li>
                <li><span className="font-semibold w-28 inline-block">Price:</span> $8.20/unit</li>
                <li><span className="font-semibold w-28 inline-block">Terms:</span> Net-30, FOB</li>
                <li><span className="font-semibold w-28 inline-block">Compliance:</span> ASTM/EN71/CPSIA</li>
                <li><span className="font-semibold w-28 inline-block">Lead Time:</span> 21–28 days</li>
            </ul>
        </div>
    ),
    options: ["Raise it.", "Revise it.", "Wait for B's documents."],
    thinkingTime: 1500,
    contextView: ContextView.PO_SUMMARY
  },
  {
    speaker: UserType.AGENT,
    text: "✅ Purchase Order created successfully.",
    thinkingTime: 1200,
    options: ["Create Award"],
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
      options: ["Type: Initial, Freight: FOB Origin, Length: Annual, Index: None, Pricing: Fixed"],
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
      text: "Finally, let’s add the item lines. You can paste them in CSV format (UPC, Item#, Description, Qty, DC).",
      thinkingTime: 800,
      formSection: 'items',
      options: ["8829103,1102,Vitamin D3 500ct,10000,DC6092\n8829104,1103,Vitamin C 1000mg,15000,DC6092"],
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
    text: <SendingForApprovalAnimation />,
    thinkingTime: 500,
    contextView: ContextView.AWARD_SENDING_APPROVAL,
    isThinkingMessage: true,
    awaitsCompletion: true,
  },
  {
    speaker: UserType.AGENT,
    text: (
      <div>
        <p className="font-semibold text-slate-600">[Message to Supplier via Collab]</p>
        <p>Congratulations! Your items have been selected for the HealthPlus Annual Award. The enclosed document contains quantities, costs, and projected store counts. Please review and confirm acceptance by EOD tomorrow.</p>
      </div>
    ),
    thinkingTime: 1500,
    contextView: ContextView.AWARD_SUPPLIER_VIEW,
    customAction: 'CREATE_AWARD_TAB',
  },
];