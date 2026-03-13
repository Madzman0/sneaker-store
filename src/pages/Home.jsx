import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedSneakerCarousel from '../components/FeaturedSneakerCarousel';
import ProductGrid from '../components/ProductGrid';
import FeaturedCampaign from '../components/FeaturedCampaign';
import RecentlyViewedSection from '../components/RecentlyViewedSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import ToastViewport from '../components/ToastViewport';

export default function Home() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sectionId = searchParams.get('section');
    if (!sectionId) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <Navbar />

      <main className="flex flex-1 flex-col gap-12 pt-6 pb-12 transition-colors duration-300 sm:gap-14 sm:pt-8 sm:pb-14 md:gap-24 md:pt-14 md:pb-16">
        <HeroSection />
        <FeaturesSection />
        <FeaturedSneakerCarousel />
        <ProductGrid />
        <RecentlyViewedSection />
        <FeaturedCampaign />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <ProductQuickViewModal />
      <ToastViewport />
    </div>
  );
}
