import  { useState } from "react";
import { Modal, Button } from "react-bootstrap";


const SurveyStepModal = ({
  show,
  question,
  onSubmit,
}) => {
  const [selected, setSelected] = useState([]);

  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  if (!question) return null;

  return (
    <Modal show={show} centered>
      <Modal.Body className="p-4">
       <div style={{ backgroundColor: "#D4E3F5", borderRadius: "15px", padding: "8px 16px", width: "fit-content", marginBottom: "16px", fontSize: "14px", color: "#1B4C84" }}>
        <small className="text-primary fw-semibold d-block mb-1">Question</small>
       </div>
        <h5 className="fw-bold mb-2">{question.label}</h5>
        <p className="text-muted small mb-4">Select all that apply</p>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {question.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
            <Button
              key={option}
              style={{ backgroundColor: isSelected ? "#D4E3F5" : "white", borderColor: isSelected ? "#1B4C84" : "#ced4da", color: isSelected ? "#1B4C84" : "black", borderRadius: "8px", padding: "8px 16px" }}
              onClick={() => toggleOption(option)}
              className="px-3 py-2 m-2"
            >
              {option}
            </Button>
          )})}
        </div>

        <Button
            className="w-100"
            disabled={selected.length === 0}
            onClick={() => onSubmit(selected)}
            style={{
                backgroundColor: "#1B4C84",
                borderColor: "#1B4C84",
                color: "white",
                borderRadius: "6px", // small rounded corners
            }}
        >
            {selected.length === 0
                ? "Select at least one option"
                : `Continue with ${selected.length} selected`}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SurveyStepModal;
