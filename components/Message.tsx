
import React from 'react';
import { UserType } from '../types';
import { USER_PROFILES } from '../constants';

interface MessageProps {
  user: UserType;
  text: React.ReactNode;
  isThinkingMessage?: boolean;
  rfqSupplier?: string | null;
}

export const Message: React.FC<MessageProps> = ({ user, text, isThinkingMessage, rfqSupplier }) => {
  const profile = USER_PROFILES[user];
  const isPrimaryUser = user === UserType.USER;
  const isAgent = user === UserType.AGENT;
  const isSupplier = user === UserType.SUPPLIER;
  const isThinking = isAgent && isThinkingMessage;

  const alignment = isPrimaryUser ? 'justify-end' : 'justify-start';
  const bubbleStyles = isPrimaryUser
      ? 'bg-walmart-blue text-white rounded-br-none'
      : 'bg-gray-100 text-slate-800 rounded-bl-none';
  const nameColor = isPrimaryUser ? 'text-blue-200' : 'text-slate-700';


  return (
    <div className={`flex items-end gap-3 ${alignment}`}>
      {!isPrimaryUser && (
        <>
          {isAgent ? (
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
          ) : isSupplier ? (
            <div title={rfqSupplier || 'Supplier'} className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                {rfqSupplier ? rfqSupplier.charAt(0) : 'S'}
            </div>
          ) : (
            <img
              className="w-8 h-8 rounded-full flex-shrink-0"
              src={profile.imageUrl}
              alt={`${profile.name}'s profile picture`}
            />
          )}
        </>
      )}
      <div className={`flex flex-col max-w-lg ${isPrimaryUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm ${bubbleStyles} ${
            isThinking ? 'border border-dashed border-slate-300' : 'shadow-sm'
          }`}
        >
          {!isAgent && !isSupplier && (
            <div className={`font-semibold mb-1 text-xs ${nameColor}`}>
              {profile.name}
            </div>
          )}
          {isSupplier && (
              <div className={`font-semibold mb-1 text-xs ${nameColor}`}>
                {rfqSupplier || 'Supplier'}
              </div>
          )}
          {text}
        </div>
      </div>
      {isPrimaryUser && (
        <img
          className="w-8 h-8 rounded-full flex-shrink-0"
          src={profile.imageUrl}
          alt={`${profile.name}'s profile picture`}
        />
      )}
    </div>
  );
};