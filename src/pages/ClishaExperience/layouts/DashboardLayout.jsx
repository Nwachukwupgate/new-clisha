/**
 * Clisha Experience — Dashboard layout (redesigned)
 * Wraps all /clisha-x/dashboard/* routes
 */
/* eslint-disable no-undef, react/jsx-no-undef, import/no-duplicates */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutAction } from '../../../store/Auth/auth';
import { useAuth } from '../../../context/AuthContext';
import ProfilePicture from '../../../utils/ProfilePicture';
import CoinIcon from '../components/CoinIcon';
import { ThemeProvider, useClishaTheme, useClishaThemeToggle } from '../context/ThemeContext';
import { lightTheme } from '../design-system/theme';
import { BRAND } from '../design-system/tokens';

const BASE = '/clisha-x';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', url: `${BASE}/dashboard`, icon: '⚡', emoji: true },
  { name: 'Task', url: `${BASE}/dashboard/task`, icon: '📋', emoji: true },
  { name: 'Token', url: `${BASE}/dashboard/token`, icon: '🪙', emoji: true },
  { name: 'Wallet', url: `${BASE}/dashboard/wallet`, icon: '💰', emoji: true },
  { name: 'Team', url: `${BASE}/dashboard/team`, icon: '👥', emoji: true },
  { name: 'Rank', url: `${BASE}/dashboard/rank`, icon: '🏆', emoji: true },
  { name: 'Profile', url: `${BASE}/dashboard/profile`, icon: '👤', emoji: true },
  { name: 'Setting', url: `${BASE}/dashboard/settings`, icon: '⚙️', emoji: true },
  { name: 'Help', url: `${BASE}/dashboard/help`, icon: '❓', emoji: true },
];

/* ── Keyframes injected once ─────────────────────────────────────────── */
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;0,800;0,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  @keyframes coinPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(252,152,40,0.6)); }
    50%       { transform: scale(1.12); filter: drop-shadow(0 0 10px rgba(252,152,40,0.9)); }
  }
  @keyframes popIn {
    from { transform: scale(0.85); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  @keyframes slideDown {
    from { transform: translateY(-8px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes progressShimmer {
    0%   { left: -100%; }
    100% { left: 200%;  }
  }
  @keyframes floatBadge {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-3px); }
  }
  .clisha-x-sidebar-desktop { display: none !important; }
  @media (min-width: 768px) { .clisha-x-sidebar-desktop { display: flex !important; } }
  .clisha-x-right-panel { margin-left: 0; }
  @media (min-width: 768px) { .clisha-x-right-panel { margin-left: 220px; } }
  .clisha-x-sidebar-mobile { display: block; }
  @media (min-width: 768px) { .clisha-x-sidebar-mobile { display: none !important; } }
  .sidebar-nav-item:hover { background: var(--nav-hover) !important; }
  .clisha-dropdown-item:hover { background: var(--nav-hover) !important; opacity: 1 !important; }
`;

const FALLBACK_THEME = { border: 'rgba(0,0,0,0.12)', textSub: 'rgba(0,0,0,0.78)' };

function SidebarContent({ th, dark, onCopyReferral, onToggleTheme, onLogout, onNavClick }) {
  const theme = (th?.border ? th : lightTheme?.border ? lightTheme : FALLBACK_THEME);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${theme.border}`, marginBottom: 8 }}>
        <Link to={`${BASE}/dashboard`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src={dark ? '/logo2.png' : '/images/logo4.png'} alt="Clisha" style={{ height: 28 }} />
        </Link>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px', flex: 1 }}>
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === `${BASE}/dashboard`}
            onClick={onNavClick}
            className="sidebar-nav-item"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 11, padding: '10px 14px',
              textDecoration: 'none', borderRadius: 12,
              color: isActive ? '#fff' : theme.textSub,
              background: isActive ? `linear-gradient(135deg, ${BRAND.primary}ee 0%, ${BRAND.primaryDark} 100%)` : 'transparent',
              fontWeight: isActive ? 700 : 500, fontSize: 14, transition: 'all 0.18s',
              boxShadow: isActive ? `0 4px 14px rgba(${BRAND.primaryRgb},0.35)` : 'none',
              position: 'relative', overflow: 'hidden',
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ fontSize: 16, lineHeight: 1, minWidth: 20, textAlign: 'center' }}>{item.icon}</span>
                <span>{item.name}</span>
                {isActive && (
                  <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 6px rgba(255,255,255,0.8)' }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '16px 12px 20px', borderTop: `1px solid ${theme.border}`, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          type="button"
          onClick={onCopyReferral}
          style={{
            width: '100%', padding: '11px 16px', borderRadius: 12,
            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
            color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: `0 4px 14px rgba(${BRAND.primaryRgb},0.4)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 18px rgba(${BRAND.primaryRgb},0.5)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 14px rgba(${BRAND.primaryRgb},0.4)`; }}
        >
          <span>👥</span> Invite a friend
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="button" onClick={onToggleTheme} style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.05)' : `rgba(${BRAND.primaryRgb},0.08)`, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} aria-label="Toggle theme">
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            style={{ flex: 1, height: 38, borderRadius: 10, border: `1px solid ${theme.border}`, background: 'transparent', cursor: 'pointer', fontSize: 13, color: theme.textSub, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = BRAND.error; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = theme.textSub; }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardLayoutInner() {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const user = useSelector((state) => state.user?.data);
  const loginType = localStorage.getItem('loginType');
  const th = useClishaTheme();
  const { dark, toggle: toggleTheme } = useClishaThemeToggle();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => { dispatch(getUser()); }, [dispatch]);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const logout = () => {
    if (loginType) signOut();
    else dispatch(logoutAction());
    window.location.href = `${BASE}/login`;
  };

  const copyReferral = () => {
    const code = user?.user?.clishaReferralCode || user?.user?.clishaId;
    const url = `${window.location.origin}/signup?referredBy=${code}`;
    navigator.clipboard.writeText(url).catch(() => { });
  };

  const balance = user?.rank?.balance ?? 0;
  const clishaCoins = user?.rank?.bonus_points ?? 0;
  const vendoPackage = useSelector((state) => state.wallet?.vendoPackage);
  const showClishaCoins = user?.user?.vendoConnectStatus && vendoPackage?.data?.package_level !== 'No package';
  const username = user?.user?.username || 'User';
  const gender = user?.user?.gender;
  const photo = user?.user?.photo;

  /* ── CSS variable bridge ───────────────────────────────── */
  const cssVars = {
    '--nav-hover': dark ? 'rgba(255,255,255,0.05)' : `rgba(${BRAND.primaryRgb},0.07)`,
  };

  const sidebarProps = {
    th,
    dark,
    onCopyReferral: copyReferral,
    onToggleTheme: toggleTheme,
    onLogout: logout,
  };

  return (
    <div style={{ minHeight: '100vh', background: th.bg, color: th.text, fontFamily: "'Plus Jakarta Sans', sans-serif", ...cssVars }}>
      <style>{KEYFRAMES}</style>

      {/* ── Sidebar desktop: fixed, full viewport height ───────────── */}
      <aside
        className="clisha-x-sidebar-desktop"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 220,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: th.surface,
          borderRight: `1px solid ${th.border}`,
          overflowY: 'auto',
          zIndex: 100,
        }}
      >
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* ── Right panel: header + main (offset by sidebar on desktop) ─ */}
      <div className="clisha-x-right-panel" style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '10px 20px',
        background: th.navBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${th.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}>
        {/* mobile logo */}
        <Link
          to={`${BASE}/dashboard`}
          className="clisha-x-sidebar-mobile"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img src={dark ? '/logo2.png' : '/images/logo4.png'} alt="Clisha" style={{ height: 26 }} />
        </Link>

        {/* right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          {/* Points badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 13px',
            background: dark
              ? `rgba(${BRAND.primaryRgb},0.15)`
              : `rgba(${BRAND.primaryRgb},0.1)`,
            borderRadius: 10,
            border: `1px solid rgba(${BRAND.primaryRgb},0.3)`,
            boxShadow: `0 0 12px rgba(${BRAND.primaryRgb},0.15)`,
          }}>
            <CoinIcon size={18} glow />
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 800, fontSize: 16, color: BRAND.primary,
              letterSpacing: '-0.5px',
            }}>
              {Number(balance).toLocaleString()} Points
            </span>
          </div>

          {/* Clishacoins badge (when Vendo connected) */}
          {showClishaCoins && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 13px',
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderRadius: 10,
              border: `1px solid ${th.border}`,
            }}>
              <span style={{ fontSize: 16 }}>🪙</span>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 700, fontSize: 14, color: th.text,
                letterSpacing: '-0.5px',
              }}>
                {Number(clishaCoins).toFixed(0)} Clishacoins
              </span>
            </div>
          )}

          {/* profile dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px 6px 6px',
                borderRadius: 10,
                border: `1px solid ${th.border}`,
                background: profileOpen
                  ? (dark ? 'rgba(255,255,255,0.06)' : `rgba(${BRAND.primaryRgb},0.07)`)
                  : 'transparent',
                cursor: 'pointer', color: th.text,
                transition: 'all 0.18s',
              }}
            >
              <img
                src={ProfilePicture({ gender, photo })}
                alt=""
                style={{ width: 28, height: 28, borderRadius: 8, objectFit: 'cover' }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, display: 'none' }} className="d-md-inline">
                {username}
              </span>
              <span style={{
                fontSize: 10, opacity: 0.5,
                transform: profileOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}>▼</span>
            </button>

            {profileOpen && (
              <>
                <div
                  role="button" tabIndex={0}
                  onClick={() => setProfileOpen(false)}
                  onKeyDown={(e) => e.key === 'Escape' && setProfileOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                />
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  zIndex: 101, minWidth: 190, padding: 6,
                  borderRadius: 14,
                  background: th.surface,
                  border: `1px solid ${th.border}`,
                  boxShadow: dark
                    ? '0 12px 32px rgba(0,0,0,0.5)'
                    : '0 8px 28px rgba(0,0,0,0.12)',
                  animation: 'slideDown 0.18s ease',
                }}>
                  {/* user info mini */}
                  <div style={{
                    padding: '10px 12px 10px',
                    borderBottom: `1px solid ${th.border}`,
                    marginBottom: 4,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <img
                      src={ProfilePicture({ gender, photo })}
                      alt=""
                      style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: th.text }}>{username}</div>
                      <div style={{ fontSize: 11, color: th.textMuted }}>Clisha Member</div>
                    </div>
                  </div>
                  <Link
                    to={`${BASE}/dashboard/profile`}
                    onClick={() => setProfileOpen(false)}
                    className="clisha-dropdown-item"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 12px', borderRadius: 8,
                      color: th.text, textDecoration: 'none', fontSize: 13, fontWeight: 500,
                      transition: 'background 0.15s',
                    }}
                  >
                    <span>👤</span> Profile
                  </Link>
                  <Link
                    to={`${BASE}/dashboard`}
                    onClick={() => setProfileOpen(false)}
                    className="clisha-dropdown-item"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 12px', borderRadius: 8,
                      color: th.text, textDecoration: 'none', fontSize: 13, fontWeight: 500,
                      transition: 'background 0.15s',
                    }}
                  >
                    <span>⚡</span> Dashboard
                  </Link>
                  <div style={{ height: 1, background: th.border, margin: '4px 0' }} />
                  <button
                    type="button"
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="clisha-dropdown-item"
                    style={{
                      width: '100%', padding: '9px 12px', borderRadius: 8,
                      border: 'none', background: 'transparent',
                      color: '#f87171', cursor: 'pointer', fontSize: 13,
                      fontWeight: 600, textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif",
                      display: 'flex', alignItems: 'center', gap: 8,
                      transition: 'background 0.15s',
                    }}
                  >
                    <span>🚪</span> Log out
                  </button>
                </div>
              </>
            )}
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="clisha-x-sidebar-mobile"
            style={{
              width: 38, height: 38, borderRadius: 10,
              border: `1px solid ${th.border}`,
              background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
              transition: 'all 0.2s',
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: mobileOpen ? (i === 1 ? 0 : 18) : 18,
                  height: 2,
                  background: th.text,
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  transform: mobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ── Mobile overlay ───────────────────────────────────── */}
        {mobileOpen && (
          <div
            role="button" tabIndex={0}
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
        <aside
          className="clisha-x-sidebar-mobile"
          style={{
            position: 'fixed', top: 57, left: 0, bottom: 0, zIndex: 1001,
            width: 260,
            background: th.surface,
            borderRight: `1px solid ${th.border}`,
            overflowY: 'auto',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <SidebarContent {...sidebarProps} onNavClick={() => setMobileOpen(false)} />
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <main style={{
          flex: 1, padding: '28px 24px',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          overflowX: 'hidden',
        }}>
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <DashboardLayoutInner />
    </ThemeProvider>
  );
}
