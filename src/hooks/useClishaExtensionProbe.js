import { useState, useEffect, useCallback } from 'react';
import { probeClishaExtensions, REQUIRED_EXTENSION_VERSION } from '../utils/clishaExtensionProbe';

/**
 * Re-runs extension probe on mount, window focus, and when calling recheck().
 */
export function useClishaExtensionProbe() {
  const [result, setResult] = useState(() => ({
    ok: typeof window !== 'undefined' && window.localStorage.getItem('hasExt') === 'true',
    status: typeof window !== 'undefined' ? window.localStorage.getItem('extensionStatus') || 'unknown' : 'unknown',
    version: typeof window !== 'undefined' ? window.localStorage.getItem('extensionVersion') : null,
  }));
  const [probeReady, setProbeReady] = useState(false);

  const run = useCallback(() => {
    probeClishaExtensions().then((r) => {
      setResult({
        ok: r.ok,
        status: r.status,
        version: r.version ?? null,
        matchedId: r.matchedId,
      });
      setProbeReady(true);
    });
  }, []);

  useEffect(() => {
    run();
    const onFocus = () => run();
    window.addEventListener('focus', onFocus);
    const onProbed = () => {
      setResult({
        ok: window.localStorage.getItem('hasExt') === 'true',
        status: window.localStorage.getItem('extensionStatus') || 'unknown',
        version: window.localStorage.getItem('extensionVersion'),
      });
    };
    window.addEventListener('clisha-extension-probed', onProbed);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('clisha-extension-probed', onProbed);
    };
  }, [run]);

  return { ...result, recheck: run, requiredVersion: REQUIRED_EXTENSION_VERSION, probeReady };
}
