import { useState, useEffect } from 'react';
import { NotificationModal } from './NotificationModal';
import { PreferencesModal } from './PreferencesModal';


const SocialMediaModal = ({ isOpen, onClose, onUpdate, missedTasks = {}, existingPlatforms = [] }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
 };

  useEffect(() => {
    if (isOpen && existingPlatforms.length > 0) {
      setSelectedPlatforms(existingPlatforms);
    }
  }, [isOpen, existingPlatforms]);

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleUpdatePreferences = async () => {
    if (selectedPlatforms.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/user/social-preferences`, {
        method: 'POST',
        ...config,
        body: JSON.stringify({ platforms: selectedPlatforms })
      });

      if (response.ok) {
        onUpdate();
        setShowUpdateModal(false);
        onClose();
      } else {
        console.error('Failed to update preferences');
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsShown = async () => {
    try {
      await fetch(`${api}/user/social-reminder`, {
        method: 'POST',
        ...config
      });
    } catch (error) {
      console.error('Error marking reminder as shown:', error);
    }
  };

  const handleClose = () => {
    handleMarkAsShown();
    onClose();
  };

  return (
    <>
      <NotificationModal
        isOpen={isOpen && !showUpdateModal}
        onClose={handleClose}
        missedTasks={missedTasks}
        onSetupClick={() => setShowUpdateModal(true)}
      />

      <PreferencesModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={handlePlatformToggle}
        onSave={handleUpdatePreferences}
        isLoading={isLoading}
        missedTasks={missedTasks}
        existingPlatforms={existingPlatforms}
      />
    </>
  );
};

export default SocialMediaModal;




// import React, { useState, useEffect } from 'react';
// /* eslint-disable import/no-extraneous-dependencies */
// import { X, Plus, Check, AlertCircle, ExternalLink } from 'lucide-react';

// const SocialMediaModal = ({ isOpen, onClose, onUpdate, missedTasks = {} }) => {
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const socialPlatforms = [
//     { name: 'Facebook', icon: '📘', color: 'bg-primary' },
//     { name: 'Instagram', icon: '📷', color: 'bg-danger' },
//     { name: 'YouTube', icon: '📺', color: 'bg-danger' },
//     { name: 'TikTok', icon: '🎵', color: 'bg-dark' },
//     { name: 'X (Twitter)', icon: '🐦', color: 'bg-info' },
//     { name: 'LinkedIn', icon: '💼', color: 'bg-primary' },
//     { name: 'Pinterest', icon: '📌', color: 'bg-danger' },
//     { name: 'Reddit', icon: '🔄', color: 'bg-warning' }
//   ];

//   const totalMissedTasks = Object.values(missedTasks).reduce((sum, count) => sum + count, 0);

//   const handlePlatformToggle = (platform) => {
//     setSelectedPlatforms(prev => 
//       prev.includes(platform) 
//         ? prev.filter(p => p !== platform)
//         : [...prev, platform]
//     );
//   };

//   const handleUpdatePreferences = async () => {
//     if (selectedPlatforms.length === 0) return;
    
//     setIsLoading(true);
//     try {
//       // Using JavaScript variables instead of localStorage
//       const token = window.authToken || 'demo-token';
//       const response = await fetch('/api/user/social-preferences', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ platforms: selectedPlatforms })
//       });

//       if (response.ok) {
//         onUpdate();
//         setShowUpdateModal(false);
//         onClose();
//       } else {
//         console.error('Failed to update preferences');
//       }
//     } catch (error) {
//       console.error('Error updating preferences:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleMarkAsShown = async () => {
//     try {
//       const token = window.authToken || 'demo-token';
//       await fetch('/api/user/social-reminder', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//     } catch (error) {
//       console.error('Error marking reminder as shown:', error);
//     }
//   };

//   const handleClose = () => {
//     handleMarkAsShown();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div 
//         className="modal d-block" 
//         tabIndex="-1" 
//         role="dialog"
//         style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-header border-0 pb-0">
//               <div className="d-flex align-items-center">
//                 <AlertCircle className="text-warning me-2" size={24} />
//                 <h5 className="modal-title fw-bold text-dark mb-0">Missing Out on Tasks!</h5>
//               </div>
//               <button 
//                 type="button" 
//                 className="btn-close" 
//                 onClick={handleClose}
//                 aria-label="Close"
//               />
//             </div>
            
//             <div className="modal-body">
//               <div className="alert alert-warning border border-warning">
//                 <p className="text-warning fw-semibold mb-2">
//                   You're missing out on {totalMissedTasks} available tasks!
//                 </p>
                
//                 {Object.entries(missedTasks).map(([platform, count]) => (
//                   <div key={platform} className="d-flex justify-content-between small text-warning mb-1">
//                     <span>{platform} tasks:</span>
//                     <span className="fw-semibold">{count}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="alert alert-info border border-info">
//                 <div className="d-flex align-items-start">
//                   <div className="text-info me-2">💡</div>
//                   <div>
//                     <h6 className="fw-semibold text-info mb-2">Get More Tasks!</h6>
//                     <p className="small text-info mb-3">
//                       Update your social media preferences to unlock these tasks. Make sure you're also logged into these platforms in your browser for the best experience.
//                     </p>
//                     <div className="small text-info bg-light p-2 rounded border">
//                       <strong>Tip:</strong> Log into your social media accounts in your browser first, then complete tasks for automatic interaction tracking.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer border-0">
//               <button 
//                 type="button" 
//                 className="btn btn-outline-secondary me-2 flex-fill"
//                 onClick={handleClose}
//               >
//                 Maybe Later
//               </button>
//               <button 
//                 type="button" 
//                 className="btn btn-primary flex-fill fw-semibold"
//                 onClick={() => setShowUpdateModal(true)}
//                 style={{ background: '#0e223b', border: 'none', color: '#fff' }}
//               >
//                 Update Preferences
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SocialMediaModal;