/**
 * Clisha Experience — Top 10 community avatars (members who completed tasks)
 * Full-width strip matching Token Progress; marquee runs opposite direction (rightward).
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';
import ProfilePicture from '../../../utils/ProfilePicture';

const RANK_RING = [
  'linear-gradient(135deg, #f5c842, #e8a800)',
  'linear-gradient(135deg, #c0c0c0, #9ca3af)',
  'linear-gradient(135deg, #cd7f32, #b45309)',
];

function CommunityAvatarChip({ item, i, c, label }) {
  const src = ProfilePicture({
    gender: item?.gender,
    photo: item?.photo,
  });
  const ring =
    i < 3 ? RANK_RING[i] : `linear-gradient(135deg, ${c.border2}, ${c.border})`;

  return (
    <div
      className="clisha-x-ca-chip"
      title={label}
      style={{
        position: 'relative',
        width: 52,
        height: 52,
        borderRadius: '50%',
        padding: 2,
        background: ring,
        flexShrink: 0,
        cursor: 'default',
      }}
    >
      {i < 3 && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            minWidth: 19,
            height: 19,
            borderRadius: '50%',
            fontSize: 10,
            fontWeight: 800,
            fontFamily: CLEAN_FONTS.mono,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: i === 0 ? '#f5c842' : i === 1 ? '#94a3b8' : '#b45309',
            color: i === 1 ? '#0f172a' : '#fff',
            border: `2px solid ${c.card}`,
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          {i + 1}
        </span>
      )}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: c.bg3,
          border: `2px solid ${c.card}`,
        }}
      >
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
}

export default function CommunityAvatars({ dark }) {
  const { t } = useTranslation();
  const topUsers = useSelector((state) => state.general?.topUsers);
  const c = dark ? CLEAN.dark : CLEAN.light;

  const users = topUsers?.slice(0, 10) ?? [];

  if (!users.length) return null;

  const loop = [...users, ...users];

  return (
    <div
      className="clisha-x-community-avatars"
      role="region"
      aria-label={t('latestTop10')}
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 13,
        overflow: 'hidden',
      }}
    >
      {/* Header — same rhythm as Token Progress strip */}
      <div
        style={{
          padding: '10px 14px',
          borderBottom: `1px solid ${c.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span aria-hidden style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>
            🏆
          </span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: c.text2,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              {t('latestTop10')}
            </div>
            <div
              style={{
                marginTop: 2,
                fontSize: 10,
                fontWeight: 500,
                color: c.text3,
                lineHeight: 1.35,
                maxWidth: 'min(100%, 280px)',
              }}
            >
              {t('communityCompleted')}
            </div>
          </div>
        </div>
        <div
          style={{
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: 999,
            fontFamily: CLEAN_FONTS.mono,
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: c.gold,
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
          }}
        >
          {t('communityHallOfFame')}
        </div>
      </div>

      {/* Marquee: opposite direction to Token Progress (token moves left → this moves right) */}
      <div
        style={{
          padding: '14px 0',
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div
          className="clisha-x-community-marquee"
          style={{
            display: 'flex',
            gap: 14,
            width: 'max-content',
            animation: 'community-marquee-rev 32s linear infinite',
          }}
        >
          {loop.map((item, i) => {
            const rankIndex = i % users.length;
            const label = item?.username || item?.name || `Member ${rankIndex + 1}`;
            return (
              <CommunityAvatarChip
                key={`${item?.id ?? item?.username ?? rankIndex}-${i}`}
                item={item}
                i={rankIndex}
                c={c}
                label={label}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes community-marquee-rev {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clisha-x-community-marquee {
            animation: none !important;
            transform: translateX(0) !important;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 100%;
            margin: 0 auto;
            padding-left: 14px;
            padding-right: 14px;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}
