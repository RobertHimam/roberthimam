import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Environment Validation', () => {
  // Store original env
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules between tests
    vi.resetModules();
    // Clear require cache if needed
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original env
    process.env = { ...originalEnv };
  });

  it('should throw error when AUTH_SECRET is missing', async () => {
    vi.stubEnv('AUTH_SECRET', undefined);
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com');
    vi.stubEnv('ADMIN_PASSWORD_HASH', 'hashed-password');

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).toThrow('AUTH_SECRET');
  });

  it('should throw error when NEXT_PUBLIC_SUPABASE_URL is missing', async () => {
    vi.stubEnv('AUTH_SECRET', 'super-secret-key-that-is-at-least-32-chars-long');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', undefined);
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com');
    vi.stubEnv('ADMIN_PASSWORD_HASH', 'hashed-password');

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).toThrow('NEXT_PUBLIC_SUPABASE_URL');
  });

  it('should throw error when SUPABASE_SERVICE_ROLE_KEY is missing', async () => {
    vi.stubEnv('AUTH_SECRET', 'super-secret-key-that-is-at-least-32-chars-long');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', undefined);
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com');
    vi.stubEnv('ADMIN_PASSWORD_HASH', 'hashed-password');

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).toThrow('SUPABASE_SERVICE_ROLE_KEY');
  });

  it('should throw error when ADMIN_EMAIL is missing', async () => {
    vi.stubEnv('AUTH_SECRET', 'super-secret-key-that-is-at-least-32-chars-long');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
    vi.stubEnv('ADMIN_EMAIL', undefined);
    vi.stubEnv('ADMIN_PASSWORD_HASH', 'hashed-password');

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).toThrow('ADMIN_EMAIL');
  });

  it('should throw error when ADMIN_PASSWORD_HASH is missing', async () => {
    vi.stubEnv('AUTH_SECRET', 'super-secret-key-that-is-at-least-32-chars-long');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com');
    vi.stubEnv('ADMIN_PASSWORD_HASH', undefined);

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).toThrow('ADMIN_PASSWORD_HASH');
  });

  it('should not throw when all required env vars are present', async () => {
    vi.stubEnv('AUTH_SECRET', 'super-secret-key-that-is-at-least-32-chars-long');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
    vi.stubEnv('ADMIN_EMAIL', 'admin@example.com');
    vi.stubEnv('ADMIN_PASSWORD_HASH', 'hashed-password');

    const { assertEnv } = await import('@/lib/assertEnv');
    expect(() => assertEnv()).not.toThrow();
  });
});
