/**
 * Clisha Experience — Profile page (gamified, layered design)
 * Layout: centered player card → 2-column (accordion sections + sticky referral sidebar)
 * Progressive disclosure, clear hierarchy, gamified UX
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Country } from 'country-state-city';
import timezones from 'timezones-list';
import ClishaLoader from '../components/ClishaLoader';
import ProfilePicture from '../../../utils/ProfilePicture';
import { getUser } from '../../../store/Auth/auth';
import { getUserSurveyProfile, getSurveyProfile } from '../../../store/General';
import { useClishaThemeToggle } from '../context/ThemeContext';
import GamifiedInput from '../components/GamifiedInput';
import SurveyModal from '../components/SurveyModal';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';
const api = process.env.REACT_APP_API;

function getConfig() {
  const token = window.localStorage.getItem('token');
  return { headers: { Authorization: `bearer ${token}` } };
}

function formatKey(key) {
  if (typeof key !== 'string') return '';
  return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function getProfileStrengthTier(pct) {
  if (pct >= 100) return { label: 'Complete', color: '#2ECC71', icon: '🏆' };
  if (pct >= 75) return { label: 'Gold', color: '#D4A016', icon: '🥇' };
  if (pct >= 50) return { label: 'Silver', color: '#94A3B8', icon: '🥈' };
  return { label: 'Bronze', color: '#CD7F32', icon: '🥉' };
}

/* ── Accordion section ─────────────────────────────────────────────── */
function AccordionSection({ icon, title, subtitle, children, defaultOpen, dark, c }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <button
        type="button"
        className="clisha-x-profile-accordion-btn"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: CLEAN_FONTS.body,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
            }}
          >
            {icon}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: c.text2, marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        <span style={{ fontSize: 10, color: c.text3, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={{ padding: '18px 18px 20px', borderTop: `1px solid ${c.border}` }}>{children}</div>
      )}
    </div>
  );
}

/* ── Data row (vertical) ─────────────────────────────────────────── */
function DataRow({ label, value, c }) {
  if (value == null || value === '') return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 0', borderBottom: `1px solid ${c.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{value}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dark } = useClishaThemeToggle();

  const user = useSelector((state) => state.user?.data);
  const userLoading = useSelector((state) => state.user?.loading);
  const surveyProfile = useSelector((state) => state.general?.surveyProfile);
  const completeSurveyProfile = useSelector((state) => state.general?.completeSurveyProfile);

  const [isEditable, setIsEditable] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const data = user?.user;
  const [userDetails, setUserDetails] = useState({
    firstname: data?.firstname ?? '',
    lastname: data?.lastname ?? '',
    gender: data?.gender ?? '',
    phone: data?.phone ?? '',
    country: data?.country ?? '',
    language: data?.language ?? '',
    birth_date: data?.birth_date ? moment(data.birth_date).format('YYYY-MM-DD') : '',
    region: data?.region ?? '',
  });

  const countryList = Country.getAllCountries();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserSurveyProfile());
    dispatch(getSurveyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setUserDetails({
        firstname: data?.firstname ?? '',
        lastname: data?.lastname ?? '',
        gender: data?.gender ?? '',
        phone: data?.phone ?? '',
        country: data?.country ?? '',
        language: data?.language ?? '',
        birth_date: data?.birth_date ? moment(data.birth_date).format('YYYY-MM-DD') : '',
        region: data?.region ?? '',
      });
    }
  }, [data]);

  const profileCompletePercentage = useCallback(() => {
    if (!user?.user) return 0;
    const entries = ['firstname', 'lastname', 'gender', 'birth_date', 'phone', 'country', 'language', 'region', 'photo'];
    const completed = entries.filter((e) => user.user[e]).length;
    return Math.round((completed / 9) * 100);
  }, [user]);

  const perProfile = profileCompletePercentage();
  const strengthTier = getProfileStrengthTier(perProfile);
  const balance = user?.rank?.balance ?? 0;
  const c = dark ? CLEAN.dark : CLEAN.light;

  const handlePhotoUpload = (e) => {
    const photo = e.target.files?.[0];
    if (!photo) return;
    const form = new FormData();
    form.append('photo', photo);
    setPhotoLoading(true);
    axios
      .post(`${api}/user/profile/photo`, form, getConfig())
      .then(() => {
        setPhotoLoading(false);
        toast.success('Profile photo updated!');
        dispatch(getUser());
      })
      .catch(() => {
        setPhotoLoading(false);
        toast.error("Couldn't upload photo. Try again.");
      });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileLoading(true);
    axios
      .post(`${api}/user/profile`, userDetails, getConfig())
      .then(() => {
        setProfileLoading(false);
        toast.success('Profile updated successfully!');
        setIsEditable(false);
        dispatch(getUser());
      })
      .catch((err) => {
        setProfileLoading(false);
        if (err.response?.status === 400) {
          toast.error('All fields are required.');
        } else {
          toast.error('Something went wrong. Try again.');
        }
      });
  };

  const copyReferral = () => {
    const code = data?.clishaReferralCode || data?.clishaId;
    if (code) navigator.clipboard.writeText(code).then(() => toast.success('Copied!'));
  };

  const copyInviteLink = () => {
    const code = data?.clishaReferralCode || data?.clishaId;
    const url = `${window.location.origin}/signup?referredBy=${code}`;
    navigator.clipboard.writeText(url).then(() => toast.success('Invite link copied!'));
  };

  if (userLoading) return <ClishaLoader label="Loading profile…" />;

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
          .clisha-x-profile-layout { flex-direction: column !important; gap: 20 !important; }
          .clisha-x-profile-sidebar { position: static !important; width: 100% !important; }
          .clisha-x-profile-hero { padding: 20 !important; gap: 16 !important; }
          .clisha-x-profile-hero .clisha-x-profile-avatar { width: 80px !important; height: 80px !important; }
          .clisha-x-profile-hero .clisha-x-profile-name { font-size: 20px !important; }
          .clisha-x-profile-hero .clisha-x-profile-btns button { padding: 12px 20px !important; font-size: 14px !important; min-height: 44px !important; }
          .clisha-x-profile-accordion-btn { padding: 14px 16px !important; min-height: 52px !important; font-size: 15px !important; }
        }
        @media (max-width: 480px) {
          .clisha-x-profile-hero { padding: 16 !important; }
          .clisha-x-profile-hero .clisha-x-profile-avatar { width: 72px !important; height: 72px !important; }
          .clisha-x-profile-hero .clisha-x-profile-name { font-size: 18px !important; }
          .clisha-x-profile-hero .clisha-x-profile-stats { flex-direction: column !important; gap: 12 !important; }
        }
      `}</style>

      {/* ── Layer 1: Player Card (centered hero) ─────────────────────── */}
      <div
        className="clisha-x-profile-hero"
        style={{
          background: `linear-gradient(135deg,${c.card} 0%,${c.bg3} 100%)`,
          border: `1px solid ${c.border}`,
          borderRadius: 16,
          padding: 28,
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 16,
        }}
      >
        <div style={{ position: 'relative' }}>
          <label
            htmlFor="profile-photo-upload"
            style={{ display: 'block', cursor: photoLoading ? 'wait' : 'pointer', opacity: photoLoading ? 0.7 : 1 }}
          >
            <div
              className="clisha-x-profile-avatar"
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                overflow: 'hidden',
                border: `3px solid ${c.goldB}`,
                boxShadow: `0 0 0 1px ${c.border}`,
                background: c.bg3,
              }}
            >
              <img
                src={ProfilePicture({ gender: data?.gender, photo: data?.photo })}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: c.gold,
                color: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              📷
            </div>
          </label>
          <input id="profile-photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} disabled={photoLoading} />
        </div>

        <div>
          <div className="clisha-x-profile-name" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 24, fontWeight: 700, color: c.text, marginBottom: 6 }}>
            {data?.username || 'User'}
          </div>
          {data?.hometown && (
            <div style={{ fontSize: 12, color: c.text2, marginBottom: 8 }}>📍 {data.hometown}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.gold, background: c.goldL, border: `1px solid ${c.goldB}`, borderRadius: 6, padding: '4px 10px' }}>
              {user?.rank?.rankName || 'Member'}
            </span>
            {user?.rank?.rankId != null && (
              <span style={{ fontSize: 11, fontWeight: 700, color: c.text2, background: c.bg4, border: `1px solid ${c.border}`, borderRadius: 6, padding: '4px 8px' }}>
                Lv. {user.rank.rankId}
              </span>
            )}
          </div>

          <div className="clisha-x-profile-stats" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: c.text3 }}>Points</div>
              <div style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 18, fontWeight: 700, color: c.gold }}>{Number(balance).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: c.text3 }}>Profile</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 80, height: 8, background: c.bg4, borderRadius: 99, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${perProfile}%`,
                      background: `linear-gradient(90deg,${strengthTier.color},${c.gold})`,
                      borderRadius: 99,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: strengthTier.color }}>{strengthTier.icon} {perProfile}%</span>
              </div>
            </div>
          </div>

          <div className="clisha-x-profile-btns" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {!isEditable && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditable(true)}
                  style={{
                    padding: '10px 18px',
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
                  ✏️ Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowSurvey(true)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: `1px solid ${c.blueB}`,
                    background: c.blueL,
                    color: c.blue,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: CLEAN_FONTS.body,
                  }}
                >
                  📋 Update Survey
                </button>
              </>
            )}
            {isEditable && (
              <button
                type="button"
                onClick={() => setIsEditable(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  border: `1px solid ${c.border}`,
                  background: c.bg3,
                  color: c.text2,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: CLEAN_FONTS.body,
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Layer 2: Content + Sidebar ───────────────────────────────── */}
      <div
        className="clisha-x-profile-layout"
        style={{
          display: 'flex',
          gap: 24,
          flex: 1,
          alignItems: 'flex-start',
        }}
      >
        {/* Main: accordion sections */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AccordionSection icon="👤" title={t('profile.personal_info') || 'Personal Info'} subtitle="Name, gender, birth date" defaultOpen dark={dark} c={c}>
            {!isEditable ? (
              <div>
                <DataRow label={t('profile.name') || 'Name'} value={`${data?.firstname || ''} ${data?.lastname || ''}`.trim()} c={c} />
                <DataRow label={t('profile.gender') || 'Gender'} value={data?.gender} c={c} />
                <DataRow label={t('profile.birth_date') || 'Birth Date'} value={data?.birth_date ? moment(data.birth_date).format('Do MMMM YYYY') : ''} c={c} />
                <DataRow label={t('profile.phone') || 'Phone'} value={data?.phone} c={c} />
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <GamifiedInput label="First name" value={userDetails.firstname} onChange={(v) => setUserDetails({ ...userDetails, firstname: v })} placeholder="First name" dark={dark} icon="👤" />
                <GamifiedInput label="Last name" value={userDetails.lastname} onChange={(v) => setUserDetails({ ...userDetails, lastname: v })} placeholder="Last name" dark={dark} icon="👤" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.gold, marginBottom: 8 }}>Gender</div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {['Male', 'Female'].map((g) => (
                      <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, color: c.text }}>
                        <input type="radio" name="gender" value={g} checked={userDetails.gender === g} onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })} style={{ accentColor: c.gold }} />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
                <GamifiedInput label="Birth date" type="date" value={userDetails.birth_date} onChange={(v) => setUserDetails({ ...userDetails, birth_date: v })} dark={dark} icon="📅" />
                <GamifiedInput label="Phone" value={userDetails.phone} onChange={(v) => setUserDetails({ ...userDetails, phone: v })} placeholder="Phone" dark={dark} icon="📱" />
                <button type="submit" disabled={profileLoading} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${c.gold},${c.orange})`, color: '#1a1a1a', fontSize: 14, fontWeight: 700, cursor: profileLoading ? 'wait' : 'pointer', fontFamily: CLEAN_FONTS.body }}>
                  {profileLoading ? 'Updating…' : 'Update Profile'}
                </button>
              </form>
            )}
          </AccordionSection>

          <AccordionSection icon="📧" title={t('profile.contact_info') || 'Contact Info'} subtitle="Email, phone, location" dark={dark} c={c}>
            {!isEditable ? (
              <div>
                <DataRow label={t('profile.email') || 'Email'} value={data?.email} c={c} />
                <DataRow label={t('profile.phone') || 'Phone'} value={data?.phone} c={c} />
                <DataRow label={t('profile.country') || 'Country'} value={data?.country} c={c} />
                <DataRow label={t('profile.language') || 'Language'} value={data?.language} c={c} />
                <DataRow label={t('profile.region') || 'Region'} value={data?.region} c={c} />
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.gold, marginBottom: 8 }}>Country</div>
                  <select value={userDetails.country} onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${c.border}`, background: dark ? c.bg3 : c.card, color: c.text, fontSize: 14, fontFamily: CLEAN_FONTS.body }}>
                    <option value="">Select country</option>
                    {countryList?.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.gold, marginBottom: 8 }}>Language</div>
                  <select value={userDetails.language} onChange={(e) => setUserDetails({ ...userDetails, language: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${c.border}`, background: dark ? c.bg3 : c.card, color: c.text, fontSize: 14, fontFamily: CLEAN_FONTS.body }}>
                    <option value="">Select language</option>
                    {['English', 'Deutsch', 'French', 'Portuguese'].map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.gold, marginBottom: 8 }}>Region (Timezone)</div>
                  <select value={userDetails.region} onChange={(e) => setUserDetails({ ...userDetails, region: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${c.border}`, background: dark ? c.bg3 : c.card, color: c.text, fontSize: 14, fontFamily: CLEAN_FONTS.body }}>
                    <option value="">Select region</option>
                    {timezones?.map((item) => <option key={item.tzCode} value={item.tzCode}>{item.tzCode}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={profileLoading} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${c.gold},${c.orange})`, color: '#1a1a1a', fontSize: 14, fontWeight: 700, cursor: profileLoading ? 'wait' : 'pointer', fontFamily: CLEAN_FONTS.body }}>
                  {profileLoading ? 'Updating…' : 'Update Profile'}
                </button>
              </form>
            )}
          </AccordionSection>

          {(surveyProfile?.hasChildren != null || surveyProfile?.numberOfChildren || (surveyProfile?.singleChoiceAnswers && Object.keys(surveyProfile.singleChoiceAnswers).length > 0) || (surveyProfile?.multiChoiceAnswers && Object.keys(surveyProfile.multiChoiceAnswers).length > 0)) && (
            <AccordionSection icon="📋" title="Survey Profile" subtitle="Your preferences" dark={dark} c={c}>
              <div>
                {surveyProfile?.hasChildren != null && <DataRow label="Has Children" value={formatKey(String(surveyProfile.hasChildren))} c={c} />}
                {surveyProfile?.numberOfChildren != null && <DataRow label="Number of Children" value={surveyProfile.numberOfChildren} c={c} />}
                {surveyProfile?.singleChoiceAnswers && Object.entries(surveyProfile.singleChoiceAnswers).map(([k, v]) => <DataRow key={k} label={formatKey(k)} value={v} c={c} />)}
                {surveyProfile?.multiChoiceAnswers && Object.entries(surveyProfile.multiChoiceAnswers).map(([k, v]) => <DataRow key={k} label={formatKey(k)} value={Array.isArray(v) ? v.join(', ') : v} c={c} />)}
              </div>
            </AccordionSection>
          )}
        </div>

        {/* Sidebar: sticky referral */}
        <div
          className="clisha-x-profile-sidebar"
          style={{
            width: 280,
            flexShrink: 0,
            position: 'sticky',
            top: 16,
          }}
        >
          <div
          style={{
            background: `linear-gradient(180deg,${c.card} 0%,${c.bg3} 100%)`,
            border: `1px solid ${c.border}`,
            borderRadius: 14,
            padding: 20,
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: c.goldL, border: `1px solid ${c.goldB}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎁</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>Invite & Earn</div>
                <div style={{ fontSize: 11, color: c.text2 }}>Share your referral code</div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: c.text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Your referral code</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, padding: '10px 14px', background: c.bg3, borderRadius: 10, border: `1px solid ${c.border}`, fontFamily: CLEAN_FONTS.mono, fontSize: 12, fontWeight: 600, color: c.gold, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {(data?.clishaReferralCode || data?.clishaId || '—')?.slice(0, 20)}...
                </div>
                <button type="button" onClick={copyReferral} style={{ padding: '10px 16px', borderRadius: 10, border: `1px solid ${c.goldB}`, background: c.goldL, color: c.gold, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: CLEAN_FONTS.body }}>
                  Copy
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={copyInviteLink}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 10,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              📤 Invite a friend
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to={`${BASE}/dashboard`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.text2, textDecoration: 'none', fontFamily: CLEAN_FONTS.body }}>
          ← Back to Dashboard
        </Link>
      </div>

      {showSurvey && (
        <SurveyModal
          initialSurveyData={completeSurveyProfile?.survey}
          initialStep={completeSurveyProfile?.currentStep || 1}
          isUpdate={completeSurveyProfile?.isUpdate || false}
          onClose={() => { setShowSurvey(false); dispatch(getUserSurveyProfile()); }}
        />
      )}
    </div>
  );
}
