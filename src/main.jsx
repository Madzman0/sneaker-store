import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, initializeTheme } from './context/ThemeContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { StoreUIProvider } from './context/StoreUIContext.jsx';

initializeTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RecentlyViewedProvider>
        <WishlistProvider>
          <CartProvider>
            <StoreUIProvider>
              <App />
            </StoreUIProvider>
          </CartProvider>
        </WishlistProvider>
      </RecentlyViewedProvider>
    </ThemeProvider>
  </StrictMode>
);
