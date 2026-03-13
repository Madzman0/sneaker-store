import { useState } from 'react';
import * as Motion from 'framer-motion/client';
import { Heart, ShoppingBag, Star, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatReleaseDate, getStockStatusTone } from '../utils/productMeta.js';

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

function QuickViewContent({ product, closeQuickView, addItem, showToast }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="grid max-h-[88vh] md:grid-cols-[1.05fr,0.95fr]">
      <div className="relative overflow-hidden border-b border-zinc-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,244,0.9))] p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_60%),linear-gradient(180deg,rgba(39,39,42,0.96),rgba(9,9,11,0.98))] md:border-b-0 md:border-r">
        <div className="absolute inset-x-8 top-10 h-48 rounded-full bg-amber-300/16 blur-[100px] dark:bg-amber-300/12" />
        <img
          src={product.image}
          alt={product.name}
          className="relative h-full max-h-[28rem] w-full rounded-[1.8rem] object-cover shadow-[0_28px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
        />
      </div>

      <div className="flex max-h-[88vh] flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
              Quick View
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeQuickView}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-600 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex-1 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-400/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-700 dark:bg-white/5 dark:text-amber-300">
              {product.tag}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/50">
              {product.category}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-amber-700 dark:text-amber-200">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-zinc-400 line-through dark:text-white/30">
                {formatPrice(product.oldPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/55">
              <Star className="h-4 w-4 fill-current text-amber-500" strokeWidth={1.7} />
              <span>{product.rating.toFixed(1)}</span>
              <span>- {product.reviews} reviews</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-zinc-600 dark:text-white/68">
            {product.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.2rem] border border-zinc-200 bg-stone-100/85 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Collection
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
                {product.collectionName}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-zinc-200 bg-stone-100/85 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Release Date
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
                {formatReleaseDate(product.releaseDate)}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-zinc-200 bg-stone-100/85 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Stock Status
              </p>
              <p className={`mt-2 text-sm font-medium ${getStockStatusTone(product.stockStatus)}`}>
                {product.stockStatus}
              </p>
            </div>
          </div>

          {product.detailNotes?.length > 0 && (
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400 dark:text-white/35">
                Product Notes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.detailNotes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600 dark:border-white/12 dark:bg-white/5 dark:text-white/65"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400 dark:text-white/35">
              Select Size
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = size === selectedSize;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      isSelected
                        ? 'border-amber-500 bg-amber-400/15 text-amber-700 dark:border-amber-300 dark:bg-amber-300/15 dark:text-amber-200'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                addItem(product);
                showToast('Added to cart', 'success');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                const wasAdded = toggleWishlist(product.id);
                showToast(
                  wasAdded ? 'Added to wishlist' : 'Removed from wishlist',
                  wasAdded ? 'success' : 'muted'
                );
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                wishlisted
                  ? 'border-rose-400 bg-rose-500/12 text-rose-600 dark:text-rose-300'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-amber-300 dark:hover:text-amber-200'
              }`}
            >
              <Heart
                className="h-4 w-4"
                strokeWidth={1.8}
                fill={wishlisted ? 'currentColor' : 'none'}
              />
              {wishlisted ? 'Wishlisted' : 'Save to Wishlist'}
            </button>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-zinc-200 bg-stone-100/80 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-3 text-sm text-zinc-600 dark:text-white/60 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Availability
                </p>
                <p className={`mt-2 ${getStockStatusTone(product.stockStatus)}`}>
                  {product.stockStatus}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Selected size
                </p>
                <p className="mt-2 font-medium text-zinc-900 dark:text-white">
                  {selectedSize || 'Choose your pair'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductQuickViewModal() {
  const { quickViewProduct, closeQuickView, showToast } = useStoreUI();
  const { addItem } = useCart();
  const isOpen = Boolean(quickViewProduct);

  return (
    <div
      className={`fixed inset-0 z-[80] ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Motion.button
        type="button"
        aria-label="Close quick view"
        onClick={closeQuickView}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      <Motion.div
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.96,
          y: isOpen ? 0 : 20,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 max-h-[88vh] w-[min(92vw,64rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/96 text-zinc-900 shadow-[0_36px_120px_rgba(15,23,42,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/96 dark:text-white dark:shadow-[0_36px_120px_rgba(0,0,0,0.6)]"
      >
        {quickViewProduct && (
          <QuickViewContent
            key={quickViewProduct.id}
            product={quickViewProduct}
            closeQuickView={closeQuickView}
            addItem={addItem}
            showToast={showToast}
          />
        )}
      </Motion.div>
    </div>
  );
}
