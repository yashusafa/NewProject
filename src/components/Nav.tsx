import Link from 'next/link';

const links = [
  ['/', 'Home'],
  ['/onboarding', 'Onboarding'],
  ['/budget', 'Budget'],
  ['/style', 'Style'],
  ['/browse', 'Browse'],
  ['/builder', 'Builder'],
  ['/saved', 'Saved']
] as const;

export function Nav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 rounded-xl bg-white p-3 shadow-sm">
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="rounded-md bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200">
          {label}
        </Link>
      ))}
    </nav>
  );
}
