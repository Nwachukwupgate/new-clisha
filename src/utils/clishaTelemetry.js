/**
 * Privacy-conscious task/extension analytics: prefers gtag when present, no PII in payloads.
 */

const EVENT_PREFIX = 'clisha_x';

function getGtag() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' ? window.gtag : null;
}

/**
 * @param {string} name - event name (snake_case)
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackClishaEvent(name, params = {}) {
  const payload = { event_category: 'clisha_experience', ...params };
  const gtag = getGtag();
  if (gtag) {
    try {
      gtag('event', `${EVENT_PREFIX}_${name}`, payload);
    } catch {
      /* ignore */
    }
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug(`[clishaTelemetry] ${name}`, payload);
  }
}
