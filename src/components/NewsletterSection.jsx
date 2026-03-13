import { useState } from 'react';
import { useStoreUI } from '../context/StoreUIContext.jsx';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const { showToast } = useStoreUI();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('submitted');
    setEmail('');
    showToast('Subscribed successfully', 'success');
  };

  const isSubmitted = status === 'submitted';

  return (
    <section
      id="newsletter"
      className="border-b border-zinc-200 bg-stone-100 transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-amber-200/45 via-white to-stone-100 p-[1px] shadow-[0_28px_70px_rgba(15,23,42,0.1)] transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-r dark:from-black dark:via-zinc-950 dark:to-black dark:shadow-[0_28px_80px_rgba(0,0,0,0.9)]">
          <div className="rounded-[1.25rem] bg-gradient-to-r from-white/92 via-stone-100 to-white/92 px-4 py-6 transition-colors duration-300 sm:px-6 sm:py-8 md:rounded-[1.45rem] md:px-10 md:py-10 dark:from-zinc-950/90 dark:via-black dark:to-zinc-950/90">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
                  KIXORA Brief
                </p>
                <h2 className="text-[1.8rem] font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-white">
                  Be first in line for the next drop.
                </h2>
                <p className="text-sm text-zinc-600 transition-colors duration-300 dark:text-white/70">
                  Subscribe for early access windows, studio notes from upcoming
                  collaborations, and collector-only previews, no generic sale
                  blasts, ever.
                </p>
              </div>

              <form
                className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:min-w-[280px]"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className="h-11 flex-1 rounded-full border border-zinc-300 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/35 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-black/70 dark:text-white dark:placeholder:text-white/40 dark:focus:border-amber-300"
                    disabled={isSubmitted}
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-full bg-zinc-900 px-6 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_28px_rgba(217,119,6,0.18)] transition-transform transition-colors hover:-translate-y-0.5 hover:bg-amber-500 hover:text-black disabled:translate-y-0 disabled:bg-emerald-400 disabled:text-black disabled:hover:bg-emerald-400 disabled:cursor-default dark:bg-white dark:text-black dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] dark:hover:bg-amber-200"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 transition-colors duration-300 dark:text-white/45">
                  {isSubmitted
                    ? 'You are in. Expect your first brief soon.'
                    : 'One brief, twice a month. Unsubscribe anytime.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
