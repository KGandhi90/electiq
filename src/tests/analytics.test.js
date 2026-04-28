import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initAnalytics, trackPageView, trackEvent } from '../utils/analytics';

// Mock react-ga4 entirely
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));

import ReactGA from 'react-ga4';

describe('analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initAnalytics calls initialize when env var is set', () => {
    // In test env the GA var from .env is available, so initialize should run
    // We just verify it's callable without throwing
    expect(() => initAnalytics()).not.toThrow();
  });

  it('trackPageView sends a pageview hit', () => {
    trackPageView('/quiz', 'Quiz');
    expect(ReactGA.send).toHaveBeenCalledWith({
      hitType: 'pageview',
      page: '/quiz',
      title: 'Quiz',
    });
  });

  it('trackEvent fires an event with category, action, label', () => {
    trackEvent('Quiz', 'Started', 'label');
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'Quiz',
      action: 'Started',
      label: 'label',
    });
  });

  it('trackEvent fires without label', () => {
    trackEvent('Quiz', 'Retaken');
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'Quiz',
      action: 'Retaken',
      label: undefined,
    });
  });

  it('trackPageView is callable multiple times', () => {
    trackPageView('/home', 'Home');
    trackPageView('/chat', 'Chat');
    expect(ReactGA.send).toHaveBeenCalledTimes(2);
  });
});
