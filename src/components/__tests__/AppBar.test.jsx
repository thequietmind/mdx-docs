import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AppBar from '../AppBar';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AppBar component', () => {
  const mockSetDarkMode = vi.fn();
  const mockHandleDrawerToggle = vi.fn();

  const defaultProps = {
    darkMode: false,
    setDarkMode: mockSetDarkMode,
    handleDrawerToggle: mockHandleDrawerToggle,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the app title', () => {
    renderWithRouter(<AppBar {...defaultProps} />);
    
    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('should render the menu button on mobile', () => {
    renderWithRouter(<AppBar {...defaultProps} />);
    
    const menuButton = screen.getByTestId('MenuIcon').closest('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveStyle({ marginRight: '16px' });
  });

  it('should call handleDrawerToggle when menu button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AppBar {...defaultProps} />);
    
    const menuButton = screen.getByTestId('MenuIcon').closest('button');
    await user.click(menuButton);
    
    expect(mockHandleDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it('should render dark mode icon when in light mode', () => {
    renderWithRouter(<AppBar {...defaultProps} darkMode={false} />);
    
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
  });

  it('should render light mode icon when in dark mode', () => {
    renderWithRouter(<AppBar {...defaultProps} darkMode={true} />);
    
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });

  it('should toggle dark mode when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AppBar {...defaultProps} />);
    
    const themeButton = screen.getByTestId('DarkModeIcon').closest('button');
    await user.click(themeButton);
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it('should link title to home page', () => {
    renderWithRouter(<AppBar {...defaultProps} />);
    
    const titleLink = screen.getByRole('link', { name: 'Design System' });
    expect(titleLink).toHaveAttribute('href', '/');
  });
});