import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isDemoMode = !(supabaseUrl && supabaseAnonKey);

// Graceful fallback: if env vars are missing, export a minimal mock client so the app can run in demo mode.
function createMockSupabase() {
  type QueryResult<T = any> = Promise<{ data: T | null; error: null }>
  const chain = () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }), update: () => ({ eq: () => ({ data: null, error: null }) }), eq: () => chain(), order: () => chain(), limit: () => chain(), single: () => ({ data: null, error: null }) }) as any;

  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null } as any;
      },
      onAuthStateChange(_cb: any) {
        return { data: { subscription: { unsubscribe() {} } } } as any;
      },
      async signUp() { return { data: { user: null }, error: null } as any; },
      async signInWithPassword() { return { data: null, error: null } as any; },
      async signOut() { return { error: null } as any; }
    },
    from(_table: string) {
      return {
        select(): QueryResult<any[]> { return Promise.resolve({ data: [], error: null }); },
        insert(): { select: () => { single: () => any } } & any {
          return { select: () => ({ single: () => ({ data: { id: (globalThis as any).crypto?.randomUUID?.() ?? String(Date.now()), role: 'assistant', content: '', created_at: new Date().toISOString() }, error: null }) }) } as any;
        },
        update() { return { eq: () => ({ data: null, error: null }) } as any; },
        order() { return chain(); },
        eq() { return chain(); },
        limit() { return chain(); },
        single() { return { data: null, error: null } as any; }
      } as any;
    }
  } as any;
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase();
