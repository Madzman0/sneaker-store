/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const STORAGE_KEY = 'kixora-cart';
const CartContext = createContext(null);

function readStoredCart() {
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

function createCartSnapshot(product, quantity = 1) {
  return {
    id: product.id,
    quantity,
    name: product.name,
    category: product.category,
    tag: product.tag,
    price: product.price,
    oldPrice: product.oldPrice,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
    sizes: product.sizes,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage failures in demo mode.
    }
  }, [items]);

  const lineItems = useMemo(
    () =>
      items
        .map((item) => {
          const liveProduct = products.find((product) => product.id === item.id);
          return {
            ...item,
            ...liveProduct,
            quantity: item.quantity,
          };
        })
        .filter((item) => item.id),
    [items]
  );

  const itemCount = useMemo(
    () => lineItems.reduce((total, item) => total + item.quantity, 0),
    [lineItems]
  );

  const subtotal = useMemo(
    () => lineItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [lineItems]
  );

  const addItem = (product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? createCartSnapshot(product, item.quantity + quantity)
            : item
        );
      }

      return [...currentItems, createCartSnapshot(product, quantity)];
    });
  };

  const removeItem = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items: lineItems,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return context;
}
