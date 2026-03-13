import { useEffect, useState } from 'react';
import Home from './pages/Home';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import { subscribeToNavigation } from './utils/navigation.js';

export default function App() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    return subscribeToNavigation((nextLocation) => {
      setLocation({
        pathname: nextLocation.pathname,
        search: nextLocation.search,
      });
    });
  }, []);

  const productMatch = location.pathname.match(/^\/products\/([^/]+)$/);

  if (productMatch) {
    return <ProductDetailsPage productId={productMatch[1]} />;
  }

  return <Home key={location.search || 'home'} />;
}
