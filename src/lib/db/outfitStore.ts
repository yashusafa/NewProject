'use client';

import type { ProductCardModel } from '@/lib/types/domain';

const currentKey = 'fitbudget:current-outfit:v1';
const savedKey = 'fitbudget:saved-outfits:v1';

export interface SavedOutfit {
  id: string;
  title: string;
  createdAt: string;
  styleMode?: string;
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

export function clearCurrentOutfit() {
  saveCurrentOutfit([]);
}

export function saveOutfit(title: string, items: ProductCardModel[], styleMode?: string) {
  if (typeof window === 'undefined') return;
  const payload: SavedOutfit = {
    id: crypto.randomUUID(),
    title,
    createdAt: new Date().toISOString(),
    styleMode,
    items
  };
  const prior = loadSavedOutfits();
  localStorage.setItem(savedKey, JSON.stringify([payload, ...prior]));
}

export function loadSavedOutfits(): SavedOutfit[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(savedKey) ?? '[]');
}
