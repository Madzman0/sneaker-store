/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { products } from '../data/products';

const STORAGE_KEY = 'kixora-recently-viewed';
const MAX_ITEMS = 8;
const RecentlyViewedContext = createContext(null);

function readStoredRecentlyViewed() {
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

export function RecentlyViewedProvider({ children }) {
  const [recentIds, setRecentIds] = useState(readStoredRecentlyViewed);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch {
      // Ignore storage failures in demo mode.
    }
  }, [recentIds]);

  const recentProducts = useMemo(
    () =>
      recentIds
        .map((productId) => products.find((product) => product.id === productId))
        .filter(Boolean),
    [recentIds]
  );

  const addRecentlyViewed = useCallback((product) => {
    if (!product?.id) return;

    setRecentIds((currentIds) => {
      const nextIds = [
        product.id,
        ...currentIds.filter((productId) => productId !== product.id),
      ].slice(0, MAX_ITEMS);

      if (
        nextIds.length === currentIds.length &&
        nextIds.every((productId, index) => productId === currentIds[index])
      ) {
        return currentIds;
      }

      return nextIds;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentIds([]);
  }, []);

  const value = useMemo(
    () => ({
      recentIds,
      recentProducts,
      addRecentlyViewed,
      clearRecentlyViewed,
    }),
    [recentIds, recentProducts, addRecentlyViewed, clearRecentlyViewed]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error(
      'useRecentlyViewed must be used within a RecentlyViewedProvider.'
    );
  }

  return context;
}
