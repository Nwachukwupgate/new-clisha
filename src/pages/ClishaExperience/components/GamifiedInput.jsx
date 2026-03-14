import React, { useState, useId } from 'react';
import { BRAND, RADIUS, TYPOGRAPHY } from '../design-system/tokens';

/**
 * GamifiedInput
 * Props:
 *  label, value, onChange, placeholder, type, icon,
 *  error, hint, disabled, dark, showStrength (password)
 */
export default function GamifiedInput({
  label,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  icon,
  error,
  hint,
  disabled = false,
  dark = false,
  showStrength = false,
  style = {},
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (visible ? 'text' : 'password') : type;
  const hasValue = String(value).length > 0;
  const isValid = hasValue && !error;

  /* ── password strength ──────────────────────────────────────── */
  const strength = (() => {
    if (!isPassword || !showStrength || !hasValue) return null;
    const v = value;
    let score = 0;
    if (v.length >= 8) score += 1;
    if (v.length >= 12) score += 1;
    if (/[A-Z]/.test(v)) score += 1;
    if (/[0-9]/.test(v)) score += 1;
    if (/[^A-Za-z0-9]/.test(v)) score += 1;
    if (score <= 1) return { score: 1, label: 'Too weak', color: BRAND.error };
    if (score === 2) return { score: 2, label: 'Fair', color: BRAND.warning };
    if (score === 3) return { score: 3, label: 'Good', color: BRAND.info };
    if (score === 4) return { score: 4, label: 'Strong', color: BRAND.success };
    return { score: 5, label: 'Unbreakable 🛡', color: BRAND.success };
  })();

  /* ── theme-aware colours ────────────────────────────────────── */
  const bg = dark ? '#1a1a1a' : '#ffffff';
  const borderColor = error
    ? BRAND.error
    : focused
      ? BRAND.primary
      : dark
        ? 'rgba(255,255,255,0.1)'
        : `rgba(${BRAND.primaryRgb},0.2)`;
  const labelColor = error
    ? BRAND.error
    : focused || hasValue
      ? BRAND.primary
      : dark
        ? 'rgba(255,255,255,0.45)'
        : 'rgba(0,0,0,0.45)';
  const textColor = dark ? '#fff' : '#0d0d0d';
  const mutedColor = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)';

  /* ── glow ───────────────────────────────────────────────────── */
  const boxShadow = error
    ? `0 0 0 3px rgba(248,113,113,0.18), 0 2px 8px rgba(0,0,0,0.08)`
    : focused
      ? `0 0 0 3px rgba(${BRAND.primaryRgb},0.18), 0 2px 12px rgba(${BRAND.primaryRgb},0.12)`
      : dark
        ? '0 2px 6px rgba(0,0,0,0.3)'
        : '0 2px 6px rgba(0,0,0,0.05)';

  return (
    <div style={{ marginBottom: 18, position: 'relative', ...style }}>

      {/* ── floating label ───────────────────────────────── */}
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 700,
          color: labelColor,
          marginBottom: 7,
          letterSpacing: '0.3px',
          fontFamily: TYPOGRAPHY.fontBody,
          transition: 'color 0.2s',
          userSelect: 'none',
        }}
      >
        {label}
      </label>

      {/* ── input wrapper ────────────────────────────────── */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* leading icon */}
        {icon && (
          <span style={{
            position: 'absolute', left: 14, fontSize: 16,
            pointerEvents: 'none', zIndex: 2,
            transition: 'opacity 0.2s',
            opacity: focused || hasValue ? 1 : 0.45,
          }}>
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          disabled={disabled}
          placeholder={focused || !label ? placeholder : ''}
          autoComplete={isPassword ? 'current-password' : 'off'}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            background: bg,
            border: `1.5px solid ${borderColor}`,
            borderRadius: RADIUS.md,
            padding: `12px ${isPassword ? 44 : 14}px 12px ${icon ? 42 : 14}px`,
            fontSize: 14,
            fontFamily: TYPOGRAPHY.fontBody,
            fontWeight: 500,
            color: disabled ? mutedColor : textColor,
            outline: 'none',
            boxShadow,
            transition: 'border-color 0.22s, box-shadow 0.22s, background 0.22s',
            opacity: disabled ? 0.55 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />

        {/* trailing: password toggle OR valid checkmark */}
        <div style={{ position: 'absolute', right: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          {isValid && !isPassword && (
            <span style={{
              fontSize: 14, color: dark ? BRAND.success : '#059669',
              animation: 'popIn 0.25s cubic-bezier(.17,.67,.3,1.3)',
            }}>✓</span>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible(v => !v)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 15, opacity: 0.55, padding: 2, lineHeight: 1,
                color: textColor, transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; }}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? '🙈' : '👁'}
            </button>
          )}
        </div>
      </div>

      {/* ── password strength bar ──────────────────────── */}
      {showStrength && isPassword && hasValue && strength && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 4,
                background: i <= strength.score ? strength.color : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                transition: 'background 0.3s ease',
                boxShadow: i <= strength.score ? `0 0 6px ${strength.color}60` : 'none',
              }} />
            ))}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 11, fontWeight: 700,
            color: strength.color, letterSpacing: '0.2px',
          }}>
            <span>{strength.label}</span>
            <span style={{ opacity: 0.6, color: mutedColor }}>Password strength</span>
          </div>
        </div>
      )}

      {/* ── error / hint message ───────────────────────── */}
      {(error || hint) && (
        <div style={{
          marginTop: 6, fontSize: 12, fontWeight: 600,
          color: error ? BRAND.error : mutedColor,
          display: 'flex', alignItems: 'center', gap: 4,
          animation: error ? 'shakeX 0.3s ease' : 'none',
        }}>
          {error && <span style={{ fontSize: 11 }}>⚠</span>}
          {error || hint}
        </div>
      )}
    </div>
  );
}
