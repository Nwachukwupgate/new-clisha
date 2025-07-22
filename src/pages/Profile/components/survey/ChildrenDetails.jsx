const ChildrenDetails = ({ formData, handleNumberOfChildren, handleMultiChoice }) => (
    <div className="border-top pt-4 mt-4">
      <div className="mb-3">
        <label className="form-label fw-semibold">How many children do you have?</label>
        <div className="row">
          {['1', '2', '3', 'More than 3'].map((num, i) => (
            <div key={i} className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="numberOfChildren"
                  id={`children_${i}`}
                  value={parseInt(num === 'More than 3' ? '4' : num, 10)}
                  checked={formData.numberOfChildren === parseInt(num === 'More than 3' ? '4' : num, 10)}
                  onChange={(e) => handleNumberOfChildren(e.target.value)}
                />
                <label className="form-check-label" htmlFor={`children_${i}`}>{num}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">How old are your children?</label>
        <small className="text-muted d-block mb-2">
          ℹ️ So you see campaigns that fit your family – for example, toys, travel, or education by age group.
        </small>
        <div className="row">
          {['0–3 years', '4–6 years', '7–12 years', '13–17 years'].map((age, i) => (
            <div key={i} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`age_${i}`}
                  value={age}
                  checked={(formData.multiChoiceAnswers.children_ages || []).includes(age)}
                  onChange={(e) => handleMultiChoice('children_ages', age, e.target.checked)}
                />
                <label className="form-check-label" htmlFor={`age_${i}`}>{age}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

export default ChildrenDetails;