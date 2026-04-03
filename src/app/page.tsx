import Link from 'next/link';
import { Nav } from '@/components/Nav';

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase text-brand">FitBudget</p>
        <h1 className="text-3xl font-bold">Build complete outfits under budget.</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          FitBudget helps you pick a style, set a budget range, choose what counts toward budget, and assemble a full look from multiple vendors.
        </p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-lg bg-brand px-4 py-2 text-white" href="/onboarding">Start onboarding</Link>
          <Link className="rounded-lg bg-slate-900 px-4 py-2 text-white" href="/builder">Go to outfit builder</Link>
        </div>
      </section>
    </main>
  );
}
