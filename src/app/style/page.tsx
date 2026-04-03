'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { styleModes } from '@/lib/types/domain';
import { styleSchema } from '@/lib/validation/forms';
import { loadAppState, saveAppState } from '@/lib/auth/session';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function StylePage() {
  useRequireSession();
  const current = useMemo(() => loadAppState().styleMode, []);
  const [styleMode, setStyleMode] = useState(current ?? 'casual');
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Style / occasion mode</h1>
        <p className="mt-1 text-sm text-slate-600">Pick one mode for this session. You can switch anytime in account settings.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {styleModes.map((mode) => (
            <button
              key={mode}
              className={`rounded-xl border p-3 text-left transition ${styleMode === mode ? 'border-brand bg-brand/10' : 'hover:bg-slate-50'}`}
              onClick={() => setStyleMode(mode)}
            >
              <p className="font-medium capitalize">{mode}</p>
            </button>
          ))}
        </div>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <button
          className="mt-4 rounded-lg bg-brand px-4 py-2.5 font-medium text-white"
          onClick={() => {
            const parsed = styleSchema.safeParse({ styleMode });
            if (!parsed.success) {
              setError('Please choose a valid style mode');
              return;
            }
            saveAppState({ styleMode: parsed.data.styleMode });
            window.location.href = '/shop';
          }}
        >
          Continue to shop
        </button>
      </section>
    </main>
  );
}
