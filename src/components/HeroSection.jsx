import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import { formatReleaseDate, getStockStatusTone } from '../utils/productMeta.js';
import { buildProductPath, navigateTo } from '../utils/navigation.js';

const stats = [
  { label: 'Pairs Curated', value: '2.3k+' },
  { label: 'Collector Cities', value: '47' },
  { label: 'Sell-through Rate', value: '92%' },
];

function formatDropWindow(dropEndsAt, referenceTime = Date.now()) {
  if (!dropEndsAt) {
    return 'Now live';
  }

  const target = new Date(dropEndsAt).getTime();

  if (Number.isNaN(target)) {
    return 'Now live';
  }

  const difference = target - referenceTime;

  if (difference <= 0) {
    return 'Closing today';
  }

  const totalHours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (days === 0) {
    return `${hours}h remaining`;
  }

  return `${days}d ${hours}h remaining`;
}

function scrollToSection(targetId) {
  const section = document.getElementById(targetId);
  if (!section) return;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroSection() {
  const featuredProduct = useMemo(() => {
    const explicitFeature = products.find((product) => product.heroFeatured);

    if (explicitFeature) {
      return explicitFeature;
    }

    return [...products].sort(
      (left, right) =>
        new Date(right.releaseDate).getTime() - new Date(left.releaseDate).getTime()
    )[0];
  }, []);

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const dropWindow = formatDropWindow(featuredProduct?.dropEndsAt, currentTime);
  const stockTone = getStockStatusTone(featuredProduct.stockStatus);

  return (
    <section
      id="new-drops"
      className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-stone-200 via-stone-100 to-white transition-colors duration-300 dark:border-white/10 dark:from-zinc-950 dark:via-black dark:to-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.12),_transparent_58%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_58%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:gap-12 md:py-20">
        <div className="flex-1 space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-300">
            AUREL / Sneaker Atelier
          </p>

          <h1 className="text-[2.45rem] font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-[3.4rem] md:leading-[1.05] dark:text-white">
            Where <span className="text-amber-500 dark:text-amber-300">sneakers</span> graduate
            <br className="hidden sm:block" /> from street to gallery.
          </h1>

          <p className="max-w-xl text-sm text-zinc-600 transition-colors duration-300 md:text-base dark:text-white/75">
            AUREL curates limited-run silhouettes, studio collaborations, and
            future icons, authenticated, archived, and delivered with
            museum-grade care for modern collectors.
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <button
              type="button"
              onClick={() => scrollToSection('collections')}
              className="rounded-full bg-zinc-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(217,119,6,0.18)] transition-transform transition-colors hover:-translate-y-0.5 hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:shadow-[0_14px_45px_rgba(0,0,0,0.6)] dark:hover:bg-amber-200"
            >
              Explore live drops
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('newsletter')}
              className="rounded-full border border-zinc-300 bg-white/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 dark:border-white/25 dark:bg-transparent dark:text-white dark:hover:border-amber-300 dark:hover:text-amber-200"
            >
              Join collector waitlist
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-zinc-500 transition-colors duration-300 sm:flex sm:flex-wrap sm:gap-6 sm:pt-5 dark:text-white/60">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-base font-semibold text-zinc-950 transition-colors duration-300 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-sm rounded-[1.9rem] border border-zinc-200 bg-[radial-gradient(circle_at_15%_0,_rgba(251,191,36,0.22),_transparent_60%),radial-gradient(circle_at_85%_100%,_rgba(255,255,255,0.92),_transparent_55%)] shadow-[0_25px_80px_rgba(15,23,42,0.14)] transition-colors duration-300 dark:border-white/10 dark:bg-[radial-gradient(circle_at_15%_0,_rgba(251,191,36,0.32),_transparent_60%),radial-gradient(circle_at_85%_100%,_rgba(248,250,252,0.22),_transparent_55%)] dark:shadow-[0_0_90px_rgba(0,0,0,0.9)]">
            <div className="flex h-full flex-col justify-between rounded-[1.8rem] bg-white/75 p-4 backdrop-blur-xl transition-colors duration-300 sm:p-6 dark:bg-black/40">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase text-zinc-500 transition-colors duration-300 dark:text-white/70">
                <span className="max-w-full rounded-full bg-zinc-900/5 px-3 py-1 text-[9px] tracking-[0.18em] dark:bg-white/5 sm:tracking-[0.22em]">
                  {featuredProduct.collectionName}
                </span>
                <span>{formatReleaseDate(featuredProduct.releaseDate)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigateTo(buildProductPath(featuredProduct.id))}
                className="relative mt-6 flex flex-1 items-center justify-center"
              >
                <div className="absolute inset-x-10 bottom-8 h-8 rounded-full bg-black/25 blur-xl dark:bg-black/60" />
                <div className="absolute inset-x-12 top-6 h-24 rounded-full bg-amber-300/30 blur-[80px] dark:bg-amber-300/18" />
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="relative h-52 w-full rounded-[1.6rem] object-cover shadow-[0_26px_60px_rgba(0,0,0,0.28)] transition-transform duration-700 hover:scale-[1.03] sm:h-56 sm:rounded-[2.2rem] dark:shadow-[0_26px_60px_rgba(0,0,0,0.72)]"
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/82 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-zinc-700 backdrop-blur sm:right-4 sm:top-4 sm:px-3 sm:tracking-[0.22em] dark:border-white/10 dark:bg-black/65 dark:text-white/75">
                  Live selection
                </span>
              </button>

              <div className="mt-6 space-y-3 text-xs text-zinc-600 transition-colors duration-300 dark:text-white/75">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500 dark:text-amber-200">
                      {featuredProduct.tag}
                    </p>
                    <p className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
                      {featuredProduct.name}
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-zinc-500 transition-colors duration-300 dark:text-white/60">
                    <p>Drop window - {dropWindow}</p>
                    <p>Pairs - {featuredProduct.pairsAvailable} worldwide</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-[10px] text-zinc-500 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4 dark:text-white/55">
                  <p className="max-w-[16rem] leading-5">
                    {featuredProduct.detailNotes?.[0]}
                  </p>
                  <p
                    className={`self-start rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] sm:self-auto dark:bg-white/5 ${stockTone}`}
                  >
                    {featuredProduct.stockStatus}
                  </p>
                </div>

                <div className="flex flex-col gap-3 text-[10px] text-zinc-500 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between dark:text-white/55">
                  <p>Carbon-balanced shipping included</p>
                  <span className="inline-flex items-center gap-1 self-start rounded-full bg-zinc-900 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white sm:self-auto dark:bg-white dark:text-black">
                    View pair
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
