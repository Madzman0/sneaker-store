function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`aurel-skeleton aurel-shimmer rounded-[1.25rem] ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-stone-100 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:from-zinc-900/90 dark:to-black/95 dark:shadow-[0_0_40px_rgba(0,0,0,0.7)]">
      <div className="mb-3 flex items-center justify-between">
        <SkeletonBlock className="h-6 w-28 rounded-full" />
        <SkeletonBlock className="h-8 w-8 rounded-full" />
      </div>
      <SkeletonBlock className="h-64 w-full rounded-xl" />
      <div className="mt-4 space-y-3">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-3 w-24" />
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
        <div className="flex gap-2">
          <SkeletonBlock className="h-6 w-14 rounded-full" />
          <SkeletonBlock className="h-6 w-14 rounded-full" />
          <SkeletonBlock className="h-6 w-14 rounded-full" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <SkeletonBlock className="h-3 w-28" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-9 w-9 rounded-full" />
          <SkeletonBlock className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SpotlightCarouselSkeleton() {
  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-zinc-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,244,0.92))] px-10 py-10 shadow-[0_42px_110px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_46%),linear-gradient(180deg,rgba(24,24,27,0.98),rgba(9,9,11,0.98))] dark:shadow-[0_34px_110px_rgba(0,0,0,0.5)]">
        <div className="hidden h-[31.5rem] items-center justify-center lg:flex">
          <SkeletonBlock className="absolute left-[18%] top-20 h-[18rem] w-[14rem] rounded-[2rem] opacity-60" />
          <SkeletonBlock className="absolute right-[18%] top-20 h-[18rem] w-[14rem] rounded-[2rem] opacity-60" />
          <div className="relative w-[22rem]">
            <SkeletonBlock className="h-[24rem] w-full rounded-[2.2rem]" />
            <SkeletonBlock className="mx-auto mt-6 h-8 w-48 rounded-full" />
          </div>
        </div>

        <div className="lg:hidden">
          <SkeletonBlock className="h-[28rem] w-full rounded-[2rem]" />
        </div>

        <div className="mt-8 grid gap-6 border-t border-zinc-200/80 pt-8 dark:border-white/10 md:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-4">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-6 w-36 rounded-full" />
            <SkeletonBlock className="h-10 w-72" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-4">
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="h-10 w-32" />
            </div>
            <div className="flex gap-3">
              <SkeletonBlock className="h-11 w-28 rounded-full" />
              <SkeletonBlock className="h-11 w-11 rounded-full" />
              <SkeletonBlock className="h-11 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartDrawerSkeleton() {
  return (
    <>
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[1.75rem] border border-zinc-200 bg-gradient-to-b from-white to-stone-100 p-4 shadow-[0_18px_42px_rgba(15,23,42,0.08)] dark:border-white/10 dark:from-zinc-900/90 dark:to-black/90 dark:shadow-[0_18px_42px_rgba(0,0,0,0.35)]"
          >
            <div className="flex gap-4">
              <SkeletonBlock className="h-24 w-24 rounded-[1.2rem]" />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-4 w-28" />
                    <SkeletonBlock className="h-3 w-16" />
                  </div>
                  <SkeletonBlock className="h-8 w-8 rounded-full" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <SkeletonBlock className="h-10 w-24 rounded-full" />
                  <div className="space-y-2">
                    <SkeletonBlock className="ml-auto h-4 w-16" />
                    <SkeletonBlock className="ml-auto h-3 w-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200 px-6 py-5 dark:border-white/10">
        <div className="rounded-[1.75rem] border border-zinc-200 bg-gradient-to-b from-stone-100 to-white p-5 dark:border-white/10 dark:from-zinc-900/88 dark:to-black/90">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-8 w-24" />
          </div>
          <div className="mt-5 grid gap-3">
            <SkeletonBlock className="h-11 w-full rounded-full" />
            <SkeletonBlock className="h-11 w-full rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <div className="sticky top-0 z-40 h-[73px] border-b border-zinc-200/80 bg-white/72 backdrop-blur-xl dark:border-white/10 dark:bg-black/40" />
      <main className="flex flex-1 flex-col">
        <section className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,245,244,0.98))] transition-colors duration-300 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(9,9,11,1),rgba(24,24,27,0.98))]">
          <div className="mx-auto max-w-6xl px-6 pt-8 pb-14 md:pt-12 md:pb-18">
            <SkeletonBlock className="h-10 w-44 rounded-full" />
            <div className="mt-6 grid gap-10 xl:grid-cols-[1.05fr,0.95fr]">
              <div className="space-y-5">
                <SkeletonBlock className="h-[34rem] w-full rounded-[2.5rem]" />
                <div className="grid gap-3 sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonBlock
                      key={index}
                      className="h-24 w-full rounded-[1.35rem]"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-7">
                <div className="space-y-4">
                  <SkeletonBlock className="h-6 w-36 rounded-full" />
                  <SkeletonBlock className="h-14 w-4/5" />
                  <SkeletonBlock className="h-10 w-56" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                </div>
                <div className="rounded-[2rem] border border-zinc-200 bg-white/78 p-6 dark:border-white/10 dark:bg-white/5">
                  <SkeletonBlock className="h-3 w-24" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <SkeletonBlock
                        key={index}
                        className="h-10 w-20 rounded-full"
                      />
                    ))}
                  </div>
                  <SkeletonBlock className="mt-6 h-3 w-24" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonBlock
                        key={index}
                        className="h-10 w-28 rounded-full"
                      />
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <SkeletonBlock className="h-12 flex-1 rounded-full" />
                    <SkeletonBlock className="h-12 flex-1 rounded-full" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-[1.7rem] border border-zinc-200 bg-white/78 p-5 dark:border-white/10 dark:bg-white/5"
                    >
                      <SkeletonBlock className="h-5 w-5 rounded-full" />
                      <SkeletonBlock className="mt-4 h-4 w-24" />
                      <SkeletonBlock className="mt-3 h-4 w-full" />
                      <SkeletonBlock className="mt-2 h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { SkeletonBlock };
