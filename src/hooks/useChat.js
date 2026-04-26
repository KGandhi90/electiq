import { useState, useCallback } from 'react';
import { trackEvent } from '../utils/analytics';
import { getMockReply } from '../utils/helpers';

/**
 * Manages chat state and mock AI responses.
 * Will be upgraded to real Gemini in Phase 3.
 * @param {Array} seedMessages - Initial messages
 */
export function useChat(seedMessages) {
  const [messages, setMessages] = useState([...seedMessages]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Sends a user message and triggers mock reply.
   * @param {string} [overrideText] - Optional text
   *   (used by quick reply chips)
   */
  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text) return;

    // Append user message
    const userMsg = {
      id:        Date.now(),
      role:      'user',
      content:   text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
      }),
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) {
      setInput('');
    }
    setIsTyping(true);

    trackEvent('Chat', 
      overrideText ? 'QuickReplyUsed' : 'MessageSent',
      overrideText || undefined
    );

    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200));

    const aiMsg = {
      id:        Date.now() + 1,
      role:      'assistant',
      content:   getMockReply(text),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
      }),
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  }, [input]);

  /**
   * Handles Enter key — sends without Shift.
   * @param {React.KeyboardEvent} e
   */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return {
    messages,
    input,
    isTyping,
    setInput,
    sendMessage,
    handleKeyDown,
  };
}
