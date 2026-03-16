/**
 * Clisha Experience — Top 10 community avatars (users who completed tasks)
 * Matches old Task component's community completed section.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CLEAN } from '../design-system/tokens-clean';

export default function CommunityAvatars({ dark }) {
  const { t } = useTranslation();
  const topUsers = useSelector((state) => state.general?.topUsers);
  const c = dark ? CLEAN.dark : CLEAN.light;

  const users = topUsers?.slice(0, 10) ?? [];

  if (!users.length) return null;

  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {t('latestTop10')}
        </span>
        <div style={{ fontSize: 10, color: c.text3, marginTop: 2 }}>{t('communityCompleted')}</div>
      </div>
      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        {users.map((item, i) => (
          <div
            key={i}
            title={item?.username}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid ${c.border}`,
              flexShrink: 0,
            }}
          >
            <img
              src={item?.photo ?? '/images/avatar.png'}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
