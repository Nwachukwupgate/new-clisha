import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import moment from 'moment';
import AuthLayout from '../layouts/AuthLayout';
import GamifiedButton from '../components/GamifiedButton';
import GamifiedInput from '../components/GamifiedInput';
import Loading from '../../../components/Alerts/Loading';
import { apiCall } from '../../../services/apiRequestManager';
import { BRAND, RADIUS, TYPOGRAPHY } from '../design-system/tokens';
import { darkTheme, lightTheme } from '../design-system/theme';

const BASE       = '/clisha-x';
const auth_api   = process.env.REACT_APP_AUTH;
const vendoBaseUrl = process.env.REACT_APP_VENDO_API;
const clientId   = process.env.REACT_APP_VENDO_CLIENT_ID;
const callbackUrl = process.env.REACT_APP_CLIENT_URL;
const StartDate  = 1675010512555;
const dateEmail  = (d) => moment(d).format('DD/MM/YYYY');

function Divider({ dark }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '20px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', letterSpacing: '0.3px' }}>
        OR
      </span>
      <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
function writeUserData(res) {
  if (!res) return;
  const data = res.data?.data || res.data;
  const user = data?.user;
  if (!user) return;
  window.localStorage.setItem('username', user.username);
  window.localStorage.setItem('email', user.email);
  if (!user?.email_verified_at && dateEmail(StartDate) >= dateEmail(user?.createdAt)) {
    toast.error('Please verify your email');
    window.location.href = '/verify';
  } else {
    if (data.accessToken)  window.localStorage.setItem('token', data.accessToken);
    if (data.refreshToken) window.localStorage.setItem('refresh', data.refreshToken);
    window.location.href = `${BASE}/dashboard`;
  }
}

/* ─────────────────────────────────────────────────────────────────────────── */
export default function Login() {
  const { t } = useTranslation();

  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('clisha-x-theme');
      if (!stored) localStorage.setItem('clisha-x-theme', 'light');
      return stored === 'dark';
    } catch { return false; }
  });
  const toggleTheme = () => {
    setDark(d => {
      const next = !d;
      try { localStorage.setItem('clisha-x-theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
      return next;
    });
  };

  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState({ email: '', password: '' });

  const th = dark ? darkTheme : lightTheme;

  /* ── form completion % for XP bar ────────────────────────── */
  const xpPct = Math.round(
    ((form.email ? 50 : 0) + (form.password ? 50 : 0))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email?.trim() || !form.password) {
      toast.error('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const res = await apiCall(`${auth_api}/login`, 'post', form);
      const hasUser = res?.data?.data?.user || res?.data?.user;
      if (hasUser) writeUserData(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const status = err.response?.status;
      const data   = err.response?.data;
      if      (status === 403) toast.error(data?.message || 'Account inactive');
      else if (status === 404) toast.error(data?.message || 'User not found');
      else if (status === 400) toast.error(data?.errors?.[0]?.msg || data?.message || 'Invalid request');
      else if (status === 401) toast.error(data?.message || 'Incorrect password or email');
      else                     toast.error(data?.message || 'Oops, try again later!');
    }
  };

  const loginWithVendo = () => {
    sessionStorage.setItem('authReturnTo', '/clisha-x/dashboard');
    window.location.href = `${vendoBaseUrl}/oauth/authorize?client=${clientId}&callback_url=${callbackUrl}`;
  };

  return (
    <>
      {loading && <Loading />}
      <AuthLayout dark={dark} onToggleTheme={toggleTheme}>

        {/* ── Page heading ─────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: th.brandBg,
            border: `1px solid ${th.brandBorder}`,
            borderRadius: 20, padding: '5px 12px', marginBottom: 14,
          }}>
            <span style={{ fontSize: 14 }}>🪙</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.primary, letterSpacing: '0.3px' }}>
              Earn coins daily
            </span>
          </div>

          <h2 style={{
            fontFamily: TYPOGRAPHY.fontDisplay,
            fontSize: 30, fontWeight: 900,
            color: th.text, marginBottom: 8,
            letterSpacing: '-0.6px', lineHeight: 1.15,
          }}>
            Welcome back! 👋
          </h2>
          <p style={{ fontSize: 14, color: th.textMuted, lineHeight: 1.6 }}>
            Sign in to continue earning coins and completing daily tasks
          </p>
        </div>

        {/* ── XP progress bar (form completion) ────────────── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Form Progress
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.primary }}>
              {xpPct}%
            </span>
          </div>
          <div style={{ height: 5, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${xpPct}%`,
              background: `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary}, ${BRAND.primaryLight})`,
              borderRadius: 10,
              transition: 'width 0.5s cubic-bezier(.4,0,.2,1)',
              boxShadow: xpPct > 0 ? `0 0 8px rgba(${BRAND.primaryRgb},0.5)` : 'none',
            }} />
          </div>
        </div>

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <GamifiedInput
            label="Email address"
            type="email"
            value={form.email}
            onChange={v => setForm(f => ({ ...f, email: v }))}
            placeholder="you@example.com"
            icon="✉️"
            dark={dark}
          />
          <GamifiedInput
            label="Password"
            type="password"
            value={form.password}
            onChange={v => setForm(f => ({ ...f, password: v }))}
            placeholder="Enter your password"
            icon="🔒"
            dark={dark}
          />

          {/* forgot password */}
          <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 24 }}>
            <Link to="/forgot-password" style={{
              fontSize: 12, fontWeight: 600,
              color: BRAND.primary, textDecoration: 'none',
              opacity: 0.85, transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; }}
            >
              Forgot password?
            </Link>
          </div>

          {/* primary CTA */}
          <GamifiedButton
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            loading={loading}
            icon="🪙"
            dark={dark}
            style={{ marginBottom: 4 }}
          >
            {t('navbar.login') || 'Log in & earn'}
          </GamifiedButton>

          {/* social proof under button */}
          <div style={{
            textAlign: 'center', marginTop: 8, marginBottom: 2,
            fontSize: 11, color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)',
            fontWeight: 500,
          }}>
            🔐 Secure login · Your data is always protected
          </div>

          <Divider dark={dark} />

          {/* Vendo login */}
          <GamifiedButton
            type="button"
            fullWidth
            variant="secondary"
            dark={dark}
            onClick={loginWithVendo}
            style={{ marginBottom: 4 }}
          >
            🔑 Login with Vendo
          </GamifiedButton>
        </form>

        {/* ── Footer link ───────────────────────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 6, marginTop: 28,
          padding: '14px 18px',
          background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)',
          borderRadius: RADIUS.md,
          border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        }}>
          <span style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}>
            Don't have an account?
          </span>
          <Link to={`${BASE}/signup`} style={{
            fontSize: 13, fontWeight: 800,
            color: BRAND.primary, textDecoration: 'none',
          }}>
            Sign up free →
          </Link>
        </div>
      </AuthLayout>
    </>
  );
}
