/* eslint-disable import/no-extraneous-dependencies */
import { Check, AlertCircle, ExternalLink, TrendingUp } from 'lucide-react';


// Statistics Card Component
export const StatsCard = ({ icon: Icon, value, label, color }) => (
  <div className="col-4">
    <div className="text-center p-3 bg-light rounded-3">
      <Icon className={`${color} mb-2`} size={24} />
      <div className="fw-bold text-dark h5 mb-0">{value}</div>
      <small className="text-muted">{label}</small>
    </div>
  </div>
);

// Task Breakdown Component
export const TaskBreakdown = ({ missedTasks }) => (
  <div className="card border-0 bg-gradient mb-4" style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' }}>
    <div className="card-body p-3">
      <h6 className="fw-bold text-dark mb-3 d-flex align-items-center">
        <AlertCircle className="me-2" size={20} />
        Available Tasks by Platform
      </h6>
      <div className="row g-2">
        {Object.entries(missedTasks).map(([platform, count]) => (
          <div key={platform} className="col-6">
            <div className="bg-white bg-opacity-50 rounded-2 p-2 d-flex justify-content-between align-items-center">
              <span className="small fw-medium text-dark">{platform}</span>
              <span className="badge bg-dark rounded-pill text-white">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Setup Guide Component
export const SetupGuide = () => (
  <div className="card border-0 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
    <div className="card-body p-3">
      <div className="d-flex align-items-start">
        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 flex-shrink-0">
          <ExternalLink className="text-primary" size={20} />
        </div>
        <div>
          <h6 className="fw-semibold text-dark mb-2">Quick Setup Guide</h6>
          <ul className="small text-muted mb-0 ps-3">
            <li>Select the social platforms you use regularly</li>
            <li>Ensure you're logged into these platforms in your browser</li>
            <li>Complete tasks for automatic tracking and rewards</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Pro Tip Component
export const ProTip = () => (
  <div className="card border-0 mt-4" style={{ backgroundColor: '#e8f4fd' }}>
    <div className="card-body p-3">
      <div className="d-flex align-items-start">
        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3 flex-shrink-0">
          <ExternalLink size={18} className="text-info" />
        </div>
        <div>
          <h6 className="fw-semibold text-info mb-1">💡 Pro Tip</h6>
          <p className="small text-info mb-0">
            Make sure you're logged into your selected platforms in this browser for seamless task completion and automatic reward tracking.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Platform Card Component
export const PlatformCard = ({ platform, isSelected, onToggle, availableTasks, isExisting = false }) => (
  <div className="col-lg-6 col-12">
    <div
      className={`card border-2 h-100 cursor-pointer transition-all ${
        isSelected ? 'border-primary shadow-sm' : 'border-light hover-shadow'
      }`}
      style={{
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isSelected ? 'translateY(-2px)' : 'none'
      }}
      onClick={() => onToggle(platform.name)}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center flex-grow-1" style={{ columnGap: '0.5rem' }}>
            <div 
              className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${platform.color} position-relative`}
              style={{ width: '48px', height: '48px', fontSize: '20px' }}
            >
              <span className="text-white">{platform.icon}</span>
              {isExisting && (
                <div 
                  className="position-absolute bg-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    top: '-2px', 
                    right: '-2px',
                    border: '2px solid white'
                  }}
                >
                  <Check size={8} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-1">
                <h6 className="fw-bold text-dark mb-0 me-2">{platform.name}</h6>
                {isExisting && (
                  <span className="badge bg-success text-white small">
                    Connected
                  </span>
                )}
              </div>
              <p className="small text-muted mb-0">{platform.description}</p>
              {availableTasks && (
                <div className="mt-2">
                  <span className="badge bg-warning text-dark">
                    {availableTasks} tasks available
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div 
            className={`rounded-circle border-3 d-flex align-items-center justify-content-center ms-3 ${
              isSelected ? 'border-primary bg-primary' : 'border-light bg-white'
            }`} 
            style={{ width: '28px', height: '28px', minWidth: '28px' }}
          >
            {isSelected && <Check size={14} className="text-white" />}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Modal Header Component
export const ModalHeader = ({ title, subtitle, onClose }) => (
  <div 
    className="modal-header border-0 pb-2" 
    style={{ background: 'linear-gradient(135deg, #0e223b 0%, #1f4068 100%)', borderRadius: '16px 16px 0 0' }}
  >
    <div className="d-flex align-items-center text-white">
      <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
        <TrendingUp size={24} className="text-white" />
      </div>
      <div>
        <h4 className="modal-title fw-bold mb-0">{title}</h4>
        <p className="mb-0 small opacity-90">{subtitle}</p>
      </div>
    </div>
    <button 
      type="button" 
      className="btn-close btn-close-white opacity-75" 
      onClick={onClose}
      aria-label="Close"
    />
  </div>
);

// Selection Counter Component
export const SelectionCounter = ({ count }) => (
  <div className="text-center mb-4">
    <div className="bg-light rounded-pill d-inline-block px-4 py-2">
      <span className="fw-semibold text-primary">
        {count} platform{count !== 1 ? 's' : ''} selected
      </span>
    </div>
  </div>
);