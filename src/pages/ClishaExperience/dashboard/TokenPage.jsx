/**
 * Clisha Experience — Token page
 * Tokens = brand/company reward currencies. Each task is tied to a token.
 * Shows: Clishacoins (bonus), Earned tokens (points per brand from completed tasks).
 * Does NOT modify the old Token system.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEarnedToken, getAllToken, getBonusToken } from '../../../store/Token';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';
const taskApi = process.env.REACT_APP_API_TASK || '';

function getTokenPhotoUrl(photo) {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  return `${taskApi}/assets/company/${photo}`;
}

/* ── Clishacoins card (bonus from Vendo) ───────────────────────────── */
function ClishacoinsCard({ bonusToken, dark, c }) {
  const total = bonusToken?.totalBonusPoints ?? 0;

  return (
    <div
      className="clisha-x-token-clishacoins"
      style={{
        background: `linear-gradient(135deg,${c.blueL},${c.card})`,
        border: `2px solid ${c.blueB}`,
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        boxShadow: `0 0 24px ${c.blue}20`,
      }}
    >
      <div
        className="clisha-x-token-clishacoins-icon"
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: c.blueL,
          border: `1px solid ${c.blueB}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}
      >
        💎
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: c.blue, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Clishacoins
        </div>
        <div className="clisha-x-token-clishacoins-value" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 24, fontWeight: 700, color: c.text }}>
          {Number(total).toLocaleString()}
        </div>
        <div className="clisha-x-token-clishacoins-sub" style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
          Bonus from your Vendo package · Complete tasks to earn more
        </div>
      </div>
      <Link
        to={`${BASE}/dashboard/task`}
        style={{
          padding: '10px 18px',
          borderRadius: 10,
          border: 'none',
          background: c.blue,
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          fontFamily: CLEAN_FONTS.body,
        }}
      >
        Earn More →
      </Link>
    </div>
  );
}

/* ── Earned token card ───────────────────────────────────────────────── */
function EarnedTokenCard({ item, dark, c }) {
  const photoUrl = getTokenPhotoUrl(item?.tokenPhoto);
  const bg = item?.tokenBackground || c.goldL;

  return (
    <div
      className="clisha-x-token-earned-card"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.goldB;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        className="clisha-x-token-earned-icon"
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: bg,
          border: `1px solid ${c.goldB}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {photoUrl ? (
          <img src={photoUrl} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
        ) : (
          <span style={{ fontSize: 20 }}>🪙</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item?.tokenName || 'Token'}
        </div>
        <div className="clisha-x-token-earned-value" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 18, fontWeight: 700, color: c.gold, marginTop: 2 }}>
          {Number(item?.totalPoints ?? 0).toLocaleString()} pts
        </div>
      </div>
    </div>
  );
}

/* ── All token card (browse) ────────────────────────────────────────── */
function AllTokenCard({ item, dark, c }) {
  const photoUrl = getTokenPhotoUrl(item?.photo);
  const bg = item?.background || c.bg3;

  return (
    <div
      className="clisha-x-token-all-card"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.goldB;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {photoUrl ? (
          <img src={photoUrl} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
        ) : (
          <span style={{ fontSize: 18 }}>🪙</span>
        )}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: c.text, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
        {item?.name || 'Token'}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function TokenPage() {
  const dispatch = useDispatch();
  const { dark } = useClishaThemeToggle();
  const earnedToken = useSelector((s) => s.token?.earnedToken) ?? [];
  const allTokenRaw = useSelector((s) => s.token?.allToken);
  const allToken = Array.isArray(allTokenRaw) ? allTokenRaw : (allTokenRaw?.tokens ?? []);
  const bonusToken = useSelector((s) => s.token?.bonus);

  const c = dark ? CLEAN.dark : CLEAN.light;

  useEffect(() => {
    dispatch(getEarnedToken());
    dispatch(getAllToken());
    dispatch(getBonusToken());
  }, [dispatch]);

  const allTokens = Array.isArray(allToken) ? allToken : [];

  return (
    <div
      style={{
        fontFamily: CLEAN_FONTS.body,
        background: c.bg,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .clisha-x-token-header { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 16px !important; }
          .clisha-x-token-header-icon { width: 42px !important; height: 42px !important; font-size: 22px !important; }
          .clisha-x-token-header-title { font-size: 18px !important; }
          .clisha-x-token-clishacoins { flex-direction: column !important; align-items: flex-start !important; padding: 16px !important; gap: 12px !important; }
          .clisha-x-token-clishacoins .clisha-x-token-clishacoins-icon { width: 48px !important; height: 48px !important; font-size: 24px !important; }
          .clisha-x-token-clishacoins .clisha-x-token-clishacoins-value { font-size: 20px !important; }
          .clisha-x-token-clishacoins a { width: 100% !important; text-align: center !important; min-height: 44px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
          .clisha-x-token-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .clisha-x-token-earned-card { padding: 14px !important; gap: 12px !important; }
          .clisha-x-token-earned-card .clisha-x-token-earned-icon { width: 44px !important; height: 44px !important; }
          .clisha-x-token-earned-card .clisha-x-token-earned-value { font-size: 16px !important; }
          .clisha-x-token-empty { padding: 24px 20px !important; }
          .clisha-x-token-empty a { min-height: 44px !important; padding: 12px 20px !important; }
          .clisha-x-token-all-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) !important; gap: 8px !important; }
          .clisha-x-token-all-card { padding: 10px !important; }
        }
        @media (max-width: 480px) {
          .clisha-x-token-header-icon { width: 38px !important; height: 38px !important; }
          .clisha-x-token-header-title { font-size: 16px !important; }
          .clisha-x-token-clishacoins { padding: 14px !important; }
          .clisha-x-token-clishacoins .clisha-x-token-clishacoins-icon { width: 44px !important; height: 44px !important; }
          .clisha-x-token-clishacoins .clisha-x-token-clishacoins-value { font-size: 18px !important; }
          .clisha-x-token-clishacoins .clisha-x-token-clishacoins-sub { font-size: 11px !important; }
          .clisha-x-token-earned-card { padding: 12px !important; }
          .clisha-x-token-earned-card .clisha-x-token-earned-icon { width: 40px !important; height: 40px !important; }
          .clisha-x-token-earned-card .clisha-x-token-earned-value { font-size: 15px !important; }
          .clisha-x-token-empty { padding: 20px 16px !important; }
          .clisha-x-token-all-grid { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important; }
        }
      `}</style>

      {/* Page header */}
      <div className="clisha-x-token-header" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div
          className="clisha-x-token-header-icon"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          🪙
        </div>
        <div>
          <div className="clisha-x-token-header-title" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.text }}>
            Tokens
          </div>
          <div style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
            Brand rewards you've earned · Complete tasks to collect more
          </div>
        </div>
      </div>

      {/* Clishacoins */}
      <div style={{ marginBottom: 24 }}>
        <ClishacoinsCard bonusToken={bonusToken} dark={dark} c={c} />
      </div>

      {/* Earned tokens */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Earned Tokens
        </div>
        {earnedToken.length === 0 ? (
          <div
            className="clisha-x-token-empty"
            style={{
              textAlign: 'center',
              padding: 40,
              color: c.text2,
              fontSize: 14,
              background: c.bg3,
              borderRadius: 12,
              border: `1px dashed ${c.border}`,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🪙</div>
            <div style={{ fontWeight: 600, color: c.text, marginBottom: 2 }}>No tokens earned yet</div>
            <div style={{ marginBottom: 16 }}>Complete tasks to earn points for brand tokens.</div>
            <Link
              to={`${BASE}/dashboard/task`}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Go to Tasks →
            </Link>
          </div>
        ) : (
          <div
            className="clisha-x-token-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 12,
            }}
          >
            {earnedToken.map((item, idx) => (
              <EarnedTokenCard key={item?.tokenId ?? idx} item={item} dark={dark} c={c} />
            ))}
          </div>
        )}
      </div>

      {/* All tokens (browse) */}
      {allTokens.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            All Tokens
          </div>
          <div
            className="clisha-x-token-all-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 120px), 1fr))',
              gap: 10,
            }}
          >
            {allTokens.map((item, idx) => (
              <AllTokenCard key={item?.id ?? idx} item={item} dark={dark} c={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
