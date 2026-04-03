'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { savePrefs, loadPrefs } from '@/lib/db/localStore';

export default function OnboardingPage() {
  const router = useRouter();
  const initial = loadPrefs();
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [height, setHeight] = useState(initial.height ?? '');
  const [bodyBuild, setBodyBuild] = useState(initial.bodyBuild ?? '');
  const [skinTone, setSkinTone] = useState(initial.skinTone ?? '');

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Onboarding / Avatar Setup</h1>
      <form className="space-y-3 rounded-xl bg-white p-4 shadow-sm" onSubmit={(e) => {
        e.preventDefault();
        savePrefs({ displayName, height, bodyBuild, skinTone });
        router.push('/budget');
      }}>
        <input className="w-full rounded border p-2" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Height (optional)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Body build (optional)" value={bodyBuild} onChange={(e) => setBodyBuild(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Skin tone (optional)" value={skinTone} onChange={(e) => setSkinTone(e.target.value)} />
        <button className="rounded bg-brand px-4 py-2 text-white" type="submit">Save and continue</button>
      </form>
    </main>
  );
}
