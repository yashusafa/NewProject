'use client';

import type { Category, StyleMode } from '@/lib/types/domain';

export interface UserPrefs {
  displayName: string;
  height?: string;
  bodyBuild?: string;
  skinTone?: string;
  avatarBase?: string;
  minBudget: number;
  maxBudget: number;
  includedCategories: Category[];
  styleMode: StyleMode;
  trendPreference: number;
}

const key = 'fitbudget:mvp';

export function loadPrefs(): UserPrefs {
  if (typeof window === 'undefined') return defaults();
  const raw = localStorage.getItem(key);
  if (!raw) return defaults();
  return { ...defaults(), ...JSON.parse(raw) };
}

export function savePrefs(prefs: Partial<UserPrefs>) {
  if (typeof window === 'undefined') return;
  const merged = { ...loadPrefs(), ...prefs };
  localStorage.setItem(key, JSON.stringify(merged));
}

function defaults(): UserPrefs {
  return {
    displayName: 'Guest',
    minBudget: 100,
    maxBudget: 250,
    includedCategories: ['tops', 'bottoms', 'shoes'],
    styleMode: 'casual',
    trendPreference: 50
  };
}
