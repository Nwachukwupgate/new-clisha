/**
 * Clisha Experience — Task completion celebration screen
 * Replaces generic /dashboard/reward when using Clisha Experience; same Redux + API behavior as RewardApp.
 * Gamified: confetti bursts, animated counters, coin motion, quest-complete framing, CLEAN design.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useReward } from 'react-rewards';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { taskCompleted } from '../../../store/Task';
import Loading from '../../../components/Alerts/Loading';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

/* ── Animated mono number (CountUp wrapper) ─────────────────────── */
function MonoCount({ value, duration = 1.35, delay = 0, color }) {
  const n = Number(value) || 0;
  return (
    <span style={{ fontFamily: CLEAN_FONTS.mono, fontWeight: 800, fontSize: 'clamp(28px, 8vw, 42px)', color, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
      <CountUp start={0} end={n} duration={duration} delay={delay} preserveValue separator="," />
    </span>
  );
}

/* ── Floating coin decoration (CSS only) ────────────────────────── */
function FloatingCoins() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 20 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${12 + i * 14}%`,
            top: `${8 + (i % 2) * 12}%`,
            fontSize: i % 2 ? 22 : 18,
            opacity: 0.35,
            animation: `clisha-x-coin-float ${3 + (i % 3) * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        >
          {i % 3 === 0 ? '🪙' : i % 3 === 1 ? '✨' : '💎'}
        </span>
      ))}
    </div>
  );
}

export default function TaskRewardCelebration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dark } = useClishaThemeToggle();
  const c = dark ? CLEAN.dark : CLEAN.light;

  const user = useSelector((state) => state.user?.data);
  const completeTaskLoading = useSelector((state) => state.task?.completeTaskLoading);
  const vendoPackage = useSelector((state) => state.wallet?.vendoPackage);
  const packageStatus = useSelector((state) => state.wallet?.packageStatus);

  const vendoConnectStatus = user?.user?.vendoConnectStatus;
  const vendoBonus = vendoPackage && vendoPackage?.data?.package_level;
  const vqPoints =
    vendoBonus === 'basic' ? 10
      : vendoBonus === 'plus' ? 20
        : vendoBonus === 'pro' ? 40
          : vendoBonus === 'proplus' ? 100
            : 0;

  const { reward: burstMain } = useReward('clisha-x-reward-main', 'confetti');
  const { reward: burstSide } = useReward('clisha-x-reward-side', 'confetti');

  const _task = searchParams.get('t');
  const _isFailed = searchParams.get('status');
  const _point = searchParams.get('p');
  const _bonus = searchParams.get('b');

  const points = Number(_point) || 0;
  const bonusCoins = _bonus === '0' || _bonus == null ? vqPoints : Number(_bonus) || 0;

  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (_isFailed === 'failed') {
      return undefined;
    }
    burstMain();
    const t = setTimeout(() => burstSide(), 280);
    return () => {
      clearTimeout(t);
    };
  }, [burstMain, burstSide, _isFailed]);

  const playSuccessSound = useCallback(() => {
    try {
      const a = new Audio('/audio/success.mp3');
      a.volume = 0.45;
      a.play().catch(() => {});
    } catch {
      /* ignore */
    }
  }, []);

  const handleClaim = () => {
    playSuccessSound();
    const task = { task: _task, status: 1 };
    dispatch(taskCompleted(task));
    burstMain();
    setTimeout(() => burstSide(), 200);
    setClaimed(true);
  };

  const goToTasks = () => {
    window.location.href = `${BASE}/dashboard/task`;
  };

  const handleFailed = () => {
    const task = { task: _task, status: _isFailed === 'failed' ? 0 : 1 };
    dispatch(taskCompleted(task));
    burstMain();
    navigate(`${BASE}/dashboard/task`);
  };

  if (packageStatus === 'loading') {
    return <Loading />;
  }

  const failed = _isFailed === 'failed';

  return (
    <div
      style={{
        minHeight: 'min(100vh - 120px, 900px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '16px 12px',
      }}
    >
      <style>{`
        @keyframes clisha-x-reward-pop {
          0% { opacity: 0; transform: scale(0.85) translateY(24px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes clisha-x-reward-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes clisha-x-coin-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(8deg); }
        }
        @keyframes clisha-x-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes clisha-x-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,66,0.45); }
          50% { box-shadow: 0 0 0 10px rgba(245,197,66,0); }
        }
        .clisha-x-reward-card {
          animation: clisha-x-reward-pop 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .clisha-x-reward-card { animation: none; opacity: 1; }
          .clisha-x-reward-glow-ring { animation: none !important; }
        }
      `}</style>

      {/* Confetti anchor points (invisible) */}
      <span id="clisha-x-reward-main" style={{ position: 'fixed', left: '50%', top: '28%', width: 1, height: 1, pointerEvents: 'none' }} />
      <span id="clisha-x-reward-side" style={{ position: 'fixed', left: '50%', bottom: '22%', width: 1, height: 1, pointerEvents: 'none' }} />

      {!failed ? (
        <div
          className="clisha-x-reward-card"
          style={{
            width: '100%',
            maxWidth: 440,
            position: 'relative',
            borderRadius: 20,
            border: `1px solid ${c.border}`,
            background: dark
              ? `linear-gradient(165deg, ${c.card} 0%, ${c.bg2} 45%, #121826 100%)`
              : `linear-gradient(165deg, #ffffff 0%, ${c.bg2} 100%)`,
            boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)' : '0 24px 48px rgba(15,23,42,0.12)',
            overflow: 'hidden',
          }}
        >
          <FloatingCoins />

          {/* Ambient glow */}
          <div
            className="clisha-x-reward-glow-ring"
            style={{
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120%',
              height: '60%',
              background: `radial-gradient(ellipse at center, ${c.gold}25 0%, transparent 65%)`,
              pointerEvents: 'none',
              animation: 'clisha-x-reward-glow 4s ease-in-out infinite',
            }}
          />

          <div style={{ position: 'relative', padding: '28px 24px 24px', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                background: c.goldL,
                border: `1px solid ${c.goldB}`,
                marginBottom: 16,
                animation: 'clisha-x-badge-pulse 2.5s ease-in-out infinite',
              }}
            >
              <span style={{ fontSize: 18 }}>🏆</span>
              <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: c.gold, textTransform: 'uppercase' }}>
                Mission complete
              </span>
            </div>

            <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 4px 12px rgba(245,197,66,0.35))' }}>🎉</div>

            <h1 style={{ margin: '0 0 8px', fontFamily: CLEAN_FONTS.mono, fontSize: 22, fontWeight: 700, color: c.text, lineHeight: 1.25 }}>
              {vendoConnectStatus ? 'Outstanding work!' : 'You crushed it!'}
            </h1>
            <p style={{ margin: '0 0 22px', fontSize: 14, color: c.text2, lineHeight: 1.5 }}>
              {vendoConnectStatus
                ? 'Your rewards are ready — points and Clishacoins below.'
                : 'Points secured. Connect Vendo to unlock Clishacoins on every task.'}
            </p>

            {/* Points row */}
            <div
              style={{
                position: 'relative',
                borderRadius: 14,
                padding: '18px 16px',
                marginBottom: 12,
                background: dark ? 'rgba(245,197,66,0.08)' : 'rgba(245,197,66,0.12)',
                border: `1px solid ${c.goldB}`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'clisha-x-shimmer 3s ease infinite',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: c.gold, textTransform: 'uppercase', marginBottom: 6, position: 'relative' }}>
                Points earned
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, position: 'relative' }}>
                <span style={{ fontSize: 28 }}>🪙</span>
                <MonoCount value={points} duration={1.35} delay={0.15} color={c.gold} />
                <span style={{ fontFamily: CLEAN_FONTS.body, fontSize: 16, fontWeight: 600, color: c.text2 }}>pts</span>
              </div>
            </div>

            {/* Clishacoins row */}
            {vendoConnectStatus ? (
              <div
                style={{
                  borderRadius: 14,
                  padding: '16px',
                  marginBottom: 20,
                  background: dark ? 'rgba(74,158,255,0.1)' : 'rgba(37,99,235,0.08)',
                  border: `1px solid ${c.blueB}`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: c.blue, textTransform: 'uppercase', marginBottom: 8 }}>
                  Clishacoins
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontSize: 26,
                      display: 'inline-block',
                      animation: 'clisha-x-coin-float 2.2s ease-in-out infinite',
                    }}
                  >
                    💎
                  </span>
                  <MonoCount value={bonusCoins} duration={1.2} delay={0.55} color={c.blue} />
                  <span style={{ fontFamily: CLEAN_FONTS.body, fontSize: 14, fontWeight: 600, color: c.text2 }}>coins</span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: 12,
                  color: c.text3,
                  marginBottom: 20,
                  padding: '12px',
                  borderRadius: 10,
                  background: c.bg3,
                  border: `1px dashed ${c.border}`,
                }}
              >
                Connect your Vendo account to earn Clishacoins on completed tasks.
              </div>
            )}

            {!claimed ? (
              <button
                type="button"
                onClick={handleClaim}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: 'none',
                  background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                  color: '#1a1a1a',
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: CLEAN_FONTS.body,
                  boxShadow: `0 8px 24px rgba(245,197,66,0.35)`,
                  minHeight: 48,
                }}
              >
                Claim rewards
              </button>
            ) : (
              <button
                type="button"
                onClick={goToTasks}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: `1px solid ${c.goldB}`,
                  background: c.goldL,
                  color: c.gold,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: CLEAN_FONTS.body,
                  minHeight: 48,
                }}
              >
                Earn more points →
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="clisha-x-reward-card"
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 20,
            border: `1px solid ${c.border}`,
            background: c.card,
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
          <h2 style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 20, color: c.text, margin: '0 0 8px' }}>Task window closed</h2>
          <p style={{ color: c.text2, fontSize: 14, marginBottom: 20 }}>
            Stay on the page until the timer finishes to earn points.
          </p>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 28, fontWeight: 700, color: c.text3 }}>0</span>
            <span style={{ color: c.text3, marginLeft: 6 }}>pts</span>
          </div>
          <button
            type="button"
            onClick={handleFailed}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg,${c.gold},${c.orange})`,
              color: '#1a1a1a',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: 48,
            }}
          >
            Back to tasks
          </button>
        </div>
      )}

      {completeTaskLoading && <Loading />}
    </div>
  );
}
