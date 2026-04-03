'use client';

import type { ProductCardModel } from '@/lib/types/domain';

const currentKey = 'fitbudget:current-outfit';
const savedKey = 'fitbudget:saved-outfits';

export interface SavedOutfit {
  id: string;
  title: string;
  createdAt: string;
  items: ProductCardModel[];
}

export function loadCurrentOutfit(): ProductCardModel[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(currentKey) ?? '[]');
}

export function saveCurrentOutfit(items: ProductCardModel[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(currentKey, JSON.stringify(items));
}

export function saveOutfit(title: string, items: ProductCardModel[]) {
  if (typeof window === 'undefined') return;
  const payload: SavedOutfit = { id: crypto.randomUUID(), title, createdAt: new Date().toISOString(), items };
  const prior = loadSavedOutfits();
  localStorage.setItem(savedKey, JSON.stringify([payload, ...prior]));
}

export function loadSavedOutfits(): SavedOutfit[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(savedKey) ?? '[]');
}
