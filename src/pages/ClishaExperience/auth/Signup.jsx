import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import GamifiedButton from '../components/GamifiedButton';
import GamifiedInput from '../components/GamifiedInput';
import ClishaLoader from '../components/ClishaLoader';
import { validateSignupForm } from '../../../utils/functions/functions';
import { apiCall } from '../../../services/apiRequestManager';
import { BRAND, RADIUS, TYPOGRAPHY, SHADOWS } from '../design-system/tokens';
import { darkTheme, lightTheme } from '../design-system/theme';

const BASE     = '/clisha-x';
const auth_api = process.env.REACT_APP_AUTH;
const api      = process.env.REACT_APP_API;

/* ── Step indicator ──────────────────────────────────────────────────────── */
function StepIndicator({ step, dark }) {
  const steps = [
    { num: 1, label: 'Account'  },
    { num: 2, label: 'Profile'  },
    { num: 3, label: 'Finish'   },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s.num}>
          {/* Step circle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: step > s.num ? 14 : 12, fontWeight: 800,
              background: step > s.num
                ? BRAND.success
                : step === s.num
                ? `linear-gradient(135deg,${BRAND.primaryDark},${BRAND.primary})`
                : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              color: step >= s.num ? '#fff' : dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              boxShadow: step === s.num ? SHADOWS.glow : 'none',
              transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
              border: step === s.num ? `2px solid ${BRAND.primaryLight}` : '2px solid transparent',
            }}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.3px',
              color: step === s.num ? BRAND.primary : dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              transition: 'color 0.3s',
            }}>{s.label}</span>
          </div>
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 2, marginBottom: 18, marginLeft: 4, marginRight: 4,
              background: step > s.num
                ? BRAND.success
                : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              borderRadius: 2,
              transition: 'background 0.4s ease',
              boxShadow: step > s.num ? `0 0 6px ${BRAND.success}50` : 'none',
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Referral welcome screen ─────────────────────────────────────────────── */
function ReferralWelcome({ referralUser, onContinue, dark }) {
  const th = dark ? darkTheme : lightTheme;
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      {/* coin burst */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
        background: `radial-gradient(circle at 35% 35%, #ffe066, ${BRAND.primary} 60%, ${BRAND.primaryDark})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 38, boxShadow: SHADOWS.glow,
        animation: 'pulseGlow 2s ease-in-out infinite',
      }}>🎁</div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: th.brandBg, border: `1px solid ${th.brandBorder}`,
        borderRadius: 20, padding: '4px 12px', marginBottom: 16,
        fontSize: 11, fontWeight: 700, color: BRAND.primary,
      }}>
        ✨ Referral Bonus Active
      </div>

      <h2 style={{
        fontFamily: TYPOGRAPHY.fontDisplay, fontSize: 28, fontWeight: 900,
        color: th.text, marginBottom: 10, letterSpacing: '-0.5px',
      }}>
        You've been invited! 🎉
      </h2>

      <p style={{
        fontSize: 14, color: th.textMuted, lineHeight: 1.7,
        marginBottom: 12, maxWidth: 360, margin: '0 auto 12px',
      }}>
        You were referred by{' '}
        <strong style={{ color: BRAND.primary }}>{referralUser}</strong>.
        Both of you earn bonus coins when you complete your first task.
      </p>

      {/* bonus callout */}
      <div style={{
        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: RADIUS.lg, padding: '16px', margin: '20px 0 28px',
        display: 'flex', justifyContent: 'center', gap: 24,
      }}>
        {[
          { icon: '₡', val: '+200', label: 'Signup bonus' },
          { icon: '🎯', val: '+300', label: 'First task bonus' },
          { icon: '🤝', val: '+200', label: 'Referrer reward' },
        ].map(b => (
          <div key={b.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{b.icon}</div>
            <div style={{
              fontFamily: TYPOGRAPHY.fontDisplay, fontSize: 18, fontWeight: 900,
              color: BRAND.primary, letterSpacing: '-0.3px',
            }}>{b.val}</div>
            <div style={{ fontSize: 10, color: th.textMuted, fontWeight: 600 }}>{b.label}</div>
          </div>
        ))}
      </div>

      <GamifiedButton
        fullWidth variant="primary" size="lg"
        icon="🚀" onClick={onContinue} dark={dark}
      >
        Continue to Register
      </GamifiedButton>

      <p style={{ marginTop: 18, fontSize: 13, color: th.textMuted }}>
        Already have an account?{' '}
        <Link to={`${BASE}/login`} style={{ color: BRAND.primary, fontWeight: 700, textDecoration: 'none' }}>
          Log in
        </Link>
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SIGNUP
   ════════════════════════════════════════════════════════════════════════════ */
export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const code  = query.get('referredBy');

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

  const [loading,      setLoading]      = useState(false);
  const [errors,       setErrors]       = useState({});
  const [referralUser, setReferralUser] = useState(null);
  const [showForm,     setShowForm]     = useState(!code);
  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '',
    password: '', confirmPassword: '', code: code || '',
  });

  const th = dark ? darkTheme : lightTheme;

  /* ── fetch referral user ──────────────────────────────────── */
  useEffect(() => {
    if (!code) return;
    const fetchReferral = async () => {
      try {
        const res = await apiCall(`${api}/auth/referrer/${code}`);
        setReferralUser(res?.name || null);
      } catch (err) {
        console.error('Error fetching referral:', err);
      }
    };
    fetchReferral();
  }, [code]);

  /* ── XP bar: completion % ────────────────────────────────── */
  const fieldWeights = {
    email: 20, password: 20, confirmPassword: 10,
    firstname: 15, lastname: 15, code: 0,
  };
  const xpPct = Math.min(100, Object.entries(fieldWeights).reduce((acc, [k, w]) =>
    form[k] ? acc + w : acc, 0
  ));
  const step = xpPct >= 50 ? 2 : 1;

  /* ── validation ──────────────────────────────────────────── */
  const validateInputs = () => {
    const isDev = window.location.hostname === 'dev.clisha.me';
    const validationErrors = validateSignupForm(form, isDev);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /* ── submit ──────────────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    const payload = {
      firstName:  form.firstname.trim(),
      lastName:   form.lastname.trim(),
      email:      form.email.trim().toLowerCase(),
      password:   form.password,
      referredBy: form.code?.trim() || undefined,
    };
    axios
      .post(`${auth_api}/register`, payload)
      .then((res) => {
        setLoading(false);
        const { user, accessToken, refreshToken } = res.data.data || {};
        if (user) {
          window.localStorage.setItem('username', user.username);
          window.localStorage.setItem('email', user.email);
        }
        if (accessToken)  window.localStorage.setItem('token', accessToken);
        if (refreshToken) window.localStorage.setItem('refresh', refreshToken);
        navigate(`${BASE}/dashboard`);
      })
      .catch((err) => {
        setLoading(false);
        const data = err.response?.data;
        if (err.response?.status === 400) {
          if (Array.isArray(data?.errors) && data.errors.length) {
            toast.error(`${data.errors[0].param}: ${data.errors[0].msg}`);
          } else {
            toast.error(data?.message || 'Invalid request');
          }
        } else {
          toast.error(data?.message || 'Oops, try again later!');
        }
      });
  };

  /* ── referral welcome screen ─────────────────────────────── */
  if (code && !showForm) {
    return (
      <>
        {!referralUser && <ClishaLoader label="Loading invite…" />}
        {referralUser && (
          <AuthLayout dark={dark} onToggleTheme={toggleTheme}>
            <ReferralWelcome
              referralUser={referralUser}
              onContinue={() => setShowForm(true)}
              dark={dark}
            />
          </AuthLayout>
        )}
      </>
    );
  }

  /* ── fieldset helper ──────────────────────────────────────── */
  const set = (key) => (v) => setForm(f => ({ ...f, [key]: v }));

  /* ── benefits for sidebar ────────────────────────────────── */
  const benefits = [
    { icon: '✅', text: 'Free to join — no hidden fees' },
    { icon: '🎯', text: 'New tasks every single day'    },
    { icon: '🔒', text: 'Secure, verified companies only'},
    { icon: '📈', text: 'Transparent coin tracking'     },
  ];

  /* ─────────────────────────────────────────────────────────── */
  return (
    <>
      {loading && <ClishaLoader label="Creating account…" />}
      <AuthLayout dark={dark} onToggleTheme={toggleTheme}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>

          {/* ── Heading ─────────────────────────────────────── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: th.brandBg, border: `1px solid ${th.brandBorder}`,
              borderRadius: 20, padding: '4px 12px', marginBottom: 12,
            }}>
              <span>🚀</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.primary }}>
                Start earning coins in minutes
              </span>
            </div>
            <h2 style={{
              fontFamily: TYPOGRAPHY.fontDisplay, fontSize: 28, fontWeight: 900,
              color: th.text, marginBottom: 6, letterSpacing: '-0.5px',
            }}>
              Create your account
            </h2>
            <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>
              Join 48,000+ users already earning daily rewards
            </p>
          </div>

          {/* ── Step indicator ──────────────────────────────── */}
          <StepIndicator step={step} dark={dark} />

          {/* ── XP progress bar ─────────────────────────────── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)',
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>Profile completion</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: BRAND.primary }}>
                {xpPct}% {xpPct === 100 ? '🎉' : ''}
              </span>
            </div>
            <div style={{
              height: 6, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${xpPct}%`,
                background: xpPct === 100
                  ? `linear-gradient(90deg,${BRAND.success},#6ee7b7)`
                  : `linear-gradient(90deg,${BRAND.primaryDark},${BRAND.primary},${BRAND.primaryLight})`,
                borderRadius: 10,
                transition: 'width 0.5s cubic-bezier(.4,0,.2,1), background 0.4s',
                boxShadow: xpPct > 0 ? `0 0 8px rgba(${BRAND.primaryRgb},0.5)` : 'none',
              }} />
            </div>
          </div>

          {/* ── Name row ─────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <GamifiedInput
              label="First name"
              value={form.firstname}
              onChange={set('firstname')}
              placeholder="First"
              error={errors.firstname}
              dark={dark}
            />
            <GamifiedInput
              label="Last name"
              value={form.lastname}
              onChange={set('lastname')}
              placeholder="Last"
              error={errors.lastname}
              dark={dark}
            />
          </div>

          <GamifiedInput
            label="Email address"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            error={errors.email}
            icon="✉️"
            dark={dark}
          />
          <GamifiedInput
            label="Password"
            type="password"
            value={form.password}
            onChange={set('password')}
            placeholder="Min 8 characters"
            error={errors.password}
            icon="🔒"
            dark={dark}
            showStrength
          />
          <GamifiedInput
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            placeholder="Retype your password"
            error={errors.confirmPassword}
            icon="🛡️"
            dark={dark}
          />

          {/* ── Referral code (collapsible row) ──────────────── */}
          <div style={{ marginBottom: 18 }}>
            {!form.code && !code ? (
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, code: ' ' }))}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                  padding: 0, textDecoration: 'underline', textUnderlineOffset: 2,
                  fontFamily: TYPOGRAPHY.fontBody,
                }}
              >
                + Have a referral code?
              </button>
            ) : (
              <GamifiedInput
                label="Referral code (optional)"
                value={form.code?.trim() === '' ? '' : form.code}
                onChange={set('code')}
                placeholder="Enter referral code"
                icon="🎁"
                dark={dark}
              />
            )}
          </div>

          {/* ── Benefits checklist ───────────────────────────── */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 8, marginBottom: 22,
          }}>
            {benefits.map(b => (
              <div key={b.text} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 500,
                color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
              }}>
                <span style={{ fontSize: 13 }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>

          {/* ── Terms notice ─────────────────────────────────── */}
          <p style={{
            fontSize: 11, color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)',
            lineHeight: 1.6, marginBottom: 16, textAlign: 'center',
          }}>
            By creating an account, you agree to our{' '}
            <a href="https://vqualis.com/terms-of-service/" target="_blank" rel="noreferrer"
              style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'none' }}>
              Terms of Service
            </a>{' '}and{' '}
            <a href="https://vqualis.com/privacy-policy/" target="_blank" rel="noreferrer"
              style={{ color: BRAND.primary, fontWeight: 600, textDecoration: 'none' }}>
              Privacy Policy
            </a>.
          </p>

          {/* ── Submit ───────────────────────────────────────── */}
          <GamifiedButton
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            loading={loading}
            icon="🪙"
            dark={dark}
          >
            {t('navbar.signup') || 'Create account'}
          </GamifiedButton>

          {/* ── Already have account ─────────────────────────── */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 6, marginTop: 20,
            padding: '13px 18px',
            background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)',
            borderRadius: RADIUS.md,
            border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          }}>
            <span style={{ fontSize: 13, color: th.textMuted }}>
              Already have an account?
            </span>
            <Link to={`${BASE}/login`} style={{
              fontSize: 13, fontWeight: 800,
              color: BRAND.primary, textDecoration: 'none',
            }}>
              Log in →
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
