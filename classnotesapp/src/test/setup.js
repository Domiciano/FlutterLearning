import { vi, afterEach } from 'vitest';

// MUI's useMediaQuery requires window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// BeanVisualizer canvas and TermsScreen use ResizeObserver.
// Tiene que ser una clase de verdad: `vi.fn().mockImplementation(() => ({...}))`
// deja de ser construible con `new` en Vitest 4.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// useContentSpy uses IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// window.scrollTo used by LessonPage and TableOfContents
window.scrollTo = vi.fn();

// Reset localStorage between tests
afterEach(() => {
  localStorage.clear();
});
