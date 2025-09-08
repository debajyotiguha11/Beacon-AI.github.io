
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LeftNavBar } from './components/LeftNavBar';
import { ChatPanel } from './components/ChatPanel';
import { ContextPanel } from './components/ContextPanel';
import { CONVERSATION_SCRIPT, QUALIFIED_SUPPLIERS, DETAILED_SUPPLIER_INFO, USER_PROFILES } from './constants';
import { Message, UserType, ContextView, ConversationStep, AwardDetails } from './types';
import { ResizableHandle } from './components/ResizableHandle';

import { AwardPDFCreationAnimation } from './features/award/components/animations/AwardPDFCreationAnimation';
import { ReviewAwardAnimation } from './features/award/components/animations/ReviewAwardAnimation';
import { REVIEW_AWARD_DETAILS } from './features/award/awardConstants';
import { SendingAgreementAnimation } from './components/SendingAgreementAnimation';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const [isAgentWaiting, setIsAgentWaiting] = useState(false);
  const [isAgentSending, setIsAgentSending] = useState(false);
  const [isPdfGeneratingAnimationRunning, setIsPdfGeneratingAnimationRunning] = useState(false);
  const [contextView, setContextView] = useState<ContextView>(ContextView.INITIAL);
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<Set<string>>(new Set());
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [supplierStatuses, setSupplierStatuses] = useState<Record<string, string>>({});
  const [awardDetails, setAwardDetails] = useState<AwardDetails>({});
  const [supplierResponse, setSupplierResponse] = useState<'Accept' | 'Reject' | null>(null);
  const [isReviewFlow, setIsReviewFlow] = useState(false);
  const [participants, setParticipants] = useState<Set<UserType>>(new Set([UserType.AGENT, UserType.USER]));
  const [isRfqSent, setIsRfqSent] = useState(false);
  const [isVettingStarted, setIsVettingStarted] = useState(false);
  const [rfqSupplier, setRfqSupplier] = useState<string | null>(null);
  const [isAgreementSent, setIsAgreementSent] = useState(false);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const [isRfqResponseReceived, setIsRfqResponseReceived] = useState(false);
  const [isPoSent, setIsPoSent] = useState(false);
  const [chatContextTitle, setChatContextTitle] = useState('Collab');


  const [chatPanelWidth, setChatPanelWidth] = useState(Math.max(400, window.innerWidth * 0.35));
  const mainRef = useRef<HTMLElement>(null);
  const isResizing = useRef(false);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: prev.length }]);
  };

  const simulateOnboarding = async (suppliers: string[]) => {
      setIsAgentWaiting(true);

      // Set status to "Sending Invite..." for all at once for initial feedback
      setSupplierStatuses(prev => {
          const newStatuses = { ...prev };
          suppliers.forEach(name => { newStatuses[name] = 'Sending Invite...'; });
          return newStatuses;
      });

      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      await delay(1500); // Initial delay after "Sending Invite..." status is set

      for (let i = 0; i < suppliers.length; i++) {
          await delay(2000 + Math.random() * 1500);
          const supplierName = suppliers[i];
          
          setSupplierStatuses(prev => ({ ...prev, [supplierName]: 'Agreement Ready' }));

          addMessage({
              user: UserType.AGENT,
              text: `${supplierName} is now ${i > 0 ? 'also ' : ''}agreement ready.`,
          });
      }

      setIsAgentWaiting(false);
      
      // Simulation is done, move to the next step in the script
      setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    let waitingTimerId: ReturnType<typeof setTimeout> | undefined;
    if (currentStep >= CONVERSATION_SCRIPT.length) return;

    const step: ConversationStep = CONVERSATION_SCRIPT[currentStep];
    const isPdfAnimationStep = React.isValidElement(step.text) && (step.text.type === AwardPDFCreationAnimation);
    const isReviewAnimationStep = React.isValidElement(step.text) && (step.text.type === ReviewAwardAnimation);

    if (step.speaker === UserType.AMBER) {
        setParticipants(prev => {
            if (prev.has(UserType.AMBER)) return prev;
            const newSet = new Set(prev);
            newSet.add(UserType.AMBER);
            return newSet;
        });
    }

    if (step.speaker === UserType.SUPPLIER) {
        setParticipants(prev => {
            if (prev.has(UserType.SUPPLIER)) return prev;
            const newSet = new Set(prev);
            newSet.add(UserType.SUPPLIER);
            return newSet;
        });
    }
    
    // Handle custom actions that don't require agent thinking time first
    if (step.customAction === 'SIMULATE_ONBOARDING') {
        const externalSuppliers = QUALIFIED_SUPPLIERS
            .filter(s => selectedSuppliers.has(s.name) && s.status !== 'Onboarded')
            .map(s => s.name);

        if (externalSuppliers.length > 0) {
            simulateOnboarding(externalSuppliers);
        } else {
            // No external suppliers to onboard, just skip to the next step.
            setCurrentStep(currentStep + 1);
        }
        return; // Return early to prevent other logic from running for this special step
    }

    if (step.speaker === UserType.AGENT || step.speaker === UserType.AMBER || step.speaker === UserType.SUPPLIER) {
      setIsAgentThinking(true);
      const baseThinkingTime = step.thinkingTime || 0;
      const variableDelay = step.thinkingTime ? Math.random() * 1000 : 0;
      const totalDelay = baseThinkingTime + variableDelay;

      const thinkingTimerId = setTimeout(() => {
        setIsAgentThinking(false);
        
        // Handle custom actions immediately after thinking, regardless of waiting time.
        if (step.customAction === 'AGREEMENT_ACCEPTED') {
            setIsAgreementAccepted(true);
        }
        if (step.customAction === 'RFQ_RESPONSE_RECEIVED') {
            setIsRfqResponseReceived(true);
        }

        if (isPdfAnimationStep) setIsPdfGeneratingAnimationRunning(true);
        
        let messageText = step.text;

        if (step.dynamicText === 'awardCongrats') {
            const awardName = awardDetails.awardName || `${awardDetails.brand || rfqSupplier || 'Your'} Award - ${new Date().getFullYear()}`;
            messageText = (
                <div>
                    <ul className="list-disc list-inside ml-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-600">Message for Supplier</p>
                    <p>Congratulations! Your items have been selected for the {awardName}. The enclosed document contains quantities, costs, and projected store counts. Please review and confirm acceptance by EOD tomorrow.</p>
                    </ul>
                </div>
            );
        } else if (step.dynamicText === 'rfqFormHeader') {
            messageText = `Great. I've prepared the RFQ form for ${rfqSupplier} based on our intake details. Please review it on the left and submit when you're ready.`;
        } else if (step.dynamicText === 'agreementAccepted') {
            messageText = `Agreement with ${rfqSupplier} has been accepted! We can now proceed with the RFQ.`;
        } else if (step.dynamicText === 'rfqResponseReceived') {
            messageText = `We've received a response from ${rfqSupplier}. I've updated the RFQ form with their details.`;
        }


        if (step.awaitsCompletion && React.isValidElement(step.text)) {
            let onCompleteHandler = () => {
                const nextStepIndex = currentStep + 1;
                if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
            };
            let stepSpecificProps: Record<string, any> = {};

            if (isPdfAnimationStep) {
                onCompleteHandler = () => {
                    setIsPdfGeneratingAnimationRunning(false);
                    const nextStepIndex = currentStep + 1;
                    if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
                };
            } else if (isReviewAnimationStep) {
                // This and any other future animations would go here
            }
            
            messageText = React.cloneElement(step.text as React.ReactElement<any>, {
                onComplete: onCompleteHandler,
                ...stepSpecificProps
            });
        }
        
        if(messageText) addMessage({ user: step.speaker, text: messageText, isThinkingMessage: step.isThinkingMessage });

        if (step.contextView) setContextView(step.contextView);
        
        const proceed = () => {
            if (step.autoContinue && !((step.options && step.options.length > 0) || step.isImageUpload)) {
                const nextStepIndex = currentStep + 1;
                if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
            } else if (!step.awaitsCompletion) {
                let options = step.options || [];
                if (isReviewFlow && step.contextView === ContextView.AWARD_PDF_GENERATION && options.includes("No, start over")) {
                    options = options.filter(opt => opt !== "No, start over");
                }
                setUserOptions(options);
                setShowImageUpload(step.isImageUpload || false);
            }
        };

        if (step.simulateSupplierResponse) {
            setIsAgentWaiting(true);
            const delay = 5000;
            waitingTimerId = setTimeout(() => {
                const response = 'Accept';
                handleSupplierResponse(response);
            }, delay);
        } else if (step.waitingTime) {
            setIsAgentWaiting(true);
            waitingTimerId = setTimeout(() => {
                setIsAgentWaiting(false);
                proceed();
            }, step.waitingTime);
        } else {
            proceed();
        }

      }, totalDelay);
      
      return () => {
          clearTimeout(thinkingTimerId);
          if (waitingTimerId) clearTimeout(waitingTimerId);
      };
    } else if (step.speaker === UserType.USER) {
      if (typeof step.text === 'string' && step.text.includes('Vitamin D3')) {
          const itemsText = step.text.toString();
          const parsedItems = itemsText.split('\n').map(line => {
              const [upc, itemNumber, description, quantity, dc, price] = line.split(',');
              return { upc, itemNumber, description, quantity, dc, price: price ? parseFloat(price) : undefined };
          });
          setAwardDetails(prev => ({...prev, items: parsedItems}));
      }

      const timer = setTimeout(() => {
          addMessage({ user: UserType.USER, text: step.text });
          const nextStepIndex = currentStep + 1;
          if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isReviewFlow]);

  useEffect(() => {
    if (contextView === ContextView.SUPPLIER_DASHBOARD) {
        const initialStatuses: Record<string, string> = {};
        for (const supplierName of selectedSuppliers) {
            const supplierInfo = QUALIFIED_SUPPLIERS.find(s => s.name === supplierName);
            if (supplierInfo) initialStatuses[supplierName] = supplierInfo.status === 'Onboarded' ? 'Onboarded' : 'Invite Pending';
        }
        setSupplierStatuses(initialStatuses);
    }
  }, [contextView, selectedSuppliers]);

  const handleUserResponse = (response: string) => {
    if (response === 'Retrieve Buy Plan' || response === 'Retrieve it') {
        setChatContextTitle(`Collab - Intake form : ${Math.floor(1000 + Math.random() * 9000)}`);
    }

    if (response === 'Ask a few clarifications.') {
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        return;
    }

    if (response === 'Yes, ask some vetting questions.') {
        setIsVettingStarted(true);
    }

    if (response === 'Show comparison') {
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        const comparisonStepIndex = CONVERSATION_SCRIPT.findIndex(step => 
            step.contextView === ContextView.SUPPLIER_COMPARISON
        );
        if (comparisonStepIndex !== -1) {
            setCurrentStep(comparisonStepIndex);
        } else {
            // Fallback
            const nextStepIndex = currentStep + 1;
            if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
        }
        return;
    }
    
    if (response === 'Accept directly') {
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        const lockedStepIndex = CONVERSATION_SCRIPT.findIndex(step => 
          typeof step.text === 'string' && step.text.startsWith("Locked ✅")
        );
        if (lockedStepIndex !== -1) {
          setCurrentStep(lockedStepIndex);
        } else {
          // Fallback just in case
          const nextStepIndex = currentStep + 1;
          if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
        }
        return;
    }

    if (response === 'Yes, send agreement') {
        if (!rfqSupplier) {
            addMessage({ user: UserType.AGENT, text: "Please select one supplier from the comparison view before sending an agreement." });
            return;
        }
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        setIsAgreementSent(true);
        const sendingStepIndex = CONVERSATION_SCRIPT.findIndex(step =>
            React.isValidElement(step.text) && step.text.type === SendingAgreementAnimation
        );
        if (sendingStepIndex !== -1) {
            setCurrentStep(sendingStepIndex);
        } else {
            const nextStepIndex = currentStep + 1;
            if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
        }
        return;
    }

    if (response === 'Yes, proceed to RFQ') {
        if (!rfqSupplier) {
            addMessage({ user: UserType.AGENT, text: "Please select one supplier from the comparison view to proceed with the RFQ." });
            return;
        }
    }
    
    if (response === 'Create Award' || response === '/beacon Initiate Award') {
      // If triggered from the initial screen, start the step-by-step creation flow.
      if (contextView === ContextView.INITIAL || response === '/beacon Initiate Award') {
          const awardFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => 
              step.speaker === UserType.AGENT &&
              typeof step.text === 'string' &&
              step.text.startsWith("Great! Let’s create the award.")
          );

          if (awardFlowStartIndex !== -1) {
              addMessage({ user: UserType.USER, text: response });
              setUserOptions([]);
              setShowImageUpload(false);
              const brandName = rfqSupplier || '';
              const awardName = brandName ? `${brandName} Award - ${new Date().getFullYear()}` : 'New Award';
              const startDate = new Date();
              startDate.setDate(1);
              startDate.setMonth(startDate.getMonth() + 1);
              const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate() -1);

              setAwardDetails({
                  brand: brandName,
                  awardName: awardName,
                  startDate: startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}),
                  endDate: endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}),
              });
              setChatContextTitle(`Collab - Award : ${awardName}`);
              setIsReviewFlow(false);
              setCurrentStep(awardFlowStartIndex);
              return;
          }
      } else {
        // If triggered from the RFQ flow, start the pre-filled review flow.
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        setShowImageUpload(false);
    
        const supplierInfo = rfqSupplier ? DETAILED_SUPPLIER_INFO[rfqSupplier] : null;
        const vendorNumber = supplierInfo?.companyDetails['Supplier #'];

        const detailsToSet: AwardDetails = {
            ...REVIEW_AWARD_DETAILS,
            brand: rfqSupplier || REVIEW_AWARD_DETAILS.brand,
            vendorNumber: (vendorNumber && vendorNumber !== 'N/A') ? vendorNumber : REVIEW_AWARD_DETAILS.vendorNumber,
            awardName: `${rfqSupplier || REVIEW_AWARD_DETAILS.brand} Award - ${new Date().getFullYear()}`,
        };
        
        setAwardDetails(detailsToSet);
        setChatContextTitle(`Collab - Award : ${detailsToSet.awardName!}`);
        setIsReviewFlow(true);
        
        setContextView(ContextView.AWARD_CREATION); 
        
        const reviewFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => step.customAction === 'START_REVIEW_FLOW');
        if (reviewFlowStartIndex !== -1) {
            setCurrentStep(reviewFlowStartIndex);
        }
        return;
      }
    }
    
    if (response === 'Confirm and Create PO') {
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        setShowImageUpload(false);
        setIsPoSent(true);
        
        const nextStepIndex = currentStep + 1;
        if (nextStepIndex < CONVERSATION_SCRIPT.length) {
            setCurrentStep(nextStepIndex);
        }
        return;
    }

    if (response === 'Initiate new award & Send') {
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        setShowImageUpload(false);

        const detailsToSet: AwardDetails = {
            ...REVIEW_AWARD_DETAILS,
            brand: rfqSupplier || REVIEW_AWARD_DETAILS.brand,
            vendorNumber: rfqSupplier ? (DETAILED_SUPPLIER_INFO[rfqSupplier]?.companyDetails['Supplier #'] || 'N/A') : REVIEW_AWARD_DETAILS.vendorNumber,
            awardName: `${rfqSupplier || REVIEW_AWARD_DETAILS.brand} Award - ${new Date().getFullYear()}`,
        };

        setAwardDetails(detailsToSet);
        setChatContextTitle(`Collab - Award : ${detailsToSet.awardName!}`);
        // Change from review flow to step-by-step creation flow.
        setIsReviewFlow(false); 
        
        const awardFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => 
            step.speaker === UserType.AGENT &&
            typeof step.text === 'string' &&
            step.text.startsWith("Great! Let’s create the award.")
        );
        
        if (awardFlowStartIndex !== -1) {
            // Set the view and step to start the pre-populated form flow.
            setContextView(ContextView.AWARD_CREATION);
            setCurrentStep(awardFlowStartIndex);
        }
        return;
    }
    
    if (response === 'Return to Dashboard') {
        handleReturnToDashboard();
        return;
    }

    if (response === 'Confirm and Generate PDF') {
        const pdfGenStepIndex = CONVERSATION_SCRIPT.findIndex(step => 
            React.isValidElement(step.text) && step.text.type === AwardPDFCreationAnimation
        );
        if (pdfGenStepIndex !== -1) {
            addMessage({ user: UserType.USER, text: response });
            setUserOptions([]);
            setShowImageUpload(false);
            setCurrentStep(pdfGenStepIndex);
            return;
        }
    }
    
    if (response === 'Send RFQ') {
        setIsRfqSent(true);
        addMessage({ user: UserType.USER, text: response });
        setUserOptions([]);
        setShowImageUpload(false);
        const nextStepIndex = currentStep + 1;
        if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
        return;
    }

    let userMessage = response;
    const currentStepConfig = CONVERSATION_SCRIPT[currentStep];

    if (currentStepConfig.contextView === ContextView.SUPPLIER_SHORTLIST && response === 'Confirm Shortlist') {
      if (selectedSuppliers.size === 0) {
        addMessage({ user: UserType.AGENT, text: "Please select at least one supplier before confirming." });
        return;
      }
      userMessage = `Shortlist: ${Array.from(selectedSuppliers).join(', ')}.`;
    }

    if (response.startsWith("Market: ")) {
        const details = Object.fromEntries(response.split(', ').map(part => { const [key, value] = part.split(': '); const keyMap: Record<string, string> = { 'Market': 'market', 'Vendor': 'vendorNumber', 'Brand': 'brand' }; return [keyMap[key], value]; }));
        setAwardDetails(prev => {
            const newDetails = { ...prev, ...details };
            if (!isReviewFlow && newDetails.brand && newDetails.brand !== prev.brand) {
                const awardName = `${newDetails.brand} Award - ${new Date().getFullYear()}`;
                newDetails.awardName = awardName;
                setChatContextTitle(`Collab - Award : ${awardName}`);
            }
            return newDetails;
        });
    } else if (response === "Accept Hierarchy") {
        setAwardDetails(prev => ({ ...prev, hierarchy: "SBU: Health & Wellness → Dept: OTC Care → Category: Digestive Support" }));
    } else if (response.startsWith("Type: ")) {
        const details = Object.fromEntries(response.split(', ').map(part => { const [key, value] = part.split(': '); const keyMap: Record<string, string> = { 'Type': 'awardType', 'Freight': 'freightTerms', 'Length': 'awardLength', 'Index': 'costIndex', 'Pricing': 'pricingMethod' }; return [keyMap[key], value]; }));
        setAwardDetails(prev => ({ ...prev, ...details }));
    } else if (response.startsWith("Commitment: ")) {
        const details = Object.fromEntries(response.split(', ').map(part => { const [key, value] = part.split(': '); const keyMap: Record<string, string> = { 'Commitment': 'volumeCommitment', 'ROFR': 'rofr', 'Auto-Renewal': 'autoRenewal' }; return [keyMap[key], value === 'Yes']; }));
        setAwardDetails(prev => ({ ...prev, ...details }));
    } else {
        const currentFormSection = CONVERSATION_SCRIPT[currentStep]?.formSection;
        if (currentFormSection === 'items' && response.includes(',')) {
             const parsedItems = response.split('\n').map(line => {
                const [upc, itemNumber, description, quantity, dc, price] = line.trim().split(',');
                return { upc, itemNumber, description, quantity, dc, price: price ? parseFloat(price) : undefined };
            }).filter(i => i.upc && i.itemNumber);
            if (parsedItems.length > 0) {
                setAwardDetails(prev => ({ ...prev, items: parsedItems }));
            }
        }
    }
    
    addMessage({ user: UserType.USER, text: userMessage });
    setUserOptions([]);
    setShowImageUpload(false);
    
    if (response === 'Yes, send for approval') {
        setContextView(ContextView.AWARD_SENDING);
    }
    
    if (response === 'No, start over') {
        const awardFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => 
            step.speaker === UserType.AGENT &&
            typeof step.text === 'string' &&
            step.text.startsWith("Great! Let’s create the award.")
        );
        if (awardFlowStartIndex !== -1) {
            setAwardDetails({}); // Reset award details
            setContextView(ContextView.AWARD_SUMMARY); // Immediately switch view to prevent wrong loader
            setCurrentStep(awardFlowStartIndex);
        }
        return; 
    }

    if (response === 'Yes, show the summary') {
      const summaryStepIndex = CONVERSATION_SCRIPT.findIndex(step => step.contextView === ContextView.AWARD_SUMMARY);
      if (summaryStepIndex !== -1) {
          setCurrentStep(summaryStepIndex);
          return;
      }
    }

    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
  };

  const handleImageUpload = () => {
    addMessage({ user: UserType.USER, text: "Uploading the image." });
    setUserOptions([]);
    setShowImageUpload(false);
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
  };

  const handleSupplierResponse = (response: 'Accept' | 'Reject') => {
    setIsAgentThinking(false);
    setIsAgentWaiting(false);
    setIsAgentSending(false);

    setSupplierResponse(response);
    
    if (response === 'Accept') {
        const poFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => step.customAction === 'AWARD_ACCEPTED_PROCEED_TO_PO');
        if (poFlowStartIndex !== -1) {
            setCurrentStep(poFlowStartIndex);
        } else {
            // Fallback for safety
            setContextView(ContextView.AWARD_FINAL_STATUS);
            setUserOptions([]);
            addMessage({ user: UserType.AGENT, text: (
              <div>
                <p>Supplier has accepted the award.</p>
              </div>
            )});
            setCurrentStep(CONVERSATION_SCRIPT.length);
        }
    } else {
        setContextView(ContextView.AWARD_FINAL_STATUS);
        setUserOptions([]);
        addMessage({ user: UserType.AGENT, text: (
          <div>
            <p>"The award process has been terminated. Please connect with the Sourcing Manager for any feedback. Thank you.”</p>
          </div>
        )});
        setCurrentStep(CONVERSATION_SCRIPT.length); // End conversation
    }
  };
  
  const handleAwardDetailsChange = (updates: Partial<AwardDetails>) => {
    setAwardDetails(prev => ({...prev, ...updates}));
  };

  const triggerImageUpload = () => {
      if (imageUploadRef.current) imageUploadRef.current.click();
  };

  const handleToggleSupplier = (supplierName: string) => {
    setSelectedSuppliers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(supplierName)) newSet.delete(supplierName);
      else newSet.add(supplierName);
      return newSet;
    });
  };
  
  const handleSelectRfqSupplier = (supplierName: string) => {
    setRfqSupplier(prev => prev === supplierName ? null : supplierName);
  };

  const handleReturnToDashboard = () => {
    setMessages([]);
    setContextView(ContextView.INITIAL);
    setAwardDetails({});
    setSupplierResponse(null);
    setSelectedSuppliers(new Set());
    setIsReviewFlow(false);
    setParticipants(new Set([UserType.AGENT, UserType.USER]));
    setIsRfqSent(false);
    setIsVettingStarted(false);
    setRfqSupplier(null);
    setIsAgreementSent(false);
    setIsAgreementAccepted(false);
    setIsRfqResponseReceived(false);
    setIsPoSent(false);
    setChatContextTitle('Collab');
    // Setting step to 0 will re-trigger the initial message via useEffect
    setCurrentStep(0); 
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isResizing.current || !mainRef.current) return;

        const mainRect = mainRef.current.getBoundingClientRect();
        const newWidthPx = mainRect.right - moveEvent.clientX;
        
        const minPanelWidth = 400;
        const contextPanelMinWidth = 400;
        const maxPanelWidth = mainRect.width - contextPanelMinWidth;

        if (newWidthPx > minPanelWidth && newWidthPx < maxPanelWidth) {
            setChatPanelWidth(newWidthPx);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

  const activeFormSection = CONVERSATION_SCRIPT[currentStep]?.formSection;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header onMenuClick={() => setIsNavOpen(!isNavOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <LeftNavBar isOpen={isNavOpen} />
        <main ref={mainRef} className="flex-grow flex p-6 gap-2.5 overflow-auto">
          <div className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col min-w-0">
            <ContextPanel 
              view={contextView} 
              selectedSuppliers={selectedSuppliers}
              onToggleSupplier={handleToggleSupplier}
              supplierStatuses={supplierStatuses}
              awardDetails={awardDetails}
              supplierResponse={supplierResponse}
              onSupplierResponse={handleSupplierResponse}
              onAwardDetailsChange={handleAwardDetailsChange}
              onFormSubmit={handleUserResponse}
              activeFormSection={activeFormSection}
              isAgentThinking={isAgentThinking || isAgentWaiting || isAgentSending || isPdfGeneratingAnimationRunning}
              onReturnToDashboard={handleReturnToDashboard}
              isReviewFlow={isReviewFlow}
              isRfqSent={isRfqSent}
              isVettingStarted={isVettingStarted}
              rfqSupplier={rfqSupplier}
              onSelectRfqSupplier={handleSelectRfqSupplier}
              isAgreementSent={isAgreementSent}
              isRfqResponseReceived={isRfqResponseReceived}
              isPoSent={isPoSent}
            />
          </div>
          
          <ResizableHandle onMouseDown={handleMouseDown} />

          <div style={{ flexBasis: `${chatPanelWidth}px` }} className="flex-shrink-0 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden min-w-0">
            <ChatPanel
              messages={messages}
              isAgentThinking={isAgentThinking}
              isAgentWaiting={isAgentWaiting}
              isAgentSending={isAgentSending}
              userOptions={userOptions}
              onUserResponse={handleUserResponse}
              showImageUpload={showImageUpload}
              onImageUploadClick={triggerImageUpload}
              participants={participants}
              contextTitle={chatContextTitle}
              rfqSupplier={rfqSupplier}
              userProfiles={USER_PROFILES}
            />
          </div>
        </main>
      </div>
      <input type="file" ref={imageUploadRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
    </div>
  );
};

export default App;
