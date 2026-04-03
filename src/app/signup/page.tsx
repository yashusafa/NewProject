'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { signupSchema } from '@/lib/validation/forms';
import { signInLocal } from '@/lib/auth/session';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Create your FitBudget account</h1>
        <p className="mt-1 text-sm text-slate-600">Start with profile + budget setup and build complete outfits faster.</p>
        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = signupSchema.safeParse({ email, password, displayName });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? 'Invalid signup details');
              return;
            }
            signInLocal({ email, displayName });
            window.location.href = '/onboarding';
          }}
        >
          <input className="w-full rounded-lg border p-2.5" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <input className="w-full rounded-lg border p-2.5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-lg border p-2.5" placeholder="Password (8+ chars)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button className="w-full rounded-lg bg-brand py-2.5 font-medium text-white" type="submit">Create account</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">Already registered? <Link href="/login" className="text-brand underline">Log in</Link></p>
      </section>
    </main>
  );
}
