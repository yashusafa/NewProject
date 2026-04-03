'use client';

import { useEffect, useState } from 'react';
import { loadAppState, type AppSession } from '@/lib/auth/session';

export function useRequireSession() {
  const [session, setSession] = useState<AppSession | null>(null);

  useEffect(() => {
    const current = loadAppState().session;
    setSession(current);
    if (!current) window.location.href = '/login';
  }, []);

  return session;
}
