import { useState } from 'react';
import * as Motion from 'framer-motion/client';
import { Check, CreditCard, MapPin, ShieldCheck, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';

const emptyForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'United States',
};

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

function createOrderReference() {
  return `KX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function CheckoutExperience({ closeCheckout }) {
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useStoreUI();
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const orderSnapshot = {
      id: createOrderReference(),
      customerName: form.name.trim(),
      customerEmail: form.email.trim(),
      shippingAddress: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      country: form.country.trim(),
      subtotal,
      items,
    };

    window.setTimeout(() => {
      clearCart();
      setCompletedOrder(orderSnapshot);
      setIsSubmitting(false);
      showToast('Order reserved successfully', 'success');
    }, 1100);
  };

  const summaryItems = completedOrder?.items ?? items;
  const summarySubtotal = completedOrder?.subtotal ?? subtotal;
  const isSuccess = Boolean(completedOrder);

  return (
    <div className="flex w-full flex-col md:grid md:grid-cols-[1.05fr,0.95fr]">
      <div className="relative overflow-hidden border-b border-zinc-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_52%),linear-gradient(180deg,rgba(245,245,244,0.92),rgba(255,255,255,0.98))] p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_52%),linear-gradient(180deg,rgba(39,39,42,0.92),rgba(9,9,11,0.98))] md:border-b-0 md:border-r">
        <div className="absolute inset-x-8 top-6 h-36 rounded-full bg-amber-300/16 blur-[95px] dark:bg-amber-300/10" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
              Checkout
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {isSuccess ? 'Reservation confirmed' : 'Collector delivery'}
            </h2>
            <p className="mt-3 max-w-md text-sm text-zinc-600 dark:text-white/62">
              {isSuccess
                ? 'Your order reference is ready and your selected pairs have been reserved for this session.'
                : 'Complete your shipping details to review the AUREL checkout experience and confirm your order summary.'}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/85 text-zinc-600 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {isSuccess ? (
          <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.96),rgba(240,253,250,0.92))] p-6 shadow-[0_24px_70px_rgba(16,185,129,0.12)] dark:border-emerald-400/20 dark:bg-[linear-gradient(180deg,rgba(6,78,59,0.36),rgba(6,95,70,0.22))] dark:shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-200">
                <Check className="h-7 w-7" strokeWidth={1.9} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-700/80 dark:text-emerald-200/80">
                  Order Reference
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {completedOrder.id}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-zinc-600 dark:text-white/68 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Collector
                </p>
                <p className="mt-2 font-medium text-zinc-950 dark:text-white">
                  {completedOrder.customerName}
                </p>
                <p className="mt-1">{completedOrder.customerEmail}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Delivery
                </p>
                <p className="mt-2">{completedOrder.shippingAddress}</p>
                <p className="mt-1">
                  {completedOrder.city}, {completedOrder.postalCode}
                </p>
                <p className="mt-1">{completedOrder.country}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-white/70 bg-white/60 px-4 py-4 text-sm text-zinc-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/65">
              Your delivery details and order reference are saved for this
              session so you can continue browsing with a clean cart.
            </div>

            <button
              type="button"
              onClick={closeCheckout}
              className="mt-6 inline-flex rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
            >
              Return to store
            </button>
          </div>
        ) : (
          <form className="relative mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Full name
              </span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                placeholder="Jordan Avery"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                placeholder="collector@aurel.com"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                Shipping address
              </span>
              <textarea
                name="address"
                required
                rows="4"
                value={form.address}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                placeholder="128 Mercer Street, Apt 9B"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block sm:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  City
                </span>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                  placeholder="New York"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Postal code
                </span>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={form.postalCode}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                  placeholder="10012"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                  Country
                </span>
                <input
                  type="text"
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white/85 px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white"
                />
              </label>
            </div>

            <div className="rounded-[1.4rem] border border-zinc-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-300"
                  strokeWidth={1.8}
                />
                <div className="text-sm text-zinc-600 dark:text-white/65">
                  Review your delivery details carefully before completing the
                  order confirmation below.
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={items.length === 0 || isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-white dark:text-black dark:hover:bg-amber-200 dark:disabled:bg-white/10 dark:disabled:text-white/35"
            >
              <CreditCard className="h-4 w-4" strokeWidth={1.8} />
              {isSubmitting ? 'Confirming order...' : 'Complete order'}
            </button>
          </form>
        )}
      </div>

      <div className="flex max-h-[92vh] flex-col bg-zinc-950 text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
            Order Summary
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {summaryItems.length} curated item{summaryItems.length === 1 ? '' : 's'}
          </h3>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {summaryItems.map((item) => (
            <div
              key={`${item.id}-${isSuccess ? 'complete' : 'live'}`}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-[1.1rem] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-amber-300">
                        {item.tag}
                      </p>
                      <h4 className="mt-1 text-sm font-semibold">{item.name}</h4>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-amber-200">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
                    <span>Qty {item.quantity}</span>
                    <span>{formatPrice(item.price)} each</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {summaryItems.length === 0 && (
            <div className="rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-sm text-white/50">
              Your cart is empty. Add a few pairs before opening checkout.
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Merchandise</span>
              <span>{formatPrice(summarySubtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-white/60">
              <span>Shipping</span>
              <span>Included</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                Total
              </span>
              <span className="text-3xl font-semibold text-amber-200">
                {formatPrice(summarySubtotal)}
              </span>
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/55">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-300" strokeWidth={1.8} />
              <p>
                Signature delivery presentation with address details prepared
                for final confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout } = useStoreUI();

  return (
    <div
      className={`fixed inset-0 z-[85] ${
        isCheckoutOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Motion.button
        type="button"
        aria-label="Close checkout"
        onClick={closeCheckout}
        animate={{ opacity: isCheckoutOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
      />

      <Motion.div
        animate={{
          opacity: isCheckoutOpen ? 1 : 0,
          scale: isCheckoutOpen ? 1 : 0.97,
          y: isCheckoutOpen ? 0 : 18,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 flex max-h-[92vh] w-[min(94vw,72rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.2rem] border border-zinc-200 bg-white/96 text-zinc-900 shadow-[0_40px_140px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/96 dark:text-white dark:shadow-[0_40px_140px_rgba(0,0,0,0.62)]"
      >
        {isCheckoutOpen && (
          <CheckoutExperience
            key="checkout-experience"
            closeCheckout={closeCheckout}
          />
        )}
      </Motion.div>
    </div>
  );
}
