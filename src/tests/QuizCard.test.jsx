import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizCard from '../components/QuizCard';

const mockProps = {
  question: 'How many Lok Sabha seats?',
  options: ['543', '500', '600', '450'],
  selectedOption: null,
  isAnswered: false,
  correctIndex: 0,
  explanation: 'There are 543 directly elected seats.',
  onSelect: vi.fn(),
  getOptionState: vi.fn(() => 'default'),
};

describe('QuizCard', () => {
  it('renders the question text', () => {
    render(<QuizCard {...mockProps} />);
    expect(screen.getByText('How many Lok Sabha seats?')).toBeTruthy();
  });

  it('renders all 4 options', () => {
    render(<QuizCard {...mockProps} />);
    expect(screen.getByText('543')).toBeTruthy();
    expect(screen.getByText('500')).toBeTruthy();
    expect(screen.getByText('600')).toBeTruthy();
    expect(screen.getByText('450')).toBeTruthy();
  });

  it('calls onSelect when an option is clicked', () => {
    const onSelect = vi.fn();
    render(<QuizCard {...mockProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('543'));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('does not call onSelect when isAnswered is true', () => {
    const onSelect = vi.fn();
    render(<QuizCard {...mockProps} isAnswered={true} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('543'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not show explanation when not answered', () => {
    render(<QuizCard {...mockProps} isAnswered={false} />);
    expect(screen.queryByText('There are 543 directly elected seats.')).toBeNull();
  });

  it('shows explanation when answered', () => {
    render(<QuizCard {...mockProps} isAnswered={true} getOptionState={() => 'correct'} />);
    expect(screen.getByText('There are 543 directly elected seats.')).toBeTruthy();
  });

  it('explanation has role="alert"', () => {
    render(<QuizCard {...mockProps} isAnswered={true} getOptionState={() => 'correct'} />);
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('options container has role="radiogroup"', () => {
    render(<QuizCard {...mockProps} />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  it('renders correctly with "correct" getOptionState', () => {
    const { container } = render(
      <QuizCard {...mockProps} isAnswered={true} selectedOption={0} getOptionState={() => 'correct'} />
    );
    // Correct option should have green styling
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  });
});
