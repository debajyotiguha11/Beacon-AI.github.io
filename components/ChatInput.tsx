import React, { useState, useEffect, useRef } from 'react';

interface ChatInputProps {
  suggestions: string[];
  onSendMessage: (message: string) => void;
  showImageUpload: boolean;
  onImageUploadClick: () => void;
  isAgentThinking: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ suggestions, onSendMessage, showImageUpload, onImageUploadClick, isAgentThinking }) => {
  const [inputValue, setInputValue] = useState('');
  
  // This state holds the suggestions we want to render, even when they are hidden, to prevent layout shifts.
  const [renderedSuggestions, setRenderedSuggestions] = useState({ suggestions, showImageUpload });
  
  const inputRef = useRef<HTMLInputElement>(null);
  // FIX: Provide an initial value to useRef. `useRef<T>()` requires an argument.
  // `undefined` is the correct initial value to track the previous state, which doesn't exist on first render.
  const prevIsAgentThinking = useRef<boolean | undefined>(undefined);

  const isInputDisabled = isAgentThinking;
  const areSuggestionsCurrentlyVisible = (suggestions.length > 0 || showImageUpload) && !isAgentThinking;
  const showSendButton = inputValue.trim() !== '';

  // We only update the suggestions to be rendered when new, visible suggestions arrive.
  // This way, when the current suggestions are cleared, we keep rendering the old ones invisibly.
  useEffect(() => {
    if (areSuggestionsCurrentlyVisible) {
      setRenderedSuggestions({ suggestions, showImageUpload });
    }
  }, [suggestions, showImageUpload, areSuggestionsCurrentlyVisible]);

  useEffect(() => {
    // When the agent finishes thinking, focus the input field.
    if (prevIsAgentThinking.current && !isAgentThinking) {
      inputRef.current?.focus();
    }
    // Update the ref with the current value for the next render.
    prevIsAgentThinking.current = isAgentThinking;
  }, [isAgentThinking]);


  // We only render the suggestions container if it's ever had content, to avoid taking up space on initial load.
  const hasEverHadSuggestions = renderedSuggestions.suggestions.length > 0 || renderedSuggestions.showImageUpload;

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">
      {/* 
        This container holds the suggestions. Its visibility is toggled, but it's not removed
        from the DOM, which preserves its height and prevents the page from jumping.
      */}
      {hasEverHadSuggestions && (
        <div 
          className="flex flex-wrap gap-2 mb-3"
          style={{ visibility: areSuggestionsCurrentlyVisible ? 'visible' : 'hidden' }}
          aria-hidden={!areSuggestionsCurrentlyVisible}
        >
          {renderedSuggestions.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-sm font-medium text-walmart-blue bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-walmart-blue transition"
              aria-label={`Send suggestion: ${suggestion}`}
              tabIndex={areSuggestionsCurrentlyVisible ? 0 : -1}
            >
              {suggestion}
            </button>
          ))}
          {renderedSuggestions.showImageUpload && (
            <button
              onClick={onImageUploadClick}
              className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition flex items-center gap-1.5"
              tabIndex={areSuggestionsCurrentlyVisible ? 0 : -1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Upload Image</span>
            </button>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isInputDisabled ? "Waiting for agent..." : "Type your message or select an option..."}
          disabled={isInputDisabled}
          className="w-full py-2.5 pl-4 pr-14 text-sm text-slate-800 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-walmart-blue transition disabled:bg-slate-100 disabled:cursor-not-allowed"
          aria-label="Chat input"
        />
        {showSendButton ? (
          <button
            onClick={handleSend}
            disabled={isInputDisabled}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-white bg-walmart-blue rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M1.67 17.5L19.17 10L1.67 2.5v5.83l12.5 1.67l-12.5 1.67v5.83z" />
            </svg>
          </button>
        ) : (
          <button
            disabled={isInputDisabled}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-white bg-walmart-blue rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            aria-label="Use microphone"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};