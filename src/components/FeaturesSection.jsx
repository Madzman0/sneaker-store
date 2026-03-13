import { Headphones, Rocket, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Fast Delivery',
    description:
      'Carefully packed, fully insured shipping so your pairs travel from vault to doorstep in days, never weeks.',
    icon: Rocket,
    accent: 'from-emerald-400/40 to-emerald-500/10',
  },
  {
    title: 'Secure Checkout',
    description:
      'Bank-grade encryption, multi-step verification, and instant proof of authenticity with every transaction.',
    icon: ShieldCheck,
    accent: 'from-amber-300/50 to-amber-500/10',
  },
  {
    title: 'Premium Support',
    description:
      'Collector-first concierge to help with sizing, care, and sourcing rare silhouettes for your rotation.',
    icon: Headphones,
    accent: 'from-sky-400/40 to-sky-500/10',
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-b border-zinc-200 bg-stone-100 transition-colors duration-300 dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Service, elevated
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-white">
              Designed around the modern collector.
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-600 transition-colors duration-300 dark:text-white/70">
            From tap to doorstep, every touchpoint is tuned for certainty,
            speed, and white-glove care, no matter where you are in the world.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-[0_0_45px_rgba(0,0,0,0.7)]"
              >
                <div
                  className={`pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-60`}
                />

                <div className="relative space-y-4 transition-transform duration-200 group-hover:-translate-y-0.5">
                  <div className="inline-flex rounded-full border border-zinc-200 bg-white p-2.5 text-amber-500 shadow-[0_8px_22px_rgba(217,119,6,0.12)] transition-colors duration-300 dark:border-white/15 dark:bg-black/70 dark:text-amber-200 dark:shadow-[0_8px_28px_rgba(0,0,0,0.7)]">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-zinc-950 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-xs text-zinc-600 transition-colors duration-300 dark:text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
