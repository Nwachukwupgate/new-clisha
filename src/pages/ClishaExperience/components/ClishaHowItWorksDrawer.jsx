/**
 * Full “How Clisha + extension work” panel (drawer / modal).
 */
import React from 'react';
import { isDevLikeHost } from '../../../utils/clishaExtensionProbe';
import { HEALTH_NARRATIVE, CHROME_WEB_STORE_URL } from '../copy/extensionHealthCopy';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

function readDevExtensionId() {
  try {
    return window.localStorage.getItem('clishaDevExtensionId') || '';
  } catch {
    return '';
  }
}

export default function ClishaHowItWorksDrawer({ open, onClose, dark }) {
  const c = dark ? CLEAN.dark : CLEAN.light;
  const devId = readDevExtensionId();

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clisha-how-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.55)',
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 440,
          width: '100%',
          maxHeight: 'min(90vh, 640px)',
          overflowY: 'auto',
          borderRadius: 16,
          border: `1px solid ${c.border}`,
          background: c.card,
          padding: '20px 22px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
          <div>
            <h2 id="clisha-how-title" style={{ margin: 0, fontSize: 17, fontWeight: 700, color: c.text, fontFamily: CLEAN_FONTS.body }}>
              How Clisha + extension work
            </h2>
            <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.5, color: c.text2 }}>{HEALTH_NARRATIVE.oneLiner}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: 8,
              border: `1px solid ${c.border}`,
              background: c.bg3,
              color: c.text2,
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {HEALTH_NARRATIVE.steps.map((s, i) => (
            <li key={s.title} style={{ fontSize: 13, color: c.text, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: c.gold }}>{i + 1}. {s.title}</span>
              <div style={{ marginTop: 4, color: c.text2 }}>{s.body}</div>
            </li>
          ))}
        </ol>

        <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 10,
              background: c.gold,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
              fontFamily: CLEAN_FONTS.body,
            }}
          >
            Chrome Web Store — Clisha Experience
          </a>
          <p style={{ margin: '12px 0 0', fontSize: 11, color: c.text3, lineHeight: 1.45 }}>
            {isDevLikeHost()
              ? 'Dev / localhost: download the extension zip from Settings → Chrome extension, then Load unpacked in chrome://extensions. Paste your extension ID below if the dashboard does not detect it.'
              : 'Testers using an unpacked build: set your dev extension ID in Settings so the dashboard can probe it.'}
            {devId ? (
              <>
                {' '}
                Current ID: <span style={{ fontFamily: CLEAN_FONTS.mono, color: c.text2 }}>{devId}</span>
              </>
            ) : (
              <> No dev ID saved yet.</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
