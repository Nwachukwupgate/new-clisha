const QuestionBlock = ({ question, formData, handleSingleChoice, handleMultiChoice }) => {
  const renderSingle = () => (
    <div className="row">
      {question.options.map((option, i) => (
        <div key={i} className="col-md-6 mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={question.key}
              id={`${question.key}_${i}`}
              value={option}
              checked={formData.singleChoiceAnswers[question.key] === option}
              onChange={(e) => handleSingleChoice(question.key, e.target.value)}
            />
            <label className="form-check-label" htmlFor={`${question.key}_${i}`}>{option}</label>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMulti = () => (
    <div className="row">
      {question.options.map((option, i) => (
        <div key={i} className="col-md-6 mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`${question.key}_${i}`}
              value={option}
              checked={(formData.multiChoiceAnswers[question.key] || []).includes(option)}
              onChange={(e) => handleMultiChoice(question.key, option, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`${question.key}_${i}`}>{option}</label>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSpecial = () => {
    const value = formData[question.key];
    return (
      <div className="row">
        {question.options.map((option, i) => {
          const mappedValue =
            option === "Yes" ? "yes" :
            option === "No" ? "no" :
            option === "Prefer not to say" ? "prefer_not_to_say" :
            option === "Yes, that's fine" ? "yes" :
            option === "No, I'd prefer not" ? "no" :
            option === "Only anonymously" ? "anonymous" : option;

          return (
            <div key={i} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={question.key}
                  id={`${question.key}_${i}`}
                  value={option}
                  checked={value === mappedValue}
                  onChange={() => handleSingleChoice(question.key, mappedValue)}
                />
                <label className="form-check-label" htmlFor={`${question.key}_${i}`}>{option}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold d-flex align-items-center">
        {question.label}
        {question.tooltip && (
          <span className="ms-2 text-primary" style={{ cursor: 'help' }} title={question.tooltip}>
            <i className="fas fa-info-circle" />
          </span>
        )}
      </label>
      {question.tooltip && <small className="text-muted d-block mb-2">ℹ️ {question.tooltip}</small>}
      {question.type === 'single' && renderSingle()}
      {question.type === 'multi' && renderMulti()}
      {question.type === 'special' && renderSpecial()}
    </div>
  );
};

export default QuestionBlock;