/**
 * Clisha Experience — Settings page
 * Account (username), Security (password), Developer options
 * Follows design pattern: CLEAN tokens, cards, icons, mobile responsive
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import GamifiedInput from '../components/GamifiedInput';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { taskStatusFun } from '../../../store/General';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const api = process.env.REACT_APP_API;

function getConfig() {
  const token = window.localStorage.getItem('token');
  return { headers: { Authorization: `bearer ${token}` } };
}

/* ── Section card wrapper ───────────────────────────────────────── */
function SettingsCard({ icon, title, subtitle, children, dark, c }) {
  return (
    <div
      className="clisha-x-settings-card"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.border2;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        className="clisha-x-settings-card-header"
        style={{
          padding: '14px 18px',
          borderBottom: `1px solid ${c.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.text, fontFamily: CLEAN_FONTS.body }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 11, color: c.text2, marginTop: 2 }}>{subtitle}</div>
          )}
        </div>
      </div>
      <div className="clisha-x-settings-card-body" style={{ padding: '18px 18px 20px' }}>{children}</div>
    </div>
  );
}

/* ── Change Username ────────────────────────────────────────────── */
function ChangeUsernameSection({ dark, c }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username?.trim()) {
      toast.warning(t('account.new_username') || 'Enter a new username');
      return;
    }
    setLoading(true);
    axios
      .post(`${api}/user/account/update/username`, { username: username.trim() }, getConfig())
      .then(() => {
        setLoading(false);
        toast.success(t('account.success_username') || 'Username updated successfully');
        setUsername('');
        setExpanded(false);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        toast.error(t('account.error_username') || 'Invalid username. Try another.');
      });
  };

  return (
    <SettingsCard
      icon="👤"
      title={t('account.change_username') || 'Change Username'}
      subtitle="Update your display name"
      dark={dark}
      c={c}
    >
      {!expanded ? (
        <button
          type="button"
          className="clisha-x-settings-btn-touch"
          onClick={() => setExpanded(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${c.goldB}`,
            background: c.goldL,
            color: c.gold,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: CLEAN_FONTS.body,
          }}
        >
          <span>✏️</span> Edit username
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GamifiedInput
            label={t('account.new_username') || 'New username'}
            value={username}
            onChange={setUsername}
            placeholder="Enter new username"
            dark={dark}
            icon="👤"
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="submit"
              className="clisha-x-settings-btn-touch"
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: CLEAN_FONTS.body,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Updating…' : t('account.update') || 'Update'}
            </button>
            <button
              type="button"
              className="clisha-x-settings-btn-touch"
              onClick={() => { setExpanded(false); setUsername(''); }}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: `1px solid ${c.border}`,
                background: 'transparent',
                color: c.text2,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </SettingsCard>
  );
}

/* ── Change Password ───────────────────────────────────────────── */
function ChangePasswordSection({ dark, c }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ currentPassword: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.password || !form.confirmPassword) {
      toast.warning('Fill all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setLoading(true);
    axios
      .post(`${api}/user/account/update/password`, form, getConfig())
      .then(() => {
        setLoading(false);
        toast.success(t('account.success_password') || 'Password updated successfully');
        setForm({ currentPassword: '', password: '', confirmPassword: '' });
        setExpanded(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error(t('account.error_password') || 'Invalid password details');
      });
  };

  return (
    <SettingsCard
      icon="🔐"
      title={t('account.change_password') || 'Change Password'}
      subtitle="Keep your account secure"
      dark={dark}
      c={c}
    >
      {!expanded ? (
        <button
          type="button"
          className="clisha-x-settings-btn-touch"
          onClick={() => setExpanded(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${c.goldB}`,
            background: c.goldL,
            color: c.gold,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: CLEAN_FONTS.body,
          }}
        >
          <span>🔑</span> Update password
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GamifiedInput
            label={t('account.current_password') || 'Current password'}
            type="password"
            value={form.currentPassword}
            onChange={(v) => setForm((p) => ({ ...p, currentPassword: v }))}
            placeholder="Enter current password"
            dark={dark}
            icon="🔒"
          />
          <GamifiedInput
            label={t('account.new_password') || 'New password'}
            type="password"
            value={form.password}
            onChange={(v) => setForm((p) => ({ ...p, password: v }))}
            placeholder="Enter new password"
            dark={dark}
            showStrength
            icon="🔑"
          />
          <GamifiedInput
            label={t('account.confirm_password') || 'Confirm password'}
            type="password"
            value={form.confirmPassword}
            onChange={(v) => setForm((p) => ({ ...p, confirmPassword: v }))}
            placeholder="Confirm new password"
            dark={dark}
            error={form.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : null}
            icon="🔑"
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="submit"
              className="clisha-x-settings-btn-touch"
              disabled={loading || form.password !== form.confirmPassword}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: CLEAN_FONTS.body,
                opacity: loading || form.password !== form.confirmPassword ? 0.7 : 1,
              }}
            >
              {loading ? 'Updating…' : t('account.update') || 'Update'}
            </button>
            <button
              type="button"
              className="clisha-x-settings-btn-touch"
              onClick={() => { setExpanded(false); setForm({ currentPassword: '', password: '', confirmPassword: '' }); }}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: `1px solid ${c.border}`,
                background: 'transparent',
                color: c.text2,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </SettingsCard>
  );
}

/* ── Developer toggle ───────────────────────────────────────────── */
function DeveloperSection({ dark, c, isDeveloper }) {
  const dispatch = useDispatch();
  const task_status = localStorage.getItem('task_status');
  const isOn = task_status === 'true';

  const handleToggle = () => {
    const next = !isOn;
    localStorage.setItem('task_status', next);
    dispatch(taskStatusFun(next));
    window.location.reload();
  };

  if (!isDeveloper) return null;

  return (
    <SettingsCard
      icon="🛠"
      title="Preview Unpublish Task"
      subtitle="Developer only · Show unpublished tasks"
      dark={dark}
      c={c}
    >
      <div
        className="clisha-x-settings-dev-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 13, color: c.text2 }}>
          {isOn ? 'Unpublished tasks are visible in the task list.' : 'Only published tasks are shown.'}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          role="switch"
          aria-checked={isOn}
          style={{
            width: 52,
            height: 28,
            borderRadius: 14,
            border: 'none',
            background: isOn ? c.gold : c.bg4,
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.2s',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: isOn ? 27 : 3,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'left 0.2s',
            }}
          />
        </button>
      </div>
      <div style={{ fontSize: 11, color: c.text3, marginTop: 12 }}>
        {isOn ? 'On' : 'Off'}
      </div>
    </SettingsCard>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function SettingsPage() {
  const { t } = useTranslation();
  const { dark } = useClishaThemeToggle();
  const user = useSelector((state) => state.user?.data);
  const c = dark ? CLEAN.dark : CLEAN.light;
  const isDeveloper = user?.user?.developer === true;

  return (
    <div
      style={{
        fontFamily: CLEAN_FONTS.body,
        background: c.bg,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .clisha-x-settings-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .clisha-x-settings-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; margin-bottom: 16px !important; }
          .clisha-x-settings-header .clisha-x-settings-icon { width: 42px !important; height: 42px !important; font-size: 20px !important; }
          .clisha-x-settings-header .clisha-x-settings-title { font-size: 18px !important; }
          .clisha-x-settings-card .clisha-x-settings-card-body { padding: 14px 16px 18px !important; }
          .clisha-x-settings-card .clisha-x-settings-card-header { padding: 12px 16px !important; }
          .clisha-x-settings-btn-touch { min-height: 44px !important; padding: 12px 20px !important; display: inline-flex !important; align-items: center !important; }
          .clisha-x-settings-dev-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .clisha-x-settings-tip { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; padding: 12px 14px !important; }
        }
        @media (max-width: 480px) {
          .clisha-x-settings-content { padding: 12px !important; }
          .clisha-x-settings-header .clisha-x-settings-icon { width: 38px !important; height: 38px !important; font-size: 18px !important; }
          .clisha-x-settings-header .clisha-x-settings-title { font-size: 16px !important; }
          .clisha-x-settings-card .clisha-x-settings-card-body { padding: 12px 14px 16px !important; }
          .clisha-x-settings-card .clisha-x-settings-card-header { padding: 10px 14px !important; }
          .clisha-x-settings-tip { padding: 10px 12px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* Page header */}
      <div
        className="clisha-x-settings-header"
        style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}
      >
        <div
          className="clisha-x-settings-icon"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: c.goldL,
            border: `1px solid ${c.goldB}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          ⚙️
        </div>
        <div>
          <div className="clisha-x-settings-title" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.text }}>
            {t('account.settings') || 'Settings'}
          </div>
          <div style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
            Manage your account and preferences
          </div>
        </div>
      </div>

      {/* Settings grid */}
      <div
        className="clisha-x-settings-content clisha-x-settings-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 18,
        }}
      >
        <ChangeUsernameSection dark={dark} c={c} />
        <ChangePasswordSection dark={dark} c={c} />
        <DeveloperSection dark={dark} c={c} isDeveloper={isDeveloper} />
      </div>

      {isDeveloper && (
        <div
          className="clisha-x-settings-tip"
          style={{
            marginTop: 24,
            padding: '12px 16px',
            borderRadius: 12,
            background: c.bg3,
            border: `1px solid ${c.border}`,
            fontSize: 12,
            color: c.text2,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>💡</span>
          <span>
            Developer mode: Preview Unpublish Task lets you see tasks that are not yet published to the main task list.
          </span>
        </div>
      )}
    </div>
  );
}
