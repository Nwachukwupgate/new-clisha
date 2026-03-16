/**
 * Clisha Experience — Clean dashboard design tokens (from clisha_dashboard_clean.html)
 * Uses BRAND for gold/accent; Space Grotesk + Space Mono fonts
 */

import { BRAND } from './tokens';

export const CLEAN = {
  /* dark theme (default mockup) */
  dark: {
    bg: '#0E1117',
    bg2: '#161B26',
    bg3: '#1E2535',
    bg4: '#252D40',
    card: '#182030',
    text: '#E8EDF5',
    text2: '#8A95A8',
    text3: '#4A5568',
    border: 'rgba(255,255,255,0.07)',
    border2: 'rgba(255,255,255,0.13)',
    gold: BRAND.primary,
    goldL: `rgba(${BRAND.primaryRgb},0.1)`,
    goldB: `rgba(${BRAND.primaryRgb},0.2)`,
    green: '#2ECC71',
    greenL: 'rgba(46,204,113,0.1)',
    greenB: 'rgba(46,204,113,0.2)',
    blue: '#4A9EFF',
    blueL: 'rgba(74,158,255,0.1)',
    blueB: 'rgba(74,158,255,0.2)',
    orange: '#FF9F43',
    purple: '#A78BFA',
  },
  /* light theme variant */
  light: {
    bg: '#f8fafc',
    bg2: '#f1f5f9',
    bg3: '#e2e8f0',
    bg4: '#cbd5e1',
    card: '#ffffff',
    text: '#0f172a',
    text2: '#475569',
    text3: '#94a3b8',
    border: 'rgba(0,0,0,0.08)',
    border2: 'rgba(0,0,0,0.15)',
    gold: BRAND.primary,
    goldL: `rgba(${BRAND.primaryRgb},0.12)`,
    goldB: `rgba(${BRAND.primaryRgb},0.25)`,
    green: '#059669',
    greenL: 'rgba(5,150,105,0.12)',
    greenB: 'rgba(5,150,105,0.25)',
    blue: '#2563eb',
    blueL: 'rgba(37,99,235,0.1)',
    blueB: 'rgba(37,99,235,0.2)',
    orange: '#ea580c',
    purple: '#7c3aed',
  },
};

export const CLEAN_FONTS = {
  body: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
  mono: "'Space Mono', 'SF Mono', monospace",
};
