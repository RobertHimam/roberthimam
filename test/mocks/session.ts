import type { SessionData } from '@/lib/session';

export interface MockSession extends SessionData {
  save: () => Promise<void>;
  destroy: () => Promise<void>;
}

// Create a mock iron-session
export function createMockSession(overrides?: Partial<MockSession>): MockSession {
  return {
    user: overrides?.user,
    isLoggedIn: overrides?.isLoggedIn ?? !!overrides?.user,
    save: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn().mockResolvedValue(undefined),
  };
}

// Mock for getSession function
export function mockGetSession(session?: MockSession) {
  const mockSession = session || createMockSession();
  vi.mock('@/lib/session', () => ({
    getSession: vi.fn().mockResolvedValue(mockSession),
    sessionOptions: {
      password: 'test-password',
      cookieName: 'test-session',
      cookieOptions: { secure: false },
    },
  }));
  return mockSession;
}

// Helper to create a session with admin privileges
export function createAdminSession(adminEmail: string = 'admin@example.com'): MockSession {
  return createMockSession({
    user: {
      email: adminEmail,
      isAdmin: true,
    },
    isLoggedIn: true,
  });
}
