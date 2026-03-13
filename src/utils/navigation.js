const NAVIGATION_EVENT = 'aurel:navigate';

export function navigateTo(path) {
  if (typeof window === 'undefined') return;

  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl === path) return;

  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

export function buildProductPath(productId) {
  return `/products/${productId}`;
}

export function buildHomeSectionPath(sectionId) {
  return sectionId ? `/?section=${sectionId}` : '/';
}

export function subscribeToNavigation(listener) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleNavigation = () => listener(window.location);

  window.addEventListener('popstate', handleNavigation);
  window.addEventListener(NAVIGATION_EVENT, handleNavigation);

  return () => {
    window.removeEventListener('popstate', handleNavigation);
    window.removeEventListener(NAVIGATION_EVENT, handleNavigation);
  };
}
