/* eslint-disable import/no-extraneous-dependencies */
import { ExternalLink, TrendingUp, Users, Target } from 'lucide-react';
import { ModalHeader, StatsCard, TaskBreakdown, SetupGuide } from "./SocialComponents";

export const NotificationModal = ({ isOpen, onClose, missedTasks, onSetupClick }) => {
  const totalMissedTasks = Object.values(missedTasks).reduce((sum, count) => sum + count, 0);
  const totalPotentialEarnings = totalMissedTasks * 2.5;
  
  if (!isOpen) return null;

  return (
    <div 
      className="modal d-block" 
      tabIndex="-1" 
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <ModalHeader 
            title="Unlock More Opportunities!"
            subtitle="Maximize your earning potential"
            onClose={onClose}
          />
          
          <div className="modal-body p-4">
            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              <StatsCard 
                icon={Target} 
                value={totalMissedTasks} 
                label="Missed Tasks" 
                color="text-warning" 
              />
              <StatsCard 
                icon={Users} 
                value={Object.keys(missedTasks).length} 
                label="Platforms" 
                color="text-info" 
              />
              <StatsCard 
                icon={TrendingUp} 
                value="+ Points" 
                label="Potential" 
                color="text-success" 
              />
            </div>

            <TaskBreakdown missedTasks={missedTasks} />
            <SetupGuide />
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 pt-0 pb-4 px-4">
            <button 
              type="button" 
              className="btn btn-outline-secondary rounded-pill px-4 me-2"
              onClick={onClose}
            >
              <span className="fw-medium">Skip for Now</span>
            </button>
            <button 
              type="button" 
              className="btn rounded-pill px-4 fw-semibold text-white flex-fill"
              onClick={onSetupClick}
              style={{ 
                background: 'linear-gradient(135deg, #0e223b 0%, #1f4068 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              <span>Setup Platforms</span>
              <ExternalLink className="ms-2" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};