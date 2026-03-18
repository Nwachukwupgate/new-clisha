/**
 * Clisha Experience — Task page (gamified design from clisha_gamified.html)
 * Topbar tabs, mission bar, 3-column grid, type-specific task cards
 */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Alerts/Loading';
import Pagination from '../../../components/Pagination';
import GamifiedTaskCard from '../components/GamifiedTaskCard';
import TodaysTaskModal from '../components/TodaysTaskModal';
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
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

/* ─────────────────────────────────────────────────────────────────
   Tab config (matches gamified HTML header)
──────────────────────────────────────────────────────────────── */
const TASK_TABS = [
  { id: 'all', label: 'All Tasks', icon: '⚡', chromeOnly: true },
  { id: 'website', label: 'Website', icon: '🌐', chromeOnly: false },
  { id: 'google', label: 'Google', icon: '🔍', chromeOnly: true },
  { id: 'journey', label: 'Journey', icon: '🗺', chromeOnly: true },
  { id: 'searchJourney', label: 'Search Journey', icon: '🧭', chromeOnly: true },
];

/* ─────────────────────────────────────────────────────────────────
   Injected CSS
──────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes liveDot {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .task-tab:hover { color: var(--tab-hover) !important; background: var(--tab-bg) !important; }
  .task-tab.active { background: var(--gold-l) !important; color: var(--gold) !important; border-color: rgba(245,197,66,0.2) !important; }
  .task-page-tabs { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .task-page-tabs::-webkit-scrollbar { display: none; }
  .task-page-tabs { -ms-overflow-style: none; }
  @media (max-width: 900px) {
    .task-page-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
  }
  @media (max-width: 600px) {
    .task-page-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
    .task-page-content { padding: 12px !important; }
    .task-page-topbar { padding: 0 12px !important; min-height: 52px !important; }
    .task-page-tabs .task-tab { min-height: 44px !important; padding: 10px 14px !important; font-size: 14px !important; }
    .task-page-mission { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; padding: 14px !important; }
    .task-page-mission-right { flex-direction: row !important; flex-wrap: wrap !important; width: 100% !important; justify-content: flex-start !important; gap: 12px !important; }
    .task-page-mission-right .task-page-divider { display: none !important; }
  }
  @media (max-width: 400px) {
    .task-page-content { padding: 10px !important; }
    .task-page-topbar { padding: 0 10px !important; }
  }
  @media (max-width: 600px) {
    .task-page-empty-img { max-width: 200px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────
   Main page
──────────────────────────────────────────────────────────────── */
export default function TaskPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isChrome, setIsChrome] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tab, setTab] = useState('website');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const user = useSelector((s) => s.user?.data);
  const task = useSelector((s) => s.task.data);
  const website_click = useSelector((s) => s.task.website_click);
  const google_search = useSelector((s) => s.task.google_search);
  const journey = useSelector((s) => s.task.journey);
  const search_journey = useSelector((s) => s.task.search_journey);

  const getTaskLoading = useSelector((s) => s.task.getTaskLoading);
  const getTaskWebsiteLoading = useSelector((s) => s.task.getTaskWebsiteLoading);
  const getTaskGoogleLoading = useSelector((s) => s.task.getTaskGoogleLoading);
  const getTaskJourneyLoading = useSelector((s) => s.task.getTaskJourneyLoading);
  const getTaskSearchJourneyLoading = useSelector((s) => s.task.getTaskSearchJourneyLoading);
  const calenderTask = useSelector((s) => s.general?.calenderTask?.monthlyData ?? s.general?.calenderTask);

  const th = useClishaTheme();
  const dark = th.bg === '#0a0a0a' || th.text === '#ffffff';
  const c = dark ? CLEAN.dark : CLEAN.light;

  /* detect browser */
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const chrome = ua.includes('chrome') && !ua.includes('edg');
    setIsChrome(chrome);
    setShowPopup(!chrome);
    setTab(chrome ? 'all' : 'website');
  }, []);

  /* fetch user and calendar once */
  useEffect(() => {
    dispatch(getUser());
    dispatch(getCalenderTask());
  }, [dispatch]);

  /* fetch tasks when tab or page changes */
  useEffect(() => {
    const page = currentPage;
    if (tab === 'all') dispatch(getTask({ page, types: null }));
    else if (tab === 'website') dispatch(getTaskWebsite({ page, types: 'website_click' }));
    else if (tab === 'google') dispatch(getTaskGoogle({ page, types: 'google_search' }));
    else if (tab === 'journey') dispatch(getTaskJourney({ page, types: 'journey' }));
    else if (tab === 'searchJourney') dispatch(getTaskSearchJourney({ page, types: 'search_journey' }));
  }, [tab, currentPage, dispatch]);

  const loading =
    (tab === 'all' && getTaskLoading) ||
    (tab === 'website' && getTaskWebsiteLoading) ||
    (tab === 'google' && getTaskGoogleLoading) ||
    (tab === 'journey' && getTaskJourneyLoading) ||
    (tab === 'searchJourney' && getTaskSearchJourneyLoading);

  const hasSeenLoaded = useRef(false);
  useEffect(() => {
    if (!loading) hasSeenLoaded.current = true;
  }, [loading]);

  if (loading && !hasSeenLoaded.current) return <Loading />;

  const todayItem = calenderTask?.find?.((d) => moment(d?.date).format('YY-MM-DD') === moment().format('YY-MM-DD'));
  const completedToday = todayItem?.completedTasks ?? user?.completed?.length ?? 0;

  const visibleTabs = TASK_TABS.filter((tb) => !tb.chromeOnly || isChrome);
  const activeTab = visibleTabs.find((tb) => tb.id === tab) || visibleTabs[0];

  /* resolve task list and extensionCode by tab
   * API returns { tasks, totalItems, totalPages, extensionCode } at root.
   * Redux stores payload directly: state.task.website_click = API response.
   * Old system passes task={website_click} so list.task.tasks = website_click.tasks
   */
  const getTaskData = () => {
    switch (tab) {
      case 'all':
        return { list: task?.tasks ?? [], extCode: task?.extensionCode };
      case 'website':
        return { list: website_click?.tasks ?? [], extCode: website_click?.extensionCode };
      case 'google':
        return { list: google_search?.tasks ?? [], extCode: google_search?.extensionCode };
      case 'journey':
        return { list: journey?.tasks ?? [], extCode: journey?.extensionCode };
      case 'searchJourney':
        return { list: search_journey?.tasks ?? [], extCode: search_journey?.extensionCode };
      default:
        return { list: [], extCode: null };
    }
  };

  const getTotalItems = () => {
    switch (tab) {
      case 'all':
        return task?.totalItems ?? 0;
      case 'website':
        return website_click?.totalItems ?? 0;
      case 'google':
        return google_search?.totalItems ?? 0;
      case 'journey':
        return journey?.totalItems ?? 0;
      case 'searchJourney':
        return search_journey?.totalItems ?? 0;
      default:
        return 0;
    }
  };

  const getTotalPages = () => {
    switch (tab) {
      case 'all':
        return task?.totalPages ?? 1;
      case 'website':
        return website_click?.totalPages ?? 1;
      case 'google':
        return google_search?.totalPages ?? 1;
      case 'journey':
        return journey?.totalPages ?? 1;
      case 'searchJourney':
        return search_journey?.totalPages ?? 1;
      default:
        return 1;
    }
  };

  const { list: tasks, extCode } = getTaskData();
  const totalItems = getTotalItems();
  const totalPages = getTotalPages();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

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
      <style>{STYLES}</style>

      {/* chrome warning */}
      {!isChrome && showPopup && (
        <div
          style={{
            marginBottom: 16,
            padding: '12px 14px',
            borderRadius: 14,
            background: dark ? 'rgba(251,191,36,0.1)' : 'rgba(254,243,199,0.95)',
            border: '1px solid rgba(251,191,36,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            animation: 'fadeUp 0.3s ease',
          }}
        >
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
              flexShrink: 0,
              width: 26,
              height: 26,
              borderRadius: 7,
              border: '1px solid rgba(251,191,36,0.3)',
              background: 'rgba(251,191,36,0.1)',
              cursor: 'pointer',
              fontSize: 12,
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ══ TOPBAR (matches gamified HTML) ═══════════════════════════ */}
      <div
        style={{
          background: c.bg2,
          borderBottom: `1px solid ${c.border}`,
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 50,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {visibleTabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              className="task-tab"
              onClick={() => {
                setTab(tb.id);
                setCurrentPage(1);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                color: tab === tb.id ? c.gold : c.text2,
                border: tab === tb.id ? `1px solid ${c.goldB}` : '1px solid transparent',
                background: tab === tb.id ? c.goldL : 'transparent',
                fontFamily: CLEAN_FONTS.body,
                transition: 'all 0.12s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '--tab-hover': c.text,
                '--tab-bg': c.bg3,
                '--gold-l': c.goldL,
                '--gold': c.gold,
              }}
            >
              {tb.icon} {tb.label}
            </button>
          ))}
        </div>
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 11px',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 600,
              background: c.bg3,
              border: `1px solid ${c.border}`,
              fontFamily: CLEAN_FONTS.mono,
            }}
          >
            <span style={{ fontSize: 14 }}>🪙</span>
            <span style={{ color: c.gold }}>{Number(balance).toLocaleString()}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 11px',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 600,
              background: c.bg3,
              border: `1px solid ${c.border}`,
              fontFamily: CLEAN_FONTS.mono,
            }}
          >
            <span style={{ fontSize: 14 }}>💎</span>
            <span style={{ color: c.blue || '#4A9EFF' }}>0 coins</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '4px 10px 4px 5px',
              borderRadius: 20,
              background: c.bg3,
              border: `1px solid ${c.border}`,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A78BFA, #4A9EFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 700,
                color: 'white',
                fontFamily: CLEAN_FONTS.mono,
              }}
            >
              {initials}
            </div>
            <span style={{ fontSize: 12, color: c.text, fontWeight: 500 }}>{userName}</span>
          </div>
        </div> */}
      </div>

      {/* ══ CONTENT ══════════════════════════════════════════════════ */}
      <div className="task-page-content" style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>
        {/* MISSION BAR (matches gamified HTML) */}
        <div
          className="task-page-mission"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            background: `linear-gradient(135deg, ${c.bg3}, ${dark ? '#1A2438' : '#e8ecf8'})`,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            marginBottom: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: c.goldL,
                border: `1px solid ${c.goldB}`,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ⚔️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 15, fontWeight: 700, color: c.text }}>
                  {activeTab.label}
                </div>
                {totalItems > 0 && (
                  <span
                    style={{
                      background: c.goldL,
                      border: `1px solid ${c.goldB}`,
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.gold,
                      fontFamily: CLEAN_FONTS.mono,
                    }}
                  >
                    {totalItems} ACTIVE
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11.5, color: c.text2, marginTop: 2 }}>
                Complete tasks · Earn points · Level up
              </div>
            </div>
          </div>
          <div className="task-page-mission-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.gold }}>
                {Number(balance).toLocaleString()}
              </div>
              <div style={{ fontSize: 10, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 1 }}>
                Balance
              </div>
            </div> */}
            <div className="task-page-divider" style={{ width: 1, height: 30, background: c.border, flexShrink: 0 }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, color: c.green || '#2ECC71' }}>
                {completedToday} done
              </div>
              <div style={{ fontSize: 10, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 1 }}>
                Today
              </div>
            </div>
            <div className="task-page-divider" style={{ width: 1, height: 30, background: c.border, flexShrink: 0 }} />
            <div
              style={{
                fontSize: 11,
                color: c.text2,
                background: c.bg4 || (dark ? '#252D40' : '#cbd5e1'),
                border: `1px solid ${c.border}`,
                borderRadius: 7,
                padding: '4px 9px',
                fontFamily: CLEAN_FONTS.mono,
              }}
            >
              {moment().format('ddd, MMM D')}
            </div>
          </div>
        </div>

        {/* inline refresh indicator */}
        {loading && hasSeenLoaded.current && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '10px 14px',
              borderRadius: 10,
              marginBottom: 18,
              background: c.goldL,
              border: `1px solid ${c.goldB}`,
              fontSize: 12,
              fontWeight: 600,
              color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: `2px solid ${c.goldB}`,
                borderTopColor: c.gold,
                animation: 'spin 0.8s linear infinite',
                flexShrink: 0,
              }}
            />
            Refreshing {activeTab.label.toLowerCase()}…
          </div>
        )}

        {/* empty state */}
        {totalItems === 0 && !loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 48,
              color: c.text3,
            }}
          >
            <img
              src="/images/No data-amico.png"
              alt="No tasks"
              className="task-page-empty-img"
              style={{ maxWidth: 280, margin: '0 auto 16px', display: 'block' }}
            />
            <div style={{ fontSize: 14, fontWeight: 600 }}>No tasks available</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Check back later for new tasks</div>
          </div>
        )}

        {/* GRID (3 columns, matches gamified HTML) */}
        {tasks.length > 0 && (
          <div
            className="task-page-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 18,
            }}
          >
            {tasks.map((item, index) => (
              <GamifiedTaskCard
                key={item?.id ?? index}
                item={item}
                extCode={extCode}
                dark={dark}
              />
            ))}
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && tasks.length > 0 && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }} key={`pagination-${tab}`}>
            <Pagination
              pageCount={totalPages}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              justify="center"
            />
          </div>
        )}

        {/* task history button */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => setTaskModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 15px',
              borderRadius: 20,
              border: `1px solid rgba(${BRAND.primaryRgb},0.28)`,
              background: `rgba(${BRAND.primaryRgb},0.08)`,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              color: BRAND.primary,
              fontFamily: CLEAN_FONTS.body,
              transition: 'all 0.15s',
            }}
          >
            📅 Task history
          </button>
        </div>
      </div>

      <TodaysTaskModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
      />
    </div>
  );
}
