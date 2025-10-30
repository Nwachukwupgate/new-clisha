import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SurveyStepModal = ({
  show,
  question,
  onSubmit,
}) => {
  const [selected, setSelected] = useState(
    question?.type === 'single' ? null : []
  );

  //  NEW: Handle both single and multi selection
  const toggleOption = (option) => {
    if (question?.type === 'single') {
      // For single choice, just replace the selection
      setSelected(selected === option ? null : option);
      return;
    }
    
    // For multi choice, toggle in array
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  //  NEW: Determine if submit button should be enabled
  const isValid = question?.type === 'single' 
    ? selected !== null 
    : selected.length > 0;

  //  NEW: Format selected value(s) for display
  const getButtonText = () => {
    if (question?.type === 'single') {
      return selected 
        ? `Continue with "${selected}"` 
        : "Select an option";
    }
    
    return selected.length === 0
      ? "Select at least one option"
      : `Continue with ${selected.length} selected`;
  };

  if (!question) return null;

  return (
    <Modal show={show} centered>
      <Modal.Body className="p-4">
        <div 
          style={{ 
            backgroundColor: "#D4E3F5", 
            borderRadius: "15px", 
            padding: "8px 16px", 
            width: "fit-content", 
            marginBottom: "16px", 
            fontSize: "14px", 
            color: "#1B4C84" 
          }}
        >
          <small className="text-primary fw-semibold d-block mb-1">Question</small>
        </div>
        
        <h5 className="fw-bold mb-2">{question.label}</h5>
        
        {/* ✅ NEW: Show different subtitle based on question type */}
        <p className="small mb-2">
          {question.type === 'single' 
            ? "Select one option" 
            : "Select all that apply"}
        </p>

        <p className="text-muted small mb-4">
          {question?.tooltip}
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {question.options.map((option) => {
            // ✅ NEW: Check selection differently for single vs multi
            const isSelected = question.type === 'single'
              ? selected === option
              : selected.includes(option);

            return (
              <Button
                key={option}
                style={{ 
                  backgroundColor: isSelected ? "#D4E3F5" : "white", 
                  borderColor: isSelected ? "#1B4C84" : "#ced4da", 
                  color: isSelected ? "#1B4C84" : "black", 
                  borderRadius: "8px", 
                  padding: "8px 16px" 
                }}
                onClick={() => toggleOption(option)}
                className="px-3 py-2 m-2"
              >
                {option}
              </Button>
            );
          })}
        </div>

        <Button
          className="w-100"
          disabled={!isValid}
          onClick={() => onSubmit(
            question?.type === 'single' 
              ? selected 
              : selected
          )}
          style={{
            backgroundColor: "#1B4C84",
            borderColor: "#1B4C84",
            color: "white",
            borderRadius: "6px",
          }}
        >
          {getButtonText()}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SurveyStepModal;