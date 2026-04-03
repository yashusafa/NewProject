import type { NormalizedProduct } from '@/lib/vendors/types';
import { mockVendorAdapters } from '@/lib/vendors/mockVendors';
import type { Category, StyleMode } from '@/lib/types/domain';

export async function getNormalizedProducts(): Promise<NormalizedProduct[]> {
  const products = await Promise.all(
    mockVendorAdapters.map(async (adapter) => {
      const rows = await adapter.listProducts();
      return rows.map((p) => ({
        ...p,
        vendorName: adapter.vendorName,
        sourceUrl: `https://example.com/${adapter.slug}/${p.id}`
      }));
    })
  );

  return products.flat();
}

export function rankProducts(input: {
  products: NormalizedProduct[];
  styleMode: StyleMode;
  maxBudget: number;
  category?: Category;
  trendPreference?: number;
}): NormalizedProduct[] {
  const trendBoost = (input.trendPreference ?? 50) / 100;
  return [...input.products].sort((a, b) => score(b) - score(a));

  function score(p: NormalizedProduct) {
    const withinBudget = p.price <= input.maxBudget ? 20 : 0;
    const styleMatch = p.styleTags.includes(input.styleMode) ? 15 : 0;
    const categoryMatch = input.category ? (p.category === input.category ? 10 : 0) : 0;
    const available = p.availability ? 5 : -100;
    const trend = p.styleTags.includes('trend-forward') ? trendBoost * 3 : 0;
    return withinBudget + styleMatch + categoryMatch + available + trend;
  }
}
