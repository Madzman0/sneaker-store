import { useEffect, useMemo, useState } from 'react';
import { products as baseProducts } from '../data/products';
import { ProductCardSkeleton } from './LoadingSkeletons.jsx';
import ProductCard from './ProductCard';

const FILTERS = ['All', 'Running', 'Lifestyle', 'Basketball', 'Casual'];
const SORT_OPTIONS = [
  'Featured',
  'Price Low to High',
  'Price High to Low',
  'Highest Rated',
];

// Map product IDs to display segments used for filtering.
const segmentById = {
  'spectral-lane-racer': 'Running',
  'aurora-pulse-v1': 'Lifestyle',
  'noir-eclipse-runner': 'Lifestyle',
  'lumen-orbit-high': 'Basketball',
  'chromatic-drift-vx': 'Basketball',
  'kinetic-echo-low': 'Casual',
};

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [isLoading, setIsLoading] = useState(true);

  const products = useMemo(
    () =>
      baseProducts.map((product) => ({
        ...product,
        segment: segmentById[product.id] ?? 'Lifestyle',
      })),
    []
  );

  const filtered = useMemo(() => {
    const nextProducts =
      activeFilter === 'All'
        ? [...products]
        : products.filter((product) => product.segment === activeFilter);

    if (sortOption === 'Price Low to High') {
      return nextProducts.sort((left, right) => left.price - right.price);
    }

    if (sortOption === 'Price High to Low') {
      return nextProducts.sort((left, right) => right.price - left.price);
    }

    if (sortOption === 'Highest Rated') {
      return nextProducts.sort((left, right) => right.rating - left.rating);
    }

    return nextProducts;
  }, [activeFilter, products, sortOption]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 620);

    return () => window.clearTimeout(timer);
  }, [activeFilter, sortOption]);

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;

    setIsLoading(true);
    setActiveFilter(filter);
  };

  const handleSortChange = (option) => {
    if (option === sortOption) return;

    setIsLoading(true);
    setSortOption(option);
  };

  return (
    <section
      id="trending"
      className="border-b border-zinc-200 bg-stone-100/80 transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/80"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Featured Rotation
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 transition-colors duration-300 md:text-3xl dark:text-white">
              This week&apos;s gallery wall.
            </h2>
          </div>

          {/* Filters */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 dark:text-white/70">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`rounded-full border px-3.5 py-1.5 transition-colors ${
                    isActive
                      ? 'border-amber-500 bg-amber-400/15 text-amber-700 dark:border-amber-300 dark:bg-amber-300/15 dark:text-amber-200'
                      : 'border-zinc-300 bg-white/70 text-zinc-600 hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 dark:border-white/15 dark:bg-white/0 dark:text-white/70 dark:hover:border-amber-300/80 dark:hover:text-amber-100'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500 dark:text-white/55">
            {filtered.length} curated styles on display.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 dark:text-white/35">
              Sort by
            </span>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {SORT_OPTIONS.map((option) => {
                const isActive = option === sortOption;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSortChange(option)}
                    className={`rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`product-skeleton-${index}`} />
              ))
            : filtered.map((product) => (
                <div
                  key={`${product.id}-${activeFilter}-${sortOption}`}
                  className="opacity-0 translate-y-3 animate-[fadeInUp_260ms_ease-out_forwards]"
                >
                  <ProductCard product={product} />
                </div>
              ))}

          {/* Small helper when no matches (future-proofing) */}
          {!isLoading && filtered.length === 0 && (
            <p className="col-span-full pt-4 text-sm text-zinc-500 transition-colors duration-300 dark:text-white/60">
              No sneakers found in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
