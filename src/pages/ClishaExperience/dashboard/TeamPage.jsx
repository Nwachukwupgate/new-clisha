/**
 * Clisha Experience — Team page (referral tree)
 * Shows people the user has referred. Tree structure: You (root) → your referrals.
 * API returns flat list of direct referrals; design supports future multi-level if API extends.
 * Does NOT modify the old Team system.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ProfilePicture from '../../../utils/ProfilePicture';
import { getTeams } from '../../../store/General';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

/* ── Rank tier colors ─────────────────────────────────────────────── */
const RANK_TIERS = {
  bronze: { color: '#CD7F32', bg: 'rgba(205,127,50,0.15)', border: 'rgba(205,127,50,0.4)' },
  silver: { color: '#94A3B8', bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)' },
  gold: { color: '#F5C542', bg: 'rgba(245,197,66,0.15)', border: 'rgba(245,197,66,0.4)' },
  platinium: { color: '#4A9EFF', bg: 'rgba(74,158,255,0.15)', border: 'rgba(74,158,255,0.4)' },
  diamond: { color: '#A78BFA', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.4)' },
  master: { color: '#F5C542', bg: 'rgba(245,197,66,0.2)', border: 'rgba(245,197,66,0.5)' },
  grandmaster: { color: '#FF9F43', bg: 'rgba(255,159,67,0.2)', border: 'rgba(255,159,67,0.5)' },
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

/* ── Root node (You) ───────────────────────────────────────────────── */
function RootNode({ user, dark, c, onCopyInvite }) {
  return (
    <div
      className="clisha-x-team-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 24px',
        background: `linear-gradient(135deg,${c.goldL},${c.card})`,
        border: `2px solid ${c.goldB}`,
        borderRadius: 16,
        boxShadow: `0 0 24px ${c.gold}20`,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: `3px solid ${c.gold}`,
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <img
          src={ProfilePicture({ gender: user?.user?.gender, photo: user?.user?.photo })}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: c.gold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
        You
      </div>
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 18, fontWeight: 700, color: c.text, marginBottom: 8 }}>
        {user?.user?.username || 'Player'}
      </div>
      <button
        type="button"
        onClick={onCopyInvite}
        style={{
          padding: '10px 18px',
          borderRadius: 10,
          border: 'none',
          background: `linear-gradient(135deg,${c.gold},${c.orange})`,
          color: '#1a1a1a',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: CLEAN_FONTS.body,
        }}
      >
        Invite & Earn
      </button>
    </div>
  );
}

/* ── Referral card (tree node) ──────────────────────────────────────── */
function ReferralCard({ item, dark, c, onCopyEmail }) {
  const tier = getRankTier(item?.rank?.rankName);
  const displayName = item?.firstname && item?.lastname
    ? `${item.firstname} ${item.lastname}`.trim()
    : item?.username || 'Member';

  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = tier.border;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `2px solid ${tier.border}`,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={ProfilePicture({ gender: 'male', photo: item?.photo })}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </div>
          <div style={{ fontSize: 11, color: c.text3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item?.email}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onCopyEmail(item)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: `1px solid ${c.border}`,
            background: c.bg3,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: c.text2,
          }}
          title="Copy email"
        >
          📋
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <img src={getRankImageSrc(item?.rank?.rankName)} alt="" style={{ width: 28, height: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, background: tier.bg, padding: '4px 8px', borderRadius: 6, border: `1px solid ${tier.border}` }}>
            {item?.rank?.rankName?.slice(7) || 'Bronze'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: c.text2 }}>
            <strong style={{ color: c.gold }}>{Number(item?.rank?.balance ?? 0).toLocaleString()}</strong> pts
          </span>
          <span style={{ fontSize: 12, color: c.blue }}>
            <strong>{Number(item?.rank?.bonus_points ?? 0).toLocaleString()}</strong> coins
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: c.text3 }}>
        Joined {moment(item?.createdAt).format('MMM DD, YYYY')}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function TeamPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dark } = useClishaThemeToggle();
  const user = useSelector((s) => s.user?.data);
  const teams = useSelector((s) => s.general?.teams) ?? [];

  const [search, setSearch] = useState('');

  const c = dark ? CLEAN.dark : CLEAN.light;

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const filtered = teams.filter((item) => {
    if (!search?.trim()) return true;
    const q = search.toLowerCase();
    return (
      item?.username?.toLowerCase().includes(q) ||
      item?.firstname?.toLowerCase().includes(q) ||
      item?.lastname?.toLowerCase().includes(q) ||
      item?.email?.toLowerCase().includes(q) ||
      moment(item?.createdAt).format('DD/MM/YYYY').includes(search)
    );
  });

  const copyInviteLink = () => {
    const code = user?.user?.clishaReferralCode || user?.user?.clishaId;
    const url = `${window.location.origin}/signup?referredBy=${code}`;
    navigator.clipboard.writeText(url).then(() => toast.success('Invite link copied!'));
  };

  const copyEmail = (item) => {
    navigator.clipboard.writeText(item?.email || '').then(() => toast.success('Email copied!'));
  };

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
          .clisha-x-team-header { flex-direction: column !important; align-items: flex-start !important; }
          .clisha-x-team-header-icon { width: 42px !important; height: 42px !important; font-size: 22px !important; }
          .clisha-x-team-header-title { font-size: 18px !important; }
          .clisha-x-team-tree { padding: 16px !important; }
          .clisha-x-team-connector { height: 24px !important; }
          .clisha-x-team-ref-grid { grid-template-columns: 1fr !important; gap: 8 !important; }
          .clisha-x-team-search { width: 100% !important; max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .clisha-x-team-header-icon { width: 38px !important; height: 38px !important; }
          .clisha-x-team-header-title { font-size: 16px !important; }
          .clisha-x-team-root { padding: 16px 20px !important; }
        }
      `}</style>

      {/* Page header */}
      <div className="clisha-x-team-header" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div
          className="clisha-x-team-header-icon"
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
          👥
        </div>
        <div>
          <div className="clisha-x-team-header-title" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.text }}>
            {t('teamTable.title') || 'Your Team'}
          </div>
          <div style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
            People you referred to Clisha · Invite more to earn together
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="search"
          className="clisha-x-team-search"
          placeholder={t('teamTable.searchPlaceholder') || 'Search by name, email, or date...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 320,
            padding: '12px 16px',
            borderRadius: 12,
            border: `1px solid ${c.border}`,
            background: c.card,
            color: c.text,
            fontSize: 14,
            fontFamily: CLEAN_FONTS.body,
          }}
        />
      </div>

      <div
          className="clisha-x-team-tree"
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: 24,
          }}
        >
          {/* Root: You */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
            <RootNode user={user} dark={dark} c={c} onCopyInvite={copyInviteLink} />
          </div>

          {/* Connector line */}
          {filtered.length > 0 && (
            <div
              className="clisha-x-team-connector"
              style={{
                width: 2,
                height: 32,
                background: `linear-gradient(180deg,${c.goldB},${c.border})`,
                margin: '0 auto 16px',
                borderRadius: 10,
              }}
            />
          )}

          {/* Level: Your referrals */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              Your referrals ({filtered.length})
            </div>
            {filtered.length === 0 ? (
              <div
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
                {teams.length === 0 ? (
                  <>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
                    <div style={{ fontWeight: 600, color: c.text, marginBottom: 2 }}>No referrals yet</div>
                    <div style={{ marginBottom: 16 }}>Share your invite link to grow your team and earn together.</div>
                    <button
                      type="button"
                      onClick={copyInviteLink}
                      style={{
                        padding: '12px 24px',
                        borderRadius: 12,
                        border: 'none',
                        background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                        color: '#1a1a1a',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Copy Invite Link
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
                    {t('teamTable.userNotFound') || 'No members match your search'}
                  </>
                )}
              </div>
            ) : (
              <div
                className="clisha-x-team-ref-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                  gap: 12,
                }}
              >
                {filtered.map((item, idx) => (
                  <ReferralCard key={item?.id ?? idx} item={item} dark={dark} c={c} onCopyEmail={copyEmail} />
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
