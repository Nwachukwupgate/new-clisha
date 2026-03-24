/**
 * Chrome extension detection for Clisha Experience (multi-ID + version check).
 */
/* global chrome */
/* eslint-env browser */

export const REQUIRED_EXTENSION_VERSION = process.env.REACT_APP_EXTENSION_MIN_VERSION || '1.1.0';

/** Chrome Web Store / production default (no server env required). */
const STORE_EXTENSION_ID = process.env.REACT_APP_CHROME_EXTENSION_ID || 'fggiejockcliimogohnaiakpbcjaafcl';

/**
 * Unpacked / dev build ID when testing on dev.clisha.me or localhost.
 * Production (clisha.me) probes the store ID only unless env or Settings adds more.
 */
const DEV_HOST_EXTENSION_ID = 'ceeljppjffplieimbganojhgamdlabpb';

/** dev.clisha.me + local dev servers — prefer DEV_HOST_EXTENSION_ID first. */
export function isDevLikeHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return (
    h === 'dev.clisha.me' ||
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h.endsWith('.localhost')
  );
}

export function compareVersions(v1, v2) {
  const v1Parts = String(v1 || '0').split('.').map(Number);
  const v2Parts = String(v2 || '0').split('.').map(Number);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i += 1) {
    const a = v1Parts[i] || 0;
    const b = v2Parts[i] || 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }
  return 0;
}

/** IDs from hostname (dev vs prod), env, Settings paste, and store default (deduped). */
export function getExtensionIdsToProbe() {
  const extra = process.env.REACT_APP_CHROME_EXTENSION_IDS_EXTRA;
  const fromEnv = extra
    ? extra.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  let fromSettings = '';
  try {
    fromSettings = window.localStorage.getItem('clishaDevExtensionId') || '';
  } catch {
    fromSettings = '';
  }

  if (isDevLikeHost()) {
    return [...new Set([DEV_HOST_EXTENSION_ID, STORE_EXTENSION_ID, ...fromEnv, fromSettings].filter(Boolean))];
  }

  return [...new Set([STORE_EXTENSION_ID, ...fromEnv, fromSettings].filter(Boolean))];
}

/**
 * Probes extension IDs sequentially; updates localStorage: hasExt, extensionVersion, extensionStatus, extensionMatchedId.
 * @returns {Promise<{ ok: boolean, status: 'ok'|'outdated'|'missing'|'wrong_browser', version?: string, matchedId?: string }>}
 */
export function probeClishaExtensions() {
  return new Promise((resolve) => {
    const required = REQUIRED_EXTENSION_VERSION;
    const ids = getExtensionIdsToProbe();

    if (typeof window === 'undefined') {
      resolve({ ok: false, status: 'wrong_browser' });
      return;
    }

    if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) {
      try {
        window.localStorage.setItem('hasExt', 'false');
        window.localStorage.setItem('extensionStatus', 'wrong_browser');
        window.localStorage.removeItem('extensionVersion');
        window.localStorage.removeItem('extensionMatchedId');
      } catch {
        /* ignore */
      }
      resolve({ ok: false, status: 'wrong_browser' });
      return;
    }

    let foundOutdated = null;

    const tryNext = (index) => {
      if (index >= ids.length) {
        if (foundOutdated) {
          try {
            window.localStorage.setItem('hasExt', 'false');
            window.localStorage.setItem('extensionStatus', 'outdated');
            window.localStorage.setItem('extensionVersion', foundOutdated.version);
            window.localStorage.setItem('extensionMatchedId', foundOutdated.id);
          } catch {
            /* ignore */
          }
          window.dispatchEvent(new Event('clisha-extension-probed'));
          resolve({ ok: false, status: 'outdated', version: foundOutdated.version, matchedId: foundOutdated.id });
          return;
        }
        try {
          window.localStorage.setItem('hasExt', 'false');
          window.localStorage.setItem('extensionStatus', 'missing');
          window.localStorage.removeItem('extensionVersion');
          window.localStorage.removeItem('extensionMatchedId');
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event('clisha-extension-probed'));
        resolve({ ok: false, status: 'missing' });
        return;
      }

      const id = ids[index];
      try {
        chrome.runtime.sendMessage(id, 'version', (response) => {
          const err = chrome.runtime.lastError;
          if (err || !response?.version) {
            tryNext(index + 1);
            return;
          }
          const cmp = compareVersions(response.version, required);
          if (cmp >= 0) {
            try {
              window.localStorage.setItem('hasExt', 'true');
              window.localStorage.setItem('extensionStatus', 'ok');
              window.localStorage.setItem('extensionVersion', response.version);
              window.localStorage.setItem('extensionMatchedId', id);
            } catch {
              /* ignore */
            }
            window.dispatchEvent(new Event('clisha-extension-probed'));
            resolve({
              ok: true,
              status: 'ok',
              version: response.version,
              matchedId: id,
            });
            return;
          }
          if (!foundOutdated || compareVersions(response.version, foundOutdated.version) > 0) {
            foundOutdated = { id, version: response.version };
          }
          tryNext(index + 1);
        });
      } catch {
        tryNext(index + 1);
      }
    };

    tryNext(0);
  });
}
