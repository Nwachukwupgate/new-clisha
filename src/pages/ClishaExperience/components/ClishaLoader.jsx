/**
 * Clisha Experience — full-page loader (replaces legacy Alerts/Loading in /clisha-x).
 * Uses BRAND + CLEAN fonts; respects prefers-reduced-motion.
 */
import React, { useMemo, useId } from 'react';
import { BRAND } from '../design-system/tokens';
import { CLEAN_FONTS } from '../design-system/tokens-clean';

function readThemeDark() {
  try {
    return window.localStorage.getItem('clisha-x-theme') !== 'light';
  } catch {
    return true;
  }
}

/**
 * @param {{ label?: string, variant?: 'fullscreen' | 'inline' }} props
 * — fullscreen: modal-style overlay (default). inline: section-sized, no fixed overlay (e.g. landing leaderboard).
 */
export default function ClishaLoader({ label = 'Loading…', variant = 'fullscreen' }) {
  const dark = useMemo(readThemeDark, []);
  const uid = useId().replace(/:/g, '');

  const inline = variant === 'inline';
  const overlayBg = dark ? 'rgba(14, 17, 23, 0.9)' : 'rgba(248, 250, 252, 0.94)';
  const titleColor = dark ? 'rgba(232, 237, 245, 0.92)' : 'rgba(15, 23, 42, 0.88)';
  const mutedColor = dark ? 'rgba(138, 149, 168, 0.85)' : 'rgba(71, 85, 105, 0.8)';
  const trackStroke = dark ? 'rgba(255,255,255,0.09)' : 'rgba(15, 23, 42, 0.08)';

  const gradId = `clisha-loader-grad-${uid}`;

  const shellStyle = inline
    ? {
        position: 'relative',
        width: '100%',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        borderRadius: 16,
        background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }
    : {
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: overlayBg,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="clisha-x-page-loader"
      style={shellStyle}
    >
      <style>{`
        @keyframes clisha-x-loader-orbit {
          to { transform: rotate(360deg); }
        }
        @keyframes clisha-x-loader-dash {
          0% { stroke-dasharray: 1 190; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 100 190; stroke-dashoffset: -48; }
          100% { stroke-dasharray: 1 190; stroke-dashoffset: -190; }
        }
        @keyframes clisha-x-loader-pulse {
          0%, 100% { opacity: 0.55; filter: drop-shadow(0 0 8px rgba(${BRAND.primaryRgb},0.35)); }
          50% { opacity: 1; filter: drop-shadow(0 0 16px rgba(${BRAND.primaryRgb},0.55)); }
        }
        @keyframes clisha-x-loader-label {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 1; }
        }
        .clisha-x-loader-spin {
          animation: clisha-x-loader-orbit 0.85s linear infinite;
        }
        .clisha-x-loader-glow {
          animation: clisha-x-loader-pulse 1.35s ease-in-out infinite;
        }
        .clisha-x-loader-arc {
          animation: clisha-x-loader-dash 1.1s ease-in-out infinite;
          transform-origin: 36px 36px;
        }
        .clisha-x-loader-label {
          animation: clisha-x-loader-label 1.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .clisha-x-loader-spin { animation: none !important; }
          .clisha-x-loader-glow { animation: none !important; opacity: 1 !important; }
          .clisha-x-loader-arc { animation: none !important; stroke-dasharray: 47 141 !important; stroke-dashoffset: 0 !important; }
          .clisha-x-loader-label { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="clisha-x-loader-spin clisha-x-loader-glow" style={{ width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ display: 'block' }}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BRAND.primaryDark} />
              <stop offset="55%" stopColor={BRAND.primary} />
              <stop offset="100%" stopColor={BRAND.primaryLight} />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r="30" stroke={trackStroke} strokeWidth="5" fill="none" />
          <circle
            className="clisha-x-loader-arc"
            cx="36"
            cy="36"
            r="30"
            stroke={`url(#${gradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="1 190"
            strokeDashoffset="0"
          />
        </svg>
      </div>

      <div
        className="clisha-x-loader-label"
        style={{
          marginTop: inline ? 14 : 22,
          fontFamily: CLEAN_FONTS.body,
          fontSize: inline ? 13 : 15,
          fontWeight: 600,
          color: titleColor,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
      {!inline && (
        <div
          style={{
            marginTop: 6,
            fontFamily: CLEAN_FONTS.mono,
            fontSize: 11,
            fontWeight: 600,
            color: mutedColor,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Clisha
        </div>
      )}
    </div>
  );
}
