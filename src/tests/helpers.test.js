import { describe, it, expect } from 'vitest';
import { getScoreResult, getNextFactIndex, formatShareText, getMockReply } from '../utils/helpers';

describe('getScoreResult', () => {
  it('returns "Keep learning" label for score <= 3', () => {
    expect(getScoreResult(0).label).toBe('Keep learning! 📚');
    expect(getScoreResult(3).label).toBe('Keep learning! 📚');
  });

  it('returns "Not bad" label for score 4-6', () => {
    expect(getScoreResult(4).label).toBe('Not bad! 👍');
    expect(getScoreResult(6).label).toBe('Not bad! 👍');
  });

  it('returns "Election Expert" label for score 7-9', () => {
    expect(getScoreResult(7).label).toBe('Election Expert! 🏆');
    expect(getScoreResult(9).label).toBe('Election Expert! 🏆');
  });

  it('returns "Perfect Score" label for score 10', () => {
    expect(getScoreResult(10).label).toBe('Perfect Score! 🇮🇳');
  });
});

describe('getNextFactIndex', () => {
  it('returns next index when not at end', () => {
    expect(getNextFactIndex(0, 6)).toBe(1);
    expect(getNextFactIndex(4, 6)).toBe(5);
  });

  it('wraps around to 0 at the last index', () => {
    expect(getNextFactIndex(5, 6)).toBe(0);
  });
});

describe('getMockReply', () => {
  it('returns voter registration info for "register"', () => {
    expect(getMockReply('how do I register')).toContain('voters.eci.gov.in');
  });

  it('returns EVM info for "evm"', () => {
    expect(getMockReply('what is evm')).toContain('Electronic Voting Machines');
  });

  it('returns fallback for unknown input', () => {
    expect(getMockReply('banana')).toContain('Great question');
  });
});
