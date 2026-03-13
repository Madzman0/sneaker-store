import { useEffect, useState } from 'react';
import * as Motion from 'framer-motion/client';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { formatReleaseDate, getStockStatusTone } from '../utils/productMeta.js';
import { buildProductPath, navigateTo } from '../utils/navigation.js';
import { SpotlightCarouselSkeleton } from './LoadingSkeletons.jsx';

const LUXURY_EASE = [0.16, 1, 0.3, 1];
const FLOAT_EASE = 'easeInOut';

const DESKTOP_SLOTS = {
  farLeft: {
    x: -560,
    scale: 0.52,
    opacity: 0,
    rotate: -11,
    zIndex: 0,
  },
  left: {
    x: -332,
    scale: 0.72,
    opacity: 0.4,
    rotate: -9,
    zIndex: 10,
  },
  center: {
    x: 0,
    scale: 1.04,
    opacity: 1,
    rotate: 0,
    zIndex: 30,
  },
  right: {
    x: 332,
    scale: 0.72,
    opacity: 0.4,
    rotate: 9,
    zIndex: 10,
  },
  farRight: {
    x: 560,
    scale: 0.52,
    opacity: 0,
    rotate: 11,
    zIndex: 0,
  },
};

function wrapIndex(index, length) {
  return (index + length) % length;
}

function getRelativeOffset(index, activeIndex, length) {
  const rawOffset = index - activeIndex;
  const midpoint = Math.floor(length / 2);
  return ((rawOffset + length + midpoint) % length) - midpoint;
}

function getDesktopSlot(offset) {
  if (offset === 0) return DESKTOP_SLOTS.center;
  if (offset === -1) return DESKTOP_SLOTS.left;
  if (offset === 1) return DESKTOP_SLOTS.right;
  return offset < 0 ? DESKTOP_SLOTS.farLeft : DESKTOP_SLOTS.farRight;
}

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

function DesktopSneakerCard({ product, offset, isActive, onSelect, onActivate }) {
  const slot = getDesktopSlot(offset);
  const isVisible = Math.abs(offset) <= 1;

  return (
    <Motion.button
      type="button"
      layout
      onClick={() => {
        if (!isVisible) return;
        if (isActive) {
          onActivate?.();
          return;
        }

        onSelect();
      }}
      animate={slot}
      transition={{
        duration: 1.4,
        ease: LUXURY_EASE,
      }}
      className="absolute left-1/2 top-8 w-[19.25rem] -translate-x-1/2 text-left"
      style={{
        zIndex: slot.zIndex,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Motion.div
        animate={
          isActive
            ? {
                y: [0, -12, 0],
                scale: [1, 1.02, 1],
              }
            : {
                y: 18,
                scale: 1,
              }
        }
        transition={
          isActive
            ? {
                duration: 7.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: FLOAT_EASE,
              }
            : {
                duration: 1,
                ease: LUXURY_EASE,
              }
        }
        className="relative"
      >
        {isActive && (
          <>
            <Motion.div
              aria-hidden="true"
              className="absolute inset-x-4 top-8 h-64 rounded-full bg-amber-300/22 blur-[110px] dark:bg-amber-300/16"
              animate={{ opacity: [0.52, 0.76, 0.52], scale: [0.96, 1.04, 0.96] }}
              transition={{
                duration: 6.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: FLOAT_EASE,
              }}
            />
            <Motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[21.2rem] h-14 w-60 -translate-x-1/2 rounded-full bg-black/16 blur-[28px] dark:bg-black/58"
              animate={{
                scaleX: [0.9, 1.06, 0.9],
                scaleY: [0.92, 1.02, 0.92],
                opacity: [0.18, 0.28, 0.18],
              }}
              transition={{
                duration: 7.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: FLOAT_EASE,
              }}
            />
            <Motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[21.8rem] h-8 w-40 -translate-x-1/2 rounded-full bg-black/10 blur-xl dark:bg-black/36"
              animate={{
                scaleX: [0.94, 1.04, 0.94],
                opacity: [0.14, 0.2, 0.14],
              }}
              transition={{
                duration: 7.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: FLOAT_EASE,
              }}
            />
          </>
        )}

        <div
          className={`relative overflow-hidden rounded-[2.2rem] border p-4 backdrop-blur-xl transition-colors duration-300 ${
            isActive
              ? 'border-zinc-200/90 bg-gradient-to-b from-white via-stone-50 to-stone-100 shadow-[0_36px_100px_rgba(15,23,42,0.14)] dark:border-white/12 dark:from-zinc-900/95 dark:via-black dark:to-zinc-950 dark:shadow-[0_34px_100px_rgba(0,0,0,0.7)]'
              : 'border-zinc-200/70 bg-gradient-to-b from-white/92 via-stone-50 to-stone-100/88 shadow-[0_18px_52px_rgba(15,23,42,0.07)] dark:border-white/10 dark:from-zinc-900/72 dark:via-black/88 dark:to-zinc-950/84 dark:shadow-[0_18px_42px_rgba(0,0,0,0.38)]'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_64%)] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_64%)]" />

          <div className="relative">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500 dark:text-white/55">
              <span className="rounded-full bg-amber-400/12 px-3 py-1 text-amber-700 dark:bg-white/5 dark:text-amber-300">
                {product.tag}
              </span>
              <span>{product.category}</span>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[1.8rem] border border-zinc-200/80 bg-[radial-gradient(circle_at_50%_18%,rgba(251,191,36,0.18),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,244,0.88))] p-5 dark:border-white/10 dark:bg-[radial-gradient(circle_at_50%_18%,rgba(251,191,36,0.18),transparent_56%),linear-gradient(180deg,rgba(39,39,42,0.92),rgba(9,9,11,0.96))]">
              <Motion.img
                src={product.image}
                alt={product.name}
                className="mx-auto h-[17rem] w-full rounded-[1.35rem] object-cover"
                animate={{
                  scale: isActive ? 1.1 : 0.92,
                  filter: isActive
                    ? 'brightness(1) saturate(1)'
                    : 'brightness(0.76) saturate(0.72)',
                }}
                transition={{
                  duration: 1.4,
                  ease: LUXURY_EASE,
                }}
              />
            </div>
          </div>
        </div>
      </Motion.div>
    </Motion.button>
  );
}

function MobileFeaturedCard({
  product,
  direction,
  onAddToCart,
  onDragEnd,
  onViewDetails,
}) {
  return (
    <Motion.article
      key={`${product.id}-${direction}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={onDragEnd}
      initial={{
        opacity: 0.55,
        x: direction > 0 ? 52 : -52,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.9,
        ease: LUXURY_EASE,
      }}
      className="overflow-hidden rounded-[1.7rem] border border-zinc-200 bg-gradient-to-b from-white via-stone-50 to-stone-100 p-3.5 shadow-[0_20px_54px_rgba(15,23,42,0.08)] transition-colors duration-300 sm:rounded-[2rem] sm:p-4 dark:border-white/10 dark:from-zinc-900/92 dark:via-black dark:to-zinc-950 dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500 dark:text-white/55">
        <span className="rounded-full bg-amber-400/12 px-3 py-1 text-amber-700 dark:bg-white/5 dark:text-amber-300">
          {product.tag}
        </span>
        <span>{product.category}</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-zinc-200/80 bg-[radial-gradient(circle_at_50%_18%,rgba(251,191,36,0.18),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,244,0.88))] p-3.5 sm:rounded-[1.6rem] sm:p-4 dark:border-white/10 dark:bg-[radial-gradient(circle_at_50%_18%,rgba(251,191,36,0.18),transparent_56%),linear-gradient(180deg,rgba(39,39,42,0.92),rgba(9,9,11,0.96))]">
        <img
          src={product.image}
          alt={product.name}
          className="h-60 w-full rounded-[1.05rem] object-cover sm:h-72 sm:rounded-[1.2rem]"
          loading="lazy"
        />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400 dark:text-white/35">
            Featured Pair
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-white/65">
            {product.category}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-lg font-semibold text-amber-700 dark:text-amber-200">
            {formatPrice(product.price)}
          </span>
          <span className="text-zinc-500 dark:text-white/55">{product.tag}</span>
        </div>

        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-white/50">
          <span className="rounded-full border border-zinc-200 bg-white/85 px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
            {product.collectionName}
          </span>
          <span className="rounded-full border border-zinc-200 bg-white/85 px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
            {formatReleaseDate(product.releaseDate)}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onViewDetails?.()}
            className="w-full rounded-full border border-zinc-200 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            View details
          </button>
          <button
            type="button"
            onClick={() => onAddToCart?.()}
            className="w-full rounded-full bg-zinc-900 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Motion.article>
  );
}

export default function FeaturedSneakerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { openQuickView, showToast } = useStoreUI();

  const activeProduct = products[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 760);

    return () => window.clearTimeout(timer);
  }, []);

  const goToIndex = (targetIndex) => {
    if (targetIndex === activeIndex) return;

    const forwardDistance =
      (targetIndex - activeIndex + products.length) % products.length;
    const backwardDistance =
      (activeIndex - targetIndex + products.length) % products.length;

    setDirection(forwardDistance <= backwardDistance ? 1 : -1);
    setActiveIndex(targetIndex);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((currentIndex) =>
      wrapIndex(currentIndex - 1, products.length)
    );
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((currentIndex) =>
      wrapIndex(currentIndex + 1, products.length)
    );
  };

  const handleMobileDragEnd = (_, info) => {
    if (info.offset.x >= 80) {
      goToPrevious();
      return;
    }

    if (info.offset.x <= -80) {
      goToNext();
    }
  };

  return (
    <section
      id="collections"
      className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(245,245,244,0.94),rgba(255,255,255,1))] transition-colors duration-300 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(9,9,11,1),rgba(24,24,27,0.98))]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:py-18">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
              Spotlight Selection
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              A center-stage carousel built like a luxury product pedestal.
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-white/65">
              The featured pair rises into focus while neighboring silhouettes
              recede softly into the wings, keeping the transition cinematic and
              controlled.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous sneaker"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next sneaker"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <SpotlightCarouselSkeleton />
        ) : (
          <>
        <div className="mt-10 hidden lg:block">
          <div className="relative overflow-hidden rounded-[2.8rem] border border-zinc-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,244,0.92))] px-10 py-10 shadow-[0_42px_110px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_46%),linear-gradient(180deg,rgba(24,24,27,0.98),rgba(9,9,11,0.98))] dark:shadow-[0_34px_110px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/45 to-transparent dark:via-amber-300/30" />
            <div className="pointer-events-none absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-300/12 blur-[160px] dark:bg-amber-300/10" />

            <div className="relative h-[31.5rem]">
              {products.map((product, index) => {
                const offset = getRelativeOffset(
                  index,
                  activeIndex,
                  products.length
                );

                return (
                  <DesktopSneakerCard
                    key={product.id}
                    product={product}
                    offset={offset}
                    isActive={offset === 0}
                    onSelect={() => goToIndex(index)}
                    onActivate={() => navigateTo(buildProductPath(product.id))}
                  />
                );
              })}
            </div>

            <Motion.div
              key={activeProduct.id}
              layout
              initial={{
                opacity: 0.6,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease: LUXURY_EASE,
              }}
              className="relative mt-8 grid items-end gap-10 border-t border-zinc-200/80 pt-8 dark:border-white/10 md:grid-cols-[1.15fr,0.85fr]"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
                  Active Pair
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-amber-400/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-700 dark:bg-white/5 dark:text-amber-300">
                    {activeProduct.tag}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/50">
                    {activeProduct.category}
                  </span>
                </div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {activeProduct.name}
                </h3>
                <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-white/65">
                  {activeProduct.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/50">
                  <span className="rounded-full border border-zinc-200 bg-white/85 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                    {activeProduct.collectionName}
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white/85 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                    {formatReleaseDate(activeProduct.releaseDate)}
                  </span>
                  {activeProduct.detailNotes?.[0] && (
                    <span className="rounded-full border border-zinc-200 bg-white/85 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                      {activeProduct.detailNotes[0]}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
                    Price
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-amber-700 dark:text-amber-200">
                      {formatPrice(activeProduct.price)}
                    </span>
                    <span className="text-sm text-zinc-400 line-through dark:text-white/30">
                      {formatPrice(activeProduct.oldPrice)}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-[11px] uppercase tracking-[0.22em] ${getStockStatusTone(
                      activeProduct.stockStatus
                    )}`}
                  >
                    {activeProduct.stockStatus}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo(buildProductPath(activeProduct.id))}
                    className="inline-flex rounded-full border border-zinc-200 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-amber-300 dark:hover:text-amber-200"
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    onClick={() => openQuickView(activeProduct)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-amber-300 dark:hover:text-amber-200"
                  >
                    <Eye className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(activeProduct);
                      showToast('Added to cart', 'success');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
                    Add to cart
                  </button>
                </div>
              </div>
            </Motion.div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(products.length).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-2">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    aria-label={`Show ${product.name}`}
                    onClick={() => goToIndex(index)}
                    className={`rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? 'h-2.5 w-10 bg-zinc-900 dark:bg-white'
                        : 'h-2.5 w-2.5 bg-zinc-300 hover:bg-amber-400 dark:bg-white/20 dark:hover:bg-amber-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <div className="rounded-[1.8rem] border border-zinc-200 bg-white/90 p-3 shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition-colors duration-300 sm:rounded-[2rem] sm:p-4 dark:border-white/10 dark:bg-zinc-950/88 dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <MobileFeaturedCard
              product={activeProduct}
              direction={direction}
              onAddToCart={() => {
                addItem(activeProduct);
                showToast('Added to cart', 'success');
              }}
              onViewDetails={() => navigateTo(buildProductPath(activeProduct.id))}
              onDragEnd={handleMobileDragEnd}
            />

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 sm:px-4 sm:tracking-[0.22em] dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
              >
                Previous
              </button>
              <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
                Swipe or tap
              </div>
              <button
                type="button"
                onClick={goToNext}
                className="rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 sm:px-4 sm:tracking-[0.22em] dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
}
