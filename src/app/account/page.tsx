'use client';

import { Nav } from '@/components/Nav';
import { loadAppState } from '@/lib/auth/session';
import { useRequireSession } from '@/lib/hooks/useRequireSession';

export default function AccountPage() {
  useRequireSession();
  const state = loadAppState();

  return (
    <main>
      <Nav />
      <h1 className="mb-4 text-2xl font-semibold">Account</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Profile</h2>
          <p className="text-sm">Name: {state.session?.displayName ?? 'Unknown'}</p>
          <p className="text-sm">Email: {state.session?.email ?? 'Unknown'}</p>
          <p className="mt-2 text-xs text-slate-500">Edit in onboarding flow.</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Budget profile</h2>
          <p className="text-sm">Range: ${state.budget?.minBudget ?? 0} - ${state.budget?.maxBudget ?? 0}</p>
          <p className="text-sm">Included categories: {state.budget?.includedCategories?.join(', ') ?? 'None'}</p>
          <p className="text-sm">Trend preference: {state.budget?.trendPreference ?? 0}</p>
        </section>
      </div>
    </main>
  );
}
