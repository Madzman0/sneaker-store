import { useMemo, useState } from 'react';
import * as Motion from 'framer-motion/client';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { buildHomeSectionPath, buildProductPath, navigateTo } from '../utils/navigation.js';

const collections = [
  {
    id: 'new-season',
    title: 'New Season',
    eyebrow: 'Seasonal Edit',
    copy:
      'A fresh rotation of sculpted silhouettes, pale mineral tones, and studio-led details tuned for the first drop of the season.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80',
    note: 'Arrival Sequence / Spring Rotation',
    chips: ['Mineral palette', 'Fresh drop', 'Studio-finished'],
    featuredProductId: 'aurora-pulse-v1',
    accent:
      'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,244,0.92))] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.15),_transparent_52%),linear-gradient(180deg,rgba(39,39,42,0.95),rgba(9,9,11,0.98))]',
  },
  {
    id: 'urban-motion',
    title: 'Urban Motion',
    eyebrow: 'City Study',
    copy:
      'Built for long routes and quick pivots, this edit frames kinetic comfort and metropolitan polish through softer neutrals and sharp geometry.',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1600&q=80',
    note: 'Street Grid / Everyday Pace',
    chips: ['Commute ready', 'Low-profile luxury', 'Daily rotation'],
    featuredProductId: 'kinetic-echo-low',
    accent:
      'bg-[radial-gradient(circle_at_top,_rgba(161,161,170,0.16),_transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,244,245,0.92))] dark:bg-[radial-gradient(circle_at_top,_rgba(113,113,122,0.2),_transparent_52%),linear-gradient(180deg,rgba(39,39,42,0.95),rgba(9,9,11,0.98))]',
  },
  {
    id: 'night-shift',
    title: 'Night Shift',
    eyebrow: 'After-Hours Capsule',
    copy:
      'Reflective accents, darker gloss, and gallery-night energy define this editorial for collectors who move best after sunset.',
    image:
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80',
    note: 'Tokyo / 02:13 AM',
    chips: ['Reflective trim', 'After-dark mood', 'Collector run'],
    featuredProductId: 'lumen-orbit-high',
    accent:
      'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,244,0.9))] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_52%),linear-gradient(180deg,rgba(24,24,27,0.98),rgba(3,7,18,0.98))]',
  },
  {
    id: 'performance-lab',
    title: 'Performance Lab',
    eyebrow: 'Technical Series',
    copy:
      'Precision cushioning, faster lines, and material contrast come together in a more technical edit that still feels curated, not clinical.',
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1600&q=80',
    note: 'Prototype Bench / Track Edition',
    chips: ['Technical build', 'Energy return', 'Track-led design'],
    featuredProductId: 'spectral-lane-racer',
    accent:
      'bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,249,0.9))] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_52%),linear-gradient(180deg,rgba(30,41,59,0.98),rgba(2,6,23,0.98))]',
  },
];

function CollectionSelector({ collection, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all duration-300 sm:rounded-[1.8rem] ${
        isActive
          ? 'border-amber-400/70 bg-white/90 shadow-[0_20px_60px_rgba(251,191,36,0.12)] dark:border-amber-300/40 dark:bg-white/8 dark:shadow-[0_22px_65px_rgba(0,0,0,0.42)]'
          : 'border-zinc-200 bg-white/72 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 dark:text-white/35">
            {collection.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl dark:text-white">
            {collection.title}
          </h3>
        </div>
        <div
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            isActive
              ? 'border-amber-400/60 bg-amber-300/15 text-amber-700 dark:border-amber-300/40 dark:text-amber-200'
              : 'border-zinc-200 bg-white text-zinc-500 group-hover:border-amber-300 group-hover:text-amber-700 dark:border-white/10 dark:bg-white/5 dark:text-white/45 dark:group-hover:text-amber-200'
          }`}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-white/58">
        {collection.copy}
      </p>
    </button>
  );
}

export default function FeaturedCampaign() {
  const [activeCollectionId, setActiveCollectionId] = useState('night-shift');

  const activeCollection = useMemo(
    () =>
      collections.find((collection) => collection.id === activeCollectionId) ??
      collections[0],
    [activeCollectionId]
  );

  return (
    <section
      id="editorial"
      className="border-b border-zinc-200 bg-gradient-to-b from-stone-100 via-white to-stone-100 transition-colors duration-300 dark:border-white/10 dark:from-black dark:via-zinc-950 dark:to-black"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Editorial Collections
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              Curated themes for how the collection should feel, not just what it should sell.
            </h2>
          </div>
          <p className="max-w-xl text-sm text-zinc-600 transition-colors duration-300 dark:text-white/65">
            Each edit frames the product through a mood, a setting, and a pace,
            giving KIXORA a more journal-like retail language.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
          <Motion.article
            key={activeCollection.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden rounded-[2rem] border border-zinc-200 shadow-[0_34px_100px_rgba(15,23,42,0.12)] transition-colors duration-300 sm:rounded-[2.6rem] dark:border-white/10 dark:shadow-[0_34px_100px_rgba(0,0,0,0.5)] ${activeCollection.accent}`}
          >
            <div className="grid gap-6 p-4 sm:gap-8 sm:p-5 md:grid-cols-[1.05fr,0.95fr] md:p-6">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-zinc-200/80 sm:rounded-[2rem] dark:border-white/10">
                <img
                  src={activeCollection.image}
                  alt={`${activeCollection.title} editorial`}
                  className="h-[18rem] w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-[24rem] md:h-full"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.16))] dark:bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.4))]" />
                <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-zinc-700 backdrop-blur sm:left-4 sm:top-4 sm:text-[10px] sm:tracking-[0.22em] dark:bg-black/70 dark:text-white/75">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" strokeWidth={1.8} />
                  {activeCollection.note}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 px-1 py-1 sm:py-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400 dark:text-white/35">
                    {activeCollection.eyebrow}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                    {activeCollection.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600 dark:text-white/68">
                    {activeCollection.copy}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em]">
                    {activeCollection.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-zinc-200 bg-white/78 px-3 py-1 text-zinc-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/60"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo(buildProductPath(activeCollection.featuredProductId))
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
                  >
                    View Featured Pair
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(buildHomeSectionPath('trending'))}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-amber-300 dark:hover:text-amber-200"
                  >
                    Browse Current Rotation
                  </button>
                </div>
              </div>
            </div>
          </Motion.article>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            {collections.map((collection) => (
              <CollectionSelector
                key={collection.id}
                collection={collection}
                isActive={collection.id === activeCollection.id}
                onSelect={() => setActiveCollectionId(collection.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
