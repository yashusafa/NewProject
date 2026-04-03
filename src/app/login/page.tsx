'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { loginSchema } from '@/lib/validation/forms';
import { signInLocal } from '@/lib/auth/session';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to continue building budget-aware outfits.</p>
        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = loginSchema.safeParse({ email, password });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? 'Invalid login details');
              return;
            }
            signInLocal({ email });
            window.location.href = '/onboarding';
          }}
        >
          <input className="w-full rounded-lg border p-2.5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-lg border p-2.5" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white" type="submit">Log in</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">No account yet? <Link href="/signup" className="text-brand underline">Create one</Link></p>
      </section>
    </main>
  );
}
