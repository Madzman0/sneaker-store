import * as Motion from 'framer-motion/client';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatReleaseDate, getStockStatusTone } from '../utils/productMeta.js';
import { buildProductPath, navigateTo } from '../utils/navigation.js';

export default function ProductCard({ product }) {
  const {
    name,
    category,
    price,
    oldPrice,
    rating,
    reviews,
    image,
    tag,
    stockStatus,
    sizes = [],
    collectionName,
    releaseDate,
    detailNotes = [],
  } = product;

  const { addItem } = useCart();
  const { openQuickView, showToast } = useStoreUI();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <Motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-stone-100 p-4 text-zinc-900 shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:from-zinc-900/90 dark:to-black/95 dark:text-white dark:shadow-[0_0_40px_rgba(0,0,0,0.7)]"
      onClick={() => navigateTo(buildProductPath(product.id))}
    >
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em]">
        <span className="rounded-full bg-amber-400/12 px-3 py-1 text-amber-700 dark:bg-white/5 dark:text-amber-300">
          {tag}
        </span>
        <button
          type="button"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(event) => {
            event.stopPropagation();
            const wasAdded = toggleWishlist(product.id);
            showToast(
              wasAdded ? 'Added to wishlist' : 'Removed from wishlist',
              wasAdded ? 'success' : 'muted'
            );
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
            wishlisted
              ? 'border-rose-400 bg-rose-500/20 text-rose-500 dark:text-rose-200'
              : 'border-zinc-200 bg-white/70 text-zinc-500 hover:border-rose-400 hover:bg-rose-500/10 hover:text-rose-500 dark:border-white/10 dark:bg-black/40 dark:text-white/70 dark:hover:text-rose-300'
          }`}
        >
          <Heart
            className="h-3.5 w-3.5"
            strokeWidth={1.7}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="relative mb-4 overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(circle_at_20%_0,_rgba(250,250,249,0.86),_transparent_55%),radial-gradient(circle_at_80%_100%,_rgba(251,191,36,0.22),_transparent_55%)] transition-colors duration-300 dark:border-white/10 dark:bg-[radial-gradient(circle_at_20%_0,_rgba(250,250,249,0.16),_transparent_55%),radial-gradient(circle_at_80%_100%,_rgba(251,191,36,0.15),_transparent_55%)]">
        <div className="aspect-square">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] text-zinc-700 dark:text-white/70">
          <span className="rounded-full bg-white/80 px-2.5 py-1 backdrop-blur dark:bg-black/60">
            {category}
          </span>
          <span className="rounded-full bg-white/80 px-2.5 py-1 backdrop-blur dark:bg-black/60">
            {rating.toFixed(1)} rating
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
            {name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
            <span>{category}</span>
            <span className="text-zinc-300 dark:text-white/20">/</span>
            <span>{collectionName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-200">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
            {oldPrice && (
              <span className="text-[11px] text-zinc-400 line-through dark:text-white/35">
                ${oldPrice.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-white/55">
            <span>{rating.toFixed(1)} rating</span>
            {typeof reviews === 'number' && (
              <span className="text-zinc-400 dark:text-white/40">
                - {reviews.toLocaleString('en-US')} reviews
              </span>
            )}
          </div>
        </div>

        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-[10px] text-zinc-500 dark:text-white/60">
            {sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-zinc-200 bg-zinc-900/3 px-2 py-0.5 dark:border-white/12 dark:bg-white/5"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-white/50">
          <span className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
            {formatReleaseDate(releaseDate)}
          </span>
          {detailNotes[0] && (
            <span className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
              {detailNotes[0]}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-[11px]">
        <span className={getStockStatusTone(stockStatus)}>
          {stockStatus}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openQuickView(product);
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            <Eye className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addItem(product);
              showToast('Added to cart', 'success');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-800 transition-colors hover:border-amber-400 hover:bg-amber-300/10 hover:text-amber-700 dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} />
            Add
          </button>
        </div>
      </div>
    </Motion.article>
  );
}
