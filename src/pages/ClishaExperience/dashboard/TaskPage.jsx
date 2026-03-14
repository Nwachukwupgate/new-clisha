/**
 * Clisha Experience — Task page (full-width redesign, calendar removed)
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Loading from '../../../components/Alerts/Loading';
import GeneralTask from '../../Task/components/DefaultTask/GeneralTask';
import TaskCard from '../../Task/components/WebsiteTask/TaskCard';
import TaskCard2 from '../../Task/components/GoogleTask/TaskCard2';
import TaskCard3 from '../../Task/components/JourneyTask/TaskCard3';
import TaskCard4 from '../../Task/components/SearchJourneyTask/TaskCard4';
import TodaysTaskModal from '../components/TodaysTaskModal';
import CoinIcon from '../components/CoinIcon';
import {
  getTask,
  getTaskGoogle,
  getTaskJourney,
  getTaskSearchJourney,
  getTaskWebsite,
} from '../../../store/Task';
import { getUser } from '../../../store/Auth/auth';
import { getCalenderTask } from '../../../store/General';
import { useClishaTheme } from '../context/ThemeContext';
import { BRAND } from '../design-system/tokens';

/* ─────────────────────────────────────────────────────────────────
   Tab config — every tab owns its own full colour identity
──────────────────────────────────────────────────────────────── */
const TASK_TABS = [
  {
    id: 'all',
    label: 'All Tasks',
    labelKey: 'allTasks',
    icon: '⚡',
    chromeOnly: true,
    color: BRAND.primary,
    colorRgb: BRAND.primaryRgb,
    desc: 'Every available task in one place',
    gradient: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 60%, ${BRAND.primaryLight} 100%)`,
  },
  {
    id: 'website',
    label: 'Website Tasks',
    labelKey: 'websiteTask',
    icon: '🌐',
    chromeOnly: false,
    color: '#38bdf8',
    colorRgb: '56,189,248',
    desc: 'Visit websites and earn coins per click',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #7dd3fc 100%)',
  },
  {
    id: 'google',
    label: 'Google Tasks',
    labelKey: 'googleTask',
    icon: '🔍',
    chromeOnly: true,
    color: '#34d399',
    colorRgb: '52,211,153',
    desc: 'Search queries that reward your curiosity',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 60%, #6ee7b7 100%)',
  },
  {
    id: 'journey',
    label: 'Journey Tasks',
    labelKey: 'journeyTask',
    icon: '🚀',
    chromeOnly: true,
    color: '#a78bfa',
    colorRgb: '167,139,250',
    desc: 'Multi-step missions for bigger rewards',
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #8b5cf6 60%, #c4b5fd 100%)',
  },
  {
    id: 'searchJourney',
    label: 'Search Journey',
    labelKey: 'searchJourney',
    icon: '🔎',
    chromeOnly: true,
    color: '#fb923c',
    colorRgb: '251,146,60',
    desc: 'Advanced search journeys, bonus coins',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 60%, #fdba74 100%)',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Injected CSS
──────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes liveDot {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes progressShimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  .task-tab-btn:hover { opacity: 1 !important; }
  .task-history-btn:hover { background: var(--brand) !important; color: #fff !important; }
`;

/* ─────────────────────────────────────────────────────────────────
   Tab pill button
──────────────────────────────────────────────────────────────── */
function TabPill({ tb, isActive, onClick, dark }) {
  return (
    <button
      type="button"
      className="task-tab-btn"
      onClick={() => onClick(tb.id)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '9px 17px',
        borderRadius: 11,
        border: isActive
          ? `1.5px solid rgba(${tb.colorRgb},0.55)`
          : `1.5px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        cursor: 'pointer',
        background: isActive
          ? `rgba(${tb.colorRgb},0.13)`
          : 'transparent',
        color: isActive ? tb.color : dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
        fontWeight: isActive ? 700 : 500,
        fontSize: 13,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'all 0.18s ease',
        whiteSpace: 'nowrap',
        position: 'relative',
        boxShadow: isActive ? `0 4px 18px rgba(${tb.colorRgb},0.25)` : 'none',
        opacity: isActive ? 1 : 0.8,
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1 }}>{tb.icon}</span>
      <span>{tb.label}</span>
      {isActive && (
        <span style={{
          position: 'absolute', bottom: -1, left: '50%',
          transform: 'translateX(-50%)',
          width: '45%', height: 2.5, borderRadius: '2px 2px 0 0',
          background: tb.color,
          boxShadow: `0 0 10px rgba(${tb.colorRgb},0.8)`,
        }} />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero banner (swaps fully per active tab)
──────────────────────────────────────────────────────────────── */
function HeroBanner({ tab, taskData, dark, balance, completedToday }) {
  const total = taskData?.totalItems ?? taskData?.data?.length ?? 0;

  return (
    <div style={{
      position: 'relative',
      padding: '32px 36px',
      overflow: 'hidden',
      borderBottom: `1px solid rgba(${tab.colorRgb},0.15)`,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24, flexWrap: 'wrap',
    }}>
      {/* colour wash background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? `linear-gradient(135deg, rgba(${tab.colorRgb},0.16) 0%, rgba(0,0,0,0) 65%)`
          : `linear-gradient(135deg, rgba(${tab.colorRgb},0.11) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* giant watermark emoji */}
      <div style={{
        position: 'absolute', right: 36, top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 110, lineHeight: 1,
        opacity: dark ? 0.05 : 0.07,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {tab.icon}
      </div>

      {/* left: identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1 }}>
        {/* gradient icon */}
        <div style={{
          width: 64, height: 64, borderRadius: 20, flexShrink: 0,
          background: tab.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
          boxShadow: `0 10px 28px rgba(${tab.colorRgb},0.45)`,
        }}>
          {tab.icon}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <h2 style={{
              margin: 0,
              fontFamily: "'Fraunces', serif",
              fontSize: 24, fontWeight: 900,
              color: tab.color,
              letterSpacing: '-0.4px',
            }}>
              {tab.label}
            </h2>
            {/* live task count */}
            {total > 0 && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 11px', borderRadius: 20,
                background: `rgba(${tab.colorRgb},0.14)`,
                border: `1px solid rgba(${tab.colorRgb},0.38)`,
                fontSize: 12, fontWeight: 700, color: tab.color,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: tab.color, display: 'inline-block',
                  animation: 'liveDot 1.8s ease infinite',
                }} />
                {total} task{total !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p style={{
            margin: 0, fontSize: 13, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.42)',
          }}>
            {tab.desc}
          </p>
        </div>
      </div>

      {/* right: stats */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', zIndex: 1 }}>
        {/* balance */}
        <div style={{
          padding: '11px 18px', borderRadius: 16, flexShrink: 0,
          background: dark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.75)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `rgba(${BRAND.primaryRgb},0.15)`,
            border: `1px solid rgba(${BRAND.primaryRgb},0.3)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CoinIcon size={20} glow />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.6px', color: BRAND.primary, textTransform: 'uppercase' }}>
              Balance
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20, fontWeight: 900, color: BRAND.primary, lineHeight: 1,
            }}>
              {Number(balance).toLocaleString()}
            </div>
          </div>
        </div>

        {/* completed */}
        <div style={{
          padding: '11px 18px', borderRadius: 16, flexShrink: 0,
          background: dark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.75)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(52,211,153,0.15)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            ✅
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.6px', color: '#34d399', textTransform: 'uppercase' }}>
              Today
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20, fontWeight: 900, color: '#34d399', lineHeight: 1,
            }}>
              {completedToday} done
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main page
──────────────────────────────────────────────────────────────── */
export default function TaskPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isChrome,      setIsChrome]      = useState(false);
  const [showPopup,     setShowPopup]     = useState(false);
  const [tab,           setTab]           = useState('website');
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const user           = useSelector((s) => s.user?.data);
  const task           = useSelector((s) => s.task.data);
  const website_click  = useSelector((s) => s.task.website_click);
  const google_search  = useSelector((s) => s.task.google_search);
  const journey        = useSelector((s) => s.task.journey);
  const search_journey = useSelector((s) => s.task.search_journey);

  const getTaskLoading              = useSelector((s) => s.task.getTaskLoading);
  const getTaskWebsiteLoading       = useSelector((s) => s.task.getTaskWebsiteLoading);
  const getTaskGoogleLoading        = useSelector((s) => s.task.getTaskGoogleLoading);
  const getTaskJourneyLoading       = useSelector((s) => s.task.getTaskJourneyLoading);
  const getTaskSearchJourneyLoading = useSelector((s) => s.task.getTaskSearchJourneyLoading);

  const th   = useClishaTheme();
  const dark = th.bg === '#0a0a0a' || th.text === '#ffffff';

  /* detect browser */
  useEffect(() => {
    const ua     = navigator.userAgent.toLowerCase();
    const chrome = ua.includes('chrome') && !ua.includes('edg');
    setIsChrome(chrome);
    setShowPopup(!chrome);
    setTab(chrome ? 'all' : 'website');
  }, []);

  /* fetch once */
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    dispatch(getUser());
    dispatch(getTaskWebsite({ page: 1 }));
    const ua     = navigator.userAgent.toLowerCase();
    const chrome = ua.includes('chrome') && !ua.includes('edg');
    if (chrome) {
      dispatch(getTask({ page: 1 }));
      dispatch(getTaskGoogle({ page: 1 }));
      dispatch(getTaskJourney({ page: 1 }));
      dispatch(getTaskSearchJourney({ page: 1 }));
    }
  }, [dispatch]);

  const loading = getTaskLoading || (isChrome && (
    getTaskWebsiteLoading || getTaskGoogleLoading ||
    getTaskJourneyLoading || getTaskSearchJourneyLoading
  ));
  const hasSeenLoaded = useRef(false);
  useEffect(() => { if (!loading) hasSeenLoaded.current = true; }, [loading]);

  if (loading && !hasSeenLoaded.current) return <Loading />;

  const balance        = user?.rank?.balance ?? 0;
  const calenderTask   = useSelector((s) => s.general?.calenderTask?.monthlyData ?? s.general?.calenderTask);
  const todayItem      = calenderTask?.find?.((d) => moment(d?.date).format('YY-MM-DD') === moment().format('YY-MM-DD'));
  const completedToday = todayItem?.completedTasks ?? user?.completed?.length ?? 0;

  const visibleTabs = TASK_TABS.filter((tb) => !tb.chromeOnly || isChrome);
  const activeTab   = visibleTabs.find((tb) => tb.id === tab) || visibleTabs[0];
  const tabData     = { all: task, website: website_click, google: google_search, journey, searchJourney: search_journey };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* chrome warning */}
      {!isChrome && showPopup && (
        <div style={{
          marginBottom: 16, padding: '13px 18px', borderRadius: 14,
          background: dark ? 'rgba(251,191,36,0.1)' : 'rgba(254,243,199,0.95)',
          border: '1px solid rgba(251,191,36,0.4)',
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'fadeUp 0.3s ease',
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: dark ? '#fbbf24' : '#92400e' }}>
              {t('chromeWarning')}
            </div>
            <div style={{ fontSize: 12, marginTop: 2, color: dark ? 'rgba(251,191,36,0.65)' : '#a16207' }}>
              Use Google Chrome for the best experience and all task types.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            style={{
              flexShrink: 0, width: 26, height: 26, borderRadius: 7,
              border: '1px solid rgba(251,191,36,0.3)',
              background: 'rgba(251,191,36,0.1)',
              cursor: 'pointer', fontSize: 12, color: '#fbbf24',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}

      {/* ══ CARD ══════════════════════════════════════════════ */}
      <div style={{
        borderRadius: 22,
        border: `1.5px solid rgba(${activeTab.colorRgb},0.22)`,
        background: th.surface,
        overflow: 'hidden',
        boxShadow: dark
          ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(${activeTab.colorRgb},0.06)`
          : `0 8px 36px rgba(${activeTab.colorRgb},0.1), 0 2px 8px rgba(0,0,0,0.05)`,
        transition: 'box-shadow 0.3s ease',
        animation: 'fadeUp 0.35s ease',
      }}>

        {/* ── tab rail ──────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '14px 20px 0',
          background: dark
            ? 'rgba(255,255,255,0.015)'
            : 'rgba(0,0,0,0.015)',
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          overflowX: 'auto',
          paddingBottom: 14,
        }}>
          {visibleTabs.map((tb) => (
            <TabPill
              key={tb.id}
              tb={tb}
              isActive={tab === tb.id}
              onClick={setTab}
              dark={dark}
            />
          ))}

          {/* right-side date chip */}
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <div style={{
              padding: '6px 14px', borderRadius: 20,
              background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
              fontSize: 12, fontWeight: 600,
              color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)',
              whiteSpace: 'nowrap',
            }}>
              {moment().format('ddd, MMM D')}
            </div>
          </div>
        </div>

        {/* ── hero banner ───────────────────────────────────── */}
        <div key={`hero-${tab}`} style={{ animation: 'slideIn 0.25s ease' }}>
          <HeroBanner
            tab={activeTab}
            taskData={tabData[tab]}
            dark={dark}
            balance={balance}
            completedToday={completedToday}
          />
        </div>

        {/* ── task content area ─────────────────────────────── */}
        <div
          key={`content-${tab}`}
          style={{
            padding: '28px 28px',
            minHeight: 260,
            animation: 'slideIn 0.28s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* inline refresh indicator */}
          {loading && hasSeenLoaded.current && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '10px 14px', borderRadius: 10, marginBottom: 18,
              background: `rgba(${activeTab.colorRgb},0.07)`,
              border: `1px solid rgba(${activeTab.colorRgb},0.2)`,
              fontSize: 12, fontWeight: 600,
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                border: `2px solid rgba(${activeTab.colorRgb},0.25)`,
                borderTopColor: activeTab.color,
                animation: 'spin 0.8s linear infinite', flexShrink: 0,
              }} />
              Refreshing {activeTab.label.toLowerCase()}…
            </div>
          )}

          {isChrome && tab === 'all'           && <GeneralTask task={task} />}
          {tab === 'website'                   && <TaskCard task={website_click} />}
          {isChrome && tab === 'google'         && <TaskCard2 task={google_search} />}
          {isChrome && tab === 'journey'        && <TaskCard3 task={journey} />}
          {isChrome && tab === 'searchJourney'  && <TaskCard4 task={search_journey} />}
        </div>

        {/* ── footer ────────────────────────────────────────── */}
        <div style={{
          padding: '12px 28px',
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          background: `linear-gradient(90deg, rgba(${activeTab.colorRgb},0.04), transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)',
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>
              {activeTab.icon} {activeTab.label}
            </span>
            <span style={{
              width: 3, height: 3, borderRadius: '50%',
              background: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: 11, color: dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)',
            }}>
              {activeTab.desc}
            </span>
          </div>

          <button
            type="button"
            className="task-history-btn"
            onClick={() => setTaskModalOpen(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 15px', borderRadius: 20,
              border: `1px solid rgba(${BRAND.primaryRgb},0.28)`,
              background: `rgba(${BRAND.primaryRgb},0.08)`,
              cursor: 'pointer', fontSize: 12, fontWeight: 700,
              color: BRAND.primary,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all 0.15s',
              '--brand': BRAND.primary,
            }}
          >
            📅 Task history
          </button>
        </div>
      </div>

      <TodaysTaskModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
    </div>
  );
}
