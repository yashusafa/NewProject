'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { categories } from '@/lib/types/domain';
import { budgetSchema } from '@/lib/validation/forms';
import { loadAppState, saveAppState } from '@/lib/auth/session';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function BudgetPage() {
  useRequireSession();
  const current = useMemo(() => loadAppState().budget, []);
  const [minBudget, setMin] = useState(current?.minBudget ?? 120);
  const [maxBudget, setMax] = useState(current?.maxBudget ?? 300);
  const [trendPreference, setTrend] = useState(current?.trendPreference ?? 50);
  const [included, setIncluded] = useState(new Set(current?.includedCategories ?? ['tops', 'bottoms', 'shoes']));
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Budget profile</h1>
        <p className="mt-1 text-sm text-slate-600">Choose your budget range and which categories count toward spending control.</p>
        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = budgetSchema.safeParse({ minBudget, maxBudget, trendPreference, includedCategories: [...included] });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? 'Invalid budget settings');
              return;
            }
            saveAppState({ budget: parsed.data });
            window.location.href = '/style';
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">Min budget
              <input type="number" className="mt-1 w-full rounded-lg border p-2.5" value={minBudget} onChange={(e) => setMin(Number(e.target.value))} />
            </label>
            <label className="text-sm">Max budget
              <input type="number" className="mt-1 w-full rounded-lg border p-2.5" value={maxBudget} onChange={(e) => setMax(Number(e.target.value))} />
            </label>
          </div>
          <label className="block text-sm">Trend preference ({trendPreference})
            <input className="mt-2 w-full" type="range" min={0} max={100} value={trendPreference} onChange={(e) => setTrend(Number(e.target.value))} />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Categories that count toward budget</legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <label key={c} className="rounded-lg border px-3 py-1.5 text-sm">
                  <input
                    type="checkbox"
                    checked={included.has(c)}
                    onChange={(e) => {
                      const next = new Set(included);
                      if (e.target.checked) next.add(c); else next.delete(c);
                      setIncluded(next);
                    }}
                  />{' '}
                  {c}
                </label>
              ))}
            </div>
          </fieldset>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button className="rounded-lg bg-brand px-4 py-2.5 font-medium text-white" type="submit">Save budget and continue</button>
        </form>
      </section>
    </main>
  );
}
