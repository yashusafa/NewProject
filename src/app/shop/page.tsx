'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { demoProducts } from '@/lib/db/demoData';
import { loadAppState } from '@/lib/auth/session';
import { loadCurrentOutfit, saveCurrentOutfit } from '@/lib/db/outfitStore';
import { rankForShop } from '@/lib/services/recommendation';
import type { Category } from '@/lib/types/domain';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function ShopPage() {
  useRequireSession();
  const state = useMemo(() => loadAppState(), []);
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const ranked = useMemo(() => {
    const budget = state.budget ?? { maxBudget: 300, includedCategories: ['tops', 'bottoms', 'shoes'], minBudget: 120, trendPreference: 50 };
    const styleMode = state.styleMode ?? 'casual';

    const byCategory = categoryFilter === 'all' ? demoProducts : demoProducts.filter((p) => p.category === categoryFilter);

    return rankForShop({
      products: byCategory,
      styleMode,
      maxBudget: budget.maxBudget,
      selectedCategories: budget.includedCategories,
      trendPreference: budget.trendPreference
    });
  }, [categoryFilter, state]);

  return (
    <main>
      <Nav />
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold">Shop across vendors</h1>
        <p className="text-sm text-slate-600">Ranked for budget, style match, category completeness, availability, and trend preference.</p>
      </section>
      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', 'tops', 'bottoms', 'shoes', 'outerwear', 'accessories'] as const).map((category) => (
          <button
            key={category}
            className={`rounded-full border px-3 py-1.5 text-sm ${categoryFilter === category ? 'border-brand bg-brand/10' : ''}`}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {ranked.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-slate-600">No products found for this filter yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((p) => (
            <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">{p.vendorName}</p>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.category} · {p.color ?? 'multi'}</p>
              <p className="mt-2 text-lg font-semibold">${p.price}</p>
              <button
                className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                onClick={() => {
                  const existing = loadCurrentOutfit();
                  const filtered = existing.filter((it) => it.category !== p.category);
                  saveCurrentOutfit([...filtered, p]);
                }}
              >
                Add to outfit
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
