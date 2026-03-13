import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import {
  buildHomeSectionPath,
  buildProductPath,
  navigateTo,
} from '../utils/navigation.js';

const navLinks = [
  { label: 'New Drops', targetId: 'new-drops' },
  { label: 'Collections', targetId: 'collections' },
  { label: 'Trending', targetId: 'trending' },
  { label: 'Editorial', targetId: 'editorial' },
  { label: 'About', targetId: 'about' },
];

function scrollToSection(targetId) {
  const section = document.getElementById(targetId);
  if (!section) {
    navigateTo(buildHomeSectionPath(targetId));
    return;
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

function CountBadge({ count }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1 inline-flex min-h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
      {count > 9 ? '9+' : count}
    </span>
  );
}

function SearchDropdown({
  isOpen,
  results,
  query,
  onSelect,
  onClear,
  compact = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute ${
        compact ? 'left-0 right-0 top-full mt-2' : 'left-0 right-0 top-[calc(100%+0.65rem)]'
      } z-50 overflow-hidden rounded-[1.6rem] border border-zinc-200 bg-white/96 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/96 dark:shadow-[0_28px_80px_rgba(0,0,0,0.58)]`}
    >
      <div className="border-b border-zinc-200/90 px-4 py-3 dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 dark:text-white/35">
            Search Results
          </p>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/50 dark:hover:bg-white/6 dark:hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="max-h-[24rem] overflow-y-auto p-2">
          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(product.id)}
              className="flex w-full items-center gap-3 rounded-[1.2rem] px-3 py-3 text-left transition-colors hover:bg-zinc-900/4 dark:hover:bg-white/5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 rounded-[1rem] object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {product.name}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-white/45">
                  {product.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-200">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400 dark:text-white/30">
                  {product.tag}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-white">
            No matching sneakers found
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-white/55">
            No results for &quot;{query}&quot;. Try another model, tag, or collection.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openCart } = useStoreUI();
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchFocused(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return products
      .filter((product) =>
        [product.name, product.category, product.tag].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
      .slice(0, 5);
  }, [searchQuery]);

  const mobileSearchResults = useMemo(() => {
    const normalizedQuery = mobileSearchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return products
      .filter((product) =>
        [product.name, product.category, product.tag].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
      .slice(0, 5);
  }, [mobileSearchQuery]);

  const isDesktopDropdownOpen = isSearchFocused && searchQuery.trim().length > 0;
  const isMobileDropdownOpen =
    isMobileSearchFocused && mobileSearchQuery.trim().length > 0;

  const handleNavigate = (targetId) => {
    scrollToSection(targetId);
    setIsOpen(false);
  };

  const handleSearchSelect = (productId) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    setIsMobileSearchFocused(false);
    setMobileSearchQuery('');
    setIsOpen(false);
    navigateTo(buildProductPath(productId));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/72 text-zinc-900 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-black/40 dark:text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 md:py-4">
        <button
          type="button"
          onClick={() => handleNavigate('new-drops')}
          className="flex items-center gap-2 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-white to-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition-colors duration-300 dark:via-zinc-100 dark:shadow-[0_0_25px_rgba(251,191,36,0.45)]">
            <span className="text-xs font-black tracking-[0.25em] text-black">
              K
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.34em] sm:text-[11px] sm:tracking-[0.4em]">
              AUREL
            </div>
            <div className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500 transition-colors duration-300 dark:text-white/50 sm:block">
              Sneaker Atelier
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-300 lg:flex dark:text-white/60">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.targetId)}
              className="group relative py-1 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              <span>{item.label}</span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-amber-300 via-zinc-900 to-amber-300 opacity-0 transition-all duration-200 group-hover:w-full group-hover:opacity-100 dark:via-white" />
            </button>
          ))}
        </nav>

        <div className="hidden min-w-0 flex-1 justify-center xl:flex">
          <div ref={searchRef} className="relative w-full max-w-sm">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/88 px-4 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors duration-300 focus-within:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <Search className="h-4 w-4 text-zinc-400 dark:text-white/35" strokeWidth={1.8} />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search the collection"
                className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-900/5 hover:text-zinc-700 dark:text-white/30 dark:hover:bg-white/6 dark:hover:text-white/70"
                  aria-label="Clear product search"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              )}
            </div>

            <SearchDropdown
              isOpen={isDesktopDropdownOpen}
              results={searchResults}
              query={searchQuery.trim()}
              onSelect={handleSearchSelect}
              onClear={() => {
                setSearchQuery('');
                setIsSearchFocused(false);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="View wishlist section"
            onClick={() => handleNavigate('trending')}
            className="group relative hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-600 backdrop-blur transition-all hover:border-amber-300 hover:bg-amber-300/10 hover:text-amber-600 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-amber-200"
          >
            <Heart className="h-4 w-4" strokeWidth={1.8} />
            <CountBadge count={wishlistCount} />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 backdrop-blur transition-all duration-300 hover:border-amber-300 hover:bg-amber-300/10 hover:text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-amber-200"
          >
            <span className="relative block h-4 w-4 overflow-hidden">
              <Sun
                className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                  isDark
                    ? 'translate-y-2 rotate-90 opacity-0'
                    : 'translate-y-0 rotate-0 opacity-100'
                }`}
                strokeWidth={1.8}
              />
              <Moon
                className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                  isDark
                    ? 'translate-y-0 rotate-0 opacity-100'
                    : '-translate-y-2 -rotate-90 opacity-0'
                }`}
                strokeWidth={1.8}
              />
            </span>
          </button>

          <button
            type="button"
            aria-label="Open cart drawer"
            onClick={openCart}
            className="group relative hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/70 text-zinc-600 backdrop-blur transition-all hover:border-amber-300 hover:bg-amber-300/10 hover:text-amber-600 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-amber-200"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
            <CountBadge count={itemCount} />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('newsletter')}
            className="hidden rounded-full bg-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(161,98,7,0.15)] transition-transform transition-colors hover:-translate-y-0.5 hover:bg-amber-500 hover:text-black md:block dark:bg-white/95 dark:text-black dark:shadow-[0_10px_40px_rgba(0,0,0,0.55)] dark:hover:bg-amber-200"
          >
            Join Collector List
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/75 text-zinc-700 backdrop-blur transition-all hover:border-amber-300 hover:bg-amber-300/10 hover:text-amber-600 lg:hidden dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:text-amber-200"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-[1px] w-full rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1px] w-full rounded-full bg-current transition-opacity duration-150 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-[1px] w-full rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-200`}
      >
        <div className="mx-3 mt-3 space-y-3 rounded-3xl border border-zinc-200 bg-white/88 p-3 text-xs text-zinc-700 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-black/80 dark:text-white/80 dark:shadow-[0_24px_60px_rgba(0,0,0,0.85)] sm:mx-4 sm:p-4">
          <div ref={mobileSearchRef} className="relative">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
              <Search className="h-4 w-4 text-zinc-400 dark:text-white/35" strokeWidth={1.8} />
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(event) => setMobileSearchQuery(event.target.value)}
                onFocus={() => setIsMobileSearchFocused(true)}
                placeholder="Search sneakers"
                className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-white/30"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchQuery('');
                    setIsMobileSearchFocused(false);
                  }}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-900/5 hover:text-zinc-700 dark:text-white/30 dark:hover:bg-white/6 dark:hover:text-white/70"
                  aria-label="Clear mobile search"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              )}
            </div>

            <SearchDropdown
              isOpen={isMobileDropdownOpen}
              results={mobileSearchResults}
              query={mobileSearchQuery.trim()}
              onSelect={handleSearchSelect}
              onClear={() => {
                setMobileSearchQuery('');
                setIsMobileSearchFocused(false);
              }}
              compact
            />
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.targetId)}
                className="flex items-center justify-between rounded-2xl px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <span>{item.label}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-white/40" />
              </button>
            ))}
          </nav>

          <div className="grid gap-2 pt-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                handleNavigate('trending');
              }}
              className="rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-300 hover:bg-amber-300/10 hover:text-amber-600 dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:text-amber-200"
            >
              Wishlist ({wishlistCount})
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openCart();
              }}
              className="rounded-full bg-zinc-900 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
            >
              Cart ({itemCount})
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
