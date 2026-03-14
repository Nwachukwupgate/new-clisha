/**
 * Clisha Experience — Theme (dark/light)
 */

import { BRAND } from './tokens';

export const darkTheme = {
  bg: '#0a0a0a',
  surface: '#141414',
  surfaceAlt: '#1a1a1a',
  surfaceHover: '#1f1f1f',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.15)',
  text: '#ffffff',
  textSub: 'rgba(255,255,255,0.78)',
  textMuted: 'rgba(255,255,255,0.5)',
  brand: BRAND.primary,
  brandDark: BRAND.primaryDark,
  brandBg: `rgba(${BRAND.primaryRgb},0.15)`,
  brandBorder: `rgba(${BRAND.primaryRgb},0.4)`,
  success: BRAND.success,
  error: BRAND.error,
  navBg: 'rgba(10,10,10,0.92)',
};

export const lightTheme = {
  bg: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#faf8f5',
  surfaceHover: '#fff8f0',
  border: `rgba(${BRAND.primaryRgb},0.15)`,
  borderStrong: `rgba(${BRAND.primaryRgb},0.3)`,
  text: '#0d0d0d',
  textSub: 'rgba(0,0,0,0.78)',
  textMuted: 'rgba(0,0,0,0.55)',
  brand: BRAND.primary,
  brandDark: BRAND.primaryDark,
  brandBg: `rgba(${BRAND.primaryRgb},0.12)`,
  brandBorder: `rgba(${BRAND.primaryRgb},0.35)`,
  success: BRAND.successDark,
  error: BRAND.error,
  navBg: 'rgba(255,255,255,0.95)',
};
