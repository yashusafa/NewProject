'use client';

import Link from 'next/link';
import { clearSession, loadAppState } from '@/lib/auth/session';
import { useMemo } from 'react';

const links = [
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/outfit-builder', 'Outfit Builder'],
  ['/saved-outfits', 'Saved Outfits'],
  ['/account', 'Account']
] as const;

export function Nav() {
  const session = useMemo(() => loadAppState().session, []);

  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {session ? (
          <>
            <span className="rounded-md bg-brand/10 px-2 py-1 text-brand">{session.displayName}</span>
            <button
              className="rounded-md bg-slate-900 px-3 py-1.5 text-white"
              onClick={() => {
                clearSession();
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="rounded-md bg-slate-900 px-3 py-1.5 text-white">Login</Link>
            <Link href="/signup" className="rounded-md bg-brand px-3 py-1.5 text-white">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
