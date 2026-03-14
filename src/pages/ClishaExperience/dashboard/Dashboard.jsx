/**
 * Clisha Experience — Dashboard home (redesigned)
 * All Redux dispatch/selector logic preserved exactly.
 */
/* eslint-disable import/no-useless-path-segments, @typescript-eslint/no-unused-vars */

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Loading from '../../../components/Alerts/Loading';
import NotificationMessage from '../../../components/Messages/NotificationMessage';
import { getUser } from '../../../store/Auth/auth';
import { getSurveyProfile, getTopToken, getTopUsers } from '../../../store/General';
import { useClishaTheme } from '../context/ThemeContext';
import CoinIcon from '../components/CoinIcon';
import ProgressBar from '../components/ProgressBar';
import GamifiedCalendar from '../components/GamifiedCalendar';
import TodaysTaskModal from '../components/TodaysTaskModal';
import Wallet from '../../Dashboard/components/Wallet';
import Task from '../../Dashboard/components/Task_Component';
import LoadTaskCard from '../components/Load_Task';
import TimeTraker from '../../Dashboard/components/TimeTraker';
import BonusPopup from '../../Dashboard/components/BonusPopup';
import GuidePopup from '../../Dashboard/components/GuidePopup';
import SurveyForm from '../../Profile/components/survey/SurveyForm';
import SurveyPrompt from '../../Profile/components/SurveyPopUps/SurveyPrompt';
import { BRAND } from '../design-system/tokens';

const BASE = '/clisha-x';

/* ── XP Ring ─────────────────────────────────────────────────────────── */
function XPRing({ pct = 0, dark }) {
  const r = 40;
  const sw = 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <svg width="96" height="96" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx="48" cy="48" r={r} fill="none"
          stroke={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
          strokeWidth={sw}
        />
        <circle cx="48" cy="48" r={r} fill="none"
          stroke="url(#xpG)"
          strokeWidth={sw}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }}
        />
        <defs>
          <linearGradient id="xpG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BRAND.primaryDark} />
            <stop offset="100%" stopColor={BRAND.primaryLight} />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 20, fontWeight: 900,
          color: BRAND.primary, lineHeight: 1,
        }}>
          {pct}%
        </span>
        <span style={{ fontSize: 9, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
          PROFILE
        </span>
      </div>
    </div>
  );
}

/* ── Stat card ───────────────────────────────────────────────────────── */
function StatCard({ icon, value, label, highlight, dark, th, delay = 0 }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      padding: '20px 18px',
      borderRadius: 16,
      background: highlight
        ? (dark ? `rgba(${BRAND.primaryRgb},0.12)` : `rgba(${BRAND.primaryRgb},0.08)`)
        : th.surface,
      border: `1px solid ${highlight ? `rgba(${BRAND.primaryRgb},0.3)` : th.border}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      boxShadow: highlight
        ? `0 4px 20px rgba(${BRAND.primaryRgb},0.12)`
        : `0 2px 8px rgba(0,0,0,0.05)`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      animation: shown ? `fadeSlideUp 0.4s ease ${delay}ms both` : 'none',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = highlight
          ? `0 8px 28px rgba(${BRAND.primaryRgb},0.2)`
          : `0 6px 20px rgba(0,0,0,0.1)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = highlight
          ? `0 4px 20px rgba(${BRAND.primaryRgb},0.12)`
          : `0 2px 8px rgba(0,0,0,0.05)`;
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <span style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 26, fontWeight: 900,
        color: highlight ? BRAND.primary : th.text,
        lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{ fontSize: 11, color: th.textSub, fontWeight: 600, textAlign: 'center' }}>
        {label}
      </span>
    </div>
  );
}

/* ── Section header ──────────────────────────────────────────────────── */
function SectionLabel({ children, th }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
    }}>
      <div style={{
        width: 3, height: 18, borderRadius: 4,
        background: `linear-gradient(180deg, ${BRAND.primary}, ${BRAND.primaryDark})`,
        boxShadow: `0 0 8px rgba(${BRAND.primaryRgb},0.4)`,
      }} />
      <span style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 15, fontWeight: 800, color: th.text,
        letterSpacing: '-0.2px',
      }}>
        {children}
      </span>
    </div>
  );
}

/* ── Main dashboard ──────────────────────────────────────────────────── */
export default function ClishaExperienceDashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.data);
  const userLoading = useSelector((state) => state.user?.loading);
  const task = useSelector((state) => state.task?.data);
  const vendoPackage = useSelector((state) => state.wallet?.vendoPackage);
  const completeSurveyProfile = useSelector((state) => state.general?.completeSurveyProfile);
  const surveyProfileLoading = useSelector((state) => state.general?.loading);

  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const th = useClishaTheme();
  const dark = th.bg === '#0a0a0a' || th.text === '#ffffff';

  useEffect(() => {
    dispatch(getUser());
    dispatch(getSurveyProfile());
    dispatch(getTopToken());
    dispatch(getTopUsers());
  }, [dispatch]);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenBonusPopup');
    if (!seen) {
      setShowBonusPopup(true);
      localStorage.setItem('hasSeenBonusPopup', 'true');
    }
  }, []);

  const profileCompletePercentage = useCallback(() => {
    if (!user?.user) return 0;
    const entries = ['firstname', 'lastname', 'gender', 'birth_date', 'phone', 'country', 'language', 'region', 'photo'];
    const completed = entries.filter((e) => user.user[e]).length;
    return Math.round((completed / 9) * 100);
  }, [user]);

  const perProfile = profileCompletePercentage();
  const balance = user?.rank?.balance ?? 0;
  const earnedAmount = user?.rank?.earned_amount ?? 0;
  const taskCount = task?.totalItems ?? 0;
  const date = moment().format('MMMM DD, YYYY');
  const verificationDate = user?.user?.email_verified_at;

  const getCurrentTime = useCallback(() => {
    if (user?.timezone?.time) {
      const [hours, minutes] = user.timezone.time.split(':').map(Number);
      if (!Number.isNaN(hours) && hours >= 0 && hours <= 23) {
        const period = hours >= 12 ? 'pm' : 'am';
        const h = hours % 12 || 12;
        return `${h}:${String(minutes).padStart(2, '0')} ${period}`;
      }
    }
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  }, [user?.timezone?.time]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  if (userLoading) return <Loading />;

  return (
    <>
      <NotificationMessage />

      <style>{`
        @keyframes fadeSlideUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes popIn {
          from { transform: scale(0.9); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes progressShimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* ── Hero: greeting + quick stats ───────────────────── */}
        <div style={{
          padding: '24px 28px',
          borderRadius: 20,
          background: dark
            ? `linear-gradient(135deg, rgba(${BRAND.primaryRgb},0.12) 0%, rgba(255,255,255,0.02) 100%)`
            : `linear-gradient(135deg, rgba(${BRAND.primaryRgb},0.09) 0%, rgba(255,255,255,0.6) 100%)`,
          border: `1px solid rgba(${BRAND.primaryRgb},0.2)`,
          boxShadow: `0 4px 24px rgba(${BRAND.primaryRgb},0.08)`,
          animation: 'fadeSlideUp 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 0 }}>
            {/* XP ring showing profile completion */}
            <XPRing pct={perProfile} dark={dark} />

            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 700,
                color: BRAND.primary,
                letterSpacing: '0.5px',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}>
                {greeting} 👋
              </div>
              <h1 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 26, fontWeight: 900,
                margin: '0 0 4px',
                color: th.text,
                lineHeight: 1.15,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {t('helloUser', { username: user?.user?.username || 'User' })}
              </h1>
              <p style={{
                margin: 0, fontSize: 13,
                color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
              }}>
                {date} · {getCurrentTime()}
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            to={`${BASE}/dashboard/task`}
            style={{
              padding: '13px 22px',
              borderRadius: 13,
              background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
              color: '#fff', textDecoration: 'none',
              fontWeight: 800, fontSize: 14,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: `0 4px 16px rgba(${BRAND.primaryRgb},0.45)`,
              transition: 'transform 0.15s, box-shadow 0.15s',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(${BRAND.primaryRgb},0.55)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 16px rgba(${BRAND.primaryRgb},0.45)`;
            }}
          >
            <span>⚡</span>
            {t('startTasks')}
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
        </div>

        {/* ── Profile completion alert ───────────────────────── */}
        {perProfile < 100 && (
          <div style={{
            padding: '16px 20px',
            borderRadius: 14,
            background: dark
              ? `rgba(${BRAND.primaryRgb},0.1)`
              : `rgba(${BRAND.primaryRgb},0.07)`,
            border: `1px solid rgba(${BRAND.primaryRgb},0.25)`,
            display: 'flex', alignItems: 'center', gap: 16,
            flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.4s ease 0.1s both',
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: th.text }}>
                  🧑 Complete your profile
                </span>
                <span style={{ fontSize: 13, fontWeight: 800, color: BRAND.primary }}>
                  {perProfile}%
                </span>
              </div>
              <ProgressBar value={perProfile} max={100} color={BRAND.primary} height={7} glow />
            </div>
            <Link
              to={user?.user?.email_verified_at ? `${BASE}/dashboard/profile` : '/verify'}
              style={{
                padding: '9px 18px', borderRadius: 10,
                background: `rgba(${BRAND.primaryRgb},0.18)`,
                border: `1px solid rgba(${BRAND.primaryRgb},0.35)`,
                color: BRAND.primary, textDecoration: 'none',
                fontSize: 13, fontWeight: 700,
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = BRAND.primary;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `rgba(${BRAND.primaryRgb},0.18)`;
                e.currentTarget.style.color = BRAND.primary;
              }}
            >
              {user?.user?.email_verified_at ? 'Complete →' : 'Verify →'}
            </Link>
          </div>
        )}

        {/* ── Stats row ──────────────────────────────────────── */}
        <div>
          <SectionLabel th={th}>Your stats</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 14,
          }}>
            <StatCard
              icon={<CoinIcon size={24} glow />}
              value={Number(balance).toLocaleString()}
              label="Coins"
              highlight
              dark={dark}
              th={th}
              delay={0}
            />
            <StatCard
              icon="📋"
              value={taskCount}
              label="Tasks today"
              dark={dark}
              th={th}
              delay={60}
            />
            <StatCard
              icon="📈"
              value={Number(earnedAmount).toLocaleString()}
              label="Total earned"
              dark={dark}
              th={th}
              delay={120}
            />
          </div>
        </div>

        {/* ── Wallet + Task + LoadTask ───────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionLabel th={th}>Wallet & Tasks</SectionLabel>
          <div style={{
            padding: 20, borderRadius: 16,
            background: th.surface, border: `1px solid ${th.border}`,
            boxShadow: `0 2px 8px rgba(0,0,0,0.04)`,
          }}>
            <Wallet user={user} vendoPackage={vendoPackage} />
          </div>
          <Task />
          <div style={{
            padding: 16, borderRadius: 16,
            background: th.surface, border: `1px solid ${th.border}`,
          }}>
            <LoadTaskCard />
          </div>
        </div>

        {/* ── TimeTraker ─────────────────────────────────────── */}
        <div>
          <SectionLabel th={th}>Time Tracker</SectionLabel>
          <TimeTraker setShowGuide={setShowGuide} />
        </div>

        {/* ── Calendar ───────────────────────────────────────── */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 14, flexWrap: 'wrap', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 3, height: 18, borderRadius: 4,
                background: `linear-gradient(180deg, ${BRAND.primary}, ${BRAND.primaryDark})`,
                boxShadow: `0 0 8px rgba(${BRAND.primaryRgb},0.4)`,
              }} />
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 15, fontWeight: 800, color: th.text,
              }}>
                Activity Calendar
              </span>
            </div>
            <button
              type="button"
              onClick={() => setTaskModalOpen(true)}
              style={{
                padding: '7px 14px', borderRadius: 8,
                border: `1px solid ${th.border}`,
                background: 'transparent', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: th.textSub,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.primary; e.currentTarget.style.color = BRAND.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSub; }}
            >
              View history →
            </button>
          </div>
          <GamifiedCalendar
            verificationDate={verificationDate}
            onDayClick={() => setTaskModalOpen(true)}
          />
        </div>

        {/* ── Completed tasks today ──────────────────────────── */}
        {user?.completed?.length > 0 && (
          <div>
            <SectionLabel th={th}>Completed today — {user.completed.length} task(s)</SectionLabel>
            <div style={{
              padding: '16px 20px',
              borderRadius: 16,
              background: th.surface,
              border: `1px solid ${th.border}`,
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                {user.completed.slice(0, 4).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: item?.token?.background || `rgba(${BRAND.primaryRgb},0.1)`,
                      color: item?.token?.foreground || th.text,
                      fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 7,
                      border: `1px solid ${item?.token?.background
                        ? 'transparent'
                        : `rgba(${BRAND.primaryRgb},0.2)`}`,
                    }}
                  >
                    {item?.token?.photo && (
                      <img
                        src={item.token.photo} alt=""
                        style={{ width: 20, height: 20, borderRadius: 4 }}
                      />
                    )}
                    {item?.token?.name || 'Task'}
                    <span style={{
                      fontSize: 12,
                      color: item.status === 1 ? '#34d399' : '#f87171',
                    }}>
                      {item.status === 1 ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
                {user.completed.length > 4 && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 10,
                    background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${th.border}`,
                    fontSize: 13, fontWeight: 600, color: th.textSub,
                  }}>
                    +{user.completed.length - 4} more
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setTaskModalOpen(true)}
                style={{
                  padding: '10px 18px', borderRadius: 10,
                  border: `1px solid rgba(${BRAND.primaryRgb},0.3)`,
                  background: `rgba(${BRAND.primaryRgb},0.08)`,
                  color: BRAND.primary, fontWeight: 700,
                  cursor: 'pointer', fontSize: 13,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = BRAND.primary;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `rgba(${BRAND.primaryRgb},0.08)`;
                  e.currentTarget.style.color = BRAND.primary;
                }}
              >
                📋 View full task history
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals / Popups ──────────────────────────────────── */}
      <TodaysTaskModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />

      {showBonusPopup && (
        <BonusPopup user={user} vendoPackage={vendoPackage} onClose={() => setShowBonusPopup(false)} />
      )}
      {showGuide && <GuidePopup show={showGuide} onClose={() => setShowGuide(false)} />}

      {!surveyProfileLoading && completeSurveyProfile?.shouldShow && (
        <SurveyForm
          initialSurveyData={completeSurveyProfile.survey}
          initialStep={completeSurveyProfile.currentStep || 1}
          isUpdate={completeSurveyProfile.isUpdate || false}
        />
      )}
      <SurveyPrompt />
    </>
  );
}
