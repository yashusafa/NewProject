'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { loadPrefs } from '@/lib/db/localStore';
import { loadCurrentOutfit, saveCurrentOutfit, saveOutfit } from '@/lib/db/outfitStore';
import { calculateBudget } from '@/lib/budget/engine';
import { AvatarPreview } from '@/components/AvatarPreview';

export default function BuilderPage() {
  const prefs = loadPrefs();
  const [items, setItems] = useState(loadCurrentOutfit());
  const budget = useMemo(() => calculateBudget({
    minBudget: prefs.minBudget,
    maxBudget: prefs.maxBudget,
    includedCategories: prefs.includedCategories,
    items: items.map((i) => ({ category: i.category, price: i.price }))
  }), [prefs.minBudget, prefs.maxBudget, prefs.includedCategories, items]);

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Outfit builder</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.length === 0 ? <p className="rounded-xl bg-white p-4">No items yet. Add products in Browse.</p> : items.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
              <div>
                <p className="font-semibold">{i.title}</p>
                <p className="text-sm text-slate-600">{i.category} · {i.vendorName}</p>
              </div>
              <div className="text-right">
                <p>${i.price}</p>
                <button className="text-xs text-red-600" onClick={() => {
                  const next = items.filter((x) => x.id !== i.id);
                  setItems(next);
                  saveCurrentOutfit(next);
                }}>remove</button>
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p>Total: ${budget.totalPrice.toFixed(2)}</p>
            <p>Budget-counted subtotal: ${budget.countedSubtotal.toFixed(2)}</p>
            <p>Remaining budget: ${budget.remainingBudget.toFixed(2)}</p>
            <p className="font-semibold">State: {budget.state}</p>
            <button className="mt-2 rounded bg-brand px-4 py-2 text-white" onClick={() => saveOutfit(`Saved ${new Date().toLocaleDateString()}`, items)}>Save outfit</button>
          </div>
        </div>
        <AvatarPreview activeCategories={items.map((i) => i.category)} />
      </div>
    </main>
  );
}
