'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { styleModes } from '@/lib/types/domain';
import { loadPrefs, savePrefs } from '@/lib/db/localStore';

export default function StylePage() {
  const router = useRouter();
  const prefs = loadPrefs();
  const [styleMode, setStyleMode] = useState(prefs.styleMode);

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Select style / occasion</h1>
      <div className="grid gap-2 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2">
        {styleModes.map((mode) => (
          <button key={mode} className={`rounded border p-3 text-left ${styleMode === mode ? 'border-brand bg-brand/10' : ''}`} onClick={() => setStyleMode(mode)}>{mode}</button>
        ))}
      </div>
      <button className="mt-4 rounded bg-brand px-4 py-2 text-white" onClick={() => {
        savePrefs({ styleMode });
        router.push('/browse');
      }}>Save and browse</button>
    </main>
  );
}
