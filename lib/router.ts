import { useSyncExternalStore, type MouseEvent } from 'react';

// Two kinds of page: the home page and /work/<slug> case studies.
// A full router library would be heavier than the routing it does.

const subscribe = (notify: () => void) => {
  window.addEventListener('popstate', notify);
  return () => window.removeEventListener('popstate', notify);
};

export const usePathname = () =>
  useSyncExternalStore(subscribe, () => window.location.pathname, () => '/');

export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) return;
  const samePage = url.pathname === window.location.pathname;
  window.history.pushState({}, '', url.pathname + url.hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (url.hash) {
    // Wait a frame so the target exists when coming from another page.
    requestAnimationFrame(() => scrollToId(url.hash.slice(1), samePage));
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }
}

export function scrollToId(id: string, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });
}

// Intercept plain left-clicks on internal links; let modified clicks open tabs.
export function onInternalLink(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const href = event.currentTarget.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
  event.preventDefault();
  navigate(href);
}
