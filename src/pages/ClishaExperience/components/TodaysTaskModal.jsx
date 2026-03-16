/**
 * Clisha Experience — Task History Modal (redesigned)
 * All Redux dispatch/selector logic preserved exactly.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { callenderDateFun, emptyDate } from '../../../store/General';
import { useClishaTheme } from '../context/ThemeContext';
import { BRAND } from '../design-system/tokens';

/* ── TaskItem ─────────────────────────────────────────────────────────── */
function TaskItem({ item, index, dark }) {
  const [expanded, setExpanded] = useState(false);
  const [copied,   setCopied]   = useState(false);

  const copy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const bg   = item?.token?.background || (dark ? '#1e1e1e' : '#f5f5f5');
  const fg   = item?.token?.foreground  || (dark ? '#ffffff' : '#0d0d0d');
  const ok   = item.status === 1;

  return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${ok
          ? 'rgba(52,211,153,0.25)'
          : 'rgba(248,113,113,0.2)'}`,
        marginBottom: 10,
        animation: `fadeSlideUp 0.25s ease both`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* main row */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '13px 15px',
          background: bg,
          cursor: 'pointer',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
          {/* token logo */}
          {item?.token?.photo ? (
            <img
              src={item.token.photo} alt=""
              style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: `rgba(${BRAND.primaryRgb},0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>📋</div>
          )}

          <div style={{ minWidth: 0 }}>
            <div style={{
              fontWeight: 700, fontSize: 14, color: fg,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {item?.token?.name || 'Task'}
            </div>
            <div style={{ fontSize: 11, opacity: 0.65, color: fg }}>
              {item.points ? `+${item.points} Points` : 'No points'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* status badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 20,
            background: ok
              ? 'rgba(52,211,153,0.18)'
              : 'rgba(248,113,113,0.18)',
            border: `1px solid ${ok ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)'}`,
          }}>
            <span style={{ fontSize: 11 }}>{ok ? '✓' : '✗'}</span>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: ok ? '#34d399' : '#f87171',
            }}>
              {ok ? 'Done' : 'Failed'}
            </span>
          </div>

          {/* expand chevron */}
          <span style={{
            fontSize: 10, color: fg, opacity: 0.45,
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}>▼</span>
        </div>
      </div>

      {/* expanded details */}
      {expanded && (
        <div style={{
          padding: '12px 15px',
          background: dark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.03)',
          borderTop: `1px solid ${ok ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.12)'}`,
          animation: 'fadeSlideUp 0.18s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', marginBottom: 3, fontWeight: 600 }}>
                TASK CODE
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: dark ? '#fff' : '#0d0d0d', fontFamily: 'monospace' }}>
                {item.task_code}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); copy(item.task_code); }}
              style={{
                padding: '7px 13px', borderRadius: 8,
                border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                background: copied
                  ? 'rgba(52,211,153,0.15)'
                  : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                cursor: 'pointer', fontSize: 12, fontWeight: 700,
                color: copied ? '#34d399' : (dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'),
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.15s',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>{copied ? '✓' : '📋'}</span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {ok && item.points > 0 && (
            <div style={{
              marginTop: 10, padding: '8px 12px', borderRadius: 8,
              background: `rgba(${BRAND.primaryRgb},0.1)`,
              border: `1px solid rgba(${BRAND.primaryRgb},0.2)`,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>🪙</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.primary }}>
                +{item.points} points earned
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Modal ────────────────────────────────────────────────────────────── */
export default function TodaysTaskModal({ open, onClose }) {
  const dispatch = useDispatch();
  const user           = useSelector((state) => state.user?.data);
  const callenderDate  = useSelector((state) => state.general.callenderDate);
  const callenderLength = useSelector((state) => state.general.callender_length);
  const customDateTask = useSelector((state) => state.general.customDateTask);

  const th   = useClishaTheme();
  const dark = th.bg === '#0a0a0a' || th.text === '#ffffff';

  const rows         = customDateTask?.data?.completed?.rows;
  const tasks        = rows?.map((r) => r.task) || [];
  const data         = user?.completed || [];
  const displayTasks = callenderDate ? tasks : data;
  const count        = callenderDate ? callenderLength : data?.length;

  const dateLabel = callenderDate
    ? moment(callenderDate).format('MMMM D, YYYY')
    : 'Today';

  const handleClose = useCallback(() => {
    dispatch(callenderDateFun({ callenderDate: '', callender_length: '' }));
    dispatch(emptyDate());
    onClose();
  }, [dispatch, onClose]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return () => {};
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, handleClose]);

  if (!open) return null;

  const completedCount = displayTasks?.filter((t) => t?.status === 1).length ?? 0;
  const pct = count > 0 ? Math.round((completedCount / count) * 100) : 0;

  return (
    <>
      {/* backdrop */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* panel */}
      <div style={{
        position: 'fixed',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2001,
        width: '100%', maxWidth: 440,
        maxHeight: '82vh',
        background: th.surface,
        borderRadius: 20,
        border: `1px solid ${th.border}`,
        boxShadow: dark
          ? '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 24px 56px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'popIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>

        {/* gradient header */}
        <div style={{
          padding: '18px 20px 16px',
          background: dark
            ? `linear-gradient(135deg, rgba(${BRAND.primaryRgb},0.15) 0%, rgba(0,0,0,0) 100%)`
            : `linear-gradient(135deg, rgba(${BRAND.primaryRgb},0.1) 0%, rgba(255,255,255,0) 100%)`,
          borderBottom: `1px solid ${th.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 18 }}>📅</span>
                <h3 style={{
                  margin: 0, fontSize: 17,
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 800, color: th.text,
                }}>
                  {dateLabel}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: th.textSub }}>
                {count ?? 0} task{count !== 1 ? 's' : ''} completed
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              style={{
                width: 34, height: 34, borderRadius: 10,
                border: `1px solid ${th.border}`,
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                cursor: 'pointer', fontSize: 16, fontWeight: 700,
                color: th.textSub,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f87171'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.border = '1px solid #f87171'; }}
              onMouseLeave={e => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = th.textSub; e.currentTarget.style.border = `1px solid ${th.border}`; }}
            >
              ✕
            </button>
          </div>

          {/* mini progress bar */}
          {count > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: th.textSub }}>
                  {completedCount} / {count} completed
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: BRAND.primary }}>
                  {pct}%
                </span>
              </div>
              <div style={{
                height: 5, borderRadius: 4,
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${pct}%`, borderRadius: 4,
                  background: pct >= 100
                    ? 'linear-gradient(90deg, #34d399, #6ee7b7)'
                    : `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
                  transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: `0 0 8px rgba(${BRAND.primaryRgb},0.4)`,
                }} />
              </div>
            </div>
          )}
        </div>

        {/* task list */}
        <div style={{ padding: '16px 16px 16px', overflowY: 'auto', flex: 1 }}>
          {displayTasks?.length ? (
            displayTasks.map((item, i) => (
              <TaskItem key={i} item={item} index={i} dark={dark} />
            ))
          ) : (
            <div style={{
              textAlign: 'center', padding: '36px 20px',
              color: th.textSub,
            }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: th.text, marginBottom: 4 }}>
                No tasks found
              </div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                No completed tasks for this day
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          from { transform: translate(-50%, -48%) scale(0.94); opacity: 0; }
          to   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
