/**
 * Clisha Experience — Extension install / update / status (multi-ID probe).
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';
import { useExtensionProbe } from '../context/ExtensionProbeContext';
import { trackClishaEvent } from '../../../utils/clishaTelemetry';
import { HEALTH_NARRATIVE } from '../copy/extensionHealthCopy';

const CHROME_EXT_LINK = 'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl';
const DISMISSED_KEY = 'extensionPromptDismissed';

export default function ExtensionPrompt({ dark }) {
  const { t } = useTranslation();
  const { ok, status, version, recheck, requiredVersion, probeReady } = useExtensionProbe();
  const [dismissed, setDismissed] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem(DISMISSED_KEY) === 'true'
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'clishaDevExtensionId') recheck();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [recheck]);

  const showInstall = status === 'missing' || status === 'wrong_browser';
  const showOutdated = status === 'outdated';

  useEffect(() => {
    if (!probeReady || dismissed) return;
    if (ok && status === 'ok') return;
    if (!showOutdated && !showInstall) return;
    trackClishaEvent('extension_prompt_view', { variant: showOutdated ? 'outdated' : 'install' });
  }, [probeReady, dismissed, ok, status, showOutdated, showInstall]);

  const handleDismissPrompt = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  const handleGetExtension = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  const c = dark ? CLEAN.dark : CLEAN.light;

  if (dismissed) return null;
  if (!probeReady) return null;

  if (ok && status === 'ok') return null;
  if (!showOutdated && !showInstall) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
      {showOutdated && (
        <div
          style={{
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.45)',
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 18 }}>🔄</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>
              Update your Clisha extension
            </div>
            <div style={{ fontSize: 11, color: c.text2, marginTop: 4 }}>
              Installed: v{version || '?'}. Required: v{requiredVersion} or newer. Update from the Chrome Web Store, then use Recheck.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <a
                href={CHROME_EXT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  background: c.gold,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                }}
              >
                Update extension
              </a>
              <button
                type="button"
                onClick={() => recheck()}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  border: `1px solid ${c.border}`,
                  background: c.card,
                  color: c.text,
                  cursor: 'pointer',
                }}
              >
                Recheck
              </button>
            </div>
          </div>
        </div>
      )}

      {showInstall && (
        <div
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 13,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={handleDismissPrompt}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 28,
              height: 28,
              borderRadius: 6,
              border: `1px solid ${c.border}`,
              background: 'transparent',
              color: c.text2,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: c.blueL,
                border: `1px solid ${c.blueB}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              🔌
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{t('cardTitle')}</div>
              <div style={{ fontSize: 11, color: c.text2, marginTop: 2 }}>
                {status === 'wrong_browser'
                  ? 'Use Google Chrome for the Clisha extension, or install it on Chrome and refresh.'
                  : t('cardText')}
              </div>
              <div style={{ fontSize: 10, color: c.text3, marginTop: 6, lineHeight: 1.45 }}>{HEALTH_NARRATIVE.oneLiner}</div>
            </div>
          </div>
          <a
            href={CHROME_EXT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGetExtension}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: c.gold,
              color: '#1a1a1a',
              textDecoration: 'none',
              fontFamily: CLEAN_FONTS.body,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            <span>⬇</span> Get Extension
          </a>
        </div>
      )}
    </div>
  );
}
