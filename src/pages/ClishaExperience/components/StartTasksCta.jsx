/**
 * Clisha Experience — Start Tasks CTA with date & time
 * Prominent button to navigate to task page, plus current date/time display.
 */
import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

export default function StartTasksCta({ dark }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user?.data);
  const c = dark ? CLEAN.dark : CLEAN.light;

  const getCurrentTime = useCallback(() => {
    if (user?.timezone?.time) {
      const serverTime = user.timezone.time;
      const [hours, minutes] = serverTime.split(':').map(Number);
      if (!Number.isNaN(hours) && !Number.isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        const now = new Date();
        const currentHours = now.getHours();
        const hourDiff = Math.abs(currentHours - hours);
        if (hourDiff <= 2 || hourDiff >= 22) {
          const period = hours >= 12 ? 'pm' : 'am';
          const displayHours = hours % 12 || 12;
          return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        }
      }
    }
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  }, [user?.timezone?.time]);

  const [time, setTime] = useState(getCurrentTime);
  const dateStr = moment().format('MMMM DD, YYYY');

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, [getCurrentTime]);

  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 13,
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
      }}
    >
      <div>
        <div style={{ fontSize: 11, color: c.text2, marginBottom: 2 }}>{dateStr} · {time}</div>
        <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 16, fontWeight: 700, color: c.text }}>{t('todayHeading')}</div>
      </div>
      <Link
        to={`${BASE}/dashboard/task`}
        style={{
          padding: '10px 20px',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 700,
          background: `linear-gradient(135deg,${c.gold},${c.orange})`,
          color: '#1a1a1a',
          textDecoration: 'none',
          fontFamily: CLEAN_FONTS.body,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <span>⚡</span> {t('startTasks')}
      </Link>
    </div>
  );
}
