/**
 * Clisha Experience — Extension install/update prompt
 * Prompts users to install the Clisha Chrome extension when not installed.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const CHROME_EXT_LINK = 'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl';
const LATEST_VERSION = '1.0.0';

export default function ExtensionPrompt({ dark, onShowGuide }) {
  const { t } = useTranslation();
  const [showUpdateTooltip, setShowUpdateTooltip] = useState(false);

  const hasExt = typeof window !== 'undefined' ? window.localStorage.getItem('hasExt') : null;
  const storedVersion = typeof window !== 'undefined' ? localStorage.getItem('extensionVersion') : null;

  useEffect(() => {
    if (storedVersion !== LATEST_VERSION) {
      setShowUpdateTooltip(true);
    }
  }, [storedVersion]);

  const handleDismiss = () => {
    setShowUpdateTooltip(false);
    localStorage.setItem('extensionVersion', LATEST_VERSION);
  };

  const c = dark ? CLEAN.dark : CLEAN.light;

  if (hasExt === 'true' && !showUpdateTooltip) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
      {showUpdateTooltip && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleDismiss}
          onKeyDown={(e) => e.key === 'Enter' && handleDismiss()}
          style={{
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 18 }}>🔄</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{t('updateNotice')}</div>
            <div style={{ fontSize: 10, color: c.text2, marginTop: 2 }}>Click to dismiss</div>
          </div>
        </div>
      )}

      {hasExt !== 'true' && (
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
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              }}
            >
              🔌
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{t('cardTitle')}</div>
              <div style={{ fontSize: 11, color: c.text2, marginTop: 2 }}>{t('cardText')}</div>
            </div>
          </div>
          <a
            href={CHROME_EXT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onShowGuide}
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
            }}
          >
            <span>⬇</span> Get Extension
          </a>
        </div>
      )}
    </div>
  );
}
