import * as Motion from 'framer-motion/client';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';
import { useStoreUI } from '../context/StoreUIContext.jsx';

const toneStyles = {
  default: {
    icon: ShoppingBag,
    label: 'AUREL',
    classes:
      'border-zinc-200/90 bg-white/90 text-zinc-700 shadow-[0_18px_45px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-zinc-950/90 dark:text-white/80 dark:shadow-[0_22px_50px_rgba(0,0,0,0.45)]',
    chip:
      'bg-zinc-900/5 text-zinc-500 dark:bg-white/8 dark:text-white/45',
  },
  success: {
    icon: Check,
    label: 'Confirmed',
    classes:
      'border-emerald-300/80 bg-[linear-gradient(180deg,rgba(236,253,245,0.96),rgba(240,253,250,0.92))] text-emerald-700 shadow-[0_18px_45px_rgba(16,185,129,0.12)] dark:border-emerald-400/25 dark:bg-[linear-gradient(180deg,rgba(6,78,59,0.34),rgba(6,95,70,0.2))] dark:text-emerald-200 dark:shadow-[0_22px_50px_rgba(0,0,0,0.42)]',
    chip:
      'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200',
  },
  muted: {
    icon: Heart,
    label: 'Updated',
    classes:
      'border-rose-200/80 bg-[linear-gradient(180deg,rgba(255,241,242,0.96),rgba(255,245,245,0.92))] text-rose-700 shadow-[0_18px_45px_rgba(244,63,94,0.12)] dark:border-rose-400/20 dark:bg-[linear-gradient(180deg,rgba(76,5,25,0.38),rgba(97,7,31,0.18))] dark:text-rose-200 dark:shadow-[0_22px_50px_rgba(0,0,0,0.42)]',
    chip:
      'bg-rose-500/10 text-rose-700 dark:bg-rose-400/12 dark:text-rose-200',
  },
};

export default function ToastViewport() {
  const { toasts, dismissToast } = useStoreUI();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[90] flex justify-center px-4 sm:justify-end">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast, index) => {
          const tone = toneStyles[toast.tone] ?? toneStyles.default;
          const Icon = tone.icon;

          return (
            <Motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`pointer-events-auto relative overflow-hidden rounded-[1.35rem] border px-4 py-3 backdrop-blur-2xl ${tone.classes}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />
              <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/8">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] ${tone.chip}`}
                    >
                      {tone.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium tracking-tight">
                    {toast.message}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-current/70 transition-colors hover:bg-black/5 hover:text-current dark:hover:bg-white/8"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
              <Motion.div
                aria-hidden="true"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 2.4, ease: 'linear' }}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-current/18"
              />
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}
