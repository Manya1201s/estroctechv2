const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let initialized = false;

/**
 * Loads GA4 only when VITE_GA_MEASUREMENT_ID is set — unset in local/dev, so
 * nothing is ever sent until an id is configured for a real deployment.
 */
export function initAnalytics() {
  if (initialized || !MEASUREMENT_ID || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** No-op until analytics is configured, so call sites never need to guard this. */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (!MEASUREMENT_ID || typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push(["event", name, params]);
}
