/* eslint-disable import/no-extraneous-dependencies */
import { Check } from 'lucide-react';
import { ModalHeader, SelectionCounter, PlatformCard, ProTip } from "./SocialComponents";
import { socialPlatforms } from './SocialPlatforms';

export const PreferencesModal = ({ isOpen, onClose, selectedPlatforms, onPlatformToggle, onSave, isLoading, missedTasks, existingPlatforms = [] }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal d-block" 
      tabIndex="-1" 
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1055, backdropFilter: 'blur(6px)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div 
          className="modal-content border-0 shadow-lg" 
          style={{ borderRadius: '20px', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <ModalHeader 
            title="Choose Your Platforms"
            subtitle="Select platforms to unlock relevant tasks"
            onClose={onClose}
          />
          
          <div className="modal-body p-4">
            <SelectionCounter count={selectedPlatforms.length} />

            {/* Show existing platforms info if any */}
            {existingPlatforms.length > 0 && (
              <div className="alert alert-info border border-info mb-4">
                <div className="d-flex align-items-center" style={{ columnGap: '0.5rem' }}>
                  <Check className="text-info me-2" size={20} />
                  <div>
                    <h6 className="fw-semibold text-info mb-1">Already Connected</h6>
                    <p className="small text-info mb-0">
                      You have {existingPlatforms.length} platform{existingPlatforms.length !== 1 ? 's' : ''} already connected: {existingPlatforms.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Platform Grid */}
            <div className="row g-4" style={{ rowGap: '1.5rem' }}>
              {socialPlatforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  platform={platform}
                  isSelected={selectedPlatforms.includes(platform.name)}
                  onToggle={onPlatformToggle}
                  availableTasks={missedTasks[platform.name]}
                  isExisting={existingPlatforms.includes(platform.name)}
                />
              ))}
            </div>

            <ProTip />
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 pt-0 pb-4 px-4">
            <button 
              type="button" 
              className="btn btn-outline-secondary rounded-pill px-4 me-3"
              onClick={onClose}
            >
              <span className="fw-medium">Cancel</span>
            </button>
            <button 
              type="button" 
              onClick={onSave}
              disabled={selectedPlatforms.length === 0 || isLoading}
              className={`btn rounded-pill px-4 fw-semibold text-white ${
                selectedPlatforms.length === 0 || isLoading ? 'btn-secondary' : ''
              }`}
              style={selectedPlatforms.length > 0 && !isLoading ? { 
                background: 'linear-gradient(135deg, #0e223b 0%, #1f4068 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              } : {}}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                  Updating...
                </>
              ) : (
                <>
                  <Check className="me-2" size={16} />
                  Save Selection ({selectedPlatforms.length})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};