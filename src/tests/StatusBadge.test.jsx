import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/StatusBadge';

describe('StatusBadge', () => {
  it('renders the label text', () => {
    render(<StatusBadge label="10 Questions" variant="saffron" />);
    expect(screen.getByText('10 Questions')).toBeTruthy();
  });

  it('applies saffron variant classes', () => {
    const { container } = render(<StatusBadge label="Test" variant="saffron" />);
    expect(container.firstChild.className).toContain('text-saffron');
  });

  it('applies ashoka variant classes', () => {
    const { container } = render(<StatusBadge label="Test" variant="ashoka" />);
    expect(container.firstChild.className).toContain('text-ashoka');
  });

  it('falls back to muted variant for unknown variant', () => {
    const { container } = render(<StatusBadge label="Test" variant="unknown" />);
    expect(container.firstChild.className).toContain('text-muted');
  });

  it('uses muted as default variant when none provided', () => {
    const { container } = render(<StatusBadge label="Test" />);
    expect(container.firstChild.className).toContain('text-muted');
  });
});
