/**
 * Clisha Experience — Token progress in horizontal animated row
 * Compact cards in a marquee-style scroll.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

function TokenChip({ item, bg3, border }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 140,
        background: item.background || bg3,
        color: '#ffffff',
        borderRadius: 10,
        padding: '10px 12px',
        border: `1px solid ${border}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item?.name || 'Token'}</span>
        <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 11, fontWeight: 700 }}>{item?.percentage ?? 0}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(100, item?.percentage ?? 0)}%`, background: '#fff', borderRadius: 99, transition: 'width 0.3s ease' }} />
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
            <TokenChip key={i} item={item} bg3={c.bg3} border={c.border} />
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
