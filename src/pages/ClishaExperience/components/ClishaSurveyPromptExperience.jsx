/**
 * Clisha Experience — Survey reminder popups (replaces old SurveyPrompt for /clisha-x only)
 * Same behavior as Profile/SurveyPopUps: useSurveyReminder + POST /user/my-profile
 * Design: CLEAN tokens, no react-bootstrap, no edits to old Profile components
 */

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSurveyReminder } from '../../../hooks/useSurveyReminder';
import { getUserSurveyStatus } from '../../../store/General';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

const BASE = '/clisha-x';

const api = process.env.REACT_APP_API;

function getConfig() {
  return { headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` } };
}

function mapSpecialOption(option) {
  if (option === 'Yes') return 'yes';
  if (option === 'No') return 'no';
  if (option === 'Prefer not to say') return 'prefer_not_to_say';
  if (option === "Yes, that's fine") return 'yes';
  if (option === "No, I'd prefer not") return 'no';
  if (option === 'Only anonymously') return 'anonymous';
  return option;
}

/* ── Single option chip ─────────────────────────────────────────── */
function ReminderOptionChip({ label, selected, onClick, c }) {
  return (
    <button
      type="button"
      className="clisha-x-survey-reminder-option"
      onClick={onClick}
      style={{
        padding: '12px 18px',
        borderRadius: 12,
        border: `2px solid ${selected ? c.goldB : c.border}`,
        background: selected ? c.goldL : c.bg3,
        color: selected ? c.gold : c.text2,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: CLEAN_FONTS.body,
        textAlign: 'left',
        transition: 'all 0.2s',
      }}
    >
      {selected ? `✓ ${label}` : label}
    </button>
  );
}

function ReminderOptionMulti({ label, checked, onChange, c }) {
  return (
    <label
      className="clisha-x-survey-reminder-option"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 18px',
        borderRadius: 12,
        border: `2px solid ${checked ? c.goldB : c.border}`,
        background: checked ? c.goldL : c.bg3,
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 18, height: 18, accentColor: c.gold, cursor: 'pointer' }}
      />
      <span style={{ fontSize: 14, fontWeight: 500, color: checked ? c.gold : c.text }}>{label}</span>
    </label>
  );
}

/* ── One-question overlay (replaces SurveyStepModal) ──────────────── */
function SurveyReminderQuestionOverlay({ show, question, onSubmit, onClose, c }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!question) return;
    setSelected(question.type === 'single' || question.type === 'special' ? null : []);
  }, [question]);

  const toggleOption = useCallback(
    (option) => {
      if (!question) return;
      if (question.type === 'single' || question.type === 'special') {
        setSelected((prev) => (prev === option ? null : option));
      } else {
        setSelected((prev) => {
          const arr = Array.isArray(prev) ? prev : [];
          return arr.includes(option) ? arr.filter((o) => o !== option) : [...arr, option];
        });
      }
    },
    [question]
  );

  const isValid =
    question?.type === 'single' || question?.type === 'special'
      ? selected !== null
      : Array.isArray(selected) && selected.length > 0;

  const getButtonText = () => {
    if (!question) return 'Continue';
    if (question.type === 'single' || question.type === 'special') {
      return selected ? `Continue with "${selected}"` : 'Select an option';
    }
    return !Array.isArray(selected) || selected.length === 0
      ? 'Select at least one option'
      : `Continue with ${selected.length} selected`;
  };

  const handleSubmitClick = () => {
    if (!question || !isValid) return;
    if (question.type === 'single' || question.type === 'special') {
      onSubmit(question.type === 'special' ? mapSpecialOption(selected) : selected);
    } else {
      onSubmit(selected);
    }
  };

  if (!show || !question) return null;

  const isMulti = question.type === 'multi';

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="clisha-survey-reminder-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          maxHeight: '90vh',
          overflow: 'auto',
          background: c.card,
          border: `1px solid ${c.border}`,
          borderRadius: 20,
          boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @media (max-width: 480px) {
            .clisha-x-survey-reminder-option { min-height: 48px !important; }
          }
        `}</style>
        <div style={{ padding: '22px 24px 20px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: 10,
              background: c.goldL,
              border: `1px solid ${c.goldB}`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: c.gold,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Quick question
          </div>
          <h2
            id="clisha-survey-reminder-title"
            style={{
              margin: '0 0 8px',
              fontFamily: CLEAN_FONTS.mono,
              fontSize: 18,
              fontWeight: 700,
              color: c.text,
              lineHeight: 1.35,
            }}
          >
            {question.label}
          </h2>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: c.text2 }}>
            {question.type === 'multi' ? 'Select all that apply' : 'Select one option'}
          </p>
          {question.tooltip && (
            <p style={{ margin: '0 0 18px', fontSize: 12, color: c.text3, lineHeight: 1.5 }}>{question.tooltip}</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {question.options.map((option) => {
              if (isMulti) {
                const checked = Array.isArray(selected) && selected.includes(option);
                return (
                  <ReminderOptionMulti
                    key={option}
                    label={option}
                    checked={checked}
                    onChange={(chk) => toggleOption(option)}
                    c={c}
                  />
                );
              }
              const sel = selected === option;
              return (
                <ReminderOptionChip
                  key={option}
                  label={option}
                  selected={sel}
                  onClick={() => toggleOption(option)}
                  c={c}
                />
              );
            })}
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmitClick}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: 12,
              border: 'none',
              background: isValid ? `linear-gradient(135deg,${c.gold},${c.orange})` : c.bg4,
              color: isValid ? '#1a1a1a' : c.text3,
              fontSize: 14,
              fontWeight: 700,
              cursor: isValid ? 'pointer' : 'not-allowed',
              fontFamily: CLEAN_FONTS.body,
              minHeight: 48,
            }}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Continue overlay (replaces ContinueSurveyModal) ─────────────── */
function ContinueSurveyOverlay({ show, onContinue, onClose, c }) {
  if (!show) return null;
  return (
    <div
      role="dialog"
      aria-modal
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: c.card,
          border: `1px solid ${c.border}`,
          borderRadius: 20,
          padding: '24px 22px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
        <h3 style={{ margin: '0 0 8px', fontFamily: CLEAN_FONTS.mono, fontSize: 17, fontWeight: 700, color: c.text }}>
          Continue survey?
        </h3>
        <p style={{ margin: '0 0 22px', fontSize: 13, color: c.text2, lineHeight: 1.5 }}>
          Would you like to answer more questions in your profile?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            type="button"
            onClick={onContinue}
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg,${c.gold},${c.orange})`,
              color: '#1a1a1a',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: CLEAN_FONTS.body,
              minHeight: 48,
            }}
          >
            Yes, continue
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: `1px solid ${c.border}`,
              background: 'transparent',
              color: c.text2,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: CLEAN_FONTS.body,
              minHeight: 48,
            }}
          >
            No, I&apos;m done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClishaSurveyPromptExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark } = useClishaThemeToggle();
  const c = dark ? CLEAN.dark : CLEAN.light;

  const { show, setShow, questionData } = useSurveyReminder();
  const [showContinue, setShowContinue] = useState(false);

  const handleSubmit = async (answers) => {
    if (!questionData) return;

    const { question } = questionData;

    const surveyData = {
      currentStep: questionData.step.id,
      isComplete: false,
    };

    if (question.type === 'single' || question.type === 'special') {
      surveyData.singleChoiceAnswers = { [question.key]: answers };
    } else {
      surveyData.multiChoiceAnswers = { [question.key]: answers };
    }

    try {
      await axios.post(`${api}/user/my-profile`, surveyData, getConfig());
      setShow(false);
      setShowContinue(true);
      dispatch(getUserSurveyStatus());
    } catch (e) {
      console.error('Survey reminder save failed', e);
    }
  };

  const handleContinue = () => {
    setShowContinue(false);
    navigate(`${BASE}/dashboard/profile`);
  };

  return (
    <>
      <SurveyReminderQuestionOverlay
        show={show}
        question={questionData?.question}
        onSubmit={handleSubmit}
        onClose={() => setShow(false)}
        c={c}
      />
      <ContinueSurveyOverlay
        show={showContinue}
        onContinue={handleContinue}
        onClose={() => setShowContinue(false)}
        c={c}
      />
    </>
  );
}
