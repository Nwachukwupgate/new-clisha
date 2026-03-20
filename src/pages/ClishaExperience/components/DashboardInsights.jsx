/**
 * Dashboard Insights — "Alive" dashboard experience
 * Time-aware greetings, streaks, since-last-visit, progress nudges, social proof, gentle urgency
 * Follows CLEAN design tokens
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getDashboardInsights } from '../../../store/General';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN } from '../design-system/tokens-clean';

const STORAGE_KEYS = {
  lastVisit: 'clisha_x_last_visit',
  streak: 'clisha_x_login_streak',
  lastStreakDate: 'clisha_x_last_streak_date',
  dailyCheckIn: 'clisha_x_daily_checkin',
  lastTipIndex: 'clisha_x_last_tip_index',
};

const DAILY_TIPS = [
  'Complete 3 tasks today to boost your weekly streak.',
  'Connect Vendo to earn Clishacoins on every task.',
  'Invite friends and earn when they complete tasks.',
  'Check the Rank page to see your AdStar progress.',
  'Tasks refresh daily — come back tomorrow for more.',
  'Complete your profile to unlock bonus rewards.',
  'Your streak resets at midnight — log in daily!',
  'Top rankers earn special recognition each week.',
];

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  return 'evening';
}

function getGreetingPhrase(greetingType, username) {
  const name = username || 'User';
  switch (greetingType) {
    case 'same_day':
      return `You're back, ${name}!`;
    case 'welcome_back':
      return `Welcome back, ${name}!`;
    case 'time':
    default:
      return `Good ${getTimeGreeting()}, ${name}`;
  }
}

function getStreakSubtext(streak, isWeekStreak) {
  if (streak >= 7) return `🔥 ${streak}-day streak! Keep it up!`;
  if (streak >= 1) return `${streak}-day streak`;
  if (isWeekStreak) return "You've logged in every day this week!";
  return null;
}

function getStreakNudge(streak) {
  if (streak >= 1) return 'Log in tomorrow to keep your streak.';
  return null;
}

/* Approximate tier thresholds (points) — adjust if backend provides */
const TIER_THRESHOLDS = [
  { name: 'Bronze', min: 0 },
  { name: 'Silver', min: 500 },
  { name: 'Gold', min: 1500 },
  { name: 'Platinium', min: 5000 },
  { name: 'Diamond', min: 15000 },
  { name: 'Master', min: 50000 },
  { name: 'Grandmaster', min: 100000 },
];

function getPointsToNextTier(totalPoints, rankName) {
  const tierName = (rankName || 'AdStar Bronze').slice(7).trim();
  const idx = TIER_THRESHOLDS.findIndex((t) => t.name.toLowerCase() === tierName.toLowerCase());
  if (idx < 0 || idx >= TIER_THRESHOLDS.length - 1) return null;
  const next = TIER_THRESHOLDS[idx + 1];
  const needed = next.min - totalPoints;
  if (needed <= 0) return null;
  return { points: needed, nextTier: next.name };
}

export default function DashboardInsights({ children, dark: darkProp, c: cProp }) {
  const dispatch = useDispatch();
  const { dark: themeDark } = useClishaThemeToggle();
  const isDark = darkProp ?? themeDark;
  const c = cProp ?? (isDark ? CLEAN.dark : CLEAN.light);

  const user = useSelector((state) => state.user?.data);
  const insights = useSelector((state) => state.general?.dashboardInsights);
  const rank = useSelector((state) => state.rank?.data);
  const calenderTask = useSelector((s) => s.general?.calenderTask?.monthlyData ?? s.general?.calenderTask);

  const [streak, setStreak] = useState(0);
  const [greetingType, setGreetingType] = useState('time');
  const [dailyTip, setDailyTip] = useState('');
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);

  const todayKey = moment().format('YY-MM-DD');
  const calenderArr = Array.isArray(calenderTask) ? calenderTask : calenderTask?.monthlyData ?? [];
  const todayEntry = calenderArr.find((item) => moment(item?.date).format('YY-MM-DD') === todayKey);
  const taskCount = todayEntry?.createdTasks ?? 0;
  const completedCount = todayEntry?.completedTasks ?? 0;

  // Update streak and last visit on mount
  useEffect(() => {
    const storedLast = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const storedStreak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0', 10);
    const storedStreakDate = localStorage.getItem(STORAGE_KEYS.lastStreakDate);

    const now = moment();
    const todayStr = now.format('YY-MM-DD');

    let newStreak = storedStreak;
    let newGreetingType = 'time';

    if (storedLast) {
      const lastMoment = moment(storedLast, 'YY-MM-DD');
      const daysSince = now.diff(lastMoment, 'days');

      if (daysSince === 0) {
        newGreetingType = 'same_day';
      } else if (daysSince >= 2) {
        newGreetingType = 'welcome_back';
        if (daysSince > 1) {
          newStreak = 0;
        }
      } else if (daysSince === 1) {
        newStreak = storedStreakDate === todayStr ? storedStreak : storedStreak + 1;
        if (newStreak >= 7) setShowStreakCelebration(true);
      }
    } else {
      newStreak = 1;
    }

    localStorage.setItem(STORAGE_KEYS.lastVisit, todayStr);
    localStorage.setItem(STORAGE_KEYS.streak, String(newStreak));
    localStorage.setItem(STORAGE_KEYS.lastStreakDate, todayStr);

    setStreak(newStreak);
    setGreetingType(newGreetingType);

    dispatch(getDashboardInsights(storedLast || undefined));
  }, [dispatch]);

  // Rotating daily tip
  useEffect(() => {
    const dayOfYear = moment().dayOfYear();
    const idx = dayOfYear % DAILY_TIPS.length;
    setDailyTip(DAILY_TIPS[idx]);
  }, []);

  const pointsToNext = useMemo(() => {
    const pts = user?.rank?.total_points ?? user?.rank?.balance ?? 0;
    return getPointsToNextTier(pts, user?.rank?.rankName);
  }, [user?.rank?.total_points, user?.rank?.balance, user?.rank?.rankName]);

  const rankPercentile = useMemo(() => {
    const total = rank?.totalItems ?? 0;
    const myPos = rank?.ranking?.findIndex(
      (r) => r?.user?.id === user?.user?.id || r?.user?.clishaId === user?.user?.clishaId
    );
    if (total > 0 && myPos >= 0) {
      const pct = Math.round(((total - myPos) / total) * 100);
      return Math.min(100, Math.max(0, pct));
    }
    return null;
  }, [rank, user]);

  const snippets = useMemo(() => {
    const arr = [];
    if (insights?.new_tasks_since_visit > 0) {
      arr.push({ key: 'new_tasks', text: `${insights.new_tasks_since_visit} new tasks since you left` });
    }
    if (insights?.points_earned_yesterday > 0) {
      arr.push({ key: 'points', text: `You earned ${insights.points_earned_yesterday} points yesterday` });
    }
    if (insights?.teammates_joined_this_week > 0) {
      arr.push({ key: 'teammates', text: `${insights.teammates_joined_this_week} teammates joined this week` });
    }
    if (insights?.users_completed_today > 0) {
      arr.push({ key: 'social', text: `${insights.users_completed_today} people completed tasks today` });
    }
    if (insights?.team_points_this_week > 0) {
      arr.push({ key: 'team', text: `Your team earned ${insights.team_points_this_week} points this week` });
    }
    if (insights?.tasks_expiring_soon > 0) {
      arr.push({ key: 'expiring', text: `${insights.tasks_expiring_soon} tasks expiring in 24 hours` });
    }
    if (pointsToNext) {
      arr.push({ key: 'tier', text: `${pointsToNext.points} points to ${pointsToNext.nextTier}` });
    }
    if (taskCount > completedCount && completedCount < taskCount) {
      arr.push({ key: 'daily', text: `${taskCount - completedCount} more task(s) to hit your daily goal` });
    }
    if (rankPercentile !== null && rankPercentile >= 90) {
      arr.push({ key: 'top', text: `You're in the top ${100 - rankPercentile}% this week` });
    }
    if (insights?.completed_this_month > 0) {
      arr.push({ key: 'month', text: `You've completed ${insights.completed_this_month} tasks this month` });
    }
    return arr;
  }, [insights, pointsToNext, taskCount, completedCount, rankPercentile]);

  const streakSubtext = getStreakSubtext(streak, streak >= 5 && moment().day() >= 5);
  const streakNudge = getStreakNudge(streak);

  const greeting = getGreetingPhrase(greetingType, user?.user?.username);

  if (typeof children === 'function') {
    return (
      <>
        {children({
          greeting,
          greetingType,
          streak,
          streakSubtext,
          streakNudge,
          snippets,
          dailyTip,
          showStreakCelebration,
          pointsToNext,
          rankPercentile,
          insights,
          dark: isDark,
          c,
        })}
      </>
    );
  }

  return null;
}

export {
  DAILY_TIPS,
  getGreetingPhrase,
  getPointsToNextTier,
  getStreakNudge,
  getStreakSubtext,
  getTimeGreeting,
  STORAGE_KEYS,
};
