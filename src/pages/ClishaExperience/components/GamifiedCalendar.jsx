/**
 * Clisha Experience — Gamified Calendar (redesigned)
 * All Redux dispatch/selector logic preserved exactly.
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  addCalenderTask,
  callenderDateFun,
  getCalenderTask,
  getCalenderTaskReload,
  getCustomDateCallender,
  generalSelectReloadingCalendar,
} from '../../../store/General';
import { useClishaTheme } from '../context/ThemeContext';
import { BRAND } from '../design-system/tokens';

const STATUS = {
  ROCKET: 'rocket',  // all done
  THUMBS: 'thumbs',  // 10+ done
  SMILEY: 'smiley',  // some done
  SAD:    'sad',     // none done, past
};

const STATUS_CONFIG = {
  rocket: { emoji: '🚀', label: 'All done',   bg: `rgba(52,211,153,0.18)`,  border: `rgba(52,211,153,0.5)`,  glow: `rgba(52,211,153,0.35)`,  text: '#34d399' },
  thumbs: { emoji: '👍', label: '10+ done',   bg: `rgba(${BRAND.primaryRgb},0.18)`, border: `rgba(${BRAND.primaryRgb},0.45)`, glow: `rgba(${BRAND.primaryRgb},0.35)`, text: BRAND.primary },
  smiley: { emoji: '😊', label: 'Some done',  bg: `rgba(56,189,248,0.14)`,  border: `rgba(56,189,248,0.35)`, glow: `rgba(56,189,248,0.25)`,  text: '#38bdf8' },
  sad:    { emoji: '😔', label: 'Missed',     bg: `rgba(248,113,113,0.12)`, border: `rgba(248,113,113,0.3)`, glow: `rgba(248,113,113,0.2)`,  text: '#f87171' },
};

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getStatus(item) {
  const isPast = moment(item?.date).format('YY-MM-DD') <= moment().format('YY-MM-DD');
  const completed = item?.completedTasks ?? 0;
  const created   = item?.createdTasks   ?? 0;
  if (created && created <= completed) return STATUS.ROCKET;
  if (completed >= 10)                 return STATUS.THUMBS;
  if (completed && created > completed) return STATUS.SMILEY;
  if (!completed && created && isPast)  return STATUS.SAD;
  return null;
}

/* ── Single day cell ──────────────────────────────────────────────────── */
function DayCell({ item, isToday, onClick, dark }) {
  const [hovered, setHovered] = useState(false);
  const status = getStatus(item);
  const cfg    = status ? STATUS_CONFIG[status] : null;
  const dayNum = moment(item.date).format('D');
  const completed = item?.completedTasks ?? 0;
  const created   = item?.createdTasks   ?? 0;
  const hasTasks  = created > 0;

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        border: isToday
          ? `2px solid ${BRAND.primary}`
          : cfg
          ? `1px solid ${cfg.border}`
          : `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        background: isToday && !cfg
          ? `rgba(${BRAND.primaryRgb},0.1)`
          : cfg
          ? cfg.bg
          : hovered
          ? (dark ? 'rgba(255,255,255,0.05)' : `rgba(${BRAND.primaryRgb},0.06)`)
          : 'transparent',
        cursor: 'pointer',
        color: isToday ? BRAND.primary : cfg ? cfg.text : (dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)'),
        transition: 'all 0.18s',
        boxShadow: hovered && cfg
          ? `0 0 12px ${cfg.glow}`
          : isToday
          ? `0 0 10px rgba(${BRAND.primaryRgb},0.2)`
          : 'none',
        transform: hovered ? 'translateY(-1px) scale(1.04)' : 'none',
        gap: 2,
        padding: '4px 2px',
        minWidth: 0,
      }}
      title={`${moment(item.date).format('MMM D')} — ${completed}/${created} tasks`}
    >
      {/* day number */}
      <span style={{
        fontSize: 14,
        fontWeight: isToday ? 800 : cfg ? 700 : 500,
        lineHeight: 1,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {dayNum}
      </span>

      {/* completed/total + status emoji */}
      {hasTasks && (
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1,
          opacity: 0.9,
          marginTop: 1,
        }}>
          {completed}/{created}
        </span>
      )}
      {cfg && (
        <span style={{ fontSize: 14, lineHeight: 1, marginTop: 1 }}>{cfg.emoji}</span>
      )}
    </button>
  );
}

/* ── Main calendar ────────────────────────────────────────────────────── */
export default function GamifiedCalendar({ verificationDate, onDayClick }) {
  const dispatch = useDispatch();
  const calenderData = useSelector((state) => state.general?.calenderTask);
  const calenderTask = calenderData?.monthlyData ?? calenderData;
  const loading  = useSelector((state) => state.general?.loading);
  const reloading = useSelector(generalSelectReloadingCalendar);

  const [date, setDate]           = useState({ start_date: calenderData?.date || moment().format('YYYY-MM') });
  const [showPicker, setShowPicker] = useState(false);

  const th   = useClishaTheme();
  const dark = th.bg === '#0a0a0a' || th.text === '#ffffff';

  const parsedVerification = verificationDate ? moment(verificationDate) : null;

  useEffect(() => { dispatch(getCalenderTask()); }, [dispatch]);
  useEffect(() => {
    if (calenderData?.date) setDate((d) => ({ ...d, start_date: calenderData.date }));
  }, [calenderData?.date]);

  const filteredTasks = calenderTask?.filter?.((item) =>
    parsedVerification ? moment(item.date).isSameOrAfter(parsedVerification, 'day') : true
  );

  /* ── month navigation ──────────────────────────────────── */
  const shiftMonth = (dir) => {
    const next = moment(date.start_date).add(dir, 'months').format('YYYY-MM');
    setDate({ start_date: next });
    dispatch(addCalenderTask(next));
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    setDate((d) => ({ ...d, [e.target.name]: val }));
    setShowPicker(false);
    dispatch(addCalenderTask(val));
  };

  const handleDayClick = (item) => {
    dispatch(callenderDateFun({ callenderDate: item?.date, callender_length: item?.completedTasks }));
    dispatch(getCustomDateCallender({ callenderDate: item?.date }));
    onDayClick?.(item);
  };

  /* ── determine first day of week offset ───────────────── */
  const firstDayOfMonth  = moment(date.start_date, 'YYYY-MM').startOf('month');
  const startOffset      = firstDayOfMonth.day(); // 0=Sun

  /* ── stats for header ─────────────────────────────────── */
  const totalCompleted = filteredTasks?.reduce((s, i) => s + (i.completedTasks ?? 0), 0) ?? 0;
  const totalCreated   = filteredTasks?.reduce((s, i) => s + (i.createdTasks   ?? 0), 0) ?? 0;
  const completionPct  = totalCreated ? Math.round((totalCompleted / totalCreated) * 100) : 0;

  return (
    <div style={{
      background: th.surface,
      borderRadius: 20,
      border: `1px solid ${th.border}`,
      overflow: 'hidden',
    }}>
      {/* ── header ─────────────────────────────────────────── */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${th.border}`,
        background: dark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
          : `linear-gradient(135deg, rgba(${BRAND.primaryRgb},0.04) 0%, transparent 100%)`,
      }}>
        {/* top row: month nav + refresh */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* prev */}
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: `1px solid ${th.border}`,
                background: 'transparent', cursor: 'pointer',
                fontSize: 15, color: th.textSub,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.primary; e.currentTarget.style.color = BRAND.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSub; }}
            >‹</button>

            {/* month title */}
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                borderRadius: 8,
                fontFamily: "'Fraunces', serif",
                fontSize: 18, fontWeight: 700,
                color: th.text,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = BRAND.primary; }}
              onMouseLeave={e => { e.currentTarget.style.color = th.text; }}
              title="Pick month"
            >
              {date?.start_date ? moment(date.start_date).format('MMMM YYYY') : 'Calendar'}
              <span style={{ fontSize: 12, marginLeft: 6, opacity: 0.5 }}>▾</span>
            </button>

            {/* next */}
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: `1px solid ${th.border}`,
                background: 'transparent', cursor: 'pointer',
                fontSize: 15, color: th.textSub,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.primary; e.currentTarget.style.color = BRAND.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSub; }}
            >›</button>
          </div>

          {/* stats + refresh */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {totalCreated > 0 && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 20,
                background: `rgba(${BRAND.primaryRgb},0.1)`,
                border: `1px solid rgba(${BRAND.primaryRgb},0.2)`,
              }}>
                <span style={{ fontSize: 12, color: BRAND.primary, fontWeight: 700 }}>
                  {totalCompleted}/{totalCreated}
                </span>
                <span style={{
                  fontSize: 11, color: BRAND.primary, opacity: 0.7,
                  fontWeight: 600,
                }}>
                  {completionPct}%
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => !reloading && dispatch(getCalenderTaskReload())}
              disabled={reloading}
              title="Refresh"
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: `1px solid ${th.border}`,
                background: 'transparent', cursor: reloading ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, opacity: reloading ? 0.6 : 1,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!reloading) e.currentTarget.style.borderColor = BRAND.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; }}
            >
              <span style={{ animation: reloading ? 'spin 1s linear infinite' : 'none' }}>
                {reloading ? '⏳' : '↻'}
              </span>
            </button>
          </div>
        </div>

        {/* month picker inline */}
        {showPicker && (
          <div style={{ paddingBottom: 8 }}>
            <input
              type="month"
              name="start_date"
              value={date?.start_date || ''}
              onChange={handleMonthChange}
              style={{
                padding: '8px 12px', borderRadius: 8,
                border: `1px solid ${th.border}`,
                background: th.bg, color: th.text, fontSize: 15,
                outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            />
          </div>
        )}

        {/* month completion bar */}
        {totalCreated > 0 && (
          <div style={{
            height: 4, borderRadius: 4,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${completionPct}%`,
              background: completionPct >= 80
                ? `linear-gradient(90deg, #34d399, #6ee7b7)`
                : `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
              borderRadius: 4,
              transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: `0 0 8px ${completionPct >= 80 ? 'rgba(52,211,153,0.5)' : `rgba(${BRAND.primaryRgb},0.4)`}`,
            }} />
          </div>
        )}
      </div>

      {/* ── day-of-week headers ─────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
        padding: '12px 16px 4px',
      }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{
            textAlign: 'center', fontSize: 13, fontWeight: 700,
            color: th.textMuted || (dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
            padding: '4px 0',
            letterSpacing: '0.3px',
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* ── calendar grid ──────────────────────────────────── */}
      {loading ? (
        <div style={{ padding: '36px 16px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: `3px solid ${th.border}`,
              borderTopColor: BRAND.primary,
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: 14, color: th.textSub }}>Loading tasks…</span>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
          padding: '4px 16px 16px',
        }}>
          {/* offset spacers for first day of month */}
          {[...Array(startOffset)].map((_, i) => (
            <div key={`sp-${i}`} style={{ aspectRatio: '1' }} />
          ))}

          {filteredTasks?.map((item, key) => {
            const isToday = moment(item.date).format('YY-MM-DD') === moment().format('YY-MM-DD');
            return (
              <DayCell
                key={key}
                item={item}
                isToday={isToday}
                onClick={handleDayClick}
                dark={dark}
              />
            );
          })}
        </div>
      )}

      {!loading && !filteredTasks?.length && (
        <div style={{
          padding: '32px 16px',
          textAlign: 'center',
          color: th.textSub, fontSize: 15,
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
          No tasks for {date?.start_date ? moment(date.start_date).format('MMMM YYYY') : 'this month'}
        </div>
      )}

      {/* ── legend ─────────────────────────────────────────── */}
      <div style={{
        padding: '12px 20px',
        borderTop: `1px solid ${th.border}`,
        display: 'flex', gap: 16, flexWrap: 'wrap',
        background: dark ? 'rgba(0,0,0,0.2)' : `rgba(${BRAND.primaryRgb},0.02)`,
      }}>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 14 }}>{cfg.emoji}</span>
            <span style={{ fontSize: 12, color: th.textSub, fontWeight: 500 }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
