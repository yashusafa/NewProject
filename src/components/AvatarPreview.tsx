'use client';

import type { Category } from '@/lib/types/domain';
import { categoryColorMap } from '@/lib/avatar/layers';

export function AvatarPreview({ activeCategories }: { activeCategories: Category[] }) {
  const active = new Set(activeCategories);

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold">Avatar Preview</h3>
      <p className="mb-3 text-xs text-slate-500">Layered 2D render (upgrade-ready architecture)</p>
      <div className="relative mx-auto h-80 w-52 rounded-[60px] bg-amber-100">
        <div className="absolute left-1/2 top-4 h-14 w-14 -translate-x-1/2 rounded-full bg-amber-200" />
        {(['outerwear', 'tops', 'bottoms', 'accessories', 'shoes'] as Category[]).map((category, idx) => (
          <div
            key={category}
            className={`absolute left-1/2 -translate-x-1/2 rounded-md transition-all ${categoryColorMap[category]} ${active.has(category) ? 'opacity-100' : 'opacity-15'}`}
            style={{
              top: `${68 + idx * 42}px`,
              width: `${idx < 2 ? 92 : 76}px`,
              height: `${idx < 2 ? 32 : 24}px`
            }}
            title={category}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        {(['tops', 'bottoms', 'shoes', 'outerwear', 'accessories'] as Category[]).map((c) => (
          <span key={c} className={`rounded-full px-2 py-1 ${active.has(c) ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {c}
          </span>
        ))}
      </div>
    </aside>
  );
}
