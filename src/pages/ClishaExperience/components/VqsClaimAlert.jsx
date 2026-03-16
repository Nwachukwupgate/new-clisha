/**
 * Clisha Experience — VQS / Clishacoins claim period alerts
 * Shows during days 1–5 when Vendo is connected. Upgrade + Claim Bonus actions.
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiCall } from '../../../services/apiRequestManager';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

export default function VqsClaimAlert({ user, vendoPackage, dark, onClaimSuccess }) {
  const { t } = useTranslation();
  const [isVqsClaimPeriod, setIsVqsClaimPeriod] = useState(false);
  const [isVqsClaimDay, setIsVqsClaimDay] = useState(false);
  const [isTransferVqsLoading, setIsTransferVqsLoading] = useState(false);
  const [qualifiedForBonus, setQualifiedForBonus] = useState(false);

  const vendoApi = process.env.REACT_APP_VENDO_API;
  const taskApi = process.env.REACT_APP_API_TASK;
  const vendoDashboard = process.env.REACT_APP_VENDO_USER_DASHBOARD;

  const c = dark ? CLEAN.dark : CLEAN.light;

  const checkIfVQClaimPeriod = useCallback(() => {
    const nowDate = moment().date();
    const claimDays = new Set([1, 2, 3, 4, 5]);
    if (claimDays.has(nowDate)) {
      setIsVqsClaimPeriod(true);
      if (nowDate === 5) setIsVqsClaimDay(true);
    }
  }, []);

  const transferUserVqsToVendo = useCallback(async () => {
    setIsTransferVqsLoading(true);
    setQualifiedForBonus(true);
    try {
      const token = window.localStorage.getItem('token');
      const config = { headers: { Authorization: `bearer ${token}` } };
      const body = {
        clisha_id: user?.user?.clishaId,
        vqs: user?.rank?.bonus_points,
      };
      const res = await apiCall(`${vendoApi}/clisha-addkickback`, 'post', body, config);
      await axios.get(`${taskApi}/vendo/clear/vqs`, config);
      if (res?.status === 200) {
        toast.success(res?.message);
        onClaimSuccess?.();
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.message || String(err));
    } finally {
      setIsTransferVqsLoading(false);
    }
  }, [user, vendoApi, taskApi, onClaimSuccess]);

  const goToVendoUpgrade = useCallback(() => {
    window.open(`${vendoDashboard}/signin?to=upgrade`, '_blank');
  }, [vendoDashboard]);

  useEffect(() => {
    checkIfVQClaimPeriod();
  }, [checkIfVQClaimPeriod]);

  const showClaimAlert =
    isVqsClaimPeriod &&
    vendoPackage?.status === 200 &&
    user?.user?.vendoConnectStatus &&
    vendoPackage?.data?.package_level !== 'No package';

  const showClaimNotice =
    !user?.user?.prevMonthTaskStatus &&
    isVqsClaimDay &&
    vendoPackage?.status === 200 &&
    user?.user?.vendoConnectStatus &&
    vendoPackage?.data?.package_level !== 'No package' &&
    !qualifiedForBonus;

  const pkgLabel = vendoPackage?.data?.package_level === 'proplus' ? 'Pro+' : vendoPackage?.data?.package_level;

  if (!showClaimAlert && !showClaimNotice) return null;

  if (showClaimNotice) {
    return (
      <div
        style={{
          background: c.card,
          border: `1px solid ${c.orange}`,
          borderRadius: 13,
          padding: '14px 16px',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 4 }}>{t('claimNoticeTitle')}</div>
            <div style={{ fontSize: 11.5, color: c.text2, lineHeight: 1.5 }}>{t('claimNoticeBody')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${c.goldL}, rgba(255,159,67,0.08))`,
        border: `1px solid ${c.goldB}`,
        borderRadius: 13,
        padding: '14px 16px',
        marginBottom: 12,
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: c.text, lineHeight: 1.5, marginBottom: 4 }}>
          As a <span style={{ color: c.gold, textTransform: 'capitalize' }}>{pkgLabel}</span> user, you have{' '}
          <span style={{ fontFamily: CLEAN_FONTS.mono, color: c.gold }}>{Number(user?.rank?.bonus_points ?? 0).toFixed(0)}</span> Clishacoins
          {isVqsClaimDay ? ' — Claim now!' : ' booked in Vendo.'}
        </div>
        {!isVqsClaimDay && vendoPackage?.data?.package_level !== 'proplus' && (
          <div style={{ fontSize: 11, color: c.text2 }}>Upgrade to get more Clishacoins or claim on day 5.</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {vendoPackage?.data?.package_level !== 'proplus' && (
          <button
            type="button"
            onClick={goToVendoUpgrade}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: c.gold,
              color: '#1a1a1a',
              border: 'none',
              cursor: 'pointer',
              fontFamily: CLEAN_FONTS.body,
            }}
          >
            {t('upgrade')}
          </button>
        )}
        {isVqsClaimDay && user?.user?.prevMonthTaskStatus && (
          <button
            type="button"
            onClick={transferUserVqsToVendo}
            disabled={isTransferVqsLoading}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: c.blue,
              color: '#fff',
              border: 'none',
              cursor: isTransferVqsLoading ? 'wait' : 'pointer',
              fontFamily: CLEAN_FONTS.body,
              opacity: isTransferVqsLoading ? 0.8 : 1,
            }}
          >
            {isTransferVqsLoading && '⏳ '}
            {t('claimBonus')}
          </button>
        )}
      </div>
    </div>
  );
}
