import { Modal, Button } from "react-bootstrap";


const ContinueSurveyModal = ({ show,onContinue, onClose }) => (
    <Modal show={show} centered>
      <Modal.Body className="text-center p-4">
        <h6 className="fw-bold mb-3">Continue Survey?</h6>
        <p className="text-muted small mb-4">
          Would you like to answer more questions?
        </p>
        <div className="d-flex justify-content-center gap-2 m-2">
          <Button variant="primary" onClick={onContinue}>
            Yes, continue
          </Button>
          <Button variant="outline-secondary" onClick={onClose}>
            No, I’m done
          </Button>
        </div>
      </Modal.Body>
    </Modal>
);

export default ContinueSurveyModal;
