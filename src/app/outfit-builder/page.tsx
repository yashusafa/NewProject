'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { AvatarPreview } from '@/components/AvatarPreview';
import { calculateBudget } from '@/lib/budget/engine';
import { loadAppState } from '@/lib/auth/session';
import { clearCurrentOutfit, loadCurrentOutfit, saveCurrentOutfit, saveOutfit } from '@/lib/db/outfitStore';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function OutfitBuilderPage() {
  useRequireSession();
  const appState = useMemo(() => loadAppState(), []);
  const [items, setItems] = useState(loadCurrentOutfit());
  const [saveTitle, setSaveTitle] = useState('');

  const budget = useMemo(() => {
    const profile = appState.budget ?? { minBudget: 120, maxBudget: 300, includedCategories: ['tops', 'bottoms', 'shoes'], trendPreference: 50 };
    return calculateBudget({
      minBudget: profile.minBudget,
      maxBudget: profile.maxBudget,
      includedCategories: profile.includedCategories,
      items: items.map((i) => ({ category: i.category, price: i.price }))
    });
  }, [appState.budget, items]);

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Outfit builder</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-2">
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed p-6 text-slate-600">No items in your outfit yet. Add products in Shop.</p>
          ) : (
            items.map((i) => (
              <article key={i.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div>
                  <p className="font-semibold">{i.title}</p>
                  <p className="text-sm text-slate-600">{i.category} · {i.vendorName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${i.price}</p>
                  <button
                    className="text-xs text-red-600"
                    onClick={() => {
                      const next = items.filter((x) => x.id !== i.id);
                      setItems(next);
                      saveCurrentOutfit(next);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold">Budget summary</h2>
            <p className="text-sm">Total outfit price: <strong>${budget.totalPrice.toFixed(2)}</strong></p>
            <p className="text-sm">Budget-counted subtotal: <strong>${budget.countedSubtotal.toFixed(2)}</strong></p>
            <p className="text-sm">Remaining budget: <strong>${budget.remainingBudget.toFixed(2)}</strong></p>
            <p className="mt-1 text-sm">State: <span className="font-semibold">{budget.state}</span></p>
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-lg border p-2"
                placeholder="Outfit title"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
              />
              <button
                className="rounded-lg bg-brand px-4 py-2 text-white"
                onClick={() => saveOutfit(saveTitle || `Look ${new Date().toLocaleDateString()}`, items, appState.styleMode)}
              >
                Save outfit
              </button>
              <button
                className="rounded-lg bg-slate-200 px-4 py-2"
                onClick={() => {
                  clearCurrentOutfit();
                  setItems([]);
                }}
              >
                Clear
              </button>
            </div>
          </section>
        </section>
        <AvatarPreview activeCategories={items.map((i) => i.category)} />
      </div>
    </main>
  );
}
