/**
 * First-time 3-step flow: extension → activate task → claim reward (dismissible).
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const STORAGE_KEY = 'clisha_x_onboarding_flow';
const CHROME_EXT_LINK = 'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl';
const BASE = '/clisha-x';

const STEPS = [
  { n: 1, title: 'Install extension', body: 'Add Clisha Experience from the Chrome Web Store so tasks can run in your browser.', action: 'store', label: 'Chrome Web Store' },
  { n: 2, title: 'Activate a task', body: 'On the Task page, choose a search or journey task and tap Activate Task — we open the right tab for you.', action: 'tasks', label: 'Go to tasks' },
  { n: 3, title: 'Claim rewards', body: 'When you finish, claim points on the reward screen — confetti and coins included.', action: 'dashboard', label: 'Back to dashboard' },
];

export default function ClishaOnboardingStrip({ dark }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'done') {
        setVisible(false);
        return;
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  const c = dark ? CLEAN.dark : CLEAN.light;
  const s = STEPS[step];
  if (!visible || !s) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'done');
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else dismiss();
  };

  return (
    <div
      style={{
        marginBottom: 14,
        padding: '14px 16px',
        borderRadius: 14,
        border: `1px solid ${c.goldB}`,
        background: dark ? 'rgba(245,197,66,0.08)' : 'rgba(245,197,66,0.12)',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss onboarding"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 28,
          height: 28,
          borderRadius: 8,
          border: `1px solid ${c.border}`,
          background: c.card,
          color: c.text2,
          cursor: 'pointer',
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: c.gold, textTransform: 'uppercase', marginBottom: 6 }}>
        Quick start · Step {s.n} of {STEPS.length}
      </div>
      <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6, paddingRight: 32 }}>
        {s.title}
      </div>
      <div style={{ fontSize: 12, color: c.text2, lineHeight: 1.5, marginBottom: 12, maxWidth: 560 }}>
        {s.body}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {s.action === 'store' && (
          <a
            href={CHROME_EXT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: `linear-gradient(135deg,${c.gold},${c.orange})`,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            {s.label}
          </a>
        )}
        {s.action === 'tasks' && (
          <Link
            to={`${BASE}/dashboard/task`}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: `linear-gradient(135deg,${c.gold},${c.orange})`,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            {s.label}
          </Link>
        )}
        {s.action === 'dashboard' && (
          <Link
            to={`${BASE}/dashboard`}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: `linear-gradient(135deg,${c.gold},${c.orange})`,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            {s.label}
          </Link>
        )}
        <button
          type="button"
          onClick={next}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: `1px solid ${c.border}`,
            background: c.card,
            color: c.text,
            fontWeight: 600,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {step < STEPS.length - 1 ? 'Next' : 'Done'}
        </button>
        <button type="button" onClick={dismiss} style={{ fontSize: 11, color: c.text3, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Don&apos;t show again
        </button>
      </div>
    </div>
  );
}
