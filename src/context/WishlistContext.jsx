/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'kixora-wishlist';
const WishlistContext = createContext(null);

function readStoredWishlist() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(readStoredWishlist);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage failures in demo mode.
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    const willAdd = !wishlistIds.includes(productId);

    setWishlistIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId]
    );

    return willAdd;
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const value = {
    wishlistIds,
    wishlistCount: wishlistIds.length,
    isWishlisted,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider.');
  }

  return context;
}
