import React, { useState } from 'react';
import { BRAND, RADIUS, SHADOWS, TYPOGRAPHY } from '../design-system/tokens';

/**
 * GamifiedButton
 * Props:
 *  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 *  size: 'sm' | 'md' | 'lg'
 *  fullWidth, loading, disabled, icon, type, onClick, children, dark, style
 */
export default function GamifiedButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  onClick,
  children,
  dark = false,
  style = {},
}) {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const isDisabled = disabled || loading;

  /* ── ripple effect ──────────────────────────────────────────── */
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
  };

  /* ── sizes ──────────────────────────────────────────────────── */
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 12, height: 36 },
    md: { padding: '12px 22px', fontSize: 14, height: 46 },
    lg: { padding: '14px 28px', fontSize: 15, height: 52 },
  };
  const sz = sizes[size] || sizes.md;

  /* ── variants ───────────────────────────────────────────────── */
  const variants = {
    primary: {
      background: isDisabled
        ? dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
        : `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 50%, ${BRAND.primaryLight} 100%)`,
      color: isDisabled ? (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') : '#fff',
      border: 'none',
      boxShadow: isDisabled ? 'none' : pressed ? SHADOWS.glow : SHADOWS.glow,
    },
    secondary: {
      background: dark ? 'rgba(255,255,255,0.06)' : `rgba(${BRAND.primaryRgb},0.08)`,
      color: dark ? 'rgba(255,255,255,0.85)' : BRAND.primaryDark,
      border: `1.5px solid ${dark ? 'rgba(255,255,255,0.12)' : `rgba(${BRAND.primaryRgb},0.25)`}`,
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      border: `1.5px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      boxShadow: 'none',
    },
    danger: {
      background: `linear-gradient(135deg,#dc2626,${BRAND.error})`,
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 16px rgba(248,113,113,0.35)',
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={(e) => { if (!isDisabled) { addRipple(e); onClick?.(e); } }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: fullWidth ? '100%' : 'auto',
        height: sz.height,
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontWeight: 700,
        fontFamily: TYPOGRAPHY.fontBody,
        letterSpacing: '0.2px',
        borderRadius: RADIUS.md,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        transition: 'transform 0.15s, box-shadow 0.2s, opacity 0.2s',
        transform: pressed && !isDisabled ? 'scale(0.975)' : 'scale(1)',
        ...v,
        ...style,
      }}
      onMouseEnter={e => {
        if (!isDisabled) {
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = SHADOWS.glowHover;
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = v.boxShadow || 'none';
        e.currentTarget.style.transform = 'scale(1)';
        setPressed(false);
      }}
    >
      {/* ── ripple pool ───────────────────────────────── */}
      {ripples.map(rp => (
        <span key={rp.id} style={{
          position: 'absolute',
          left: rp.x, top: rp.y,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.45)',
          transform: 'translate(-50%,-50%) scale(0)',
          animation: 'rippleOut 0.6s ease-out forwards',
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── loading spinner ───────────────────────────── */}
      {loading ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}>
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="8" strokeLinecap="round" />
          </svg>
          <span>Processing…</span>
        </>
      ) : (
        <>
          {icon && (
            <span style={{
              fontSize: size === 'sm' ? 14 : 18,
              lineHeight: 1,
              display: 'flex', alignItems: 'center',
              transition: 'transform 0.3s',
            }}
              className="btn-icon"
            >{icon}</span>
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
