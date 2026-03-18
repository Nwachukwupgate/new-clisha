/**
 * Clisha Experience — Survey modal (gamified design)
 * New system only. Uses same data flow (useSurveyForm, steps, API).
 */

import React from 'react';
import { useSurveyForm } from '../../../hooks/useSurveyForm';
import { steps } from '../../../json/survey';
import { useClishaThemeToggle } from '../context/ThemeContext';
import { CLEAN, CLEAN_FONTS } from '../design-system/tokens-clean';

/* ── Option chip (single select) ──────────────────────────────────── */
function OptionChip({ label, selected, onClick, dark, c }) {
  const displayText = selected ? `✓ ${label}` : label;
  return (
    <button
      type="button"
      className="clisha-x-survey-option"
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
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = c.border2;
          e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = c.border;
          e.currentTarget.style.background = c.bg3;
        }
      }}
    >
      {displayText}
    </button>
  );
}

/* ── Option chip multi (checkbox style) ────────────────────────────── */
function OptionChipMulti({ label, checked, onChange, dark, c }) {
  return (
    <label
      className="clisha-x-survey-option"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 18px',
        borderRadius: 12,
        border: `2px solid ${checked ? c.goldB : c.border}`,
        background: checked ? c.goldL : c.bg3,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!checked) {
          e.currentTarget.style.borderColor = c.border2;
        }
      }}
      onMouseLeave={(e) => {
        if (!checked) {
          e.currentTarget.style.borderColor = c.border;
        }
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

/* ── Question block ────────────────────────────────────────────────── */
function SurveyQuestionBlock({ question, formData, handleSingleChoice, handleMultiChoice, dark, c }) {
  const renderSingle = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((option) => (
        <OptionChip
          key={option}
          label={option}
          selected={formData.singleChoiceAnswers?.[question.key] === option}
          onClick={() => handleSingleChoice(question.key, option)}
          dark={dark}
          c={c}
        />
      ))}
    </div>
  );

  const renderMulti = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((option) => (
        <OptionChipMulti
          key={option}
          label={option}
          checked={(formData.multiChoiceAnswers?.[question.key] || []).includes(option)}
          onChange={(checked) => handleMultiChoice(question.key, option, checked)}
          dark={dark}
          c={c}
        />
      ))}
    </div>
  );

  const renderSpecial = () => {
    const value = formData[question.key];
    const getMappedValue = (opt) => {
      if (opt === 'Yes') return 'yes';
      if (opt === 'No') return 'no';
      if (opt === 'Prefer not to say') return 'prefer_not_to_say';
      if (opt === "Yes, that's fine") return 'yes';
      if (opt === "No, I'd prefer not") return 'no';
      if (opt === 'Only anonymously') return 'anonymous';
      return opt;
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((option) => (
          <OptionChip
            key={option}
            label={option}
            selected={value === getMappedValue(option)}
            onClick={() => handleSingleChoice(question.key, getMappedValue(option))}
            dark={dark}
            c={c}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>❓</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, fontFamily: CLEAN_FONTS.body, lineHeight: 1.4 }}>
            {question.label}
          </div>
          {question.tooltip && (
            <div style={{ fontSize: 12, color: c.text2, marginTop: 6, lineHeight: 1.5 }}>ℹ️ {question.tooltip}</div>
          )}
        </div>
      </div>
      {question.type === 'single' && renderSingle()}
      {question.type === 'multi' && renderMulti()}
      {question.type === 'special' && renderSpecial()}
    </div>
  );
}

/* ── Children details ─────────────────────────────────────────────── */
function SurveyChildrenDetails({ formData, handleNumberOfChildren, handleMultiChoice, dark, c }) {
  const ages = ['0–3 years', '4–6 years', '7–12 years', '13–17 years'];
  const counts = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: 'More than 3', value: 4 },
  ];
  return (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${c.border}` }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 10 }}>How many children do you have?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {counts.map(({ label, value }) => (
            <OptionChip
              key={value}
              label={label}
              selected={formData.numberOfChildren === value}
              onClick={() => handleNumberOfChildren(value)}
              dark={dark}
              c={c}
            />
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>How old are your children?</div>
        <div style={{ fontSize: 12, color: c.text2, marginBottom: 12 }}>So you see campaigns that fit your family – toys, travel, education by age.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ages.map((age) => (
            <OptionChipMulti
              key={age}
              label={age}
              checked={(formData.multiChoiceAnswers?.children_ages || []).includes(age)}
              onChange={(checked) => handleMultiChoice('children_ages', age, checked)}
              dark={dark}
              c={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SurveyModal({ initialSurveyData = null, initialStep = 1, isUpdate = false, onClose = () => {} }) {
  const { dark } = useClishaThemeToggle();
  const c = dark ? CLEAN.dark : CLEAN.light;

  const {
    formData,
    currentStep,
    currentStepData,
    progress,
    isLoading,
    showModal,
    showChildrenDetails,
    handleSingleChoice,
    handleMultiChoice,
    handleNumberOfChildren,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleSubmit,
    handleClose,
  } = useSurveyForm(initialSurveyData, initialStep);

  const onSubmitWrapper = async (e) => {
    await handleSubmit(e);
    onClose?.();
  };

  const onCloseWrapper = () => {
    handleClose();
    onClose?.();
  };

  if (!showModal) return null;

  const modalTitle = isUpdate ? 'Update Your Profile' : 'Complete Your Profile';
  const submitButtonText = isUpdate ? 'Update Survey' : 'Complete Survey';

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="survey-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onCloseWrapper()}
    >
      <div
        className="clisha-x-survey-modal"
        style={{
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          background: c.card,
          border: `1px solid ${c.border}`,
          borderRadius: 20,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @media (max-width: 640px) {
            .clisha-x-survey-modal { max-width: 100% !important; max-height: 95vh !important; margin: 8px !important; }
            .clisha-x-survey-header { padding: 16px 18px !important; flex-direction: column !important; align-items: flex-start !important; gap: 12 !important; }
            .clisha-x-survey-header-title { font-size: 16px !important; }
            .clisha-x-survey-steps { flex-direction: row !important; overflow-x: auto !important; padding: 12px !important; -webkit-overflow-scrolling: touch !important; }
            .clisha-x-survey-step { min-width: 72px !important; padding: 10px 12px !important; font-size: 12px !important; }
            .clisha-x-survey-step span:last-child { display: none !important; }
            .clisha-x-survey-content { padding: 18px !important; }
            .clisha-x-survey-footer { padding: 16px 18px !important; flex-direction: column !important; gap: 12 !important; }
            .clisha-x-survey-footer button { width: 100% !important; min-height: 44px !important; }
            .clisha-x-survey-option { padding: 14px 16px !important; min-height: 48px !important; font-size: 14px !important; }
          }
          @media (max-width: 400px) {
            .clisha-x-survey-modal { margin: 4px !important; max-height: 96vh !important; }
          }
        `}</style>

        {/* Header */}
        <div
          className="clisha-x-survey-header"
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
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
              📋
            </div>
            <div>
              <div id="survey-modal-title" className="clisha-x-survey-header-title" style={{ fontFamily: CLEAN_FONTS.mono, fontSize: 18, fontWeight: 700, color: c.text }}>
                {modalTitle}
              </div>
              <div style={{ fontSize: 12, color: c.text2, marginTop: 2 }}>
                Step {currentStep} of {steps.length} · {Math.round(progress)}% complete
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseWrapper}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: `1px solid ${c.border}`,
              background: 'transparent',
              color: c.text2,
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: c.bg4, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: `linear-gradient(90deg,${c.gold},${c.orange})`,
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        {/* Step pills */}
        <div
          className="clisha-x-survey-steps"
          style={{
            display: 'flex',
            gap: 8,
            padding: '16px 24px',
            overflowX: 'auto',
            borderBottom: `1px solid ${c.border}`,
            background: c.bg3,
          }}
        >
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                className="clisha-x-survey-step"
                onClick={() => step.id <= currentStep && goToStep(step.id)}
                disabled={step.id > currentStep}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: `1px solid ${isActive ? c.goldB : c.border}`,
                  background: isActive ? c.goldL : isDone ? c.greenL : 'transparent',
                  color: isActive ? c.gold : isDone ? c.green : c.text3,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: step.id > currentStep ? 'not-allowed' : 'pointer',
                  fontFamily: CLEAN_FONTS.body,
                  flexShrink: 0,
                  opacity: step.id > currentStep ? 0.5 : 1,
                }}
              >
                <span>{step.icon}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{step.title}</span>
                {isDone && <span>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="clisha-x-survey-content" style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{currentStepData?.icon}</span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: c.text, fontFamily: CLEAN_FONTS.body }}>
                {currentStepData?.title}
              </h3>
              {isUpdate && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: c.blue,
                    background: c.blueL,
                    border: `1px solid ${c.blueB}`,
                    borderRadius: 6,
                    padding: '4px 10px',
                  }}
                >
                  Updating
                </span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: c.text2, lineHeight: 1.5 }}>
              {isUpdate ? 'Review and update your answers below.' : 'Help us personalize your experience.'}
            </p>
          </div>

          <div>
            {currentStepData?.questions?.map((q) => (
              <SurveyQuestionBlock
                key={q.key}
                question={q}
                formData={formData}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
                dark={dark}
                c={c}
              />
            ))}
            {showChildrenDetails && (
              <SurveyChildrenDetails
                formData={formData}
                handleNumberOfChildren={handleNumberOfChildren}
                handleMultiChoice={handleMultiChoice}
                dark={dark}
                c={c}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="clisha-x-survey-footer"
          style={{
            padding: '20px 24px',
            borderTop: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: `1px solid ${c.border}`,
              background: c.bg3,
              color: c.text2,
              fontSize: 14,
              fontWeight: 600,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              fontFamily: CLEAN_FONTS.body,
              opacity: currentStep === 1 ? 0.5 : 1,
            }}
          >
            ← Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={goToNextStep}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmitWrapper}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg,${c.gold},${c.orange})`,
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 700,
                cursor: isLoading ? 'wait' : 'pointer',
                fontFamily: CLEAN_FONTS.body,
              }}
            >
              {isLoading ? 'Submitting…' : `✓ ${submitButtonText}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
