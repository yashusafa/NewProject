'use client';

import { Nav } from '@/components/Nav';
import { loadSavedOutfits } from '@/lib/db/outfitStore';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function SavedOutfitsPage() {
  useRequireSession();
  const outfits = loadSavedOutfits();

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Saved outfits</h1>
      {outfits.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-slate-600">No saved outfits yet. Build one in Outfit Builder.</p>
      ) : (
        <div className="space-y-3">
          {outfits.map((o) => (
            <article key={o.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold">{o.title}</h3>
              <p className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleString()} {o.styleMode ? `· ${o.styleMode}` : ''}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                {o.items.map((it) => (
                  <li key={it.id}>{it.category}: {it.title} (${it.price})</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
