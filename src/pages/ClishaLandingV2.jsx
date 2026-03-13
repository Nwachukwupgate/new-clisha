import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { getRank } from '../store/Rank';
import Loading from '../components/Alerts/Loading';
import ProfilePicture from '../utils/ProfilePicture';

/* ═══════════════════════════════════════════════════════════════════
   CLISHA — Business Landing Page Redesign
   Stack:  React · react-router-dom · react-i18next (same as source)
   Fonts:  Fraunces (display authority) · Plus Jakarta Sans (body)
   Palette:
     Brand orange  #FC9828
     White         #ffffff
   ═══════════════════════════════════════════════════════════════════ */

// ── Theme token map ───────────────────────────────────────────────────────────
const BRAND = '#FC9828';
const BRAND_DARK = '#e08600';
const BRAND_RGB = '252,152,40';

const T = {
  dark: {
    bg: '#0a0a0a',
    surface: '#141414',
    surfaceAlt: '#1a1a1a',
    surfaceHover: '#1f1f1f',
    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.15)',
    text: '#ffffff',
    textSub: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.4)',
    purple: BRAND,
    purpleDark: BRAND_DARK,
    purpleBg: `rgba(${BRAND_RGB},0.15)`,
    purpleBorder: `rgba(${BRAND_RGB},0.4)`,
    gold: '#ffffff',
    goldBg: 'rgba(255,255,255,0.1)',
    goldBorder: 'rgba(255,255,255,0.25)',
    green: '#34d399',
    greenBg: 'rgba(52,211,153,0.1)',
    navBg: 'rgba(10,10,10,0.9)',
    heroGrad: `linear-gradient(135deg,#1a1005 0%,#2d1a08 40%,#FC9828 100%)`,
    cardShadow: '0 4px 24px rgba(0,0,0,0.4)',
    btnShadow: `0 4px 20px rgba(${BRAND_RGB},0.45)`,
  },
  light: {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#faf8f5',
    surfaceHover: '#fff8f0',
    border: `rgba(${BRAND_RGB},0.15)`,
    borderStrong: `rgba(${BRAND_RGB},0.3)`,
    text: '#0d0d0d',
    textSub: 'rgba(0,0,0,0.78)',
    textMuted: 'rgba(0,0,0,0.62)',
    purple: BRAND,
    purpleDark: BRAND_DARK,
    purpleBg: `rgba(${BRAND_RGB},0.12)`,
    purpleBorder: `rgba(${BRAND_RGB},0.35)`,
    gold: BRAND_DARK,
    goldBg: `rgba(${BRAND_RGB},0.1)`,
    goldBorder: `rgba(${BRAND_RGB},0.3)`,
    green: '#059669',
    greenBg: 'rgba(5,150,105,0.08)',
    navBg: 'rgba(255,255,255,0.95)',
    heroGrad: `linear-gradient(135deg,#fff8f0 0%,#ffe8d0 50%,#FC9828 100%)`,
    cardShadow: `0 4px 20px rgba(${BRAND_RGB},0.12)`,
    btnShadow: `0 4px 18px rgba(${BRAND_RGB},0.35)`,
  },
};

// ── Leaderboard avatar colors ─────────────────────────────────────────────────
const LEADERBOARD_COLORS = ['#FC9828', '#38bdf8', '#4ade80', '#a855f7', '#ff7b2f', '#f472b6', '#22d3ee', '#a3e635', '#f59e0b', '#6366f1'];

// ── Helpers ───────────────────────────────────────────────────────────────────
const px = (obj) => Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';');

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return () => { };
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [target, active, duration]);
  return val;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ThemeToggle({ dark, onToggle }) {
  const th = dark ? T.dark : T.light;
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        width: 48, height: 26, borderRadius: 13,
        background: dark ? '#1a1005' : '#fff8f0',
        border: `1px solid ${th.border}`,
        cursor: 'pointer', position: 'relative',
        transition: 'background 0.3s', flexShrink: 0, padding: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3,
        left: dark ? 24 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: BRAND,
        transition: 'left 0.28s cubic-bezier(.4,0,.2,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}>
        {dark ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

function Chip({ children, th, variant = 'purple' }) {
  const colors = {
    purple: { bg: th.purpleBg, border: th.purpleBorder, color: th.purple },
    gold: { bg: th.goldBg, border: th.goldBorder, color: th.gold },
    green: { bg: th.greenBg, border: 'transparent', color: th.green },
  };
  const c = colors[variant] || colors.purple;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.color, borderRadius: 20,
      padding: '4px 12px', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.3px',
    }}>{children}</span>
  );
}

// Animated stat for hero section
function HeroStat({ label, value, suffix = '', dark }) {
  const count = useCountUp(value, true, 1600);
  return (
    <div style={{
      textAlign: 'center',
      padding: '14px 24px',
      background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
      borderRadius: 12,
      border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        fontSize: 26, fontWeight: 800,
        fontFamily: "'Fraunces', serif",
        color: dark ? '#fff' : '#0d0d0d', letterSpacing: '-0.5px',
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.7)', fontWeight: 600, marginTop: 2, letterSpacing: '0.4px' }}>
        {label}
      </div>
    </div>
  );
}

// Feature circle card (How It Works)
function FeatureCircle({ icon, title, desc, th, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 16, padding: '28px 20px',
        background: hov ? th.surfaceHover : th.surface,
        border: `1px solid ${hov ? th.purpleBorder : th.border}`,
        borderRadius: 20, textAlign: 'center',
        transition: 'all 0.25s',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? th.btnShadow : th.cardShadow,
        cursor: 'default',
      }}
    >
      <div style={{
        width: 70, height: 70, borderRadius: '50%',
        background: th.purpleBg,
        border: `2px dashed ${th.purpleBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30,
        boxShadow: hov ? `0 0 20px ${th.purple}30` : 'none',
        transition: 'box-shadow 0.25s',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 12, color: th.textSub, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

// Step card (1-2-3)
function StepCard({ num, title, desc, th, highlight }) {
  return (
    <div style={{
      padding: '28px 26px',
      background: highlight
        ? `linear-gradient(135deg,${th.purpleDark},${th.purple})`
        : th.surface,
      border: `1px solid ${highlight ? 'transparent' : th.border}`,
      borderRadius: 16,
      boxShadow: highlight ? th.btnShadow : th.cardShadow,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 64, fontWeight: 900,
        fontFamily: "'Fraunces', serif",
        color: highlight ? 'rgba(255,255,255,0.15)' : th.purpleBg,
        position: 'absolute', top: -10, left: 12,
        lineHeight: 1, userSelect: 'none',
      }}>{num}</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 700,
          color: highlight ? 'rgba(255,255,255,0.7)' : th.purple,
          letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10,
        }}>Step {num}</div>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700,
          color: highlight ? '#fff' : th.text, marginBottom: 12, lineHeight: 1.2,
        }}>{title}</h3>
        <p style={{
          fontSize: 13, color: highlight ? 'rgba(255,255,255,0.75)' : th.textSub,
          lineHeight: 1.7,
        }}>{desc}</p>
      </div>
    </div>
  );
}

// "We Love Our Users" feature card
function FeatureCard({ icon, title, desc, th }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '28px 22px', borderRadius: 16, textAlign: 'center',
        background: hov ? th.surfaceHover : th.surface,
        border: `1px solid ${hov ? th.purpleBorder : th.border}`,
        boxShadow: hov ? th.btnShadow : th.cardShadow,
        transition: 'all 0.22s',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: th.purpleBg, border: `1px solid ${th.purpleBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, margin: '0 auto 16px',
      }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 700,
        color: th.text, marginBottom: 10,
      }}>{title}</h3>
      <p style={{ fontSize: 13, color: th.textSub, lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

// Task card mockup (Daily Task section)
function TaskCardMockup({ th, company, code, reward, color }) {
  return (
    <div style={{
      background: color,
      borderRadius: 14, padding: '18px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      width: 260, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px' }}>📋 Task</div>
        <span style={{ background: '#22c55e', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>Visit Website</span>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, marginBottom: 14 }}>
        Visit <strong style={{ color: '#fff' }}>{company}</strong> and click on a property of your choice and enter your code.
      </p>
      {[
        { label: 'ID Code', value: code, icon: '🔑' },
        { label: 'Code Entry', value: '9:13 ⏱', icon: '⌨️' },
        { label: 'Task Bonus', value: '500 ₡', icon: '🎁' },
        { label: 'Search Bonus', value: '2,000 ₡', icon: '🔍' },
      ].map(r => (
        <div key={r.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontSize: 12,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.65)' }}>{r.icon} {r.label}</span>
          <span style={{ fontWeight: 700, color: '#fff' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

// Leaderboard user card
function RankCard({ rank, name, points, avatar, photo, gender, color, th }) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const rankColors = {
    1: { bg: 'rgba(245,200,66,0.15)', border: 'rgba(245,200,66,0.35)' },
    2: { bg: 'rgba(192,192,192,0.15)', border: 'rgba(192,192,192,0.35)' },
    3: { bg: 'rgba(205,127,50,0.15)', border: 'rgba(205,127,50,0.35)' },
  };
  const rc = rankColors[rank] || { bg: th.surface, border: th.border };
  const avatarBg = color ? `${color}22` : `hsl(${rank * 53}, 60%, 55%)`;
  const avatarBorder = color ? `${color}44` : th.purpleBorder;
  return (
    <div style={{
      background: rc.bg || th.surface,
      border: `1px solid ${rc.border || th.border}`,
      borderRadius: 16, padding: '20px 16px',
      textAlign: 'center', minWidth: 180, flexShrink: 0,
      boxShadow: th.cardShadow,
      position: 'relative',
    }}>
      {/* Rank badge */}
      <div style={{
        position: 'absolute', top: -1, right: -1,
        background: th.purple, color: '#fff',
        fontSize: 10, fontWeight: 800,
        padding: '4px 8px', borderRadius: '0 14px 0 10px',
        letterSpacing: '0.3px',
      }}>#{rank}</div>

      {/* Medal */}
      {medals[rank] && (
        <div style={{ fontSize: 20, marginBottom: 4 }}>{medals[rank]}</div>
      )}

      {/* Avatar */}
      <div style={{
        width: 60, height: 60, borderRadius: '50%',
        background: avatarBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, margin: '0 auto 12px',
        border: `3px solid ${avatarBorder}`,
        fontWeight: 800, color: '#fff',
        overflow: 'hidden',
      }}>
        {(photo || gender) ? (
          <img src={ProfilePicture({ gender, photo })} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          avatar
        )}
      </div>

      <div style={{ fontSize: 11, color: th.textSub, marginBottom: 4, letterSpacing: '0.3px' }}>Total Points</div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: th.purple,
        fontFamily: "'Fraunces', serif", marginBottom: 8,
      }}>{points.toLocaleString()}</div>
      <div style={{
        fontSize: 12, fontWeight: 600, color: th.text,
        marginBottom: 14, minHeight: 32,
        lineHeight: 1.4,
      }}>{name}</div>

      <button style={{
        width: '100%', background: th.purpleBg,
        border: `1px solid ${th.purpleBorder}`,
        color: th.purple, borderRadius: 8,
        padding: '8px', fontSize: 11, fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.18s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = th.purple; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = th.purpleBg; e.currentTarget.style.color = th.purple; }}
      >
        View Profile
      </button>
    </div>
  );
}

function ClishaLandingV2() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rank = useSelector((state) => state.rank?.data) ?? { ranking: [] };
  const rankLoading = useSelector((state) => state.rank?.loading);
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rankRef = useRef(null);

  const th = dark ? T.dark : T.light;

  useEffect(() => {
    dispatch(getRank(1));
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['How It Works', 'Features', 'Daily Tasks', 'Leaderboard'];

  const features = [
    { icon: '🤝', title: 'Best Affiliate Companies', desc: 'Partner with leading brands and complete their digital marketing tasks to earn coins.' },
    { icon: '🏆', title: 'Unlimited Tasks & Earn Bonus', desc: 'No cap on tasks. Complete more, earn more coins, and unlock escalating bonus rewards.' },
    { icon: '📝', title: 'Easy Registration', desc: 'Sign up in minutes. Build your profile to receive tasks tailored to your interests.' },
    { icon: '💰', title: 'Earn Coins Every Day', desc: 'Daily tasks keep the coins flowing. Log in consistently for streak and loyalty bonuses.' },
  ];

  const steps = [
    { title: 'Create Your Account', desc: 'Clisha offers easy registration and lets you expand your profile. This helps you earn more coins and make the most of the platform.' },
    { title: 'Receive Daily Tasks', desc: 'Complete daily tasks from various companies on Clisha to earn coins and bonuses. New tasks refresh every day.' },
    { title: 'Earn & Accumulate Coins', desc: 'Your coins accumulate in your wallet as you complete tasks. Rise through the ranks and unlock exclusive platform rewards.' },
  ];

  const weLoveCards = [
    { icon: '📝', title: 'Sign Up', desc: 'Sign up now for free and start immediately supporting companies in their digital marketing efforts.' },
    { icon: '👤', title: 'Accounts', desc: 'Expand your account and fill out your profile with interests to receive better tailored daily tasks.' },
    { icon: '🛠️', title: 'Tools', desc: 'Use the various tools we provide to successfully complete your daily tasks in digital marketing.' },
    { icon: '🎁', title: 'Get Rewards', desc: 'Increase your ranking by completing tasks and rising to the top of the leaderboard for exclusive bonuses.' },
  ];

  const topUsers = (rank?.ranking ?? []).slice(0, 10).map((item, i) => {
    const displayName = item?.user?.firstname ?? item?.user?.username ?? 'User';
    const lastName = item?.user?.lastname ?? '';
    const fullName = lastName ? `${displayName} ${lastName}`.trim() : displayName;
    const avatarLetter = fullName.charAt(0).toUpperCase();
    return {
      id: item?.user?.id ?? i,
      rank: i + 1,
      name: fullName,
      points: item?.total_points != null ? Number(item.total_points) : 0,
      avatar: avatarLetter,
      color: LEADERBOARD_COLORS[i % LEADERBOARD_COLORS.length],
      photo: item?.user?.photo,
      gender: item?.user?.gender,
    };
  });

  const scroll = (dir) => {
    if (rankRef.current) {
      rankRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${th.bg}; font-family: 'Plus Jakarta Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-thumb { background: ${th.purpleBg}; border-radius: 4px; }
  
    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes shimmer  { 0%{opacity:0.4} 50%{opacity:0.8} 100%{opacity:0.4} }
  
    .hero-content { animation: fadeUp 0.7s ease both; }
    .hero-stats   { animation: fadeUp 0.7s ease 0.3s both; }
    .float-el     { animation: float 4s ease-in-out infinite; }
  
    .section-fade-in { animation: fadeIn 0.6s ease both; }
  
    .clisha-nav-link {
      background: none; border: none;
      font-size: 13px; font-weight: 600;
      padding: 6px 14px; border-radius: 8px; cursor: pointer;
      transition: all 0.18s; font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .clisha-nav-link:hover { color: ${th.purple} !important; background: ${th.purpleBg}; }
  
    .btn-primary {
      background: linear-gradient(135deg, ${th.purpleDark}, ${th.purple});
      color: #fff; border: none; border-radius: 10px;
      padding: 13px 28px; font-size: 14px; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
      box-shadow: ${th.btnShadow};
      letter-spacing: 0.2px;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  
    .btn-outline {
      background: transparent; border: 1.5px solid ${th.borderStrong};
      color: ${th.text}; border-radius: 10px;
      padding: 12px 24px; font-size: 14px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .btn-outline:hover {
      border-color: ${th.purple}; color: ${th.purple};
      background: ${th.purpleBg};
    }
  
    .rank-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scroll-snap-type: x mandatory; }
    .rank-scroll::-webkit-scrollbar { display: none; }
  
    @media (max-width: 900px) {
      .two-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 600px) {
      .four-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .hero-stats-row { flex-direction: column !important; gap: 12px !important; }
      .desktop-nav { display: none !important; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: th.bg, color: th.text, minHeight: '100vh', transition: 'background 0.35s, color 0.35s' }}>

        {/* ═══ NAVBAR ══════════════════════════════════════════════════════════ */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 200,
          background: scrolled ? th.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${th.border}` : '1px solid transparent',
          transition: 'all 0.3s',
          padding: '0 clamp(16px, 4vw, 60px)',
          height: 66,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img
              src={dark ? '/logo2.png' : '/images/logo4.png'}
              alt="Clisha"
              style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(n => (
              <button key={n} className="clisha-nav-link"
                style={{ color: dark ? '#ffffff' : '#000000' }}
                onClick={() => {
                  const el = document.getElementById(n.toLowerCase().replace(/ /g, '-'));
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >{n}</button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
            <Link to="/login"
              style={{
                textDecoration: 'none',
                color: dark ? '#ffffff' : '#000000',
                fontSize: 13, fontWeight: 600, padding: '8px 16px',
                borderRadius: 9, border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : th.border}`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = th.purple; e.currentTarget.style.color = th.purple; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.3)' : th.border; e.currentTarget.style.color = dark ? '#ffffff' : '#000000'; }}
            >Log In</Link>
            <Link to="/signup"
              style={{
                textDecoration: 'none',
                background: `linear-gradient(135deg,${th.purpleDark},${th.purple})`,
                color: '#fff', fontSize: 13, fontWeight: 700,
                padding: '8px 18px', borderRadius: 9,
                boxShadow: th.btnShadow, transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >Sign Up Free</Link>
          </div>
        </nav>

        {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
        <section style={{
          background: th.heroGrad,
          minHeight: '92vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(60px,8vh,120px) clamp(20px,5vw,80px) 80px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative orbs */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.04),transparent 65%)' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.2),transparent 65%)' }} />
            {/* Grid overlay */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
              <defs><pattern id="hgrid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0L0 0 0 50" fill="none" stroke="white" strokeWidth="0.6" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#hgrid)" />
            </svg>
          </div>

          <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
            <Chip th={dark ? T.dark : T.light} variant="purple">
              🌐 The Future of Digital Advertising
            </Chip>

            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(38px, 6.5vw, 76px)',
              fontWeight: 900, color: dark ? '#fff' : '#0d0d0d',
              lineHeight: 1.06, letterSpacing: '-2px',
              margin: '22px 0 20px',
            }}>
              Click. Like. Share.<br />
              <em style={{ fontStyle: 'italic', color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)' }}>Grow Every Day.</em>
            </h1>

            <p style={{
              fontSize: 'clamp(15px,1.8vw,18px)', color: dark ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.78)',
              lineHeight: 1.7, maxWidth: 580, margin: '0 auto 36px',
              fontWeight: 400,
            }}>
              Clisha connects everyday users with top companies. Complete daily digital marketing tasks, earn coins, build your rank — and power real businesses forward.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
              <Link to="/signup">
                <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
                  Get Started Free →
                </button>
              </Link>
              <button className="btn-outline" style={{
                borderColor: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', color: dark ? '#fff' : '#0d0d0d',
                fontSize: 15, padding: '14px 28px',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = dark ? '#fff' : '#0d0d0d'; e.currentTarget.style.color = dark ? '#fff' : '#0d0d0d'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'; e.currentTarget.style.color = dark ? '#fff' : '#0d0d0d'; }}
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="hero-stats hero-stats-row" style={{
            display: 'flex', gap: 16, justifyContent: 'center',
            flexWrap: 'wrap', position: 'relative', zIndex: 1,
          }}>
            <HeroStat label="Active Users" value={48200} suffix="+" dark={dark} />
            <HeroStat label="Tasks Completed" value={1240000} suffix="+" dark={dark} />
            <HeroStat label="Partner Companies" value={320} suffix="+" dark={dark} />
            <HeroStat label="Coins Distributed" value={9800000} suffix="+" dark={dark} />
          </div>

          {/* Wave divider */}
          <svg style={{ position: 'absolute', bottom: -1, left: 0, width: '100%' }} viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d={`M0,40 C360,80 1080,0 1440,40 L1440,70 L0,70 Z`} fill={th.bg} />
          </svg>
        </section>

        {/* ═══ HOW IT WORKS ════════════════════════════════════════════════════ */}
        <section id="how-it-works" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Chip th={th} variant="purple">⚙️ Platform Overview</Chip>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: th.text, margin: '16px 0 14px', letterSpacing: '-0.8px', lineHeight: 1.15 }}>
              How Users Work on Our Platform
            </h2>
            <p style={{ fontSize: 15, color: th.textSub, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
              Earn coins by completing digital marketing tasks — clicking, liking, sharing, and reviewing. Support real businesses while building your own rank and rewards.
            </p>
          </div>
          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {features.map((f, i) => (
              <FeatureCircle key={i} {...f} th={th} />
            ))}
          </div>
        </section>

        {/* ═══ STEPS 1-2-3 ═════════════════════════════════════════════════════ */}
        <section style={{
          background: dark ? th.surfaceAlt : th.surfaceAlt,
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
          borderTop: `1px solid ${th.border}`,
          borderBottom: `1px solid ${th.border}`,
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <Chip th={th} variant="gold">🚀 Getting Started</Chip>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: th.text, margin: '16px 0 12px', letterSpacing: '-0.7px' }}>
                Three Steps to Start Earning
              </h2>
              <p style={{ fontSize: 15, color: th.textSub, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                It's simple. Build your profile, complete tasks, and accumulate coins — every single day.
              </p>
            </div>
            <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {steps.map((s, i) => (
                <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} th={th} highlight={i === 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WE LOVE OUR USERS ═══════════════════════════════════════════════ */}
        <section id="features" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Chip th={th} variant="purple">❤️ Our Community</Chip>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: th.text, margin: '16px 0 12px', letterSpacing: '-0.7px' }}>
              We Love Our Users
            </h2>
            <p style={{ fontSize: 15, color: th.textSub, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Clisha believes in empowering users by helping them earn coins while supporting businesses in their digital marketing goals.
            </p>
          </div>
          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {weLoveCards.map((c, i) => <FeatureCard key={i} {...c} th={th} />)}
          </div>
        </section>

        {/* ═══ NEW ONLINE DAILY TASK ═══════════════════════════════════════════ */}
        <section id="daily-tasks" style={{
          background: dark ? th.surfaceAlt : '#fff8f0',
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
          borderTop: `1px solid ${th.border}`,
          borderBottom: `1px solid ${th.border}`,
        }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', maxWidth: 1280, margin: '0 auto' }}>

            {/* Left: copy */}
            <div>
              <Chip th={th} variant="purple">📋 Daily Task Feed</Chip>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(28px,4.5vw,52px)',
                fontWeight: 900, color: th.text,
                margin: '18px 0 20px',
                lineHeight: 1.08, letterSpacing: '-1px',
              }}>
                New Online<br />Daily Tasks
              </h2>
              <p style={{ fontSize: 15, color: th.textSub, lineHeight: 1.75, marginBottom: 16 }}>
                Become part of the Clisha community and benefit from fresh daily tasks from verified partner companies. Every task you complete increases your company's visibility and earns you coins.
              </p>
              <p style={{ fontSize: 15, color: th.textSub, lineHeight: 1.75, marginBottom: 32 }}>
                Take the opportunity to place yourself at the forefront of modern marketing — and accumulate coins in your wallet every single day.
              </p>

              {/* Mini stat strip */}
              <div style={{ display: 'flex', gap: 24, marginBottom: 36 }}>
                {[
                  { label: 'New tasks daily', val: '50+' },
                  { label: 'Avg. coins per task', val: '150₡' },
                  { label: 'Completion rate', val: '94%' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800, color: th.purple }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: th.textSub, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
                  Sign Up Today →
                </button>
              </Link>
            </div>

            {/* Right: task card mockups */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
              <div className="float-el" style={{ position: 'relative', zIndex: 2 }}>
                <TaskCardMockup
                  th={th}
                  company="Online Angels"
                  code="JS1TH001"
                  reward={2500}
                  color="linear-gradient(135deg,#e08600,#FC9828)"
                />
              </div>
              <div style={{
                position: 'absolute', right: 0, top: '50%', transform: 'translateY(-20%)',
                zIndex: 3, filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.3))',
              }}>
                <TaskCardMockup
                  th={th}
                  company="Search Global"
                  code="SG2AB007"
                  reward={3000}
                  color="linear-gradient(135deg,#e08600,#FC9828)"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ LEADERBOARD ═════════════════════════════════════════════════════ */}
        <section id="leaderboard" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <Chip th={th} variant="gold">🏆 Rankings</Chip>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: th.text, margin: '14px 0 10px', letterSpacing: '-0.7px' }}>
                Top 10 Users by Rank
              </h2>
              <p style={{ fontSize: 14, color: th.textSub }}>Updated in real time · based on total coins accumulated</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => scroll(-1)} style={{
                width: 40, height: 40, borderRadius: 10,
                background: th.surface, border: `1px solid ${th.border}`,
                cursor: 'pointer', fontSize: 16, color: th.textSub,
                transition: 'all 0.18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = th.purple; e.currentTarget.style.color = th.purple; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSub; }}
              >‹</button>
              <button onClick={() => scroll(1)} style={{
                width: 40, height: 40, borderRadius: 10,
                background: th.purple, border: 'none',
                cursor: 'pointer', fontSize: 16, color: '#fff',
                boxShadow: th.btnShadow,
              }}>›</button>
            </div>
          </div>

          {rankLoading ? (
            <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loading />
            </div>
          ) : topUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: th.textSub, fontSize: 15 }}>
              No leaderboard data yet. Be the first to earn and claim the top spot!
            </div>
          ) : (
            <div ref={rankRef} className="rank-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollSnapType: 'x mandatory' }}>
              {topUsers.map((u, i) => (
                <div key={u?.id ?? i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <RankCard
                    rank={u.rank}
                    name={u.name}
                    points={u.points}
                    avatar={u.avatar}
                    photo={u.photo}
                    gender={u.gender}
                    color={u.color}
                    th={th}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA strip below leaderboard */}
          <div style={{
            marginTop: 40, padding: '28px 32px',
            background: `linear-gradient(135deg,${th.purpleDark},${th.purple})`,
            borderRadius: 16, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 20,
            boxShadow: th.btnShadow,
          }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                Ready to Climb the Ranks?
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                Join thousands of users completing daily tasks and earning coins right now.
              </p>
            </div>
            <Link to="/signup">
              <button style={{
                background: '#fff',
                color: th.purpleDark,
                border: 'none', borderRadius: 10,
                padding: '12px 28px', fontSize: 14, fontWeight: 800,
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Become a Member →
              </button>
            </Link>
          </div>
        </section>

        {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
        <footer style={{
          background: 'linear-gradient(135deg, #fff8f0 0%, #ffe8d0 40%, #FC9828 100%)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          padding: 'clamp(40px,6vw,70px) clamp(20px,5vw,60px) 24px',
          color: '#0d0d0d',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="four-col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 48 }}>

              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <img
                    src={dark ? '/logo2.png' : '/images/logo4.png'}
                    alt="Clisha"
                    style={{ height: 34, width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>
                  Turn everyday users into your biggest brand promoters. Clisha delivers high-impact advertising through real interactions, not bots.
                </p>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
                    Get in Touch — Coming Soon
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { key: 'facebook', Icon: FaFacebookF },
                      { key: 'twitter', Icon: FaXTwitter },
                      { key: 'instagram', Icon: FaInstagram },
                      { key: 'youtube', Icon: FaYoutube },
                    ].map(({ key, Icon }) => (
                      <div key={key} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: 'rgba(0,0,0,0.75)', transition: 'all 0.18s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `rgba(${BRAND_RGB},0.3)`; e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.color = '#0d0d0d'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)'; }}
                      >
                        <Icon size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 16 }}>Platform</div>
                {['How It Works', 'Daily Tasks', 'Leaderboard', 'Referral Programme', 'Sign Up', 'Log In'].map(l => (
                  <div key={l} style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.target.style.color = BRAND; }}
                    onMouseLeave={e => { e.target.style.color = 'rgba(0,0,0,0.7)'; }}
                  >{l}</div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.65)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 16 }}>Contact Info</div>
                {[
                  { icon: '✉️', label: 'Email', val: process.env.REACT_APP_EMAIL || 'support@clisha.me' },
                  { icon: '📞', label: 'Phone', val: process.env.REACT_APP_PHONE_NUMBER || '+1 (000) 000-0000' },
                  { icon: '📍', label: 'Address', val: 'VQualis Limited, Grand Industrial Building, Office 7/F, 159-165 Wo Yi Hop Road Kwai Chung, Hongkong.' },
                ].map(c => (
                  <div key={c.label} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.55)', fontWeight: 600, marginBottom: 3 }}>{c.icon} {c.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.85)', lineHeight: 1.55 }}>{c.val}</div>
                  </div>
                ))}
              </div>

              {/* Payment */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 16 }}>
                  🔒 Secure Payment
                </div>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.7)', lineHeight: 1.65, marginBottom: 18 }}>
                  Pay easily using Visa, PayPal, Mastercard, or CoinPayments for cryptocurrency transactions. Enjoy modern, secure transfers with maximum reliability.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {['PayPal', 'Visa', 'MC', 'Amex'].map(p => (
                    <div key={p} style={{ background: '#fff', borderRadius: 7, padding: '6px 12px', fontSize: 11, fontWeight: 800, color: '#1a1a1a', letterSpacing: '0.2px' }}>{p}</div>
                  ))}
                </div>
                <a href="https://clisha.me/signup" style={{ textDecoration: 'none', display: 'block' }}>
                  <button style={{
                    width: '100%', background: `linear-gradient(135deg,${BRAND_DARK},${BRAND})`,
                    color: '#fff', border: 'none', borderRadius: 10,
                    padding: '12px', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', boxShadow: `0 4px 16px rgba(${BRAND_RGB},0.4)`,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    Become a Member →
                  </button>
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.1)',
              paddingTop: 20, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 10,
            }}>
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>
                © {new Date().getFullYear()} Clisha · VQualis Limited · All rights reserved
              </span>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Privacy Policy', 'Terms of Service', 'Support Centre'].map(l => (
                  <span key={l} style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.target.style.color = BRAND; }}
                    onMouseLeave={e => { e.target.style.color = 'rgba(0,0,0,0.6)'; }}
                  >{l}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ClishaLandingV2;
