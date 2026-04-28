import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('renders the ElectIQ brand link', () => {
    renderNavbar();
    // Brand text is split across elements: "Elect" + <span>I</span> + "Q"
    // Use the link's href to locate it instead
    expect(screen.getAllByRole('link')[0].getAttribute('href')).toBe('/');
  });

  it('renders all desktop navigation links', () => {
    renderNavbar();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Quiz').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chat').length).toBeGreaterThan(0);
  });

  it('has a navigation landmark', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('mobile menu is closed by default', () => {
    renderNavbar();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    renderNavbar();
    const toggle = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggle);
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('closes mobile menu on second click', () => {
    renderNavbar();
    const toggle = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('hamburger button has correct aria-expanded state', () => {
    renderNavbar();
    const toggle = screen.getByLabelText('Toggle navigation menu');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});
