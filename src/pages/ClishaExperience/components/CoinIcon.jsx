import React from 'react';

export default function CoinIcon({ size = 20, glow = false, pulse = false }) {
  const uid = `cg_${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        filter: glow
          ? `drop-shadow(0 0 ${size * 0.25}px rgba(252,152,40,0.8)) drop-shadow(0 0 ${size * 0.5}px rgba(252,152,40,0.35))`
          : 'none',
        animation: pulse ? 'coinPulse 2s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }}
    >
      <defs>
        <radialGradient id={uid} cx="38%" cy="32%" r="65%">
          <stop offset="0%"  stopColor="#fff7c0" />
          <stop offset="30%" stopColor="#ffe066" />
          <stop offset="65%" stopColor="#FC9828" />
          <stop offset="100%" stopColor="#a86200" />
        </radialGradient>
        <radialGradient id={`${uid}_hl`} cx="40%" cy="30%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* outer coin body */}
      <circle cx="12" cy="12" r="10.5" fill={`url(#${uid})`} />

      {/* rim shadow */}
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="#7a4a00" strokeWidth="0.6" opacity="0.4" />

      {/* inner ring */}
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="#ffe066" strokeWidth="0.8" opacity="0.45" />

      {/* C letter */}
      <text
        x="12" y="16"
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="'Fraunces', serif"
        fontWeight="900"
        fill="#7a3e00"
        letterSpacing="-0.5"
      >
        C
      </text>

      {/* highlight gloss */}
      <ellipse cx="9.5" cy="8.5" rx="3" ry="2" fill={`url(#${uid}_hl)`} />
    </svg>
  );
}
