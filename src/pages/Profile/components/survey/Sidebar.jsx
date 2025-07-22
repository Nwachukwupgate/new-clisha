const Sidebar = ({ steps, currentStep, progress, goToStep }) => (
    <div className="col-md-4 bg-light border-end">
      <div className="p-4">
        <div className="mb-4">
          <div className="progress mb-2" style={{ height: '8px' }}>
            <div className="progress-bar bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <small className="text-muted">
            Step {currentStep} of {steps.length} ({Math.round(progress)}% complete)
          </small>
        </div>
        <div className="list-group list-group-flush">
          {steps.map(step => (
            <button
              key={step.id}
              className={`list-group-item list-group-item-action border-0 rounded mb-2 ${
                step.id === currentStep
                  ? 'active bg-primary text-white'
                  : step.id < currentStep
                    ? 'bg-success text-white'
                    : 'bg-white'
              }`}
              onClick={() => goToStep(step.id)}
              disabled={step.id > currentStep}
            >
              <div className="d-flex align-items-center">
                <span className="me-3 fs-5">{step.icon}</span>
                <div>
                  <div className="fw-semibold">{step.title}</div>
                  {step.id < currentStep && (
                    <small className="opacity-75">
                      <i className="fas fa-check me-1" />Completed
                    </small>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
);

export default Sidebar;