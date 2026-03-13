/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useRecentlyViewed } from './RecentlyViewedContext.jsx';

const StoreUIContext = createContext(null);

export function StoreUIProvider({ children }) {
  const { addRecentlyViewed } = useRecentlyViewed();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartDrawerLoading, setIsCartDrawerLoading] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const shouldLockScroll =
      isCartOpen || isCheckoutOpen || Boolean(quickViewProduct);
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, isCheckoutOpen, quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setQuickViewProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCart = () => {
    setIsCartDrawerLoading(true);
    setIsCartOpen(true);

    window.setTimeout(() => {
      setIsCartDrawerLoading(false);
    }, 520);
  };
  const closeCart = () => {
    setIsCartOpen(false);
    setIsCartDrawerLoading(false);
  };
  const toggleCart = () => setIsCartOpen((current) => !current);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product) => {
    addRecentlyViewed(product);
    setQuickViewProduct(product);
  };
  const closeQuickView = () => setQuickViewProduct(null);

  const dismissToast = (toastId) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId)
    );
  };

  const showToast = (message, tone = 'default') => {
    const toastId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    setToasts((currentToasts) => [
      ...currentToasts,
      { id: toastId, message, tone },
    ]);

    window.setTimeout(() => {
      dismissToast(toastId);
    }, 2400);
  };

  const value = {
    isCartOpen,
    isCartDrawerLoading,
    openCart,
    closeCart,
    toggleCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    toasts,
    showToast,
    dismissToast,
  };

  return (
    <StoreUIContext.Provider value={value}>{children}</StoreUIContext.Provider>
  );
}

export function useStoreUI() {
  const context = useContext(StoreUIContext);

  if (!context) {
    throw new Error('useStoreUI must be used within a StoreUIProvider.');
  }

  return context;
}
