export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[11px] text-zinc-500 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-white/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
            KIXORA
          </span>
          <span className="hidden h-3 w-px bg-zinc-300 sm:block dark:bg-white/20" />
          <p className="text-[11px] text-zinc-600 dark:text-white/60">
            Curated sneakers for the next generation of collectors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p>(c) {year} KIXORA Studio. All rights reserved.</p>
          <div className="flex gap-3 text-zinc-600 dark:text-white/60">
            <button className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Terms
            </button>
            <button className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
