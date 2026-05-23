import type { SupabaseClient, PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

// In-memory database for tests
let blogPosts: any[] = [
  {
    id: 'test-post-1',
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'This is a test post',
    content: 'Content of test post',
    cover_image: null,
    published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function resetDb() {
  blogPosts = [
    {
      id: 'test-post-1',
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'This is a test post',
      content: 'Content of test post',
      cover_image: null,
      published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

// Mock supabase client factory
export function createMockSupabase(): SupabaseClient {
  const from = (tableName: string) => {
    const table = blogPosts;
    return {
      select: (fields = '*') => {
        let query = [...table];

        // Handle .eq() filters
        let eqFilter: Record<string, any> = {};
        const eq = (key: string, value: any) => {
          eqFilter[key] = value;
          return { eq, order, single };
        };
        const order = (key: string, opts?: any) => {
          if (opts?.ascending) {
            query.sort((a, b) => (a[key] as string | number) > (b[key] as string | number) ? 1 : -1);
          } else if (opts?.ascending === false) {
            query.sort((a, b) => (a[key] as string | number) < (b[key] as string | number) ? 1 : -1);
          }
          return { eq, order, single };
        };
        const single = () => {
          return {
            then: (cb: (result: PostgrestSingleResponse<any>) => any) => {
              const filtered = query.filter(item => {
                return Object.entries(eqFilter).every(([k, v]) => item[k] === v);
              });
              const result = filtered.length === 1 ? filtered[0] : null;
              const response: PostgrestSingleResponse<any> = {
                data: result,
                error: result ? null : { message: 'Not found' },
                status: result ? 200 : 404,
                count: null,
              };
              return cb(response);
            },
            // For promise usage
            [Symbol.toStringTag]: 'Promise',
          };
        };
        // For chaining after select
        (eq as any).eq = eq;
        (order as any).order = order;
        (single as any).single = single;
        return { eq, order, single };
      },
      insert: (data: any[]) => {
        const newItem = { ...data[0], created_at: new Date().toISOString() };
        blogPosts.push(newItem);
        return {
          select: () => ({
            single: () => ({
              then: (cb: (result: PostgrestSingleResponse<any>) => any) => {
                const response: PostgrestSingleResponse<any> = {
                  data: newItem,
                  error: null,
                  status: 201,
                  count: null,
                };
                return cb(response);
              },
            }),
          }),
        };
      },
      update: (updates: any) => {
        return {
          eq: (key: string, value: any) => {
            const index = blogPosts.findIndex(p => p[key] === value);
            if (index !== -1) {
              blogPosts[index] = { ...blogPosts[index], ...updates };
            }
            return {
              select: () => ({
                single: () => ({
                  then: (cb: (result: PostgrestSingleResponse<any>) => any) => {
                    const item = blogPosts.find(p => p[key] === value);
                    const response: PostgrestSingleResponse<any> = {
                      data: item,
                      error: item ? null : { message: 'Not found' },
                      status: item ? 200 : 404,
                      count: null,
                    };
                    return cb(response);
                  },
                }),
              }),
            };
          },
        };
      },
      delete: () => {
        return {
          eq: (key: string, value: any) => {
            const index = blogPosts.findIndex(p => p[key] === value);
            const deleted = index !== -1;
            if (deleted) {
              blogPosts.splice(index, 1);
            }
            return {
              // In supabase, delete returns empty data but no error
              then: (cb: (result: PostgrestResponse<any>) => any) => {
                const response: PostgrestResponse<any> = {
                  data: null,
                  error: deleted ? null : { message: 'Not found' },
                  status: deleted ? 204 : 404,
                  count: null,
                };
                return cb(response);
              },
            };
          },
        };
      },
    };
  };

  const storage = {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        // Mock upload returns public URL
        const publicUrl = `https://mock-storage.supabase.co/${bucket}/${path}`;
        return { data: { path }, error: null };
      },
      getPublicUrl: (path: string) => {
        return {
          data: { publicUrl: `https://mock-storage.supabase.co/${path}` },
        };
      },
    }),
  };

  const auth = {
    getSession: async () => ({ data: { session: null }, error: null }),
    signIn: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
  };

  return {
    from: from,
    storage: storage,
    auth: auth,
  } as unknown as SupabaseClient;
}

export const mockSupabase = createMockSupabase();
