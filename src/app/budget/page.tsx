'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { categories } from '@/lib/types/domain';
import { loadPrefs, savePrefs } from '@/lib/db/localStore';

export default function BudgetPage() {
  const router = useRouter();
  const prefs = loadPrefs();
  const [minBudget, setMin] = useState(prefs.minBudget);
  const [maxBudget, setMax] = useState(prefs.maxBudget);
  const [trendPreference, setTrend] = useState(prefs.trendPreference);
  const [included, setIncluded] = useState(new Set(prefs.includedCategories));

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Budget Setup</h1>
      <form className="space-y-3 rounded-xl bg-white p-4 shadow-sm" onSubmit={(e) => {
        e.preventDefault();
        savePrefs({ minBudget, maxBudget, trendPreference, includedCategories: [...included] });
        router.push('/style');
      }}>
        <label className="block">Min budget <input type="number" className="ml-2 rounded border p-1" value={minBudget} onChange={(e) => setMin(Number(e.target.value))} /></label>
        <label className="block">Max budget <input type="number" className="ml-2 rounded border p-1" value={maxBudget} onChange={(e) => setMax(Number(e.target.value))} /></label>
        <label className="block">Trend preference ({trendPreference}) <input type="range" min={0} max={100} value={trendPreference} onChange={(e) => setTrend(Number(e.target.value))} /></label>
        <fieldset>
          <legend className="mb-1 font-medium">Categories that count toward budget</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c} className="rounded border px-2 py-1 text-sm">
                <input type="checkbox" checked={included.has(c)} onChange={(e) => {
                  const next = new Set(included);
                  if (e.target.checked) next.add(c); else next.delete(c);
                  setIncluded(next);
                }} /> {c}
              </label>
            ))}
          </div>
        </fieldset>
        <button className="rounded bg-brand px-4 py-2 text-white" type="submit">Save and continue</button>
      </form>
    </main>
  );
}
