const testimonials = [
  {
    name: 'Mara K.',
    role: 'Creative Director & Collector',
    quote:
      'KIXORA feels more like an art advisory than a sneaker store. Every pair arrives like a gallery piece.',
    rating: 5,
  },
  {
    name: 'Tariq L.',
    role: 'Sneaker Archivist',
    quote:
      'The provenance trail and condition reports are on a different level. It changed how I build my rotation.',
    rating: 5,
  },
  {
    name: 'Elena V.',
    role: 'Luxury Buyer',
    quote:
      'From unboxing to storage recommendations, the experience is as considered as the sneakers themselves.',
    rating: 4.8,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="about"
      className="border-b border-zinc-200 bg-gradient-to-b from-stone-100 via-white to-stone-100 transition-colors duration-300 dark:border-white/10 dark:from-black dark:via-zinc-950 dark:to-black"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:py-18">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Voices from the vault
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-white">
              Trusted by collectors worldwide.
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-600 transition-colors duration-300 dark:text-white/70">
            Curators, archivists, and long-time collectors choose KIXORA for the
            details, provenance, condition, and care at every step.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="group relative translate-y-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-5 opacity-0 shadow-[0_12px_36px_rgba(15,23,42,0.08)] animate-[fadeInUp_280ms_ease-out_forwards] transition-colors duration-300 sm:p-6 dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-none"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-300/8 via-transparent to-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-wrap items-center gap-2 text-[11px] text-amber-500 dark:text-amber-200">
                <div className="flex items-center gap-0.5">
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                </div>
                <span className="text-zinc-500 dark:text-white/60">
                  {testimonial.rating.toFixed(1)} average experience
                </span>
              </div>

              <p className="relative mt-4 text-sm leading-7 text-zinc-700 transition-colors duration-300 dark:text-white/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <figcaption className="relative mt-5 text-xs leading-6 text-zinc-500 transition-colors duration-300 dark:text-white/60">
                <span className="font-semibold text-zinc-950 dark:text-white">
                  {testimonial.name}
                </span>
                <span className="mx-2 text-zinc-300 dark:text-white/35">/</span>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
