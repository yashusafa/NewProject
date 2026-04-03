import Link from 'next/link';
import { Nav } from '@/components/Nav';

const highlights = [
  'Budget-first outfit planning with category-aware spend tracking',
  'Browse multiple vendors through a normalized product model',
  'Simple 2D avatar outfit visualization with instant updates',
  'Saved outfits and profile preferences you can revisit anytime'
];

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <section className="rounded-3xl bg-gradient-to-br from-white to-brand-muted p-8 shadow-sm md:p-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">FitBudget</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Build complete outfits under budget without losing your style.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          FitBudget helps you set real spending ranges, pick the categories that count, choose a vibe or occasion,
          and assemble looks from multiple vendors in one streamlined browser workflow.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-brand px-5 py-3 font-medium text-white" href="/signup">Create account</Link>
          <Link className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white" href="/shop">Browse products</Link>
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <article key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-slate-700">{item}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
