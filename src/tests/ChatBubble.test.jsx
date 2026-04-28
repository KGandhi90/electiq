import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatBubble from '../components/ChatBubble';

describe('ChatBubble', () => {
  it('renders user message with correct content', () => {
    render(<ChatBubble role="user" content="Hello world" timestamp="10:00 AM" />);
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('renders user timestamp', () => {
    render(<ChatBubble role="user" content="Hi" timestamp="10:00 AM" />);
    expect(screen.getByText('10:00 AM')).toBeTruthy();
  });

  it('renders assistant message with correct content', () => {
    render(<ChatBubble role="assistant" content="Here is your answer." timestamp="10:01 AM" />);
    expect(screen.getByText('Here is your answer.')).toBeTruthy();
  });

  it('user bubble has aria-label "Your message"', () => {
    render(<ChatBubble role="user" content="Hi" timestamp="10:00 AM" />);
    expect(screen.getByRole('article', { name: 'Your message' })).toBeTruthy();
  });

  it('assistant bubble has aria-label about ElectIQ AI response', () => {
    render(<ChatBubble role="assistant" content="Answer" timestamp="10:01 AM" />);
    expect(screen.getByRole('article', { name: 'ElectIQ AI response' })).toBeTruthy();
  });
});
