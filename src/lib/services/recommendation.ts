import type { Category, StyleMode } from '@/lib/types/domain';
import type { ProductCardModel } from '@/lib/types/domain';

export function rankForShop(input: {
  products: ProductCardModel[];
  styleMode: StyleMode;
  maxBudget: number;
  selectedCategories: Category[];
  trendPreference: number;
}): ProductCardModel[] {
  const categoryNeed = new Set(input.selectedCategories);
  const trendWeight = input.trendPreference / 100;

  return [...input.products].sort((a, b) => score(b) - score(a));

  function score(p: ProductCardModel) {
    const withinBudget = p.price <= input.maxBudget ? 30 : 0;
    const styleMatch = p.styleTags.includes(input.styleMode) ? 25 : 0;
    const completeness = categoryNeed.has(p.category) ? 15 : 0;
    const availability = p.availability ? 10 : -100;
    const coherence = p.styleTags.some((s) => input.selectedCategories.length > 2 && s.includes('minimal')) ? 3 : 0;
    const trend = p.trendScore * trendWeight * 10;
    return withinBudget + styleMatch + completeness + availability + coherence + trend;
  }
}
