/**
 * Clisha Experience — Top 10 community avatars (members who completed tasks)
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

export default function CommunityAvatars({ dark }) {
  const { t } = useTranslation();
  const topUsers = useSelector((state) => state.general?.topUsers);
  const c = dark ? CLEAN.dark : CLEAN.light;

  const users = topUsers?.slice(0, 10) ?? [];

  if (!users.length) return null;

  return (
    <div
      className="clisha-x-community-avatars"
      role="region"
      aria-label={t('latestTop10')}
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.35)' : '0 4px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .clisha-x-community-avatars .clisha-x-ca-avatar {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .clisha-x-community-avatars .clisha-x-ca-avatar:hover {
            transform: scale(1.08);
            z-index: 2;
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          }
        }
        @media (max-width: 380px) {
          .clisha-x-community-avatars .clisha-x-ca-head { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${c.gold}, ${c.orange}, ${c.purple})`,
          opacity: 0.95,
        }}
      />

      <div
        className="clisha-x-ca-head"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 14,
          padding: '16px 18px 14px',
          borderBottom: `1px solid ${c.border}`,
          background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 0 }}>
          <div
            aria-hidden
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              background: c.goldL,
              border: `1px solid ${c.goldB}`,
              boxShadow: `0 4px 14px rgba(245, 200, 66, ${dark ? 0.12 : 0.18})`,
            }}
          >
            🏆
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: CLEAN_FONTS.mono,
                fontSize: 15,
                fontWeight: 700,
                color: c.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              {t('latestTop10')}
            </div>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 12,
                fontWeight: 500,
                color: c.text2,
                lineHeight: 1.5,
                maxWidth: 260,
              }}
            >
              {t('communityCompleted')}
            </p>
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
            padding: '5px 10px',
            borderRadius: 999,
            fontFamily: CLEAN_FONTS.mono,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: c.gold,
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
          }}
        >
          {t('communityHallOfFame')}
        </div>
      </div>

      <div
        style={{
          padding: '16px 14px 18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
          justifyItems: 'center',
        }}
      >
        {users.map((item, i) => {
          const src = ProfilePicture({
            gender: item?.gender,
            photo: item?.photo,
          });
          const ring =
            i < 3
              ? RANK_RING[i]
              : `linear-gradient(135deg, ${c.border2}, ${c.border})`;
          const label = item?.username || item?.name || `Member ${i + 1}`;

          return (
            <div
              key={item?.id ?? item?.username ?? `ca-${i}`}
              className="clisha-x-ca-avatar"
              title={label}
              style={{
                position: 'relative',
                width: 44,
                height: 44,
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
                    top: -4,
                    right: -4,
                    minWidth: 18,
                    height: 18,
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
        })}
      </div>
    </div>
  );
}
