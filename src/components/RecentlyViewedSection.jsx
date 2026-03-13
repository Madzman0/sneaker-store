import { ArrowUpRight, History } from 'lucide-react';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import { buildProductPath, navigateTo } from '../utils/navigation.js';

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

export default function RecentlyViewedSection({ currentProductId }) {
  const { recentProducts, clearRecentlyViewed } = useRecentlyViewed();

  const visibleProducts = recentProducts.filter(
    (product) => product.id !== currentProductId
  );

  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-zinc-200 bg-gradient-to-b from-stone-100/95 to-white/95 transition-colors duration-300 dark:border-white/10 dark:from-zinc-950/92 dark:to-black/95">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Recently Viewed
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Return to the pairs that held your attention.
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-white/62">
              A private viewing rail for the silhouettes you opened most recently,
              kept locally on this device for a smoother AUREL browsing flow.
            </p>
          </div>

          <button
            type="button"
            onClick={clearRecentlyViewed}
            className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            Clear history
          </button>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {visibleProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => navigateTo(buildProductPath(product.id))}
              className="group min-w-[18rem] max-w-[18rem] flex-none overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/88 text-left shadow-[0_18px_56px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_56px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.15))] dark:bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.42))]" />
                <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/82 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-700 backdrop-blur dark:bg-black/70 dark:text-white/70">
                  <History className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" strokeWidth={1.8} />
                  {product.tag}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-amber-700 dark:text-amber-200">
                      {formatPrice(product.price)}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500 dark:text-white/50">
                      {product.rating.toFixed(1)} rating
                    </p>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors group-hover:border-amber-300 group-hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:group-hover:text-amber-200">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
