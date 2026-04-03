'use client';

import type { AvatarProfileInput, BudgetProfileInput, StyleMode } from '@/lib/types/domain';

interface AppSession {
  userId: string;
  email: string;
  displayName: string;
}

interface AppState {
  session: AppSession | null;
  avatar?: AvatarProfileInput;
  budget?: BudgetProfileInput;
  styleMode?: StyleMode;
}

const stateKey = 'fitbudget:app-state:v1';

export function loadAppState(): AppState {
  if (typeof window === 'undefined') return { session: null };
  const raw = localStorage.getItem(stateKey);
  if (!raw) return { session: null };
  return JSON.parse(raw) as AppState;
}

export function saveAppState(patch: Partial<AppState>) {
  if (typeof window === 'undefined') return;
  const current = loadAppState();
  const next = { ...current, ...patch };
  localStorage.setItem(stateKey, JSON.stringify(next));
}

export function clearSession() {
  saveAppState({ session: null });
}

export function signInLocal(input: { email: string; displayName?: string }): AppSession {
  const session: AppSession = {
    userId: `local-${input.email}`,
    email: input.email,
    displayName: input.displayName ?? input.email.split('@')[0]
  };
  saveAppState({ session });
  return session;
}

export type { AppSession, AppState };
