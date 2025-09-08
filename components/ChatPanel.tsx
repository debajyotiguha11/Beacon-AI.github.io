
import React, { useRef, useEffect } from 'react';
import { Message as MessageType, UserType } from '../types';
import { Message } from './Message';
import { ThinkingIndicator } from './ThinkingIndicator';
import { WaitingIndicator } from './WaitingIndicator';
import { ChatInput } from './ChatInput';
import { SendingInviteAnimation } from './SendingInviteAnimation';
import { USER_PROFILES } from '../constants';

interface ChatPanelProps {
  messages: MessageType[];
  isAgentThinking: boolean;
  isAgentWaiting: boolean;
  isAgentSending: boolean;
  userOptions: string[];
  onUserResponse: (option: string) => void;
  showImageUpload: boolean;
  onImageUploadClick: () => void;
  participants: Set<UserType>;
  contextTitle: string;
  rfqSupplier: string | null;
  userProfiles: typeof USER_PROFILES;
}

const ParticipantAvatar: React.FC<{ children: React.ReactNode; statusColor: string }> = ({ children, statusColor }) => (
  <div className="relative">
    {children}
    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${statusColor} ring-2 ring-white`}></span>
  </div>
);

export const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  isAgentThinking, 
  isAgentWaiting, 
  isAgentSending, 
  userOptions, 
  onUserResponse, 
  showImageUpload, 
  onImageUploadClick,
  participants,
  contextTitle,
  rfqSupplier,
  userProfiles,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  useEffect(scrollToBottom, [messages, isAgentThinking, isAgentWaiting, isAgentSending]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-walmart-darkblue flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
            </svg>
        </div>
        <div>
            <h2 className="text-lg font-semibold text-slate-800">{contextTitle}</h2>
            <p className="text-sm text-slate-500">Your AI Assistant</p>
        </div>
      </div>


      {/* Participants Row */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="font-semibold text-slate-800 text-sm">Participants</span>
        </div>
        <div className="flex items-center space-x-2">
          {Array.from(participants).map(userType => {
            const profile = USER_PROFILES[userType];
            if (userType === UserType.SUPPLIER) {
                const initial = rfqSupplier ? rfqSupplier.charAt(0) : 'S';
                return (
                    <ParticipantAvatar key={userType} statusColor="bg-green-500">
                        <div title={rfqSupplier || 'Supplier'} className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            {initial}
                        </div>
                    </ParticipantAvatar>
                );
            }
            return (
              <ParticipantAvatar key={userType} statusColor="bg-green-500">
                {profile.isAgent ? (
                  <div className="w-8 h-8 rounded-full bg-walmart-darkblue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8"></path>
                        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                        <path d="M2 14h2"></path>
                        <path d="M20 14h2"></path>
                        <path d="M15 13v2"></path>
                        <path d="M9 13v2"></path>
                    </svg>
                  </div>
                ) : (
                  <img className="w-8 h-8 rounded-full" src={profile.imageUrl} alt={`${profile.name}'s profile picture`} />
                )}
              </ParticipantAvatar>
            );
          })}
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-grow p-6 overflow-y-auto bg-white">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <Message key={msg.id} user={msg.user} text={msg.text} isThinkingMessage={msg.isThinkingMessage} rfqSupplier={rfqSupplier} />
          ))}
          {isAgentThinking && <ThinkingIndicator />}
          {isAgentWaiting && <WaitingIndicator />}
          {isAgentSending && <SendingInviteAnimation />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat Input */}
      <ChatInput 
        suggestions={userOptions}
        onSendMessage={onUserResponse}
        showImageUpload={showImageUpload}
        onImageUploadClick={onImageUploadClick}
        isAgentThinking={isAgentThinking || isAgentWaiting || isAgentSending}
        userProfiles={userProfiles}
      />
    </div>
  );
};
