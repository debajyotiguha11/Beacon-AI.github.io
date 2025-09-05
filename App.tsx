import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LeftNavBar } from './components/LeftNavBar';
import { ChatPanel } from './components/ChatPanel';
import { ContextPanel } from './components/ContextPanel';
import { CONVERSATION_SCRIPT, QUALIFIED_SUPPLIERS } from './constants';
import { Message, UserType, ContextView, ConversationStep, AwardDetails } from './types';

const App: React.FC = () => {
  const [messagesByTab, setMessagesByTab] = useState<Record<string, Message[]>>({ 'Beacon AI': [] });
  const [tabs, setTabs] = useState(['Beacon AI']);
  const [activeTab, setActiveTab] = useState('Beacon AI');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const [isAgentWaiting, setIsAgentWaiting] = useState(false);
  const [isAgentSending, setIsAgentSending] = useState(false);
  const [contextView, setContextView] = useState<ContextView>(ContextView.INITIAL);
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<Set<string>>(new Set());
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [supplierStatuses, setSupplierStatuses] = useState<Record<string, string>>({});
  const [awardDetails, setAwardDetails] = useState<AwardDetails>({});
  const [supplierResponse, setSupplierResponse] = useState<'Accept' | 'Reject' | null>(null);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const addMessage = (message: Omit<Message, 'id'>, tab: string) => {
    setMessagesByTab(prev => {
      const currentMessages = prev[tab] || [];
      return {
        ...prev,
        [tab]: [...currentMessages, { ...message, id: currentMessages.length }],
      };
    });
  };

  useEffect(() => {
    let waitingTimerId: ReturnType<typeof setTimeout> | undefined;
    if (currentStep >= CONVERSATION_SCRIPT.length) return;

    const step: ConversationStep = CONVERSATION_SCRIPT[currentStep];

    if (step.speaker === UserType.AGENT) {
      setIsAgentThinking(true);
      const baseThinkingTime = step.thinkingTime || 0;
      const variableDelay = step.thinkingTime ? Math.random() * 1000 : 0;
      const totalDelay = baseThinkingTime + variableDelay;

      const thinkingTimerId = setTimeout(() => {
        setIsAgentThinking(false);

        let messageText = step.text;
        if (step.awaitsCompletion && React.isValidElement(step.text)) {
          messageText = React.cloneElement(step.text as React.ReactElement<any>, {
            onComplete: () => {
              const nextStepIndex = currentStep + 1;
              if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
            },
          });
        }
        
        if (step.customAction === 'CREATE_AWARD_TAB') {
            const awardName = awardDetails.brand ? `${awardDetails.brand} Award` : 'New Award';
            if (!tabs.includes(awardName)) {
                setTabs(prev => [...prev, awardName]);
                setActiveTab(awardName);
                addMessage({ user: UserType.AGENT, text: messageText }, awardName);
            }
        } else {
            addMessage({ user: UserType.AGENT, text: messageText, isThinkingMessage: step.isThinkingMessage }, activeTab);
        }


        if (step.contextView) setContextView(step.contextView);
        
        const hasOptions = (step.options && step.options.length > 0) || step.isImageUpload;

        const proceed = () => {
            if (step.autoContinue && !hasOptions) {
                const nextStepIndex = currentStep + 1;
                if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
            } else if (!step.awaitsCompletion) {
                setUserOptions(step.options || []);
                setShowImageUpload(step.isImageUpload || false);
            }
        };
        
        if (step.waitingTime) {
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
              const [upc, itemNumber, description, quantity, dc] = line.split(',');
              return { upc, itemNumber, description, quantity, dc };
          });
          setAwardDetails(prev => ({...prev, items: parsedItems}));
      }

      const timer = setTimeout(() => {
          addMessage({ user: UserType.USER, text: step.text }, activeTab);
          const nextStepIndex = currentStep + 1;
          if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, activeTab]);

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
    // Handle starting the award flow directly
    if (response === 'Create Award' || response === '/beacon Create Award') {
      const awardFlowStartIndex = CONVERSATION_SCRIPT.findIndex(step => 
          step.speaker === UserType.AGENT &&
          typeof step.text === 'string' &&
          step.text.startsWith("Great! Let’s create the award.")
      );

      if (awardFlowStartIndex !== -1) {
        addMessage({ user: UserType.USER, text: response }, activeTab);
        setUserOptions([]);
        setShowImageUpload(false);
        setAwardDetails({}); // Reset award details
        setCurrentStep(awardFlowStartIndex);
        return; // Stop further execution
      }
    }
    
    let userMessage = response;
    const currentStepConfig = CONVERSATION_SCRIPT[currentStep];

    if (currentStepConfig.contextView === ContextView.SUPPLIER_SHORTLIST && response === 'Confirm Shortlist') {
      if (selectedSuppliers.size === 0) {
        addMessage({ user: UserType.AGENT, text: "Please select at least one supplier before confirming." }, activeTab);
        return;
      }
      userMessage = `Shortlist: ${Array.from(selectedSuppliers).join(', ')}.`;
    }

    if (response.startsWith("Market: ")) {
        const details = Object.fromEntries(response.split(', ').map(part => { const [key, value] = part.split(': '); const keyMap: Record<string, string> = { 'Market': 'market', 'Vendor': 'vendorNumber', 'Brand': 'brand' }; return [keyMap[key], value]; }));
        setAwardDetails(prev => ({ ...prev, ...details }));
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
                const [upc, itemNumber, description, quantity, dc] = line.trim().split(',');
                return { upc, itemNumber, description, quantity, dc };
            }).filter(i => i.upc && i.itemNumber);
            if (parsedItems.length > 0) {
                setAwardDetails(prev => ({ ...prev, items: parsedItems }));
            }
        }
    }
    
    addMessage({ user: UserType.USER, text: userMessage }, activeTab);
    setUserOptions([]);
    setShowImageUpload(false);
    
    if (currentStep === 12 && response === "Yes, send them.") {
        setIsAgentSending(true);
        const newStatuses = { ...supplierStatuses };
        QUALIFIED_SUPPLIERS.forEach(supplier => { if (selectedSuppliers.has(supplier.name) && supplier.status !== 'Onboarded') newStatuses[supplier.name] = 'Sending Invite...'; });
        setSupplierStatuses(newStatuses);
        const nextStepDelay = CONVERSATION_SCRIPT[currentStep + 1]?.thinkingTime || 2000;
        
        setTimeout(() => {
            setIsAgentSending(false);
            setSupplierStatuses(prevStatuses => {
                const finalStatuses = { ...prevStatuses };
                Object.keys(finalStatuses).forEach(name => { if (finalStatuses[name] === 'Sending Invite...') finalStatuses[name] = 'Invited'; });
                return finalStatuses;
            });
            const nextStepIndex = currentStep + 1;
            if (nextStepIndex < CONVERSATION_SCRIPT.length) setCurrentStep(nextStepIndex);
        }, nextStepDelay);
        return; 
    }
    
    if (currentStep === 4 && response === "Accept directly") {
      setCurrentStep(7);
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
    addMessage({ user: UserType.USER, text: "Uploading the image." }, activeTab);
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
    setContextView(ContextView.AWARD_FINAL_STATUS);
    setUserOptions([]);
    if (response === 'Accept') {
        addMessage({ user: UserType.AGENT, text: (
          <div>
            <p className="font-semibold text-green-700">[System Message]</p>
            <p>"Thank you. Your acceptance has been recorded. You may download the award PDF for your records.”</p>
          </div>
        )}, activeTab);
    } else {
        addMessage({ user: UserType.AGENT, text: (
          <div>
            <p className="font-semibold text-red-700">[System Message]</p>
            <p>"The award process has been terminated. Please connect with the Sourcing Manager for any feedback. Thank you.”</p>
          </div>
        )}, activeTab);
    }
    setCurrentStep(CONVERSATION_SCRIPT.length); // End conversation
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

  const isAwardCreationFlow = contextView === ContextView.AWARD_CREATION;
  const activeFormSection = CONVERSATION_SCRIPT[currentStep]?.formSection;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header onMenuClick={() => setIsNavOpen(!isNavOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <LeftNavBar isOpen={isNavOpen} />
        <main className={`flex-grow grid grid-cols-1 ${isAwardCreationFlow ? 'md:grid-cols-2' : 'md:grid-cols-5'} gap-6 p-6 overflow-auto`}>
          <div className={`${isAwardCreationFlow ? 'md:col-span-1' : 'md:col-span-3'} bg-white rounded-2xl shadow-md overflow-hidden flex flex-col`}>
            <ContextPanel 
              view={contextView} 
              selectedSuppliers={selectedSuppliers}
              onToggleSupplier={handleToggleSupplier}
              supplierStatuses={supplierStatuses}
              awardDetails={awardDetails}
              onSupplierResponse={handleSupplierResponse}
              supplierResponse={supplierResponse}
              onAwardDetailsChange={handleAwardDetailsChange}
              onFormSubmit={handleUserResponse}
              activeFormSection={activeFormSection}
            />
          </div>
          <div className={`${isAwardCreationFlow ? 'md:col-span-1' : 'md:col-span-2'} bg-white rounded-2xl shadow-md flex flex-col overflow-hidden`}>
            <ChatPanel
              messages={messagesByTab[activeTab] || []}
              isAgentThinking={isAgentThinking}
              isAgentWaiting={isAgentWaiting}
              isAgentSending={isAgentSending}
              userOptions={userOptions}
              onUserResponse={handleUserResponse}
              showImageUpload={showImageUpload}
              onImageUploadClick={triggerImageUpload}
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </main>
      </div>
      <input type="file" ref={imageUploadRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
    </div>
  );
};

export default App;