import { useEffect, useMemo, useState } from 'react';
import * as Motion from 'framer-motion/client';
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import ToastViewport from '../components/ToastViewport';
import ProductCard from '../components/ProductCard';
import { ProductDetailsSkeleton } from '../components/LoadingSkeletons.jsx';
import RecentlyViewedSection from '../components/RecentlyViewedSection';
import { products } from '../data/products';
import { useCart } from '../context/CartContext.jsx';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import { useStoreUI } from '../context/StoreUIContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { formatReleaseDate, getStockStatusTone } from '../utils/productMeta.js';
import { buildHomeSectionPath, navigateTo } from '../utils/navigation.js';

function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`;
}

function ProductDetailsContent({ product }) {
  const { addItem } = useCart();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { showToast } = useStoreUI();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(
    product.gallery?.[0] ?? product.image
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name ?? ''
  );
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [galleryOffset, setGalleryOffset] = useState({ x: 0, y: 0 });

  const wishlisted = isWishlisted(product.id);

  const relatedProducts = useMemo(() => {
    return products
      .filter((item) => item.id !== product.id)
      .sort((left, right) => {
        const leftScore =
          Number(left.category === product.category) * 4 + left.rating;
        const rightScore =
          Number(right.category === product.category) * 4 + right.rating;
        return rightScore - leftScore;
      })
      .slice(0, 3);
  }, [product]);

  const handleAddToCart = () => {
    addItem(product);
    showToast('Added to cart', 'success');
  };

  const handleGalleryMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width;
    const yRatio = (event.clientY - bounds.top) / bounds.height;

    setGalleryOffset({
      x: (xRatio - 0.5) * 16,
      y: (yRatio - 0.5) * 16,
    });
  };

  const resetGalleryFocus = () => {
    setIsGalleryHovered(false);
    setGalleryOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    addRecentlyViewed(product);
  }, [addRecentlyViewed, product]);

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <section className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,245,244,0.98))] transition-colors duration-300 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(9,9,11,1),rgba(24,24,27,0.98))]">
          <div className="mx-auto max-w-6xl px-6 pt-8 pb-14 md:pt-12 md:pb-18">
            <button
              type="button"
              onClick={() => navigateTo(buildHomeSectionPath('trending'))}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300 dark:hover:text-amber-200"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              Back to collection
            </button>

            <div className="mt-6 grid gap-10 xl:grid-cols-[1.05fr,0.95fr]">
              <Motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <div
                  className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,245,244,0.92))] p-5 shadow-[0_32px_100px_rgba(15,23,42,0.12)] transition-colors duration-300 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_48%),linear-gradient(180deg,rgba(39,39,42,0.96),rgba(9,9,11,0.98))] dark:shadow-[0_32px_100px_rgba(0,0,0,0.48)]"
                  onMouseEnter={() => setIsGalleryHovered(true)}
                  onMouseMove={handleGalleryMove}
                  onMouseLeave={resetGalleryFocus}
                >
                  <div className="pointer-events-none absolute inset-x-10 top-6 h-48 rounded-full bg-amber-300/14 blur-[120px] dark:bg-amber-300/10" />
                  <Motion.div
                    key={selectedImage}
                    initial={{ opacity: 0.45, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-[1.8rem]"
                  >
                    <Motion.img
                      src={selectedImage}
                      alt={product.name}
                      animate={{
                        scale: isGalleryHovered ? 1.08 : 1,
                        x: galleryOffset.x,
                        y: galleryOffset.y,
                      }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-[24rem] w-full rounded-[1.8rem] object-cover will-change-transform md:h-[32rem]"
                    />
                    <Motion.div
                      aria-hidden="true"
                      animate={{
                        opacity: isGalleryHovered ? 1 : 0.72,
                        scale: isGalleryHovered ? 1.04 : 1,
                        x: galleryOffset.x * -0.6,
                        y: galleryOffset.y * -0.6,
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.24),transparent_30%),radial-gradient(circle_at_72%_80%,rgba(251,191,36,0.18),transparent_28%)] mix-blend-screen dark:bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_72%_80%,rgba(251,191,36,0.14),transparent_28%)]"
                    />
                  </Motion.div>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  {product.gallery.map((image, index) => {
                    const isSelected = image === selectedImage;

                    return (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className={`overflow-hidden rounded-[1.35rem] border p-1 transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-amber-300/10 shadow-[0_16px_40px_rgba(251,191,36,0.15)]'
                            : 'border-zinc-200 bg-white/80 hover:-translate-y-0.5 hover:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="h-24 w-full rounded-[1rem] object-cover transition-transform duration-500 hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-7"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-amber-400/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-700 dark:bg-white/5 dark:text-amber-300">
                      {product.tag}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/50">
                      {product.category}
                    </span>
                  </div>

                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white md:text-5xl">
                    {product.name}
                  </h1>

                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-semibold text-amber-700 dark:text-amber-200">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-base text-zinc-400 line-through dark:text-white/28">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/55">
                      <Star className="h-4 w-4 fill-current text-amber-500" strokeWidth={1.8} />
                      <span>{product.rating.toFixed(1)}</span>
                      <span>- {product.reviews} reviews</span>
                    </div>
                  </div>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-white/68">
                    {product.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.35rem] border border-zinc-200 bg-white/72 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                        Collection
                      </p>
                      <p className="mt-2 text-sm font-medium text-zinc-950 dark:text-white">
                        {product.collectionName}
                      </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-zinc-200 bg-white/72 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                        Release Date
                      </p>
                      <p className="mt-2 text-sm font-medium text-zinc-950 dark:text-white">
                        {formatReleaseDate(product.releaseDate)}
                      </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-zinc-200 bg-white/72 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                        Stock Status
                      </p>
                      <p className={`mt-2 text-sm font-medium ${getStockStatusTone(product.stockStatus)}`}>
                        {product.stockStatus}
                      </p>
                    </div>
                  </div>

                  {product.detailNotes?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.detailNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/62"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[2rem] border border-zinc-200 bg-white/78 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_56px_rgba(0,0,0,0.35)]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 dark:text-white/35">
                      Select size
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const isSelected = size === selectedSize;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
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

                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 dark:text-white/35">
                      Select color
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {product.colors.map((color) => {
                        const isSelected = color.name === selectedColor;

                        return (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => setSelectedColor(color.name)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                              isSelected
                                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black'
                                : 'border-zinc-200 bg-white text-zinc-600 hover:border-amber-400 dark:border-white/12 dark:bg-white/5 dark:text-white/70 dark:hover:border-amber-300'
                            }`}
                          >
                            <span
                              className="h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: color.swatch }}
                            />
                            {color.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
                    >
                      <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
                      Add to cart
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
                      {wishlisted ? 'Wishlisted' : 'Save to wishlist'}
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 text-sm text-zinc-600 dark:text-white/62 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-zinc-200 bg-stone-100/90 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                        Current selection
                      </p>
                      <p className="mt-2 font-medium text-zinc-950 dark:text-white">
                        {selectedSize || 'Select size'} / {selectedColor || 'Select color'}
                      </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-zinc-200 bg-stone-100/90 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
                        Availability
                      </p>
                      <p className={`mt-2 font-medium ${getStockStatusTone(product.stockStatus)}`}>
                        {product.stockStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.7rem] border border-zinc-200 bg-white/78 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
                    <Truck className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
                    <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-950 dark:text-white">
                      Shipping
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-white/62">
                      Signature delivery within 2 to 4 business days, climate-conscious packaging, and collector-grade presentation on arrival.
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-zinc-200 bg-white/78 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
                    <RotateCcw className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
                    <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-950 dark:text-white">
                      Returns
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-white/62">
                      Complimentary returns within 14 days for unworn pairs, with concierge support for exchanges and size corrections.
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-zinc-200 bg-white/78 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
                    <ShieldCheck className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
                    <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-950 dark:text-white">
                      Authenticity
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-white/62">
                      Every pair is inspected and documented before dispatch, with packaging designed to feel as premium as the product itself.
                    </p>
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200 bg-stone-100/90 py-14 transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/80">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500 dark:text-amber-400">
                  Related Pairs
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  Continue the collection story.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-zinc-600 dark:text-white/62">
                Pairs selected for complementary mood, category affinity, and overall collector appeal.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>

        <RecentlyViewedSection currentProductId={product.id} />
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <ProductQuickViewModal />
      <ToastViewport />
    </div>
  );
}

export default function ProductDetailsPage({ productId }) {
  const [isLoading, setIsLoading] = useState(true);
  const product = products.find((item) => item.id === productId);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 820);

    return () => window.clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-100 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="max-w-xl rounded-[2rem] border border-zinc-200 bg-white/90 p-8 text-center shadow-[0_28px_70px_rgba(15,23,42,0.1)] transition-colors duration-300 dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/35">
              Currently unavailable
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              This pair has moved out of the current selection.
            </h1>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-white/62">
              Return to the AUREL archive and continue exploring the current rotation.
            </p>
            <button
              type="button"
              onClick={() => navigateTo(buildHomeSectionPath('trending'))}
              className="mt-6 rounded-full bg-zinc-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-amber-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-amber-200"
            >
              Back to gallery
            </button>
          </div>
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <ProductQuickViewModal />
        <ToastViewport />
      </div>
    );
  }

  return <ProductDetailsContent key={product.id} product={product} />;
}
