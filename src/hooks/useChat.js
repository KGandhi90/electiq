import { useState, useCallback } from 'react';
import { trackEvent } from '../utils/analytics';
import { sendToGemini } from '../api/geminiApi';

/**
 * Manages chat state and mock AI responses.
 * Will be upgraded to real Gemini in Phase 3.
 * @param {Array} seedMessages - Initial messages
 */
export function useChat(seedMessages) {
  const [messages, setMessages] = useState([...seedMessages]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiHistory, setApiHistory] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Sends a user message and triggers mock reply.
   * @param {string} [overrideText] - Optional text
   *   (used by quick reply chips)
   */
  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text) return;

    setError(null);

    // 1. Add user message to UI
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

    // 2. Track analytics
    trackEvent('Chat', 
      overrideText ? 'QuickReplyUsed' : 'MessageSent',
      overrideText || undefined
    );

    // 3. Build updated history for API
    const updatedHistory = [
      ...apiHistory,
      { role: 'user', content: text }
    ];

    try {
      // 4. Call Gemini
      const reply = await sendToGemini(text, apiHistory);

      // 5. Add AI response to UI
      const aiMsg = {
        id:        Date.now() + 1,
        role:      'assistant',
        content:   reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit', minute: '2-digit'
        }),
      };
      
      setMessages(prev => [...prev, aiMsg]);
      
      // 6. Update API history
      setApiHistory([
        ...updatedHistory,
        { role: 'model', content: reply }
      ]);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  }, [input, apiHistory]);

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
    error,
    setInput,
    sendMessage,
    handleKeyDown,
  };
}
