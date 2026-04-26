import { memo } from 'react';

const ChatBubble = memo(function ChatBubble({ role, content, timestamp }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end" role="article" aria-label="Your message">
        <div className="max-w-xs sm:max-w-sm">
          <div className="bg-saffron text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed">
            {content}
          </div>
          <p className="text-xs text-muted mt-1 text-right">{timestamp}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-3 items-start" role="article" aria-label="ElectIQ AI response">
      <div className="w-8 h-8 rounded-xl bg-ashoka flex items-center justify-center text-white text-xs font-mono flex-shrink-0 mt-0.5">
        ⚡
      </div>
      <div className="max-w-xs sm:max-w-sm lg:max-w-md">
        <div className="bg-white border border-surface3 rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed text-dark">
          {content}
        </div>
        <p className="text-xs text-muted mt-1">{timestamp}</p>
      </div>
    </div>
  )
});

export default ChatBubble;
