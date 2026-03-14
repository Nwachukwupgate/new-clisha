import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRank } from '../../store/Rank';
import Loading from '../../components/Alerts/Loading';
import ProfilePicture from '../../utils/ProfilePicture';

/* ─────────────────────────────────────────────────────────────────────────────
   CLISHA EXPERIENCE — Full landing (copy of ClishaLanding with /clisha-x routes)
   Sections: Navbar · Hero · Stats · HowItWorks · Steps · Features ·
             DailyTask · TopUsers · Testimonials · CTA · Footer
───────────────────────────────────────────────────────────────────────────── */

const BASE = '/clisha-x';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #05080f; overflow-x: hidden; }

  .clisha-x-landing {
    --gold:    #f5c842;
    --gold2:   #e8a800;
    --dark:    #05080f;
    --dark2:   #0c1220;
    --dark3:   #111827;
    --text:    #e8eaf0;
    --muted:   rgba(232,234,240,0.45);
    --border:  rgba(255,255,255,0.07);
    --radius:  18px;
  }
  .clisha-x-landing[data-theme="light"] {
    --gold:    #d4a012;
    --gold2:   #b8860b;
    --dark:    #f8fafc;
    --dark2:   #f1f5f9;
    --dark3:   #e2e8f0;
    --text:    #0f172a;
    --muted:   rgba(15,23,42,0.6);
    --border:  rgba(0,0,0,0.08);
  }
  .clisha-x-landing[data-theme="light"] .section-label {
    background: rgba(212,160,18,0.12);
    border-color: rgba(212,160,18,0.3);
  }
  .clisha-x-landing[data-theme="light"] .glass-card {
    background: rgba(255,255,255,0.8);
    border-color: rgba(0,0,0,0.06);
  }
  .clisha-x-landing[data-theme="light"] .glass-card:hover {
    background: rgba(255,255,255,0.95);
    border-color: rgba(212,160,18,0.25);
  }
  .clisha-x-landing[data-theme="light"] .btn-ghost:hover {
    border-color: rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.04);
  }
  .clisha-x-landing[data-theme="light"] nav.main-nav.scrolled {
    background: rgba(248,250,252,0.96);
    border-color: rgba(0,0,0,0.08);
  }
  .clisha-x-landing[data-theme="light"] .social-icon {
    background: rgba(0,0,0,0.04);
    border-color: rgba(0,0,0,0.08);
  }
  .clisha-x-landing[data-theme="light"] .social-icon:hover {
    background: rgba(212,160,18,0.12);
    border-color: rgba(212,160,18,0.3);
  }
  .clisha-x-landing[data-theme="light"] .lang-select {
    background: rgba(0,0,0,0.04);
    border-color: rgba(0,0,0,0.08);
  }
  .clisha-x-landing[data-theme="light"] .lang-select option { background: #f8fafc; }
  .clisha-x-landing[data-theme="light"] .pay-badge {
    background: rgba(0,0,0,0.04);
    border-color: rgba(0,0,0,0.08);
  }
  .clisha-x-landing[data-theme="light"] .task-card-mock { background: #fff; border-color: rgba(0,0,0,0.08); }
  .clisha-x-landing[data-theme="light"] .task-row { background: rgba(0,0,0,0.02); border-color: rgba(0,0,0,0.06); }
  .clisha-x-landing[data-theme="light"] .task-row:hover { background: rgba(0,0,0,0.04); }
  .clisha-x-landing[data-theme="light"] .ticker-wrap { background: rgba(0,0,0,0.02); }
  .clisha-x-landing[data-theme="light"] .hiw-step-num { color: rgba(212,160,18,0.12); }
  .clisha-x-landing[data-theme="light"] ::-webkit-scrollbar-thumb { background: rgba(212,160,18,0.35); }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.3); border-radius: 3px; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
  @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes gradMove { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  .fade-up   { animation: fadeUp  0.7s ease forwards; }
  .float-el  { animation: floatY  4s ease-in-out infinite; }
  .spin-slow { animation: spinSlow 20s linear infinite; }

  .reveal { opacity:0; transform:translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.22s; }
  .reveal-delay-3 { transition-delay: 0.34s; }
  .reveal-delay-4 { transition-delay: 0.46s; }

  .section-label {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(245,200,66,0.1); border:1px solid rgba(245,200,66,0.22);
    border-radius:30px; padding:5px 14px; margin-bottom:18px;
    font-size:11px; font-weight:700; color:var(--gold); letter-spacing:1.5px; text-transform:uppercase;
  }
  .section-title {
    font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,64px);
    color:var(--text); line-height:1.0; letter-spacing:1px; margin-bottom:14px;
  }
  .section-sub {
    font-size:clamp(14px,1.8vw,17px); color:var(--muted); line-height:1.7; max-width:560px;
  }
  .btn-primary-cta {
    display:inline-flex; align-items:center; gap:9px;
    background:linear-gradient(135deg,#f5c842,#e8a800);
    color:#0c0800; border:none; border-radius:12px;
    padding:14px 30px; font-size:15px; font-weight:800;
    cursor:pointer; letter-spacing:0.3px; transition:all 0.2s;
    box-shadow: 0 4px 24px rgba(245,200,66,0.35);
    font-family:'Outfit',sans-serif;
  }
  .btn-primary-cta:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(245,200,66,0.45); }
  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:var(--text);
    border:1px solid var(--border); border-radius:12px;
    padding:14px 26px; font-size:15px; font-weight:600;
    cursor:pointer; transition:all 0.2s; font-family:'Outfit',sans-serif;
  }
  .btn-ghost:hover { border-color:rgba(255,255,255,0.25); background:rgba(255,255,255,0.05); }

  .glass-card {
    background:rgba(255,255,255,0.03); border:1px solid var(--border);
    border-radius:var(--radius); transition: all 0.25s;
  }
  .glass-card:hover {
    background:rgba(255,255,255,0.06); border-color:rgba(245,200,66,0.22);
    transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.3);
  }

  .ticker-wrap { overflow:hidden; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:rgba(255,255,255,0.02); padding:12px 0; }
  .ticker-inner { display:flex; gap:0; white-space:nowrap; animation: ticker 28s linear infinite; }
  .ticker-item { display:inline-flex; align-items:center; gap:10px; padding:0 32px; font-size:13px; font-weight:600; color:var(--muted); }
  .ticker-dot { width:5px; height:5px; border-radius:50%; background:var(--gold); opacity:0.7; }

  nav.main-nav {
    position:fixed; top:0; left:0; right:0; z-index:1000;
    padding:0 clamp(16px,5vw,60px); height:68px;
    display:flex; align-items:center; justify-content:space-between;
    transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s;
  }
  nav.main-nav.scrolled {
    background:rgba(5,8,15,0.92); backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border);
  }
  .nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; }
  .nav-logo-img { height:36px; width:auto; object-fit:contain; display:block; }
  .nav-links { display:flex; align-items:center; gap:28px; }
  .nav-links a { font-size:14px; font-weight:500; color:var(--muted); text-decoration:none; transition:color 0.2s; }
  .nav-links a:hover { color:var(--text); }
  .nav-cta { display:flex; gap:10px; align-items:center; }
  .theme-toggle {
    width:40px; height:40px; border-radius:10px;
    border:1px solid var(--border); background:transparent;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:18px; transition:all 0.2s;
  }
  .theme-toggle:hover { border-color:rgba(245,200,66,0.4); background:rgba(245,200,66,0.08); }

  .hero {
    min-height:100vh; position:relative; display:flex; flex-direction:column;
    align-items:center; justify-content:center; text-align:center;
    padding:100px clamp(16px,5vw,60px) 60px;
    overflow:hidden;
  }
  .hero-bg-ring {
    position:absolute; border-radius:50%; border:1px solid rgba(245,200,66,0.08);
    pointer-events:none;
  }
  .hero-title {
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(52px,9vw,120px);
    line-height:0.92; letter-spacing:2px; color:var(--text);
    margin-bottom:6px; position:relative; z-index:1;
  }
  .hero-title span.gold {
    background:linear-gradient(135deg,#f5c842 0%,#ff9d00 50%,#f5c842 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation: shimmer 4s linear infinite;
  }
  .hero-sub { font-size:clamp(15px,2vw,19px); color:var(--muted); max-width:560px; line-height:1.7; margin:18px auto 36px; position:relative; z-index:1; }
  .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
  .hero-social-proof { margin-top:48px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; justify-content:center; position:relative; z-index:1; }
  .hero-avatars { display:flex; }
  .hero-avatar { width:34px; height:34px; border-radius:50%; border:2px solid var(--dark); margin-left:-10px; font-size:12px; font-weight:800; display:flex; align-items:center; justify-content:center; color:#fff; }
  .hero-proof-text { font-size:13px; color:var(--muted); }
  .hero-proof-text strong { color:var(--gold); }

  .floating-coin {
    position:absolute; pointer-events:none;
    font-size:28px; opacity:0.15;
    animation: floatY var(--dur,4s) ease-in-out infinite;
    animation-delay:var(--delay,0s);
  }

  .stats-strip { background:var(--dark2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:32px clamp(16px,5vw,60px); }
  .stats-grid { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .stat-item { text-align:center; padding:0 20px; position:relative; }
  .stat-item:not(:last-child)::after { content:''; position:absolute; right:0; top:20%; height:60%; width:1px; background:var(--border); }
  .stat-num { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,4vw,52px); color:var(--gold); line-height:1; }
  .stat-label { font-size:12px; color:var(--muted); margin-top:4px; font-weight:500; letter-spacing:0.5px; }

  .section-wrap { padding:90px clamp(16px,5vw,60px); }
  .section-inner { max-width:1200px; margin:0 auto; }
  .hiw-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:52px; }
  .hiw-step { padding:32px 28px; border-radius:var(--radius); position:relative; overflow:hidden; }
  .hiw-step-num { font-family:'Bebas Neue',sans-serif; font-size:80px; line-height:1; color:rgba(245,200,66,0.08); position:absolute; top:-4px; right:20px; pointer-events:none; }
  .hiw-step-icon { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px; }
  .hiw-step h3 { font-family:'Bebas Neue',sans-serif; font-size:26px; color:var(--text); letter-spacing:0.5px; margin-bottom:10px; }
  .hiw-step p { font-size:14px; color:var(--muted); line-height:1.65; }

  .features-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:52px; }
  .feature-card { padding:32px; border-radius:var(--radius); display:flex; gap:20px; align-items:flex-start; }
  .feature-icon { width:48px; height:48px; border-radius:13px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:22px; }
  .feature-card h3 { font-size:17px; font-weight:700; color:var(--text); margin-bottom:8px; }
  .feature-card p { font-size:13px; color:var(--muted); line-height:1.65; }

  .daily-task-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .task-visual { position:relative; }
  .task-card-mock { background:var(--dark2); border:1px solid var(--border); border-radius:20px; padding:24px; }
  .task-row { display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:12px; margin-bottom:10px; background:rgba(255,255,255,0.03); border:1px solid var(--border); transition:all 0.2s; }
  .task-row:hover { background:rgba(255,255,255,0.06); border-color:rgba(245,200,66,0.2); }
  .task-row-icon { font-size:22px; }
  .task-row-info { flex:1; }
  .task-row-info .name { font-size:13px; font-weight:700; color:var(--text); }
  .task-row-info .meta { font-size:11px; color:var(--muted); margin-top:2px; }
  .task-row-coin { display:flex; align-items:center; gap:4px; font-size:13px; font-weight:800; color:var(--gold); }
  .task-row-badge { font-size:10px; padding:3px 9px; border-radius:20px; font-weight:700; }

  .users-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-top:48px; }
  .user-card { padding:24px 16px; border-radius:var(--radius); text-align:center; position:relative; overflow:hidden; }
  .user-rank { font-family:'Bebas Neue',sans-serif; font-size:13px; color:var(--muted); margin-bottom:12px; letter-spacing:1px; }
  .user-avatar { width:60px; height:60px; border-radius:50%; margin:0 auto 14px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:#fff; border:3px solid transparent; }
  .user-name { font-size:13px; font-weight:700; color:var(--text); margin-bottom:6px; }
  .user-coins { display:flex; align-items:center; justify-content:center; gap:5px; font-size:12px; font-weight:700; color:var(--gold); }

  .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:52px; }
  .testi-card { padding:28px; border-radius:var(--radius); }
  .testi-stars { color:var(--gold); font-size:14px; letter-spacing:2px; margin-bottom:14px; }
  .testi-text { font-size:14px; color:var(--muted); line-height:1.7; margin-bottom:18px; }
  .testi-author { display:flex; align-items:center; gap:12px; }
  .testi-avatar { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; color:#fff; flex-shrink:0; }
  .testi-name { font-size:13px; font-weight:700; color:var(--text); }
  .testi-role { font-size:11px; color:var(--muted); }

  .cta-section { padding:100px clamp(16px,5vw,60px); text-align:center; position:relative; overflow:hidden; }
  .cta-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.09) 0%, transparent 65%); pointer-events:none; }

  .site-footer { background:var(--dark2); border-top:1px solid var(--border); padding:60px clamp(16px,5vw,60px) 30px; }
  .footer-grid { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; }
  .footer-logo-row { display:flex; align-items:center; gap:10px; margin-bottom:16px; }
  .footer-logo-img { height:30px; width:auto; object-fit:contain; display:block; }
  .footer-desc { font-size:13px; color:var(--muted); line-height:1.7; margin-bottom:20px; }
  .footer-col h4 { font-size:13px; font-weight:700; color:var(--text); letter-spacing:0.8px; text-transform:uppercase; margin-bottom:16px; }
  .footer-col a { display:block; font-size:13px; color:var(--muted); text-decoration:none; margin-bottom:10px; transition:color 0.2s; }
  .footer-col a:hover { color:var(--text); }
  .footer-bottom { max-width:1200px; margin:40px auto 0; padding-top:24px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
  .footer-bottom-text { font-size:12px; color:var(--muted); }
  .footer-links { display:flex; gap:20px; }
  .footer-links a { font-size:12px; color:var(--muted); text-decoration:none; }
  .footer-links a:hover { color:var(--text); }
  .social-icons { display:flex; gap:10px; margin-top:16px; }
  .social-icon { width:34px; height:34px; border-radius:9px; background:rgba(255,255,255,0.05); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:14px; cursor:pointer; transition:all 0.2s; }
  .social-icon:hover { background:rgba(245,200,66,0.1); border-color:rgba(245,200,66,0.3); }

  .payment-badges { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
  .pay-badge { background:rgba(255,255,255,0.06); border:1px solid var(--border); border-radius:8px; padding:6px 12px; font-size:11px; font-weight:600; color:var(--muted); }

  .lang-select { background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text); border-radius:8px; padding:6px 12px; font-size:12px; cursor:pointer; }
  .lang-select option { background:#0c1220; }

  @media(max-width:1024px) {
    .hiw-steps    { grid-template-columns:1fr; gap:16px; }
    .features-grid { grid-template-columns:1fr; }
    .daily-task-grid { grid-template-columns:1fr; }
    .users-grid { grid-template-columns:repeat(3,1fr); }
    .testi-grid { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr 1fr; }
    .stats-grid { grid-template-columns:repeat(2,1fr); gap:20px; }
    .stat-item::after { display:none; }
  }
  @media(max-width:640px) {
    .nav-links, .nav-cta { display:none !important; }
    .nav-mobile-actions { display:flex !important; }
    .nav-hamburger { display:flex !important; }
    .users-grid { grid-template-columns:repeat(2,1fr); }
    .footer-grid { grid-template-columns:1fr; }
  }
  .nav-mobile-actions { display:none; align-items:center; gap:4px; }
  @media(min-width:641px) {
    .nav-hamburger, .nav-mobile-menu { display:none !important; }
  }
  .nav-hamburger {
    display:none; width:44px; height:44px; border-radius:10px;
    border:1px solid var(--border); background:transparent;
    flex-direction:column; align-items:center; justify-content:center; gap:5px;
    cursor:pointer; transition:all 0.2s;
  }
  .nav-hamburger:hover { border-color:rgba(245,200,66,0.4); background:rgba(245,200,66,0.08); }
  .nav-hamburger span { display:block; width:18px; height:2px; background:var(--text); border-radius:1px; transition:transform 0.2s; }
  .nav-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity:0; }
  .nav-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  .nav-mobile-menu {
    display:none; position:fixed; top:68px; left:0; right:0; bottom:0;
    background:var(--dark); z-index:999; overflow-y:auto;
    padding:24px; flex-direction:column; gap:8px;
    border-top:1px solid var(--border);
  }
  .nav-mobile-menu.open { display:flex; }
  .nav-mobile-menu a, .nav-mobile-menu .nav-mobile-item {
    padding:14px 18px; border-radius:12px; font-size:15px; font-weight:600;
    color:var(--text); text-decoration:none; background:rgba(255,255,255,0.03);
    border:1px solid var(--border); transition:all 0.2s;
  }
  .nav-mobile-menu a:hover, .nav-mobile-menu .nav-mobile-item:hover {
    background:rgba(255,255,255,0.06); border-color:rgba(245,200,66,0.22);
  }
  .nav-mobile-menu .nav-mobile-cta-row { display:flex; gap:10px; margin-top:8px; }
  .nav-mobile-menu .nav-mobile-cta-row .btn-ghost,
  .nav-mobile-menu .nav-mobile-cta-row .btn-primary-cta { flex:1; justify-content:center; }
`;

const CoinSVG = ({ size = 16, glow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={glow ? { filter: 'drop-shadow(0 0 5px #f5c842)' } : {}}>
    <circle cx="12" cy="12" r="10" fill="url(#cg2)" />
    <circle cx="12" cy="12" r="7" fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#7a4f00" fontWeight="bold">C</text>
    <defs>
      <radialGradient id="cg2" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#ffe066" />
        <stop offset="60%" stopColor="#f5c842" />
        <stop offset="100%" stopColor="#c8920a" />
      </radialGradient>
    </defs>
  </svg>
);

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return scrolled;
}

function AnimCount({ to, suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let v = 0;
      const steps = 60;
      const inc = to / steps;
      const t = setInterval(() => { v += inc; if (v >= to) { setN(to); clearInterval(t); } else setN(Math.floor(v)); }, 22);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const LEADERBOARD_COLORS = ['#f5c842', '#38bdf8', '#4ade80', '#a855f7', '#ff7b2f'];
const THEME_KEY = 'clisha-x-theme';

export default function Landing() {
  const scrolled = useScrollNav();
  useReveal();
  const dispatch = useDispatch();
  const rank = useSelector((state) => state.rank?.data) ?? { ranking: [] };
  const rankLoading = useSelector((state) => state.rank?.loading);

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) || 'light'; } catch { return 'light'; }
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [langVal, setLangVal] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { dispatch(getRank(1)); }, [dispatch]);
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const steps = [
    { icon: '✍️', color: '#f5c842', bg: 'rgba(245,200,66,0.12)', title: 'Create Your Account', desc: "Sign up in under 60 seconds. No credit card required. Just your email and you're in." },
    { icon: '📋', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)', title: 'Pick Your Daily Tasks', desc: 'Browse a fresh set of tasks every day — SEO, social media, reviews, and more.' },
    { icon: '🪙', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', title: 'Collect Your Coins', desc: 'Every completed task fills your wallet with coins. Watch your balance grow daily.' },
  ];

  const features = [
    { icon: '⚡', color: '#f5c842', bg: 'rgba(245,200,66,0.1)', title: 'New Tasks Every Day', desc: 'A fresh batch of tasks lands in your feed every morning. Never the same thing twice.' },
    { icon: '🏆', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', title: 'Live Leaderboard', desc: 'Compete with users worldwide. The top earners get featured — can you make the list?' },
    { icon: '👥', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', title: 'Referral Rewards', desc: 'Invite friends and earn bonus coins when they join and complete their first task.' },
    { icon: '🎯', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'SEO & Social Tasks', desc: 'Support brands through real SEO work, social engagement, and community tasks.' },
    { icon: '🔥', color: '#ff7b2f', bg: 'rgba(255,123,47,0.1)', title: 'Streak Bonuses', desc: 'Log in every day to keep your streak alive. Longer streaks mean bigger daily bonuses.' },
    { icon: '🌍', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', title: 'Multi-Language', desc: 'Clisha is available in 7 languages so you can earn in your native tongue.' },
  ];

  const tasks = [
    { icon: '👍', name: 'Like & Share Product Post', coins: 50, time: '2 min', diff: 'Easy', diffC: '#4ade80', diffB: 'rgba(74,222,128,0.12)' },
    { icon: '▶️', name: 'Watch Brand Video (30s)', coins: 80, time: '5 min', diff: 'Easy', diffC: '#4ade80', diffB: 'rgba(74,222,128,0.12)' },
    { icon: '⭐', name: 'Leave a Google Review', coins: 150, time: '8 min', diff: 'Medium', diffC: '#f5c842', diffB: 'rgba(245,200,66,0.12)' },
    { icon: '🔍', name: 'SEO Keyword Research', coins: 200, time: '12 min', diff: 'Medium', diffC: '#f5c842', diffB: 'rgba(245,200,66,0.12)' },
    { icon: '📱', name: 'Social Media Profile Setup', coins: 300, time: '15 min', diff: 'Hard', diffC: '#f87171', diffB: 'rgba(248,113,113,0.12)' },
  ];

  const topUsers = (rank?.ranking ?? []).slice(0, 5).map((item, i) => {
    const displayName = item?.user?.firstname ?? item?.user?.username ?? 'User';
    const lastName = item?.user?.lastname ?? '';
    const fullName = lastName ? `${displayName} ${lastName}`.trim() : displayName;
    const avatarLetter = fullName.charAt(0).toUpperCase();
    return {
      id: item?.user?.id ?? i,
      name: fullName,
      coins: item?.total_points != null ? Number(item.total_points).toLocaleString() : '0',
      avatar: avatarLetter,
      color: LEADERBOARD_COLORS[i % LEADERBOARD_COLORS.length],
      photo: item?.user?.photo,
      gender: item?.user?.gender,
    };
  });

  const testimonials = [
    { text: "I complete a handful of tasks every morning with my coffee. My coin balance has been growing steadily for months now. It's become part of my routine.", name: 'Sarah M.', role: 'Member since 2023', avatar: 'S', color: '#f5c842' },
    { text: "The leaderboard keeps me competitive. I love checking my rank every day and pushing to stay in the top 10. Clisha made task-doing actually fun.", name: 'Marcus T.', role: 'Top 5 User', avatar: 'M', color: '#38bdf8' },
    { text: "I referred 12 friends last month and the bonus coins just kept coming. The referral system is genuinely one of the best features on the platform.", name: 'Priya K.', role: 'Power User', avatar: 'P', color: '#4ade80' },
  ];

  const faqs = [
    { q: 'What is Clisha?', a: 'Clisha is a gamified task platform where users complete daily digital tasks — like SEO, social media, and community activities — and earn coins as rewards.' },
    { q: 'How do I earn coins?', a: 'Simply sign up, browse the daily task list, and complete tasks. Each task has a fixed coin reward displayed before you start. Coins accumulate in your wallet automatically.' },
    { q: 'Is Clisha free to use?', a: "Yes! The free plan gives you access to daily tasks and coin rewards. Premium plans unlock extra task types, higher multipliers, and exclusive bonuses." },
    { q: 'How does the referral system work?', a: "Share your unique invite link. When a friend joins and completes their first task, both of you receive bonus coins. There's no limit to how many friends you can refer." },
    { q: 'What are the daily streak bonuses?', a: 'Log in and complete at least one task each day to keep your streak alive. The longer your streak, the bigger your daily login bonus coins.' },
  ];

  const langs = ['EN', 'FR', 'DE', 'ES', 'IT', 'ZH', 'PT'];

  return (
    <>
      <style>{CSS}</style>
      <div className="clisha-x-landing" data-theme={theme} style={{ fontFamily: "'Outfit', sans-serif", background: 'var(--dark)', color: 'var(--text)', overflowX: 'hidden', minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>

        <nav className={`main-nav${scrolled ? ' scrolled' : ''}`}>
          <Link className="nav-logo" to={BASE}>
            <img src={theme === 'light' ? '/images/logo4.png' : '/logo2.png'} alt="Clisha" className="nav-logo-img" />
          </Link>
          <div className="nav-links">
            {['How it Works', 'Features', 'Tasks', 'Leaderboard'].map((l) => (
              <a key={l} href="#" onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase().replace(/\s/g, '_')); }}>{l}</a>
            ))}
          </div>
          <div className="nav-cta">
            <button type="button" className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link to={`${BASE}/login`}><button type="button" className="btn-ghost" style={{ padding: '9px 18px', fontSize: 13 }}>Log In</button></Link>
            <Link to={`${BASE}/signup`}><button type="button" className="btn-primary-cta" style={{ padding: '9px 20px', fontSize: 13 }}>Sign Up Free</button></Link>
          </div>
          <div className="nav-mobile-actions">
            <button type="button" className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button type="button" className={`nav-hamburger${mobileMenuOpen ? ' open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        <div className={`nav-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
          {['How it Works', 'Features', 'Tasks', 'Leaderboard'].map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase().replace(/\s/g, '_')); closeMobileMenu(); }}>
              {l}
            </a>
          ))}
          <div className="nav-mobile-cta-row">
            <Link to={`${BASE}/login`} className="btn-ghost" style={{ padding: '14px 20px', fontSize: 15, textDecoration: 'none' }} onClick={closeMobileMenu}>Log In</Link>
            <Link to={`${BASE}/signup`} className="btn-primary-cta" style={{ padding: '14px 20px', fontSize: 15, textDecoration: 'none' }} onClick={closeMobileMenu}>Sign Up Free</Link>
          </div>
        </div>

        <section className="hero" id="hero">
          {[600, 900, 1200].map((s, i) => (
            <div key={s} className="hero-bg-ring" style={{ width: s, height: s, top: `calc(50% - ${s / 2}px)`, left: `calc(50% - ${s / 2}px)`, opacity: 0.4 - i * 0.1 }} />
          ))}
          {[{ l: '12%', t: '22%', d: '0s', dur: '5s' }, { l: '80%', t: '18%', d: '1.2s', dur: '4.2s' }, { l: '6%', t: '65%', d: '2s', dur: '6s' }, { l: '88%', t: '60%', d: '0.7s', dur: '5.5s' }, { l: '45%', t: '82%', d: '1.8s', dur: '4.8s' }].map((c, i) => (
            <div key={i} className="floating-coin" style={{ left: c.l, top: c.t, '--delay': c.d, '--dur': c.dur, animationDelay: c.d, animationDuration: c.dur }}>🪙</div>
          ))}

          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,200,66,0.07),transparent 65%)', pointerEvents: 'none' }} />

          <div className="section-label fade-up" style={{ animationDelay: '0.1s' }}>
            <CoinSVG size={12} /> Earn coins doing everyday online tasks
          </div>
          <h1 className="hero-title fade-up" style={{ animationDelay: '0.2s' }}>
            COMPLETE TASKS.<br />
            <span className="gold">COLLECT COINS.</span><br />
            RULE THE BOARD.
          </h1>
          <p className="hero-sub fade-up" style={{ animationDelay: '0.35s' }}>
            Clisha rewards you with coins for completing simple digital tasks every day.
            Join thousands of earners on the leaderboard and build your score.
          </p>
          <div className="hero-btns fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to={`${BASE}/signup`}><button type="button" className="btn-primary-cta">🚀 Start Earning Free</button></Link>
            <button type="button" className="btn-ghost" onClick={() => scrollTo('how_it_works')}>See How It Works →</button>
          </div>

          <div className="hero-social-proof fade-up" style={{ animationDelay: '0.65s' }}>
            <div className="hero-avatars">
              {['#f5c842', '#38bdf8', '#4ade80', '#a855f7', '#ff7b2f'].map((c, i) => (
                <div key={i} className="hero-avatar" style={{ background: c, color: '#0c0800', zIndex: 5 - i }}>
                  {['K', 'M', 'S', 'A', 'J'][i]}
                </div>
              ))}
            </div>
            <p className="hero-proof-text">
              <strong>12,000+</strong> users earning coins daily
            </p>
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
            <p className="hero-proof-text">⭐ <strong>4.8/5</strong> from 800+ reviews</p>
          </div>
        </section>

        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(2).fill(['🪙 Daily Tasks', '🔥 Streak Bonuses', '🏆 Live Leaderboard', '👥 Referral Rewards', '⚡ New Tasks Daily', '🌍 7 Languages', '✅ Free to Join', '🎯 SEO & Social Tasks']).flat().map((item, i) => (
              <div key={i} className="ticker-item">
                <div className="ticker-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-strip" id="stats">
          <div className="stats-grid">
            {[
              { n: 12000, s: '+', label: 'Active Users' },
              { n: 500000, s: '+', label: 'Tasks Completed' },
              { n: 7, s: '', label: 'Languages' },
              { n: 98, s: '%', label: 'Satisfaction Rate' },
            ].map((s, i) => (
              <div key={i} className="stat-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-num"><AnimCount to={s.n} suffix={s.s} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="section-wrap" id="how_it_works" style={{ background: 'var(--dark)' }}>
          <div className="section-inner">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label reveal">⚡ Simple Process</div>
              <h2 className="section-title reveal" style={{ textAlign: 'center' }}>HOW CLISHA WORKS</h2>
              <p className="section-sub reveal" style={{ margin: '0 auto 0', textAlign: 'center' }}>
                Three steps is all it takes. Start earning coins in the next 5 minutes.
              </p>
            </div>
            <div className="hiw-steps">
              {steps.map((s, i) => (
                <div key={i} className={`hiw-step glass-card reveal reveal-delay-${i + 1}`}>
                  <div className="hiw-step-num">{i + 1}</div>
                  <div className="hiw-step-icon" style={{ background: s.bg }}>
                    <span style={{ fontSize: 26 }}>{s.icon}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  {i < 2 && (
                    <div style={{ position: 'absolute', right: -28, top: '50%', transform: 'translateY(-50%)', fontSize: 22, color: 'rgba(245,200,66,0.3)', display: 'none' }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap" id="Features" style={{ background: 'var(--dark2)' }}>
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div className="section-label reveal">🎯 Platform Features</div>
                <h2 className="section-title reveal">EVERYTHING YOU NEED TO EARN MORE</h2>
                <p className="section-sub reveal">
                  Clisha is built around one goal: making it easy and rewarding to complete tasks and see your coins grow every single day.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Tasks Refreshed', val: 'Every 24h', icon: '🔄' },
                  { label: 'Average Coins per Task', val: '50–300', icon: '🪙' },
                  { label: 'Streak Multiplier', val: 'Up to 3×', icon: '🔥' },
                ].map((m, i) => (
                  <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px' }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.5px' }}>{m.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="features-grid" style={{ marginTop: 52 }}>
              {features.map((f, i) => (
                <div key={i} className={`feature-card glass-card reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="feature-icon" style={{ background: f.bg }}>
                    <span style={{ fontSize: 22 }}>{f.icon}</span>
                  </div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap" id="tasks" style={{ background: 'var(--dark)' }}>
          <div className="section-inner">
            <div className="daily-task-grid">
              <div>
                <div className="section-label reveal">📋 Daily Tasks</div>
                <h2 className="section-title reveal">NEW ONLINE TASKS — EVERY SINGLE DAY</h2>
                <p className="section-sub reveal" style={{ marginBottom: 28 }}>
                  Wake up to a fresh list of tasks. SEO work, social media engagement, reviews, forum activity — each one pays out in coins the moment you complete it.
                </p>
                <ul className="reveal" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {['Earn coins instantly on task completion', 'No experience required to get started', 'Tasks take as little as 2 minutes', 'Build streaks for multiplied rewards'].map((pt, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--muted)' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#4ade80', flexShrink: 0 }}>✓</div>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link to={`${BASE}/signup`}><button type="button" className="btn-primary-cta reveal">View All Tasks →</button></Link>
              </div>
              <div className="task-visual reveal" style={{ animationDelay: '0.2s' }}>
                <div className="task-card-mock">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Today&apos;s Tasks</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>5 tasks available</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 20, padding: '5px 12px' }}>
                      <CoinSVG size={13} glow />
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#f5c842' }}>780 coins total</span>
                    </div>
                  </div>
                  {tasks.map((t, i) => (
                    <div key={i} className="task-row" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="task-row-icon">{t.icon}</div>
                      <div className="task-row-info">
                        <div className="name">{t.name}</div>
                        <div className="meta">⏱ {t.time}</div>
                      </div>
                      <span className="task-row-badge" style={{ background: t.diffB, color: t.diffC }}>{t.diff}</span>
                      <div className="task-row-coin">
                        <CoinSVG size={12} glow />
                        +{t.coins}
                      </div>
                    </div>
                  ))}
                  <Link to={`${BASE}/signup`}><button type="button" style={{ width: '100%', marginTop: 16, background: 'linear-gradient(135deg,#f5c842,#e8a800)', color: '#0c0800', border: 'none', borderRadius: 12, padding: '12px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                    ⚡ Start Earning Today
                  </button></Link>
                </div>

                <div className="float-el" style={{ position: 'absolute', top: -20, right: -20, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 14, padding: '12px 16px', backdropFilter: 'blur(12px)' }}>
                  <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 700 }}>✓ Just completed</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginTop: 2 }}>+150 coins earned</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap" id="leaderboard" style={{ background: 'var(--dark2)' }}>
          <div className="section-inner">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label reveal">🏆 Hall of Fame</div>
              <h2 className="section-title reveal" style={{ textAlign: 'center' }}>TOP EARNERS THIS WEEK</h2>
              <p className="section-sub reveal" style={{ margin: '0 auto', textAlign: 'center' }}>
                The leaderboard resets weekly. Complete more tasks, climb the ranks, and earn your spot at the top.
              </p>
            </div>
            {rankLoading ? (
              <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loading />
              </div>
            ) : topUsers.length === 0 ? (
              <div className="reveal" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--muted)', fontSize: 15 }}>
                No leaderboard data yet. Be the first to earn and claim the top spot!
              </div>
            ) : (
              <>
                <div className="users-grid">
                  {topUsers.map((u, i) => (
                    <div key={u?.id ?? i} className={`user-card glass-card reveal visible reveal-delay-${i + 1}`} style={{ background: i === 0 ? 'rgba(245,200,66,0.06)' : undefined, borderColor: i === 0 ? 'rgba(245,200,66,0.2)' : undefined }}>
                      {i === 0 && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#f5c842,#e8a800)', color: '#0c0800', fontSize: 9, fontWeight: 800, padding: '4px 12px', borderRadius: '0 0 8px 8px', letterSpacing: '1px' }}>👑 TOP EARNER</div>}
                      <div className="user-rank">#{i + 1} RANK</div>
                      <div className="user-avatar" style={{ background: `${u?.color}22`, border: `3px solid ${u?.color}44`, overflow: 'hidden' }}>
                        <img src={ProfilePicture({ gender: u.gender, photo: u.photo })} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="user-name">{u?.name}</div>
                      <div className="user-coins">
                        <CoinSVG size={12} glow />
                        {u?.coins}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 36 }}>
                  <Link to={`${BASE}/signup`}><button type="button" className="btn-ghost reveal">View Full Leaderboard →</button></Link>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="section-wrap" style={{ background: 'var(--dark)' }}>
          <div className="section-inner">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label reveal">💬 User Stories</div>
              <h2 className="section-title reveal" style={{ textAlign: 'center' }}>WHAT EARNERS SAY</h2>
            </div>
            <div className="testi-grid">
              {testimonials.map((t, i) => (
                <div key={i} className={`testi-card glass-card reveal reveal-delay-${i + 1}`}>
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">&quot;{t.text}&quot;</p>
                  <div className="testi-author">
                    <div className="testi-avatar" style={{ background: `${t.color}22`, border: `2px solid ${t.color}44` }}>
                      <span style={{ color: t.color }}>{t.avatar}</span>
                    </div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap" style={{ background: 'var(--dark2)' }}>
          <div className="section-inner" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: 'center' }}>
              <div className="section-label reveal">❓ FAQ</div>
              <h2 className="section-title reveal" style={{ textAlign: 'center' }}>QUESTIONS? ANSWERED.</h2>
            </div>
            <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((f, i) => (
                <div key={i} className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${activeFaq === i ? 'rgba(245,200,66,0.3)' : 'var(--border)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <button type="button" onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'var(--text)', fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                    {f.q}
                    <span style={{ fontSize: 18, color: 'var(--gold)', transition: 'transform 0.2s', transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: 12 }}>+</span>
                  </button>
                  {activeFaq === i && (
                    <div style={{ padding: '0 22px 18px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-bg" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            <div className="spin-slow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', border: '1px dashed rgba(245,200,66,0.1)', pointerEvents: 'none' }} />
            <div className="section-label reveal" style={{ margin: '0 auto 20px' }}>🚀 Get Started</div>
            <h2 className="section-title reveal" style={{ textAlign: 'center', fontSize: 'clamp(40px,6vw,80px)' }}>
              READY TO START<br /><span style={{ background: 'linear-gradient(135deg,#f5c842,#ff9d00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COLLECTING COINS?</span>
            </h2>
            <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto 36px' }}>
              Join over 12,000 users completing tasks and growing their coin balance every day. It&apos;s free, it&apos;s fast, and your first tasks are waiting.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`${BASE}/signup`}><button type="button" className="btn-primary-cta" style={{ padding: '16px 36px', fontSize: 16 }}>🪙 Create Free Account</button></Link>
              <Link to={`${BASE}/login`}><button type="button" className="btn-ghost" style={{ padding: '16px 28px', fontSize: 16 }}>Log In</button></Link>
            </div>
            <p className="reveal" style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--muted)' }}>
              No credit card · No download · Just sign up and earn
            </p>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <div className="footer-logo-row">
                <img src={theme === 'light' ? '/images/logo4.png' : '/logo2.png'} alt="Clisha" className="footer-logo-img" />
              </div>
              <p className="footer-desc">
                Clisha is a gamified task-reward platform operated by VQualis Limited. Complete digital tasks daily and grow your coin balance.
              </p>
              <div className="social-icons">
                {['𝕏', 'in', 'f', '▶'].map((s, i) => <div key={i} className="social-icon" role="button" tabIndex={0}>{s}</div>)}
              </div>
              <div style={{ marginTop: 16 }}>
                <select className="lang-select" value={langVal} onChange={(e) => setLangVal(e.target.value)}>
                  {langs.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              {['How It Works', 'Daily Tasks', 'Leaderboard', 'Referral Program', 'Pricing Plans'].map((l) => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase().replace(/\s/g, '_')); }}>{l}</a>
              ))}
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              {['About Us', 'Blog', 'Careers', 'Press Kit', 'Affiliates'].map((l) => <a key={l} href="#">{l}</a>)}
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href={`mailto:${(typeof process !== 'undefined' && process.env?.REACT_APP_EMAIL) || 'support@clisha.me'}`} style={{ wordBreak: 'break-all' }}>{(typeof process !== 'undefined' && process.env?.REACT_APP_EMAIL) || 'support@clisha.me'}</a>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginTop: 8 }}>
                VQualis Limited<br />
                Grand Industrial Building, 7/F<br />
                159-165 Wo Yi Hop Rd, Kwai Chung, HK
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Secure Payments</div>
                <div className="payment-badges">
                  {['PayPal', 'Visa', 'MC', 'Amex'].map((p) => <span key={p} className="pay-badge">{p}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-bottom-text">© {new Date().getFullYear()} VQualis Limited. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://vqualis.com/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a>
              <a href="https://vqualis.com/terms-of-service/" target="_blank" rel="noreferrer">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
