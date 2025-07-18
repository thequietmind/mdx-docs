import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import SideNavigation from '../SideNavigation';

describe('SideNavigation component - Additional Coverage Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should reset body overflow after route change', () => {
    // Set initial overflow
    document.body.style.overflow = 'hidden';

    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    // Change route
    rerender(
      <MemoryRouter initialEntries={['/colors']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    // Fast-forward timer to trigger the setTimeout callback
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Body overflow should be reset
    expect(document.body.style.overflow).toBe('');
  });

  it('should clear timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    // Unmount before timeout completes
    unmount();

    // clearTimeout should have been called
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should handle multiple rapid route changes', () => {
    document.body.style.overflow = 'hidden';

    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    // Multiple rapid route changes
    rerender(
      <MemoryRouter initialEntries={['/colors']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter initialEntries={['/typography']}>
        <SideNavigation mobileOpen={false} handleDrawerToggle={() => {}} />
      </MemoryRouter>
    );

    // Fast-forward all timers
    act(() => {
      vi.runAllTimers();
    });

    // Body overflow should still be reset
    expect(document.body.style.overflow).toBe('');
  });
});