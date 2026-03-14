/**
 * Clisha Experience — Gamified Design Tokens
 * Duolingo-inspired motivation system + modern SaaS
 */

export const BRAND = {
  primary: '#FC9828',
  primaryDark: '#e08600',
  primaryLight: '#ffb347',
  primaryRgb: '252, 152, 40',
  accent: '#FFD93D',
  success: '#34d399',
  successDark: '#059669',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#38bdf8',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOWS = {
  sm: '0 2px 8px rgba(0,0,0,0.08)',
  md: '0 4px 20px rgba(0,0,0,0.12)',
  lg: '0 8px 32px rgba(0,0,0,0.16)',
  glow: `0 4px 24px rgba(${BRAND.primaryRgb},0.35)`,
  glowHover: `0 8px 32px rgba(${BRAND.primaryRgb},0.45)`,
};

export const TYPOGRAPHY = {
  fontDisplay: "'Fraunces', 'Bebas Neue', serif",
  fontBody: "'Plus Jakarta Sans', 'Outfit', sans-serif",
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
