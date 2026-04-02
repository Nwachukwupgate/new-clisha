/**
 * Clisha Experience — Token progress in horizontal animated row
 * Compact cards in a marquee-style scroll.
 * Text/progress colors adapt to token background luminance (readable on white/light).
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

/** First #hex in a string (handles gradients). */
function firstHexInString(str) {
  if (!str || typeof str !== 'string') return null;
  const m = str.match(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  if (!m) return null;
  const h = m[1];
  if (h.length === 3) return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  return `#${h}`;
}

function parseRgb(input) {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim();
  const hex = firstHexInString(s);
  if (hex) {
    const h = hex.slice(1);
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const rgb = s.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
  return null;
}

function relativeLuminance({ r, g, b }) {
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** True → use dark text / dark progress UI (bg is light). */
function isLightBackground(colorString, fallbackForUnknown) {
  const rgb = parseRgb(colorString);
  if (!rgb) {
    const fb = parseRgb(fallbackForUnknown);
    if (!fb) return true;
    return relativeLuminance(fb) > 0.55;
  }
  return relativeLuminance(rgb) > 0.55;
}

function TokenChip({ item, bg3, border, gold, dark }) {
  const rawBg = item?.background;
  const bg = rawBg && String(rawBg).trim() !== '' ? rawBg : bg3;
  const light = isLightBackground(rawBg || bg, bg3);

  const text = light ? (dark ? '#0B1220' : '#0f172a') : '#f8fafc';
  const textMuted = light ? (dark ? '#0B1220' : '#1e293b') : 'rgba(248, 250, 252, 0.92)';
  const track = light ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.28)';
  const fill = light ? gold : '#ffffff';
  const chipBorder = light ? 'rgba(15, 23, 42, 0.14)' : border;
  const textShadow = light ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.45)';

  return (
    <div
      style={{
        flexShrink: 0,
        width: 140,
        background: bg,
        color: text,
        borderRadius: 10,
        padding: '10px 12px',
        border: `1px solid ${chipBorder}`,
        boxShadow: light ? 'inset 0 1px 0 rgba(255,255,255,0.6)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 80,
            color: text,
            textShadow,
          }}
        >
          {item?.name || 'Token'}
        </span>
        <span
          style={{
            fontFamily: CLEAN_FONTS.mono,
            fontSize: 11,
            fontWeight: 700,
            color: textMuted,
            textShadow,
          }}
        >
          {item?.percentage ?? 0}%
        </span>
      </div>
      <div style={{ height: 5, background: track, borderRadius: 99, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, item?.percentage ?? 0)}%`,
            background: fill,
            borderRadius: 99,
            transition: 'width 0.3s ease',
            boxShadow: light ? `0 0 0 1px rgba(15,23,42,0.08)` : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function TokenProgressCard({ dark }) {
  const topToken = useSelector((state) => state.general?.topToken);
  const c = dark ? CLEAN.dark : CLEAN.light;

  const tokens = topToken?.slice(0, 10) ?? [];

  if (!tokens.length) return null;

  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Token Progress</span>
        <Link to={`${BASE}/dashboard/token`} style={{ fontSize: 10, fontWeight: 600, color: c.gold, textDecoration: 'none', fontFamily: CLEAN_FONTS.body }}>Show more →</Link>
      </div>
      <div style={{ padding: '12px 0', overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)' }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            animation: 'token-marquee 25s linear infinite',
            width: 'max-content',
          }}
        >
          {[...tokens, ...tokens].map((item, i) => (
            <TokenChip key={i} item={item} bg3={c.bg3} border={c.border} gold={c.gold} dark={dark} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes token-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
