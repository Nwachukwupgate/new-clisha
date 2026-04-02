/**
 * Clisha Experience — Gamified Rank page
 * Design: Celebrated top 3 podium → User's special card → Community leaderboard
 * Follows CLEAN tokens, gamification patterns, user-centric hierarchy
 * Does NOT modify the old Rank system.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ProfilePicture from '../../../utils/ProfilePicture';
import ClishaLoader from '../components/ClishaLoader';
import { getRank } from '../../../store/Rank';
import { getExperience } from '../../../store/General';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const api = process.env.REACT_APP_API;

function getRankConfig() {
  const token = window.localStorage.getItem('token');
  return { headers: { Authorization: `bearer ${token}` } };
}

/* ── AdStar tiers (order: Bronze → Grandmaster). Point thresholds are set by the backend. ── */
const ADSTAR_TIERS = [
  { name: 'Bronze', order: 1 },
  { name: 'Silver', order: 2 },
  { name: 'Gold', order: 3 },
  { name: 'Platinium', order: 4 },
  { name: 'Diamond', order: 5 },
  { name: 'Master', order: 6 },
  { name: 'Grandmaster', order: 7 },
];

/* ── Rank tier colors (AdStar Bronze, Silver, Gold, etc.) ───────────── */
const RANK_TIERS = {
  bronze: { color: '#CD7F32', bg: 'rgba(205,127,50,0.15)', border: 'rgba(205,127,50,0.4)', icon: '🥉' },
  silver: { color: '#94A3B8', bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)', icon: '🥈' },
  gold: { color: '#F5C542', bg: 'rgba(245,197,66,0.15)', border: 'rgba(245,197,66,0.4)', icon: '🥇' },
  platinium: { color: '#4A9EFF', bg: 'rgba(74,158,255,0.15)', border: 'rgba(74,158,255,0.4)', icon: '💎' },
  diamond: { color: '#A78BFA', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.4)', icon: '💎' },
  master: { color: '#F5C542', bg: 'rgba(245,197,66,0.2)', border: 'rgba(245,197,66,0.5)', icon: '👑' },
  grandmaster: { color: '#FF9F43', bg: 'rgba(255,159,67,0.2)', border: 'rgba(255,159,67,0.5)', icon: '🏆' },
};

function getRankTier(rankName) {
  if (!rankName) return RANK_TIERS.bronze;
  const key = (rankName.slice(7) || 'bronze').toLowerCase().replace('platinum', 'platinium');
  return RANK_TIERS[key] || RANK_TIERS.bronze;
}

function getRankImageSrc(rankName) {
  const slug = (rankName?.slice(7) || 'bronze').toLowerCase();
  return `/images/rank/${slug}.png`;
}

/* ── Podium card (Top 3 — celebrated) ─────────────────────────────── */
function PodiumCard({ item, position, dark, c }) {
  const tier = getRankTier(item?.rankName);
  const isFirst = position === 1;
  const size = isFirst ? 96 : position === 2 ? 80 : 72;
  const orderClass = `clisha-x-podium-${position}`;

  return (
    <div
      className={orderClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        flex: isFirst ? 1.2 : 1,
        maxWidth: isFirst ? 200 : 160,
      }}
    >
      {/* Crown / badge for #1 */}
      {isFirst && (
        <div style={{ position: 'absolute', top: -12, fontSize: 36, zIndex: 2, filter: 'drop-shadow(0 2px 8px rgba(245,197,66,0.5))' }}>
          👑
        </div>
      )}
      <div
        className="clisha-x-podium-avatar"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `4px solid ${tier.color}`,
          overflow: 'hidden',
          background: c.card,
          boxShadow: isFirst ? `0 8px 32px rgba(0,0,0,0.3), 0 0 24px ${tier.color}40` : '0 4px 16px rgba(0,0,0,0.2)',
          marginBottom: 8,
        }}
      >
        <img
          src={ProfilePicture({ gender: item?.user?.gender, photo: item?.user?.photo })}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontWeight: 700, fontSize: isFirst ? 16 : 14, color: c.text, marginBottom: 2, textAlign: 'center' }}>
        #{item?.position}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2, textAlign: 'center', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item?.user?.username?.slice(0, 14) || 'Player'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <img
          src={getRankImageSrc(item?.rankName)}
          alt=""
          style={{ width: isFirst ? 48 : 36, height: 'auto', objectFit: 'contain' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span style={{ fontSize: 10, color: c.text3, fontWeight: 600 }}>AdStar</span>
        <span style={{ fontSize: 11, color: tier.color, fontWeight: 700 }}>{item?.rankName?.slice(7) || 'Bronze'}</span>
      </div>
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 14, fontWeight: 700, color: c.gold }}>
        {Number(item?.total_points ?? 0).toLocaleString()} pts
      </div>
    </div>
  );
}

/* ── User's rank card (special, highlighted) ───────────────────────── */
function UserRankCard({ user, totalItems, dark, c }) {
  const tier = getRankTier(user?.rank?.rankName);

  return (
    <div
      className="clisha-x-rank-user-card"
      style={{
        background: `linear-gradient(135deg, ${tier.bg}, ${c.card})`,
        border: `2px solid ${tier.color}`,
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        boxShadow: `0 0 24px ${tier.color}30, 0 8px 24px rgba(0,0,0,0.15)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 8, right: 12, fontSize: 28, opacity: 0.5 }}>⭐</div>
      <div
        className="clisha-x-rank-user-avatar"
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: `3px solid ${tier.color}`,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={ProfilePicture({ gender: user?.user?.gender, photo: user?.user?.photo })}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Your Standing
        </div>
        <div className="clisha-x-rank-user-name" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 2 }}>
          {user?.user?.username || 'Player'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img
              src={getRankImageSrc(user?.rank?.rankName)}
              alt=""
              style={{ width: 36, height: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: tier.color, background: tier.bg, padding: '6px 10px', borderRadius: 8, border: `1px solid ${tier.border}` }}>
              AdStar {user?.rank?.rankName?.slice(7) || 'Bronze'}
            </span>
          </div>
          <span style={{ fontSize: 13, color: c.text2 }}>
            Position <strong style={{ color: c.gold }}>{user?.rank?.position ?? '—'}</strong> of {totalItems ?? 0}
          </span>
        </div>
      </div>
      <div className="clisha-x-rank-user-points" style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: c.text3, marginBottom: 2 }}>Total Points</div>
        <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 22, fontWeight: 700, color: c.gold }}>
          {Number(user?.rank?.balance ?? 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

/* ── Community card (4th onwards) ──────────────────────────────────── */
function CommunityCard({ item, dark, c }) {
  const tier = getRankTier(item?.rankName);

  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = tier.border;
        e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontWeight: 700, fontSize: 14, color: c.text3, minWidth: 28 }}>
        #{item?.position}
      </div>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `2px solid ${tier.border}`,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={ProfilePicture({ gender: item?.user?.gender, photo: item?.user?.photo })}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item?.user?.username || 'Player'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <img
            src={getRankImageSrc(item?.rankName)}
            alt=""
            style={{ width: 24, height: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={{ fontSize: 11, color: tier.color, fontWeight: 600 }}>
            AdStar {item?.rankName?.slice(7) || 'Bronze'}
          </span>
        </div>
      </div>
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 14, fontWeight: 700, color: c.gold, flexShrink: 0 }}>
        {Number(item?.total_points ?? 0).toLocaleString()}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function RankPage() {
  const dispatch = useDispatch();
  const { dark } = useClishaThemeToggle();
  const user = useSelector((s) => s.user?.data);
  const rank = useSelector((s) => s.rank);
  const experience = useSelector((s) => s.general?.experience);

  const [page, setPage] = useState(1);
  const [top3, setTop3] = useState([]);

  const c = dark ? CLEAN.dark : CLEAN.light;

  /* Always fetch global top 3 (positions 1, 2, 3) for the podium */
  useEffect(() => {
    axios.get(`${api}/ranking?page=1&size=34`, getRankConfig()).then((res) => {
      const list = res?.data?.data?.ranking ?? [];
      setTop3(list.slice(0, 3));
    }).catch(() => setTop3([]));
  }, []);

  /* Fetch current page for community leaderboard */
  useEffect(() => {
    dispatch(getRank(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getExperience());
  }, [dispatch]);

  const ranking = rank?.data?.ranking ?? [];
  const rest = page === 1 ? ranking.slice(3) : ranking;
  const totalPages = rank?.data?.totalPages ?? 1;
  const userInTop3 = user?.rank?.position != null && user.rank.position >= 1 && user.rank.position <= 3;

  const xpCurrent = experience?.rank?.current ?? 0;
  const xpTarget = experience?.rank?.target ?? 1;
  const xpPct = Math.min(100, Math.max(0, (xpCurrent / xpTarget) * 100));

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
          .clisha-x-rank-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; margin-bottom: 16px !important; }
          .clisha-x-rank-header-icon { width: 42px !important; height: 42px !important; font-size: 22px !important; }
          .clisha-x-rank-header-title { font-size: 18px !important; }
          .clisha-x-rank-header-sub { font-size: 11px !important; }
          .clisha-x-rank-xp { padding: 12px !important; margin-bottom: 16px !important; }
          .clisha-x-rank-podium { flex-direction: column !important; align-items: center !important; gap: 20px !important; padding: 20px !important; min-height: auto !important; border-radius: 16px !important; }
          .clisha-x-rank-podium .clisha-x-podium-2 { order: 1 !important; }
          .clisha-x-rank-podium .clisha-x-podium-1 { order: 2 !important; }
          .clisha-x-rank-podium .clisha-x-podium-3 { order: 3 !important; }
          .clisha-x-rank-podium .clisha-x-podium-avatar { width: 72px !important; height: 72px !important; }
          .clisha-x-rank-podium .clisha-x-podium-1 .clisha-x-podium-avatar { width: 80px !important; height: 80px !important; }
          .clisha-x-rank-user-card { padding: 16px !important; gap: 12px !important; flex-direction: column !important; align-items: flex-start !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-avatar { width: 56px !important; height: 56px !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-name { font-size: 17px !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-points { font-size: 18px !important; text-align: left !important; }
          .clisha-x-rank-community-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .clisha-x-rank-community-card { padding: 12px !important; gap: 10px !important; }
          .clisha-x-rank-tiers { padding: 12px !important; margin-top: 20px !important; }
          .clisha-x-rank-tiers .clisha-x-rank-tier-chip { padding: 5px 10px !important; font-size: 11px !important; }
          .clisha-x-rank-pagination { margin-top: 20px !important; }
          .clisha-x-rank-pagination button { min-height: 44px !important; padding: 10px 14px !important; }
        }
        @media (max-width: 480px) {
          .clisha-x-rank-header-icon { width: 38px !important; height: 38px !important; font-size: 20px !important; }
          .clisha-x-rank-header-title { font-size: 16px !important; }
          .clisha-x-rank-podium { padding: 16px !important; gap: 16px !important; }
          .clisha-x-rank-podium .clisha-x-podium-avatar { width: 64px !important; height: 64px !important; }
          .clisha-x-rank-podium .clisha-x-podium-1 .clisha-x-podium-avatar { width: 72px !important; height: 72px !important; }
          .clisha-x-rank-user-card { padding: 14px !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-avatar { width: 48px !important; height: 48px !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-name { font-size: 16px !important; }
          .clisha-x-rank-user-card .clisha-x-rank-user-points { font-size: 16px !important; }
        }
      `}</style>

      {/* Page header */}
      <div className="clisha-x-rank-header" style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div
            className="clisha-x-rank-header-icon"
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
            🏆
          </div>
          <div>
            <div className="clisha-x-rank-header-title" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.text }}>
              Rankings
            </div>
            <div className="clisha-x-rank-header-sub" style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
              {moment().format('MMMM DD, YYYY')} · Clisha community leaderboard
            </div>
          </div>
        </div>
      </div>

      {rank.loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
          <ClishaLoader label="Loading rankings…" />
        </div>
      ) : (
        <>
          {/* XP Progress bar (to next rank) */}
          {xpTarget > 0 && (
            <div
              className="clisha-x-rank-xp"
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.gold, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ⚡ Progress to next rank
                </span>
                <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 13, fontWeight: 600, color: c.text2 }}>
                  {xpCurrent} / {xpTarget}
                </span>
              </div>
              <div style={{ height: 8, background: c.bg4, borderRadius: 99, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${xpPct}%`,
                    background: `linear-gradient(90deg,${c.gold},${c.orange})`,
                    borderRadius: 99,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* Top 3 Podium — Celebrated */}
          {top3.length > 0 && (
            <div
              className="clisha-x-rank-podium"
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: 20,
                padding: 24,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 16,
                minHeight: 220,
              }}
            >
              {top3[1] && <PodiumCard item={top3[1]} position={2} dark={dark} c={c} />}
              {top3[0] && <PodiumCard item={top3[0]} position={1} dark={dark} c={c} />}
              {top3[2] && <PodiumCard item={top3[2]} position={3} dark={dark} c={c} />}
            </div>
          )}

          {/* User's rank card */}
          {user && !userInTop3 && (
            <div style={{ marginBottom: 24 }}>
              <UserRankCard user={user} totalItems={rank?.data?.totalItems} dark={dark} c={c} />
            </div>
          )}

          {/* Community leaderboard */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              Community Leaderboard
            </div>
            {rest.length === 0 && top3.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: c.text2, fontSize: 14 }}>
                No rankings yet. Complete tasks to climb the leaderboard!
              </div>
            ) : (
              <div
                className="clisha-x-rank-community-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: 12,
                }}
              >
                {rest.map((item, idx) => (
                  <CommunityCard key={item?.position ?? idx} item={item} dark={dark} c={c} />
                ))}
              </div>
            )}
          </div>

          {/* AdStar Tiers info */}
          <div
            className="clisha-x-rank-tiers"
            style={{
              marginTop: 24,
              padding: 16,
              background: c.bg3,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              AdStar Tiers
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ADSTAR_TIERS.map((t) => {
                const tier = getRankTier(`AdStar ${t.name}`);
                return (
                  <div
                    key={t.name}
                    className="clisha-x-rank-tier-chip"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 8,
                      background: tier.bg,
                      border: `1px solid ${tier.border}`,
                    }}
                  >
                    <img src={getRankImageSrc(`AdStar ${t.name}`)} alt="" style={{ width: 24, height: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: tier.color }}>{t.name}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: c.text3, marginTop: 10 }}>
              Tiers are determined by total points earned. Point thresholds are set by the system — complete tasks to climb the ranks.
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="clisha-x-rank-pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                style={{
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: `1px solid ${c.border}`,
                  background: page <= 1 ? c.bg4 : c.card,
                  color: page <= 1 ? c.text3 : c.text,
                  cursor: page <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                ←
              </button>
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14, color: c.text2 }}>
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                style={{
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: `1px solid ${c.border}`,
                  background: page >= totalPages ? c.bg4 : c.card,
                  color: page >= totalPages ? c.text3 : c.text,
                  cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
