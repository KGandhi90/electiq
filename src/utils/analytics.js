import ReactGA from 'react-ga4';

/**
 * Initialize Google Analytics.
 * Called once on app mount.
 */
export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  ReactGA.initialize(measurementId);
}

/**
 * Track a page view.
 * @param {string} path - The current route path
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: path,
    title,
  });
}

/**
 * Track a custom event.
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} [label] - Optional label
 */
export function trackEvent(category, action, label) {
  ReactGA.event({ category, action, label });
}
