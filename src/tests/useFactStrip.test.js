import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFactStrip } from '../hooks/useFactStrip';

const mockFacts = [
  'Fact one',
  'Fact two',
  'Fact three',
];

describe('useFactStrip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initialises with the first fact and index 0', () => {
    const { result } = renderHook(() => useFactStrip(mockFacts));
    expect(result.current.currentFact).toBe('Fact one');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalFacts).toBe(3);
  });

  it('isVisible starts as true', () => {
    const { result } = renderHook(() => useFactStrip(mockFacts));
    expect(result.current.isVisible).toBe(true);
  });

  it('advances to next fact after 5 seconds', () => {
    const { result } = renderHook(() => useFactStrip(mockFacts));
    act(() => {
      vi.advanceTimersByTime(5000);
      vi.advanceTimersByTime(300); // fade transition
    });
    expect(result.current.currentIndex).toBe(1);
  });

  it('wraps around to 0 after the last fact', () => {
    const { result } = renderHook(() => useFactStrip(mockFacts));
    // Advance 3 × 5 s to cycle through all facts
    act(() => {
      vi.advanceTimersByTime(5000); vi.advanceTimersByTime(300);
      vi.advanceTimersByTime(5000); vi.advanceTimersByTime(300);
      vi.advanceTimersByTime(5000); vi.advanceTimersByTime(300);
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it('goToFact sets the correct index', () => {
    const { result } = renderHook(() => useFactStrip(mockFacts));
    act(() => {
      result.current.goToFact(2);
      vi.advanceTimersByTime(300);
    });
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.currentFact).toBe('Fact three');
  });

  it('handles empty facts array gracefully', () => {
    const { result } = renderHook(() => useFactStrip([]));
    // facts[0] on empty array = undefined; hook returns that
    expect(result.current.currentFact).toBeFalsy();
    expect(result.current.totalFacts).toBe(0);
  });

  it('handles null facts gracefully', () => {
    const { result } = renderHook(() => useFactStrip(null));
    expect(result.current.currentFact).toBe('');
  });
});
