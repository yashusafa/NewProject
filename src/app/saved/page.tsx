'use client';

import { Nav } from '@/components/Nav';
import { loadSavedOutfits } from '@/lib/db/outfitStore';

export default function SavedPage() {
  const outfits = loadSavedOutfits();

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Saved outfits</h1>
      <div className="space-y-3">
        {outfits.length === 0 ? <p className="rounded-xl bg-white p-4">No saved outfits yet.</p> : outfits.map((o) => (
          <article key={o.id} className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="font-semibold">{o.title}</h3>
            <p className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {o.items.map((it) => <li key={it.id}>{it.category}: {it.title} (${it.price})</li>)}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
