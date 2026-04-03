'use client';

import { useMemo, useState } from 'react';
import { Nav } from '@/components/Nav';
import { onboardingSchema } from '@/lib/validation/forms';
import { loadAppState, saveAppState } from '@/lib/auth/session';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function OnboardingPage() {
  const session = useRequireSession();
  const initial = useMemo(() => loadAppState().avatar, []);
  const [displayName, setDisplayName] = useState(initial?.displayName ?? session?.displayName ?? '');
  const [height, setHeight] = useState(initial?.height ?? '');
  const [bodyBuild, setBodyBuild] = useState(initial?.bodyBuild ?? '');
  const [skinTone, setSkinTone] = useState(initial?.skinTone ?? '');
  const [avatarBase, setAvatarBase] = useState(initial?.avatarBase ?? 'classic');
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Profile & avatar setup</h1>
        <p className="mt-1 text-sm text-slate-600">Set your preferences to personalize outfit suggestions and preview styling.</p>
        <form
          className="mt-5 grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = onboardingSchema.safeParse({ displayName, height, bodyBuild, skinTone, avatarBase });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? 'Invalid values');
              return;
            }
            saveAppState({ avatar: parsed.data, session: session ? { ...session, displayName: parsed.data.displayName } : null });
            window.location.href = '/budget';
          }}
        >
          <input className="rounded-lg border p-2.5" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <input className="rounded-lg border p-2.5" placeholder="Height (optional)" value={height} onChange={(e) => setHeight(e.target.value)} />
          <input className="rounded-lg border p-2.5" placeholder="Body build (optional)" value={bodyBuild} onChange={(e) => setBodyBuild(e.target.value)} />
          <input className="rounded-lg border p-2.5" placeholder="Skin tone (optional)" value={skinTone} onChange={(e) => setSkinTone(e.target.value)} />
          <select className="rounded-lg border p-2.5 sm:col-span-2" value={avatarBase} onChange={(e) => setAvatarBase(e.target.value)}>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="sport">Sport</option>
          </select>
          {error ? <p className="text-sm text-red-600 sm:col-span-2">{error}</p> : null}
          <button className="rounded-lg bg-brand px-4 py-2.5 font-medium text-white sm:col-span-2" type="submit">Save profile and continue</button>
        </form>
      </section>
    </main>
  );
}
