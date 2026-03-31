import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { darkTheme, lightTheme } from '../design-system/theme';
import { BRAND, TYPOGRAPHY, RADIUS } from '../design-system/tokens';

const BASE = '/clisha-x';
const api = process.env.REACT_APP_API;

function getRankConfig() {
  const token = window.localStorage.getItem('token');
  return { headers: { Authorization: `bearer ${token}` } };
}

/* ── Floating coin particle ─────────────────────────────────────────────── */
function CoinParticle({ x, y, delay, size }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, #ffe066, ${BRAND.primary} 60%, ${BRAND.primaryDark})`,
      boxShadow: `0 0 ${size / 2}px rgba(${BRAND.primaryRgb},0.5), inset 0 -2px 4px rgba(0,0,0,0.2)`,
      animation: `floatCoin ${3 + delay}s ease-in-out ${delay}s infinite`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45,
      color: '#8a4f00',
      fontWeight: 900,
      opacity: 0.7,
    }}>
      ₡
    </div>
  );
}

/* ── XP Ring ────────────────────────────────────────────────────────────── */
function XPRing({ pct = 68, dark }) {
  const r = 52;
  const sw = 7;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
      <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="65" cy="65" r={r} fill="none"
          stroke={dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'} strokeWidth={sw} />
        <circle cx="65" cy="65" r={r} fill="none"
          stroke={`url(#xpGrad)`} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }} />
        <defs>
          <linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BRAND.primaryDark} />
            <stop offset="100%" stopColor={BRAND.primaryLight} />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: BRAND.primary,
          letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 1,
        }}>Daily XP</div>
        <div style={{
          fontFamily: TYPOGRAPHY.fontDisplay, fontSize: 26, fontWeight: 900,
          color: BRAND.primary, lineHeight: 1,
        }}>{pct}%</div>
        <div style={{ fontSize: 9, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginTop: 2 }}>
          of goal
        </div>
      </div>
    </div>
  );
}

/* ── Mini leaderboard row ───────────────────────────────────────────────── */
function MiniRankRow({ rank, name, pts, dark }) {
  const medals = ['🥇', '🥈', '🥉'];
  const bg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', borderRadius: RADIUS.sm,
      background: bg,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      marginBottom: 6,
    }}>
      <span style={{ fontSize: 15, width: 22 }}>{medals[rank - 1] || `#${rank}`}</span>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: `hsl(${rank * 60}, 65%, 55%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0,
      }}>{(name || '?')[0]}</div>
      <span style={{
        flex: 1, fontSize: 12, fontWeight: 600,
        color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)',
      }}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: BRAND.primary }}>₡</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: BRAND.primary }}>{pts.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ── Stat pill ──────────────────────────────────────────────────────────── */
function StatPill({ icon, value, label, dark }) {
  return (
    <div style={{
      flex: 1, textAlign: 'center', padding: '14px 10px',
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
      borderRadius: RADIUS.md,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
    }}>
      <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
      <div style={{
        fontFamily: TYPOGRAPHY.fontDisplay, fontSize: 18, fontWeight: 800,
        color: BRAND.primary, letterSpacing: '-0.3px',
      }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2,
        color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        letterSpacing: '0.3px', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

/* ── Theme toggle ───────────────────────────────────────────────────────── */
export function ThemeToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} aria-label="Toggle theme" style={{
      width: 46, height: 26, borderRadius: 13,
      background: dark ? '#1a1a1a' : '#fff8f0',
      border: `1.5px solid ${dark ? 'rgba(255,255,255,0.12)' : `rgba(${BRAND.primaryRgb},0.25)`}`,
      cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
      padding: 0, flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: dark ? 22 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: dark
          ? `linear-gradient(135deg,${BRAND.primaryDark},${BRAND.primary})`
          : `linear-gradient(135deg,#fbbf24,${BRAND.primary})`,
        transition: 'left 0.28s cubic-bezier(.4,0,.2,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }}>
        {dark ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   AuthLayout
   ════════════════════════════════════════════════════════════════════════════ */
export default function AuthLayout({ children, dark = false, onToggleTheme }) {
  const th = dark ? darkTheme : lightTheme;
  const [, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const coins = [
    { x: 8,  y: 15, delay: 0,   size: 18 },
    { x: 80, y: 8,  delay: 0.8, size: 14 },
    { x: 88, y: 55, delay: 1.6, size: 22 },
    { x: 12, y: 72, delay: 2.2, size: 12 },
    { x: 55, y: 5,  delay: 1.1, size: 16 },
    { x: 40, y: 88, delay: 0.4, size: 20 },
    { x: 72, y: 82, delay: 1.9, size: 13 },
    { x: 25, y: 42, delay: 0.7, size: 10 },
  ];

  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLeaderboardLoading(true);
    axios
      .get(`${api}/ranking?page=1&size=3`, getRankConfig())
      .then((res) => {
        if (cancelled) return;
        const list = res?.data?.data?.ranking ?? [];
        const rows = list.slice(0, 3).map((item, i) => {
          const displayName = item?.user?.firstname ?? item?.user?.username ?? 'User';
          const lastName = item?.user?.lastname ?? '';
          const fullName = lastName ? `${displayName} ${lastName}`.trim() : displayName;
          return {
            rank: item?.position ?? i + 1,
            name: fullName,
            pts: Number(item?.total_points ?? item?.balance ?? 0),
            userId: item?.user?.id ?? `row-${i}`,
          };
        });
        setLeaderboard(rows);
      })
      .catch(() => {
        if (!cancelled) setLeaderboard([]);
      })
      .finally(() => {
        if (!cancelled) setLeaderboardLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── global keyframes injected once ────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes floatCoin {
      0%,100% { transform: translateY(0) rotate(0deg);  opacity: 0.7; }
      33%      { transform: translateY(-14px) rotate(8deg);  opacity: 0.9; }
      66%      { transform: translateY(-6px) rotate(-5deg); opacity: 0.65; }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes popIn {
      0%   { transform: scale(0); opacity: 0; }
      70%  { transform: scale(1.18); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shakeX {
      0%,100% { transform: translateX(0); }
      20%,60% { transform: translateX(-5px); }
      40%,80% { transform: translateX(5px); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes rippleOut {
      to { transform: translate(-50%,-50%) scale(28); opacity: 0; }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulseGlow {
      0%,100% { box-shadow: 0 0 18px rgba(${BRAND.primaryRgb},0.2); }
      50%     { box-shadow: 0 0 36px rgba(${BRAND.primaryRgb},0.45); }
    }
    @keyframes progressFill {
      from { width: 0%; }
    }

    .auth-left  { animation: fadeSlideUp 0.55s ease both; }
    .auth-right { animation: slideInRight 0.5s ease 0.1s both; }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px ${dark ? '#1a1a1a' : '#ffffff'} inset;
      -webkit-text-fill-color: ${dark ? '#fff' : '#0d0d0d'};
      transition: background-color 5000s;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: rgba(${BRAND.primaryRgb},0.25); border-radius: 4px; }

    @media (max-width: 768px) {
      .auth-panel-left { display: none !important; }
      .auth-panel-right { max-width: 100% !important; min-width: 100% !important; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'row',
        background: th.bg, color: th.text,
        fontFamily: TYPOGRAPHY.fontBody,
        transition: 'background 0.3s, color 0.3s',
      }}>

        {/* ══ LEFT BRANDING PANEL ═══════════════════════════════════════════ */}
        <div
          className="auth-panel-left auth-left"
          style={{
            flex: '0 0 48%', maxWidth: '48%',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            padding: '40px 48px',
            background: dark
              ? `linear-gradient(160deg, #0a0a0a 0%, #140a00 50%, #1a0e00 100%)`
              : `linear-gradient(160deg, #fff8f0 0%, #ffedd5 50%, #fef3c7 100%)`,
            borderRight: `1px solid ${th.border}`,
          }}
        >
          {/* coin particles */}
          {coins.map((c, i) => <CoinParticle key={i} {...c} />)}

          {/* brand gradient orb */}
          <div style={{
            position: 'absolute', bottom: '-15%', right: '-10%',
            width: 420, height: 420, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${BRAND.primaryRgb},0.18) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* grid overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: dark ? 0.03 : 0.04, pointerEvents: 'none' }}>
            <defs><pattern id="ag" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M36 0L0 0 0 36" fill="none" stroke={dark ? 'white' : 'black'} strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ag)" />
          </svg>

          {/* ── Logo + nav ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44, position: 'relative', zIndex: 1 }}>
            <Link to={BASE} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src={dark ? '/logo2.png' : '/images/logo4.png'}
                alt="Clisha"
                style={{
                  height: 36,
                  width: 'auto',
                  maxWidth: 160,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>
            {onToggleTheme && <ThemeToggle dark={dark} onToggle={onToggleTheme} />}
          </div>

          {/* ── Hero copy ──────────────────────────────────────────── */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
            {/* live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 20, padding: '5px 12px', marginBottom: 20,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: BRAND.success,
                boxShadow: `0 0 8px ${BRAND.success}`,
                animation: 'pulseGlow 2s infinite',
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)', letterSpacing: '0.3px' }}>
                🔥 247 users joined today
              </span>
            </div>

            <h1 style={{
              fontFamily: TYPOGRAPHY.fontDisplay,
              fontSize: 'clamp(28px,3vw,40px)',
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-1px',
              color: dark ? '#fff' : '#1a0a00',
              marginBottom: 16,
            }}>
              Complete tasks.<br />
              Earn <span style={{
                color: BRAND.primary,
                textShadow: dark ? `0 0 28px rgba(${BRAND.primaryRgb},0.6)` : 'none',
              }}>coins</span>.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 700 }}>Climb the ranks.</em>
            </h1>

            <p style={{
              fontSize: 14, lineHeight: 1.75,
              color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
              marginBottom: 32, maxWidth: 380,
            }}>
              Join thousands of users completing daily digital marketing tasks. Every completed task earns you coins — every coin counts toward your rank.
            </p>

            {/* XP ring + stats ─── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <XPRing pct={68} dark={dark} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '🏆', label: 'Your level',  val: 'Lv. 12 · Silver' },
                  { icon: '🔥', label: 'Streak',       val: '5 days'          },
                  { icon: '₡',  label: 'Coins earned', val: '12,450'          },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{s.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.primary }}>{s.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* stat pills */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              <StatPill icon="👥" value="48K+" label="Users" dark={dark} />
              <StatPill icon="📋" value="1.2M+" label="Tasks done" dark={dark} />
              <StatPill icon="🏢" value="320+" label="Partners" dark={dark} />
            </div>

            {/* leaderboard preview */}
            <div style={{
              background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: RADIUS.lg, padding: '16px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
                  letterSpacing: '0.7px', textTransform: 'uppercase',
                }}>🏆 Today's Top Earners</span>
                <span style={{ fontSize: 10, color: BRAND.primary, fontWeight: 600 }}>Live</span>
              </div>
              {leaderboardLoading ? (
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                  padding: '10px 0',
                }}>
                  Loading leaderboard…
                </div>
              ) : leaderboard.length === 0 ? (
                <div style={{
                  fontSize: 12,
                  color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                  padding: '10px 0',
                }}>
                  No rankings yet.
                </div>
              ) : (
                leaderboard.map(({ userId, ...u }) => (
                  <MiniRankRow key={userId} {...u} dark={dark} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* ══ RIGHT FORM PANEL ═══════════════════════════════════════════════ */}
        <div
          className="auth-panel-right auth-right"
          style={{
            flex: 1,
            minWidth: 340,
            maxWidth: 520,
            margin: '0 auto',
            padding: 'clamp(28px,5vh,56px) clamp(24px,5vw,52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Mobile logo + theme toggle */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 32,
          }} className="d-md-none">
            <Link to={BASE} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src={dark ? '/logo2.png' : '/images/logo4.png'}
                alt="Clisha"
                style={{
                  height: 30,
                  width: 'auto',
                  maxWidth: 140,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>
            {onToggleTheme && <ThemeToggle dark={dark} onToggle={onToggleTheme} />}
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
