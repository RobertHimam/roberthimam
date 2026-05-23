import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest, RequestHandler } from 'msw';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// MSW Server setup for API mocking
const mswHandlers: RequestHandler[] = [];

// Example: Mock Supabase
mswHandlers.push(
  rest.post('https://supabase.co', (req, res, ctx) => {
    // Mock Supabase responses here
    return res(ctx.json({ data: [], error: null }));
  })
);

const server = setupServer(...mswHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/headers', () => ({
  cookies: () => new Map(),
}));

// Extend expect if needed
// (jest-dom already adds many matchers)
