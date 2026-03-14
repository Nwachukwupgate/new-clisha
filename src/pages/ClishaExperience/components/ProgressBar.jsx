import React from 'react';
import { BRAND } from '../design-system/tokens';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = BRAND.primary,
  height = 8,
  showLabel = false,
  glow = true,
  animated = true,
  style = {},
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const isOrange = color === BRAND.primary || color === '#FC9828';

  return (
    <div style={{ width: '100%', ...style }}>
      <div
        style={{
          height,
          borderRadius: height / 2,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: isOrange
              ? `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary} 60%, ${BRAND.primaryLight})`
              : color,
            borderRadius: height / 2,
            transition: animated ? 'width 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
            boxShadow: glow && pct > 0
              ? isOrange
                ? `0 0 ${height + 4}px rgba(252,152,40,0.5), 0 0 ${height * 2}px rgba(252,152,40,0.25)`
                : `0 0 ${height + 4}px ${color}80`
              : 'none',
            position: 'relative',
          }}
        >
          {/* shimmer sweep */}
          {pct > 10 && (
            <div style={{
              position: 'absolute',
              top: 0, left: '-100%',
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              animation: 'progressShimmer 2.2s ease-in-out infinite',
              borderRadius: height / 2,
            }} />
          )}
        </div>
      </div>
      {showLabel && (
        <span style={{
          fontSize: 11, fontWeight: 700,
          color, opacity: 0.9,
          marginTop: 4, display: 'block',
        }}>
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
