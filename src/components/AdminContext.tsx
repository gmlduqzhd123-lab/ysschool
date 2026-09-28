'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AdminContextValue {
  loading: boolean;
  authConfigured: boolean;
  contentStoreConfigured: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authConfigured, setAuthConfigured] = useState(false);
  const [contentStoreConfigured, setContentStoreConfigured] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/status', { cache: 'no-store' });
      const data = await response.json();
      setAuthConfigured(Boolean(data.authConfigured));
      setContentStoreConfigured(Boolean(data.contentStoreConfigured));
      setIsAdmin(Boolean(data.isAdmin));
    } catch {
      setAuthConfigured(false);
      setContentStoreConfigured(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [refresh]);

  const login = useCallback(async (password: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      setAuthConfigured(data.authConfigured ?? response.status !== 503);
      if (typeof data.contentStoreConfigured === 'boolean') {
        setContentStoreConfigured(data.contentStoreConfigured);
      }

      if (!response.ok) {
        setIsAdmin(false);
        return { ok: false, error: data.error || '로그인에 실패했습니다.' };
      }

      setIsAdmin(true);
      return { ok: true };
    } catch {
      return { ok: false, error: '관리자 인증 서버에 연결할 수 없습니다.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setIsAdmin(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      loading,
      authConfigured,
      contentStoreConfigured,
      isAdmin,
      refresh,
      login,
      logout,
    }),
    [loading, authConfigured, contentStoreConfigured, isAdmin, refresh, login, logout],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used inside AdminProvider');
  return context;
}
