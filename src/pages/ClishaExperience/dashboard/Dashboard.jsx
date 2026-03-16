/**
 * Clisha Experience — Dashboard home (clean mockup design)
 * Structure: greeting, stats, wallet+rankers, calendar+completed.
 * All API calls preserved.
 */
/* eslint-disable import/no-useless-path-segments, @typescript-eslint/no-unused-vars */

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Loading from '../../../components/Alerts/Loading';
import NotificationMessage from '../../../components/Messages/NotificationMessage';
import ProfilePicture from '../../../utils/ProfilePicture';
import { getUser } from '../../../store/Auth/auth';
import { getSurveyProfile, getTopToken, getTopUsers, getCalenderTask } from '../../../store/General';
import { getRank } from '../../../store/Rank';
import { useClishaThemeToggle } from '../context/ThemeContext';
import GamifiedCalendar from '../components/GamifiedCalendar';
import TodaysTaskModal from '../components/TodaysTaskModal';
import VqsClaimAlert from '../components/VqsClaimAlert';
import ExtensionPrompt from '../components/ExtensionPrompt';
import TokenProgressCard from '../components/TokenProgressCard';
import StartTasksCta from '../components/StartTasksCta';
import CommunityAvatars from '../components/CommunityAvatars';
import BonusPopup from '../../Dashboard/components/BonusPopup';
import GuidePopup from '../../Dashboard/components/GuidePopup';
import SurveyForm from '../../Profile/components/survey/SurveyForm';
import SurveyPrompt from '../../Profile/components/SurveyPopUps/SurveyPrompt';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

export default function ClishaExperienceDashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dark } = useClishaThemeToggle();

  const user = useSelector((state) => state.user?.data);
  const userLoading = useSelector((state) => state.user?.loading);
  const task = useSelector((state) => state.task?.data);
  const vendoPackage = useSelector((state) => state.wallet?.vendoPackage);
  const completeSurveyProfile = useSelector((state) => state.general?.completeSurveyProfile);
  const surveyProfileLoading = useSelector((state) => state.general?.loading);
  const rank = useSelector((state) => state.rank?.data);
  const topToken = useSelector((state) => state.general?.topToken);
  const topUsers = useSelector((state) => state.general?.topUsers);
  const calenderTask = useSelector((s) => s.general?.calenderTask?.monthlyData ?? s.general?.calenderTask);

  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const c = dark ? CLEAN.dark : CLEAN.light;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getSurveyProfile());
    dispatch(getTopToken());
    dispatch(getTopUsers());
    dispatch(getCalenderTask());
    dispatch(getRank(1));
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

  // Tasks available today & done today from calendar (same source as GamifiedCalendar)
  const todayKey = moment().format('YY-MM-DD');
  const calenderArr = Array.isArray(calenderTask) ? calenderTask : calenderTask?.monthlyData ?? [];
  const todayEntry = calenderArr.find((item) => moment(item?.date).format('YY-MM-DD') === todayKey);
  const taskCount = todayEntry?.createdTasks ?? 0;
  const completedCount = todayEntry?.completedTasks ?? 0;

  const verificationDate = user?.user?.email_verified_at;

  const ranking = rank?.ranking ?? [];
  const myUserId = user?.user?.id ?? user?.user?.clishaId;
  const myRankIndex = ranking.findIndex((r) => r?.user?.id === myUserId || r?.user?.clishaId === myUserId);

  if (userLoading) return <Loading />;

  return (
    <>
      <NotificationMessage />
      <style>{`
        @media (max-width: 767px) {
          .clisha-x-mid-grid { grid-template-columns: 1fr !important; }
          .clisha-x-bot-grid { grid-template-columns: 1fr !important; }
          .clisha-x-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── VQS Claim Alert (days 1–5) ──────────────────────────────── */}
        <VqsClaimAlert user={user} vendoPackage={vendoPackage} dark={dark} />

        {/* ── Extension prompt ─────────────────────────────────────────── */}
        <ExtensionPrompt dark={dark} />

        {/* ── Greeting ───────────────────────────────────────────────── */}
        <div style={{ background: c.bg3, border: `1px solid ${c.border}`, borderRadius: 13, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${c.gold},${c.orange})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: CLEAN_FONTS.mono, fontSize: 11, fontWeight: 700, color: '#1a1a1a', flexShrink: 0, overflow: 'hidden' }}>
              <img src={ProfilePicture({ gender: user?.user?.gender, photo: user?.user?.photo })} alt="" style={{ width: 38, height: 38, objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: c.gold, textTransform: 'uppercase', marginBottom: 2 }}>⚡ Welcome back</div>
              <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 17, fontWeight: 700, color: c.text }}>{t('helloUser', { username: user?.user?.username || 'User' })}</div>
              <div style={{ fontSize: 12, color: c.text2, marginTop: 1 }}>{perProfile < 100 ? 'Complete your profile to unlock bonus rewards' : 'You\'re all set!'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: 130, fontSize: 11, color: c.text2 }}>
                <span>Profile</span>
                <span style={{ color: c.gold, fontWeight: 600 }}>{perProfile}%</span>
              </div>
              <div style={{ width: 130, height: 4, background: c.bg4, borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${perProfile}%`, background: `linear-gradient(90deg,${c.gold},${c.orange})`, borderRadius: 99, transition: 'width 0.5s ease' }} />
              </div>
            </div>
            <Link
              to={user?.user?.email_verified_at ? `${BASE}/dashboard/profile` : '/verify'}
              style={{ background: c.gold, color: '#1a1a1a', border: 'none', borderRadius: 7, padding: '6px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: CLEAN_FONTS.body, textDecoration: 'none' }}
            >
              Complete →
            </Link>
          </div>
        </div>

        {/* ── Start Tasks CTA + Date/Time ─────────────────────────────── */}
        <StartTasksCta dark={dark} />

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <div className="clisha-x-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 9 }}>
          {[
            { icon: '🪙', value: Number(balance).toLocaleString(), label: 'Points', sublabel: 'Task earnings · withdrawable', color: c.gold },
            ...(vendoPackage?.status && user?.user?.vendoConnectStatus && vendoPackage?.data?.package_level !== 'No package'
              ? [{ icon: '💎', value: Number(user?.rank?.bonus_points ?? 0).toLocaleString(), label: 'Clishacoins', sublabel: `Vendo · ${vendoPackage?.data?.package_level}`, color: c.blue }]
              : []),
            { icon: '📋', value: taskCount, label: 'Tasks', sublabel: 'Available today', color: c.blue },
            { icon: '✅', value: completedCount, label: 'Done today', sublabel: 'Completed', color: c.green },
          ].map((s) => (
            <div key={s.label} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 11, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17, background: s.color === c.gold ? c.goldL : s.color === c.blue ? c.blueL : c.greenL, border: `1px solid ${s.color === c.gold ? c.goldB : s.color === c.blue ? c.blueB : c.greenB}` }}>
                {s.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, fontWeight: 700, lineHeight: 1, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2, fontWeight: 600 }}>{s.label}</div>
                {s.sublabel && <div style={{ fontSize: 10, color: c.text2, marginTop: 1, opacity: 0.85 }}>{s.sublabel}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* ── Wallet + Rankers ───────────────────────────────────────── */}
        <div className="clisha-x-mid-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 220px)', gap: 12 }}>
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, overflow: 'hidden' }}>
            <div style={{ background: '#152238', padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Points · Withdrawable</div>
                <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 21, fontWeight: 700, color: c.gold }}>{(Number(balance)).toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.8 }}>Points</span></div>
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                {/* <Link to="/dashboard/wallet" style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: c.gold, color: '#1a1a1a', textDecoration: 'none', fontFamily: CLEAN_FONTS.body }}>Withdraw</Link> */}
                <Link to="/dashboard/wallet" style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: 'transparent', color: c.text2, border: `1px solid ${c.border2}`, textDecoration: 'none', fontFamily: CLEAN_FONTS.body }}>History</Link>
              </div>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Vendo bonus</div>
              <div style={{ background: c.bg3, borderRadius: 8, padding: 16, textAlign: 'center', color: c.text3, fontSize: 13 }}>
                {vendoPackage?.status && user?.user?.vendoConnectStatus && vendoPackage?.data?.package_level !== 'No package'
                  ? (
                    <>
                      <span style={{ fontFamily: CLEAN_FONTS.mono, fontWeight: 700, color: c.blue }}>{Number(user?.rank?.bonus_points ?? 0).toLocaleString()}</span>
                      {' '}Clishacoins
                      <div style={{ fontSize: 10, marginTop: 4, color: c.text2 }}>
                        {vendoPackage?.data?.package_level} · {vendoPackage?.data?.vqRatio ?? 0}% kickback
                      </div>
                    </>
                  )
                  : 'Connect Vendo to earn Clishacoins on your tasks.'}
              </div>
            </div>
          </div>

          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, padding: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Top Rankers</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.gold, background: c.goldL, border: `1px solid ${c.goldB}`, borderRadius: 20, padding: '2px 7px' }}>This week</span>
            </div>
            {ranking.slice(0, 6).map((item, i) => {
              const isMe = item?.user?.id === myUserId || item?.user?.clishaId === myUserId;
              const pts = item?.total_points ?? item?.balance ?? 0;
              const rankColor = i === 0 ? c.gold : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : c.text3;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: `1px solid ${c.border}` }}>
                  <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 12, fontWeight: 700, width: 18, textAlign: 'center', flexShrink: 0, color: rankColor }}>{item?.position ?? i + 1}</span>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, fontFamily: CLEAN_FONTS.mono, flexShrink: 0, background: isMe ? c.blueL : c.goldL, color: isMe ? c.blue : c.gold, overflow: 'hidden' }}>
                    <img src={ProfilePicture({ gender: item?.user?.gender, photo: item?.user?.photo })} alt="" style={{ width: 24, height: 24, objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: isMe ? c.blue : c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {isMe ? <>You <span style={{ fontSize: 10, background: c.blueL, color: c.blue, border: `1px solid ${c.blueB}`, borderRadius: 20, padding: '1px 5px', marginLeft: 4 }}>me</span></> : (item?.user?.username || item?.user?.firstname || '—')}
                    </div>
                  </div>
                  <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 11, fontWeight: 700, color: isMe ? c.blue : c.gold, flexShrink: 0 }} title="Points">{Number(pts).toLocaleString()} <span style={{ fontSize: 8, color: c.text2, fontWeight: 500 }}>pts</span></span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Token Progress (horizontal marquee) ───────────────────────── */}
        {topToken?.length > 0 && <TokenProgressCard dark={dark} />}

        {/* ── Community Avatars ───────────────────────────────────────── */}
        {topUsers?.length > 0 && (
          <div style={{ maxWidth: 360 }} className="clisha-x-community">
            <CommunityAvatars dark={dark} />
          </div>
        )}

        {/* ── Calendar + Completed ────────────────────────────────────── */}
        <div className="clisha-x-bot-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <GamifiedCalendar verificationDate={verificationDate} onDayClick={() => setTaskModalOpen(true)} />

          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 13, padding: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Completed today</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.green, background: c.greenL, border: `1px solid ${c.greenB}`, borderRadius: 20, padding: '2px 7px' }}>{completedCount} tasks</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {(user?.completed ?? []).slice(0, 6).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: c.bg3, border: `1px solid ${c.border}`, borderRadius: 6, fontSize: 12, color: c.text2, cursor: 'pointer', transition: 'all 0.1s' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.green, flexShrink: 0 }} />
                  {item?.token?.name || 'Task'}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTaskModalOpen(true)}
              style={{ marginTop: 9, width: '100%', padding: 7, background: c.bg3, border: `1px solid ${c.border}`, borderRadius: 7, color: c.text2, fontSize: 11.5, fontWeight: 500, cursor: 'pointer', fontFamily: CLEAN_FONTS.body, transition: 'all 0.12s' }}
            >
              View all completed tasks →
            </button>
          </div>
        </div>
      </div>

      <TodaysTaskModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
      {showBonusPopup && <BonusPopup user={user} vendoPackage={vendoPackage} onClose={() => setShowBonusPopup(false)} />}
      {showGuide && <GuidePopup show={showGuide} onClose={() => setShowGuide(false)} />}
      {!surveyProfileLoading && completeSurveyProfile?.shouldShow && (
        <SurveyForm initialSurveyData={completeSurveyProfile.survey} initialStep={completeSurveyProfile.currentStep || 1} isUpdate={completeSurveyProfile.isUpdate || false} />
      )}
      <SurveyPrompt />
    </>
  );
}
