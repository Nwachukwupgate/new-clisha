/**
 * Clisha Experience — Dashboard layout (clean mockup design)
 * Sidebar: logo, XP bar, nav, streak. Header: chips, user. Theme toggle preserved.
 */
/* eslint-disable no-undef, react/jsx-no-undef, import/no-duplicates */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutAction } from '../../../store/Auth/auth';
import { getCalenderTask } from '../../../store/General';
import { useAuth } from '../../../context/AuthContext';
import ProfilePicture from '../../../utils/ProfilePicture';
import { ThemeProvider, useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';
import { BRAND } from '../design-system/tokens';

const BASE = '/clisha-x';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', url: `${BASE}/dashboard`, svg: 'grid' },
  { name: 'Task', url: `${BASE}/dashboard/task`, svg: 'task' },
  { name: 'Wallet', url: `${BASE}/dashboard/wallet`, svg: 'wallet' },
  { name: 'Token', url: `${BASE}/dashboard/token`, svg: 'token' },
  { name: 'Team', url: `${BASE}/dashboard/team`, svg: 'team' },
  { name: 'Rank', url: `${BASE}/dashboard/rank`, svg: 'rank' },
  { name: 'Profile', url: `${BASE}/dashboard/profile`, svg: 'profile' },
  { name: 'Settings', url: `${BASE}/dashboard/settings`, svg: 'setting' },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
  .clisha-x-sidebar-desktop { display: none !important; }
  @media (min-width: 768px) { .clisha-x-sidebar-desktop { display: flex !important; } }
  .clisha-x-mobile-balance { display: none !important; }
  .clisha-x-right-panel { margin-left: 0; }
  @media (min-width: 768px) { .clisha-x-right-panel { margin-left: 190px; } }
  .clisha-x-sidebar-mobile { display: block; }
  @media (min-width: 768px) { .clisha-x-sidebar-mobile { display: none !important; } }
  .clisha-x-nav-item:hover { background: var(--nav-hover) !important; color: var(--text) !important; }
  .clisha-x-dropdown-item:hover { background: var(--nav-hover) !important; }
  @media (max-width: 767px) {
    .clisha-x-main { padding: 12px !important; gap: 12px !important; min-height: 0 !important; }
    .clisha-x-header { padding: 0 10px !important; min-height: 46px !important; gap: 8px !important; overflow: hidden !important; width: 100% !important; box-sizing: border-box !important; }
    .clisha-x-header-logo { height: 24px !important; width: auto !important; max-width: 72px !important; object-fit: contain !important; flex-shrink: 0 !important; }
    .clisha-x-header-inner .clisha-x-header-chip { display: none !important; }
    .clisha-x-header-profile { padding: 2px 6px 2px 2px !important; gap: 4px !important; flex-shrink: 0 !important; }
    .clisha-x-header-avatar { width: 26px !important; height: 26px !important; }
    .clisha-x-header-username { font-size: 12px !important; max-width: 90px !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
    .clisha-x-header-menu-btn { width: 32px !important; height: 32px !important; min-width: 32px !important; flex-shrink: 0 !important; }
    .clisha-x-mobile-balance { display: flex !important; }
    .clisha-x-mobile-balance .clisha-x-header-chip { display: flex !important; }
    .clisha-x-mobile-balance .clisha-x-chip-label { display: none !important; }
    .clisha-x-sidebar-mobile { width: min(100vw - 24px, 280px) !important; top: 46px !important; padding: 12px !important; }
    .clisha-x-nav-item { padding: 12px 14px !important; font-size: 14px !important; min-height: 44px !important; }
    .clisha-x-dropdown-item { padding: 12px 14px !important; font-size: 14px !important; min-height: 44px !important; }
  }
  @media (max-width: 480px) {
    .clisha-x-main { padding: 10px !important; gap: 10px !important; }
    .clisha-x-header { padding: 0 8px !important; min-height: 44px !important; gap: 6px !important; }
    .clisha-x-header-logo { height: 22px !important; max-width: 64px !important; }
    .clisha-x-header-avatar { width: 24px !important; height: 24px !important; }
    .clisha-x-header-username { display: none !important; }
    .clisha-x-header-menu-btn { width: 30px !important; height: 30px !important; min-width: 30px !important; }
    .clisha-x-mobile-balance { padding: 6px 8px !important; gap: 8px !important; }
    .clisha-x-mobile-balance .clisha-x-header-chip { display: flex !important; padding: 4px 8px !important; font-size: 11px !important; }
    .clisha-x-sidebar-mobile { top: 44px !important; width: 100% !important; }
  }
`;

function NavIcon({ type }) {
  const s = { width: 12, height: 12, flexShrink: 0 };
  if (type === 'grid') return (
    <svg viewBox="0 0 14 14" fill="currentColor" style={s}>{/* eslint-disable-line */}
      <rect x="1" y="1" width="5" height="5" rx="1.2" /><rect x="8" y="1" width="5" height="5" rx="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="1.2" /><rect x="8" y="8" width="5" height="5" rx="1.2" />
    </svg>
  );
  if (type === 'task') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <path d="M2 3.5h10M2 7h6M2 10.5h4" />
    </svg>
  );
  if (type === 'wallet') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <rect x="1" y="3.5" width="12" height="8" rx="1.5" /><path d="M1 6.5h12" />
    </svg>
  );
  if (type === 'token') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <circle cx="7" cy="7" r="5" /><path d="M7 4.5v2.5l1.5 1.5" />
    </svg>
  );
  if (type === 'team') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <circle cx="5" cy="4.5" r="2.5" /><circle cx="10" cy="4.5" r="2" />
      <path d="M1 12c0-2.5 1.8-4 4-4s4 1.5 4 4" /><path d="M11 8c1.5 0 2.5 1 2.5 2.5" />
    </svg>
  );
  if (type === 'rank') return (
    <svg viewBox="0 0 14 14" fill="currentColor" style={s}>
      <path d="M7 0.5l1.5 4H13L9.5 7l1.3 4L7 9l-3.8 2 1.3-4L1 5h4.5z" />
    </svg>
  );
  if (type === 'profile') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <circle cx="7" cy="5" r="3" /><path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </svg>
  );
  if (type === 'setting') return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={s}>
      <circle cx="7" cy="7" r="2.5" /><path d="M7 1v2M7 11v2M1 7h2M11 7h2" />
    </svg>
  );
  return null;
}

/**
 * Streak: consecutive days (from today backwards) where user worked on a task.
 * "Worked" = completed at least 1 task (completedTasks > 0).
 */
function computeStreak(calenderTask) {
  const arr = Array.isArray(calenderTask) ? calenderTask : [];
  const byDate = {};
  arr.forEach((item) => {
    const k = moment(item?.date).format('YY-MM-DD');
    byDate[k] = item;
  });
  let streak = 0;
  let d = moment();
  for (let i = 0; i < 365; i += 1) {
    const k = d.format('YY-MM-DD');
    const item = byDate[k];
    const completed = item?.completedTasks ?? 0;
    if (completed > 0) streak += 1;
    else break;
    d = moment(d).subtract(1, 'day');
  }
  return streak;
}

function SidebarContent({ c, dark, onCopyReferral, onToggleTheme, onLogout, onNavClick, userName, rankName, balance, rankId }) {
  const xpPct = Math.min(100, Math.max(0, (Number(balance) / 1000) * 100));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '8px 4px', gap: 12, boxSizing: 'border-box' }}>
      <Link to={`${BASE}/dashboard`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 8, borderBottom: `1px solid ${c.border}`, textDecoration: 'none', width: '100%' }}>
        <img src={dark ? '/logo2.png' : '/images/logo4.png'} alt="Clisha" style={{ width: 60, height: 60, objectFit: 'contain' }} />
      </Link>

      <div style={{ background: c.bg3, border: `1px solid ${c.border}`, borderRadius: 10, padding: '9px 10px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: c.gold, textTransform: 'uppercase' }}>⚡ Points</span>
          <span style={{ fontSize: 10, color: c.text3 }}>{Number(balance || 0).toLocaleString()}</span>
        </div>
        <div style={{ height: 4, background: c.bg4, borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, xpPct)}%`, background: `linear-gradient(90deg,${c.gold},${c.orange})`, borderRadius: 99 }} />
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text, marginTop: 5 }}>{userName || 'Player'}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
          {rankId != null && (
            <span style={{ fontSize: 10, fontWeight: 700, color: c.gold, background: c.goldL, border: `1px solid ${c.goldB}`, borderRadius: 4, padding: '2px 6px' }}>
              Lv. {rankId}
            </span>
          )}
          <span style={{ fontSize: 10.5, color: c.text2 }}>{rankName || 'Member'}</span>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, width: '100%', minWidth: 0 }}>
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === `${BASE}/dashboard`}
            onClick={onNavClick}
            className="clisha-x-nav-item"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 7, padding: '8px 9px', borderRadius: 7,
              fontSize: 13, fontWeight: 500, textDecoration: 'none', color: isActive ? c.gold : c.text2,
              background: isActive ? c.goldL : 'none', border: `1px solid ${isActive ? c.goldB : 'transparent'}`,
              width: '100%', textAlign: 'left', fontFamily: CLEAN_FONTS.body, transition: 'all 0.12s',
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ opacity: isActive ? 1 : 0.7 }}><NavIcon type={item.svg} /></span>
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{ background: `linear-gradient(135deg,${c.goldL},rgba(255,159,67,0.04))`, border: `1px solid ${c.goldB}`, borderRadius: 10, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9, marginTop: 'auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 20 }}>🔥</div>
        <div>
          <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 17, fontWeight: 700, color: c.gold, lineHeight: 1 }}>{c.streak ?? 0}</div>
          <div style={{ fontSize: 10.5, color: c.text2, marginTop: 1 }}>day streak</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: `1px solid ${c.border}`, width: '100%' }}>
        <button type="button" onClick={onToggleTheme} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${c.border}`, background: c.bg3, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Toggle theme">
          {dark ? '☀️' : '🌙'}
        </button>
        <button type="button" onClick={onCopyReferral} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: `linear-gradient(135deg,${c.gold},${c.orange})`, color: '#1a1a1a', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: CLEAN_FONTS.body }}>Invite</button>
        <button type="button" onClick={onLogout} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: c.text2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Log out" title="Log out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DashboardLayoutInner() {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const user = useSelector((state) => state.user?.data);
  const calenderTask = useSelector((s) => s.general?.calenderTask?.monthlyData ?? s.general?.calenderTask);
  const loginType = localStorage.getItem('loginType');
  const { dark, toggle: toggleTheme } = useClishaThemeToggle();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const c = { ...(dark ? CLEAN.dark : CLEAN.light), streak: computeStreak(calenderTask) };

  useEffect(() => { dispatch(getUser()); dispatch(getCalenderTask()); }, [dispatch]);
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
  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: CLEAN_FONTS.body, fontSize: 14, '--nav-hover': dark ? 'rgba(255,255,255,0.05)' : `rgba(${BRAND.primaryRgb},0.07)` }}>
      <style>{STYLES}</style>

      <aside className="clisha-x-sidebar-desktop" style={{ position: 'fixed', left: 0, top: 0, width: 190, height: '100vh', background: c.bg2, borderRight: `1px solid ${c.border}`, overflowY: 'auto', zIndex: 100 }}>
        <SidebarContent c={c} dark={dark} onCopyReferral={copyReferral} onToggleTheme={toggleTheme} onLogout={logout} onNavClick={() => { }} userName={user?.user?.username} rankName={user?.rank?.rankName} balance={balance} rankId={user?.rank?.rankId} />
      </aside>

      <div className="clisha-x-right-panel" style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="clisha-x-header" style={{ background: c.bg2, borderBottom: `1px solid ${c.border}`, padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 42, flexShrink: 0, gap: 6 }}>
          <Link to={`${BASE}/dashboard`} className="clisha-x-sidebar-mobile" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src={dark ? '/logo2.png' : '/images/logo4.png'} alt="Clisha" className="clisha-x-header-logo" style={{ height: 32 }} />
          </Link>
          <span className="clisha-x-sidebar-desktop" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 12, fontWeight: 700, color: c.text2, letterSpacing: '0.06em' }}>DASHBOARD</span>
          <div className="clisha-x-header-inner clisha-x-header-chips" style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', flexWrap: 'nowrap' }}>
            <div className="clisha-x-header-chip" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 7, fontSize: 12, fontWeight: 700, background: c.bg3, border: `1px solid ${c.border}`, fontFamily: CLEAN_FONTS.mono }} title="Task points — withdrawable">
              <span style={{ fontSize: 12 }}>🪙</span>
              <span style={{ color: c.gold }}>{Number(balance).toLocaleString()}</span>
              <span className="clisha-x-chip-label" style={{ color: c.text2, fontWeight: 500 }}>Points</span>
            </div>
            {showClishaCoins && (
              <div className="clisha-x-header-chip" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 7, fontSize: 12, fontWeight: 700, background: c.bg3, border: `1px solid ${c.border}`, fontFamily: CLEAN_FONTS.mono }} title="Vendo bonus — from your package">
                <span style={{ fontSize: 12 }}>💎</span>
                <span style={{ color: c.blue }}>{Number(clishaCoins).toFixed(0)}</span>
                <span className="clisha-x-chip-label" style={{ color: c.text2, fontWeight: 500 }}>Clishacoins</span>
              </div>
            )}
            <div className="clisha-x-header-profile" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 8px 2px 3px', borderRadius: 20, background: c.bg3, border: `1px solid ${c.border}`, position: 'relative', flexShrink: 0 }}>
              <button type="button" onClick={() => setProfileOpen(!profileOpen)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={ProfilePicture({ gender, photo })} alt="" className="clisha-x-header-avatar" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
                <span className="clisha-x-header-username" style={{ fontSize: 12, color: c.text, fontWeight: 500 }}>{username}</span>
              </button>
              {profileOpen && (
                <>
                  <div role="button" tabIndex={0} onClick={() => setProfileOpen(false)} onKeyDown={(e) => e.key === 'Escape' && setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 101, minWidth: 180, padding: 8, borderRadius: 10, background: c.card, border: `1px solid ${c.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                    <Link to={`${BASE}/dashboard/profile`} onClick={() => setProfileOpen(false)} className="clisha-x-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, color: c.text, textDecoration: 'none', fontSize: 13 }}>👤 Profile</Link>
                    <Link to={`${BASE}/dashboard/settings`} onClick={() => setProfileOpen(false)} className="clisha-x-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, color: c.text, textDecoration: 'none', fontSize: 13 }}>⚙️ Settings</Link>
                    <Link to={`${BASE}/dashboard`} onClick={() => setProfileOpen(false)} className="clisha-x-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, color: c.text, textDecoration: 'none', fontSize: 13 }}>⚡ Dashboard</Link>
                    <div style={{ height: 1, background: c.border, margin: '4px 0' }} />
                    <button type="button" onClick={() => { logout(); setProfileOpen(false); }} className="clisha-x-dropdown-item" style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: 'none', background: 'transparent', color: '#f87171', cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>🚪 Log out</button>
                  </div>
                </>
              )}
            </div>
            <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="clisha-x-sidebar-mobile clisha-x-header-menu-btn" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0 }} aria-label="Menu">
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 2, background: c.text, borderRadius: 2 }} />)}
            </button>
          </div>
        </header>

        <div className="clisha-x-mobile-balance" style={{ display: 'none', alignItems: 'center', gap: 10, padding: '8px 10px', background: c.bg3, borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
          <div className="clisha-x-header-chip" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 7, fontSize: 12, fontWeight: 700, background: c.card, border: `1px solid ${c.border}`, fontFamily: CLEAN_FONTS.mono }} title="Task points — withdrawable">
            <span style={{ fontSize: 12 }}>🪙</span>
            <span style={{ color: c.gold }}>{Number(balance).toLocaleString()}</span>
            <span className="clisha-x-chip-label" style={{ color: c.text2, fontWeight: 500 }}>Points</span>
          </div>
          {showClishaCoins && (
            <div className="clisha-x-header-chip" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 7, fontSize: 12, fontWeight: 700, background: c.card, border: `1px solid ${c.border}`, fontFamily: CLEAN_FONTS.mono }} title="Vendo bonus — from your package">
              <span style={{ fontSize: 12 }}>💎</span>
              <span style={{ color: c.blue }}>{Number(clishaCoins).toFixed(0)}</span>
              <span className="clisha-x-chip-label" style={{ color: c.text2, fontWeight: 500 }}>Clishacoins</span>
            </div>
          )}
        </div>

        {mobileOpen && (
          <div role="button" tabIndex={0} onClick={() => setMobileOpen(false)} onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.55)' }} />
        )}
        <aside className="clisha-x-sidebar-mobile" style={{ position: 'fixed', top: 48, left: 0, bottom: 0, zIndex: 1001, width: 280, maxWidth: '85vw', background: c.bg2, borderRight: `1px solid ${c.border}`, overflowY: 'auto', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.25s' }}>
          <SidebarContent c={c} dark={dark} onCopyReferral={copyReferral} onToggleTheme={toggleTheme} onLogout={logout} onNavClick={() => setMobileOpen(false)} userName={user?.user?.username} rankName={user?.rank?.rankName} balance={balance} rankId={user?.rank?.rankId} />
        </aside>

        <main className="clisha-x-main" style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
          <Outlet />
        </main>
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
