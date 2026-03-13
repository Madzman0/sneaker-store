import * as Motion from 'framer-motion/client';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { CartDrawerSkeleton } from './LoadingSkeletons.jsx';

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

export default function CartDrawer() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const { isCartOpen, isCartDrawerLoading, closeCart, openCheckout, showToast } =
    useStoreUI();

  return (
    <div
      className={`fixed inset-0 z-[70] ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Motion.button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        animate={{ opacity: isCartOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
      />

      <Motion.aside
        animate={{ x: isCartOpen ? 0 : '105%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-zinc-200 bg-white/96 text-zinc-900 shadow-[-24px_0_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:max-w-md dark:border-white/10 dark:bg-zinc-950/96 dark:text-white dark:shadow-[-24px_0_70px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
              Your Cart
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              Curated checkout
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-600 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {isCartDrawerLoading ? (
          <CartDrawerSkeleton />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white text-amber-600 shadow-[0_14px_34px_rgba(217,119,6,0.14)] dark:border-white/12 dark:bg-white/5 dark:text-amber-200">
              <ShoppingBag className="h-6 w-6" strokeWidth={1.7} />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-zinc-950 dark:text-white">
              Your cart is empty
            </h3>
            <p className="mt-3 max-w-sm text-sm text-zinc-500 dark:text-white/60">
              Add a few AUREL selections and they will appear here with a live
              subtotal and adjustable quantities.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.4rem] border border-zinc-200 bg-gradient-to-b from-white to-stone-100 p-3.5 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:rounded-[1.75rem] sm:p-4 dark:border-white/10 dark:from-zinc-900/90 dark:to-black/90 dark:shadow-[0_18px_42px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full rounded-[1.1rem] object-cover sm:h-24 sm:w-24 sm:rounded-[1.2rem]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-600 dark:text-amber-300">
                            {item.tag}
                          </p>
                          <h3 className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-white/45">
                            {item.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeItem(item.id);
                            showToast('Removed from cart', 'muted');
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-500 transition-colors hover:border-rose-400 hover:text-rose-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-rose-400 dark:hover:text-rose-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-2 py-1 dark:border-white/12 dark:bg-white/5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                          <span className="min-w-6 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                        </div>

                        <div className="flex items-end justify-between gap-3 sm:block sm:text-right">
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-200">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-[11px] text-zinc-400 dark:text-white/35">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-white/10">
              <div className="rounded-[1.4rem] border border-zinc-200 bg-gradient-to-b from-stone-100 to-white p-4 sm:rounded-[1.75rem] sm:p-5 dark:border-white/10 dark:from-zinc-900/88 dark:to-black/90">
                <div className="flex items-center justify-between gap-3 text-sm text-zinc-500 dark:text-white/60">
                  <span>Subtotal</span>
                  <span className="text-xl font-semibold text-zinc-950 sm:text-2xl dark:text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 max-w-xs text-[11px] leading-5 text-zinc-400 dark:text-white/35">
                  Final tax and shipping confirmation is shown at order review.
                </p>

                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    onClick={openCheckout}
                    className="rounded-full bg-zinc-900 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-amber-500 hover:text-black sm:text-[11px] sm:tracking-[0.22em] dark:bg-white dark:text-black dark:hover:bg-amber-200"
                  >
                    Proceed to checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      showToast('Cart cleared', 'muted');
                    }}
                    className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition-colors hover:border-rose-400 hover:bg-rose-500/10 hover:text-rose-600 sm:text-[11px] sm:tracking-[0.22em] dark:border-white/12 dark:bg-white/5 dark:text-white/75 dark:hover:border-rose-400 dark:hover:text-rose-300"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Motion.aside>
    </div>
  );
}
