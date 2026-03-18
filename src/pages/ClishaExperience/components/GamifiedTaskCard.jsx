/**
 * Clisha Experience — Gamified task card (matches clisha_gamified.html)
 * Type-specific styling: web (blue), search (orange), journey (green)
 * Handles website_click, google_search, journey, search_journey
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDuration } from '../../../utils/functions/functions';
import { copyAndOpenTab } from '../../../sass/utils/clipboardUtils';
import { BRAND } from '../design-system/tokens';
import CoinIcon from './CoinIcon';

/* ── Type config (matches old system CTAs) ────────────────────────
 * website_click: "Visit Website" - direct, no modal
 * google_search: "Activate Task" - modal, copy search_phrase, open extensionUrl
 * journey: "Activate Task" - modal, copy journey[0].description, open journey[0].link
 * search_journey: "Activate Task" - modal, copyAndOpenTab (copy + open google.com?tk=...)
 */
const TYPE_CONFIG = {
  website_click: {
    cardClass: 'web',
    badge: 'WEB',
    badgeBg: 'rgba(74,158,255,0.12)',
    badgeColor: '#4A9EFF',
    badgeBorder: 'rgba(74,158,255,0.2)',
    topBorder: 'linear-gradient(90deg, #4A9EFF, #A78BFA)',
    btnClass: 'visit',
    btnLabel: 'Visit Website',
    btnIcon: '▶',
    btnBg: '#4A9EFF',
  },
  google_search: {
    cardClass: 'search',
    badge: 'SEARCH',
    badgeBg: 'rgba(255,159,67,0.12)',
    badgeColor: '#FF9F43',
    badgeBorder: 'rgba(255,159,67,0.2)',
    topBorder: 'linear-gradient(90deg, #FF9F43, #F5C542)',
    btnClass: 'activate',
    btnLabel: 'Activate Task',
    btnIcon: '▶',
    btnBg: BRAND.primary,
  },
  journey: {
    cardClass: 'journey',
    badge: 'JOURNEY',
    badgeBg: 'rgba(46,204,113,0.12)',
    badgeColor: '#2ECC71',
    badgeBorder: 'rgba(46,204,113,0.2)',
    topBorder: 'linear-gradient(90deg, #2ECC71, #4A9EFF)',
    btnClass: 'activate',
    btnLabel: 'Activate Task',
    btnIcon: '▶',
    btnBg: BRAND.primary,
  },
  search_journey: {
    cardClass: 'search',
    badge: 'SEARCH',
    badgeBg: 'rgba(255,159,67,0.12)',
    badgeColor: '#FF9F43',
    badgeBorder: 'rgba(255,159,67,0.2)',
    topBorder: 'linear-gradient(90deg, #FF9F43, #F5C542)',
    btnClass: 'activate',
    btnLabel: 'Activate Task',
    btnIcon: '▶',
    btnBg: BRAND.primary,
  },
};

function getConfig(taskType) {
  return TYPE_CONFIG[taskType] || TYPE_CONFIG.website_click;
}

/** Returns true if the color is dark (needs light text for contrast) */
function isDarkBackground(color) {
  if (!color || typeof color !== 'string') return false;
  let r = 0;
  let g = 0;
  let b = 0;
  const hex6 = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  const hex3 = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (hex6) {
    r = parseInt(hex6[1], 16);
    g = parseInt(hex6[2], 16);
    b = parseInt(hex6[3], 16);
  } else if (hex3) {
    r = parseInt(hex3[1] + hex3[1], 16);
    g = parseInt(hex3[2] + hex3[2], 16);
    b = parseInt(hex3[3] + hex3[3], 16);
  } else {
    const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgb) {
      r = parseInt(rgb[1], 10);
      g = parseInt(rgb[2], 10);
      b = parseInt(rgb[3], 10);
    } else return false;
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/* ── Activate modal (matches old Popup: different content per task type) ──
 * google_search: input + "Copy" → copy search_phrase, open extensionUrl
 * search_journey: input + "Copy" → copyAndOpenTab (copy + open google.com?tk=...)
 * journey: "Start Journey" only → copy journey[0].description, open journey[0].link
 */
function ActivateModal({ item, onClose, onActivate, dark }) {
  const hasExt = localStorage.getItem('hasExt') === 'true';
  const extUrl = 'https://chromewebstore.google.com/detail/fggiejockcliimogohnaiakpbcjaafcl';
  const taskType = item?.task_type;
  const isJourney = taskType === 'journey';
  const showInput = (taskType === 'google_search' || taskType === 'search_journey');

  const handleActivate = async () => {
    await onActivate(item);
    onClose();
  };

  const getDisplayText = () => {
    if (showInput) return item?.google_search?.search_phrase ?? '';
    if (isJourney) return item?.journey?.[0]?.description ?? '';
    return '';
  };

  const getModalTitle = () => {
    if (isJourney) return 'Start Journey';
    return 'Copy';
  };

  const getModalSubtext = () => {
    if (isJourney) return 'Click the link to navigate to your task';
    return 'Copy this keyword and paste in your browser';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: dark ? '#1E2535' : '#fff',
          borderRadius: 16,
          padding: 24,
          maxWidth: 360,
          width: '90%',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: dark ? '#E8EDF5' : '#1a1a1a', marginBottom: 4 }}>
            Click the button below to start your task
          </div>
          <div style={{ fontSize: 12, color: dark ? '#8A95A8' : '#666' }}>
            {getModalSubtext()}
          </div>
        </div>
        {hasExt ? (
          <>
            {showInput && (
              <input
                type="text"
                readOnly
                value={getDisplayText()}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  background: dark ? '#161B26' : '#f5f5f5',
                  fontSize: 13,
                  color: dark ? '#E8EDF5' : '#1a1a1a',
                  marginBottom: 16,
                }}
              />
            )}
            <button
              type="button"
              onClick={handleActivate}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 10,
                border: 'none',
                background: item?.token?.card_colors?.accent_color ?? BRAND.primary,
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {getModalTitle()}
            </button>
          </>
        ) : (
          <div style={{ fontSize: 12, color: dark ? '#8A95A8' : '#666', marginBottom: 16 }}>
            Please{' '}
            <a href={extUrl} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.primary, fontWeight: 600 }}>
              Install and Activate Or Update
            </a>{' '}
            the Chrome Extension here before you solve this task. Reload the page after Installation.
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: 12,
            width: '100%',
            padding: 8,
            border: 'none',
            background: 'transparent',
            color: dark ? '#8A95A8' : '#666',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── Main card ─────────────────────────────────────────────────── */
export default function GamifiedTaskCard({ item, extCode, loadLink, dark }) {
  const navigate = useNavigate();
  const [showActivate, setShowActivate] = useState(false);

  const taskType = item?.task_type ?? 'website_click';
  const cfg = getConfig(taskType);

  const duration = item?.website_click?.duration ?? item?.token?.duration ?? item?.average_duration ?? 30;
  const isValid = item?.validity === 'Valid (interaction points remaining)' || item?.validity?.startsWith('Valid until:');
  const tokenName = item?.token?.name ?? 'Task';
  const tokenNameShort = tokenName.length > 15 ? `${tokenName.slice(0, 15)}...` : tokenName;

  const getDescription = () => {
    if (taskType === 'website_click') {
      return `Solve "${tokenName}" Task. Stay for ${duration} secs then come back to claim your bonus.`;
    }
    return `Solve "${tokenName}" Task, and then come back to claim your bonus.`;
  };

  const handleVisit = () => {
    if (taskType !== 'website_click') return;
    const secTime = (t) => t * 1000;
    const url = item.url?.startsWith('http') ? item.url : `https://${item.url}`;
    const newTask = window.open(url, '_blank');
    const prematureCloseCheck = setInterval(() => {
      if (newTask?.closed) {
        clearInterval(prematureCloseCheck);
        clearTimeout(timerComplete);
        navigate(`/dashboard/reward?t=${item.id}&p=${item.points}&status=failed`);
      }
    }, 500);
    const timerComplete = setTimeout(() => {
      clearInterval(prematureCloseCheck);
      if (!newTask?.closed) {
        navigate(`/dashboard/reward?t=${item.id}&p=${item.points}&status=done&b=${item?.bonus_points ?? 0}`);
      }
    }, secTime(duration));
  };

  const handleActivate = async (taskItem) => {
    if (taskItem?.task_type === 'google_search') {
      const msg = taskItem?.google_search?.search_phrase;
      await navigator.clipboard.writeText(msg || '').then(() => toast.info(`Copied *${msg}*`));
      setTimeout(() => {
        window.open(taskItem?.extensionUrl || `https://google.com?tk=${taskItem.task_code}&cd=${extCode}`, '_blank');
      }, 1000);
      setTimeout(() => window.location.reload(), 20000);
    } else if (taskItem?.task_type === 'journey') {
      const msg = taskItem?.journey?.[0]?.description;
      await navigator.clipboard.writeText(msg || '');
      setTimeout(() => {
        const link = taskItem?.journey?.[0]?.link;
        const fullUrl = link?.includes('?')
          ? `${link}&tk=${taskItem.task_code}&cd=${extCode}`
          : `${link}?tk=${taskItem.task_code}&cd=${extCode}`;
        window.open(fullUrl, '_blank');
      }, 1000);
      setTimeout(() => window.location.reload(), 20000);
    } else if (taskItem?.task_type === 'search_journey') {
      await copyAndOpenTab(taskItem, extCode);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(item?.task_code || '').then(() => toast.info('Task ID copied'));
  };

  /* Token colors from API (old system: item.token.background, foreground, card_colors.accent_color) */
  const tokenBg = item?.token?.background;
  const accentColor = item?.token?.card_colors?.accent_color ?? BRAND.primary;

  /* When token has custom background, use it; otherwise use theme defaults */
  const cardBg = tokenBg || (dark ? '#182030' : '#ffffff');
  const hasCustomBg = Boolean(tokenBg);
  const cardIsDark = hasCustomBg ? isDarkBackground(tokenBg) : dark;
  const cardBorder = hasCustomBg ? (cardIsDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)') : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)');
  const textMain = hasCustomBg ? (cardIsDark ? '#ffffff' : '#1a1a1a') : (dark ? '#E8EDF5' : '#1a1a1a');
  const textSub = hasCustomBg ? (cardIsDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)') : (dark ? '#8A95A8' : '#666');
  const textMuted = hasCustomBg ? (cardIsDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)') : (dark ? '#4A5568' : '#999');
  const rowBorder = hasCustomBg ? (cardIsDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)') : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)');
  const descBg = hasCustomBg ? (cardIsDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : (dark ? '#1E2535' : '#f1f5f9');
  const btnBg = accentColor;
  /* Visit: white text. Activate: dark text on gold/orange (BRAND.primary), white on darker accents */
  const isLightAccent = accentColor === BRAND.primary || accentColor?.toLowerCase()?.includes('fc') || accentColor?.toLowerCase()?.includes('ff9');
  const btnTextColor = cfg.btnClass === 'visit' ? '#fff' : (isLightAccent ? '#1a1a1a' : '#fff');
  const logoUrl = item?.token?.photo ?? item?.website_click?.token?.photo ?? item?.google_search?.token?.photo;

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .clisha-x-gamified-task-card { padding: 12px !important; gap: 10px !important; }
          .clisha-x-gamified-task-card .clisha-x-task-card-logo { min-height: 56px !important; padding: 10px 12px !important; margin: -12px -12px 0 -12px !important; }
          .clisha-x-gamified-task-card .clisha-x-task-card-logo img { height: 44px !important; max-width: 110px !important; }
          .clisha-x-gamified-task-card .clisha-x-task-card-btn { min-height: 44px !important; padding: 10px 14px !important; font-size: 14px !important; }
        }
      `}</style>
      <div
        className="clisha-x-gamified-task-card"
        style={{
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          borderRadius: 14,
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = cardIsDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = cardBorder;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* type-specific top border; use accentColor when token has custom colors */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: hasCustomBg && accentColor ? `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` : cfg.topBorder,
            borderRadius: '14px 14px 0 0',
          }}
        />

        {/* logo area: photo or company name (glassmorphism) */}
        <div
          className="clisha-x-task-card-logo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 72,
            padding: '14px 16px',
            margin: '-14px -14px 0 -14px',
            background: cardIsDark
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderBottom: `1px solid ${cardIsDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.4)'}`,
            boxShadow: cardIsDark ? 'inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.8)',
            borderRadius: '14px 14px 0 0',
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={tokenName}
              style={{
                height: 52,
                maxWidth: 130,
                minWidth: 48,
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontFamily: "'Space Mono', monospace",
                fontSize: 15,
                fontWeight: 700,
                color: textMain,
                lineHeight: 1.35,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {tokenName || 'Task'}
            </div>
          )}
        </div>

        {/* head: name (when photo exists) + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: logoUrl ? 'space-between' : 'flex-end', gap: 10 }}>
          {logoUrl ? (
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 600, color: textMain, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: 1 }}>
              {tokenName}
            </div>
          ) : null}
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 9px',
              borderRadius: 6,
              background: hasCustomBg ? (accentColor ? `${accentColor}20` : cfg.badgeBg) : cfg.badgeBg,
              color: hasCustomBg ? (accentColor || cfg.badgeColor) : cfg.badgeColor,
              border: `1px solid ${hasCustomBg ? (accentColor ? `${accentColor}40` : cfg.badgeBorder) : cfg.badgeBorder}`,
              letterSpacing: '0.03em',
              flexShrink: 0,
            }}
          >
            {cfg.badge}
          </span>
        </div>

        {/* description */}
        <div
          style={{
            fontSize: 13,
            color: textSub,
            lineHeight: 1.55,
            background: descBg,
            borderRadius: 8,
            padding: '8px 10px',
          }}
        >
          {getDescription()}
        </div>

        {/* Task ID (accentColor from token.card_colors, like old TaskCopy) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 0',
            borderBottom: `1px solid ${rowBorder}`,
          }}
        >
          <span style={{ fontSize: 12, color: accentColor }}>Task ID</span>
          <span
            style={{
              fontSize: 12,
              fontFamily: "'Space Mono', monospace",
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCopyId();
            }}
          >
            {item?.task_code}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={accentColor} strokeWidth="1.5">
              <rect x="1" y="3" width="6" height="6" rx="1" />
              <path d="M3 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7" />
            </svg>
          </span>
        </div>

        {/* rows: Validity, Earning, Clishacoins, pts */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: 13, color: cardIsDark ? '#ffffff' : textMuted }}>Validity</span>
            <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              {isValid ? (
                <span style={{ width: 15, height: 15, borderRadius: 4, background: `${accentColor}20`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" stroke={accentColor} fill="none" strokeWidth="2.5">
                    <path d="M1.5 4.5l2 2 3.5-3.5" />
                  </svg>
                </span>
              ) : (
                <span style={{ color: '#f87171', fontSize: 12 }}>Invalid</span>
              )}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: 13, color: cardIsDark ? '#ffffff' : textMuted }}>Earning</span>
            <span style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  background: `${accentColor}20`,
                  border: `1px solid ${accentColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CoinIcon size={9} />
              </div>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: 13, color: cardIsDark ? '#ffffff' : textMuted }}>Clishacoins</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: cardIsDark ? '#ffffff' : accentColor, fontFamily: "'Space Mono', monospace" }}>
              {item?.points ?? 0} pts
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontSize: 11.5, color: cardIsDark ? '#ffffff' : textMuted }}>{tokenNameShort}</span>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: cardIsDark ? '#ffffff' : accentColor, fontFamily: "'Space Mono', monospace" }}>
              {item?.points ?? 0} pts
            </span>
          </div>
        </div>

        {/* footer: duration + button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 2 }}>
          <span
            style={{
              fontSize: 12,
              color: textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={textMuted} strokeWidth="1.5">
              <circle cx="6" cy="6" r="5" />
              <path d="M6 3v3l2 2" />
            </svg>
            {formatDuration(duration)}
          </span>
          {cfg.btnClass === 'visit' ? (
            <button
              type="button"
              className="clisha-x-task-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleVisit();
              }}
              style={{
                fontSize: 13,
                fontWeight: 700,
                padding: '7px 14px',
                borderRadius: 8,
                border: 'none',
                background: btnBg,
                color: btnTextColor,
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {cfg.btnIcon && <span style={{ marginRight: 4 }}>{cfg.btnIcon}</span>}
              {cfg.btnLabel}
            </button>
          ) : (
            <button
              type="button"
              className="clisha-x-task-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowActivate(true);
              }}
              style={{
                fontSize: 13,
                fontWeight: 700,
                padding: '7px 14px',
                borderRadius: 8,
                border: 'none',
                background: btnBg,
                color: btnTextColor,
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {cfg.btnIcon && <span style={{ marginRight: 4 }}>{cfg.btnIcon}</span>}
              {cfg.btnLabel}
            </button>
          )}
        </div>
      </div>

      {showActivate && (
        <ActivateModal
          item={item}
          onClose={() => setShowActivate(false)}
          onActivate={handleActivate}
          dark={dark}
        />
      )}
    </>
  );
}
