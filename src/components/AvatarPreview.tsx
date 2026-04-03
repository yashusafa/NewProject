'use client';

import type { Category } from '@/lib/types/domain';
import { categoryColorMap } from '@/lib/avatar/layers';

export function AvatarPreview({ activeCategories }: { activeCategories: Category[] }) {
  const active = new Set(activeCategories);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold">2D Avatar Preview (MVP)</h3>
      <div className="relative mx-auto h-72 w-44 rounded-full bg-amber-100">
        <div className="absolute left-1/2 top-3 h-12 w-12 -translate-x-1/2 rounded-full bg-amber-200" />
        {(['outerwear', 'tops', 'bottoms', 'accessories', 'shoes'] as Category[]).map((category, idx) => (
          <div
            key={category}
            className={`absolute left-1/2 -translate-x-1/2 rounded-md transition-opacity ${categoryColorMap[category]} ${active.has(category) ? 'opacity-100' : 'opacity-20'}`}
            style={{
              top: `${54 + idx * 38}px`,
              width: `${idx < 2 ? 80 : 70}px`,
              height: `${idx < 2 ? 30 : 22}px`
            }}
            title={category}
          />
        ))}
      </div>
    </div>
  );
}
