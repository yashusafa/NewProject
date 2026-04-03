'use client';

import { Nav } from '@/components/Nav';
import { demoProducts } from '@/lib/db/demoData';
import { loadPrefs } from '@/lib/db/localStore';
import { rankProducts } from '@/lib/vendors/normalize';
import { loadCurrentOutfit, saveCurrentOutfit } from '@/lib/db/outfitStore';

export default function BrowsePage() {
  const prefs = loadPrefs();
  const ranked = rankProducts({ products: demoProducts.map((p) => ({ ...p, sourceUrl: '#' })), styleMode: prefs.styleMode, maxBudget: prefs.maxBudget, trendPreference: prefs.trendPreference });

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Browse products (3 seeded vendors)</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((p) => (
          <article key={p.id} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{p.vendorName}</p>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm">{p.category} · ${p.price}</p>
            <button className="mt-2 rounded bg-slate-900 px-3 py-1 text-sm text-white" onClick={() => {
              const existing = loadCurrentOutfit();
              const filtered = existing.filter((it) => it.category !== p.category);
              saveCurrentOutfit([...filtered, p]);
            }}>Add to outfit</button>
          </article>
        ))}
      </div>
    </main>
  );
}
