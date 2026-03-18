import { useSurveyForm } from '../../../../hooks/useSurveyForm';
import Sidebar from './Sidebar';
import QuestionBlock from './QuestionBlock';
import ChildrenDetails from './ChildrenDetails';
import { steps } from '../../../../json/survey';

const SurveyForm = ({ initialSurveyData = null, initialStep = 1, isUpdate = false, onClose = () => {} }) => {
  const { formData, currentStep, currentStepData, progress, isLoading, showModal, showChildrenDetails, handleSingleChoice, handleMultiChoice, handleNumberOfChildren, goToNextStep, goToPreviousStep, goToStep, handleSubmit, handleClose } = useSurveyForm(initialSurveyData, initialStep);

  const onSubmitWrapper = async (e) => {
    await handleSubmit(e);
    onClose?.();
  };

  const onCloseWrapper = () => {
    handleClose();
    onClose?.();
  };

  if (!showModal) return null;

  const modalTitle = isUpdate ? 'Update Your Profile' : 'Complete Your Profile';
  const submitButtonText = isUpdate ? 'Update Survey' : 'Complete Survey';

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h4 className="modal-title text-primary fw-bold">
              <i className="fas fa-clipboard-list me-2" />
              {modalTitle}
            </h4>
            <button
              onClick={onCloseWrapper}
              className="btn text-dark fs-3 lh-1 border-0 bg-transparent"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <div className="modal-body p-0">
            <div className="row g-0" style={{ minHeight: '600px' }}>
              <Sidebar 
                steps={steps} 
                currentStep={currentStep} 
                progress={progress} 
                goToStep={goToStep} 
              />

              <div className="col-md-8">
                <div className="p-4 h-100 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-primary mb-1">
                      {currentStepData?.icon} {currentStepData?.title}
                    </h3>
                    {isUpdate && (
                      <span className="badge bg-info text-dark">
                        <i className="fas fa-sync-alt me-1" />
                        Updating Profile
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted mb-4">
                    {isUpdate 
                      ? "Please review and update your information below. Your previous answers are pre-filled."
                      : "Please fill out the information below to personalize your experience."
                    }
                  </p>
                  
                  <div className="flex-grow-1 overflow-auto">
                    {currentStepData?.questions.map((q) => (
                      <QuestionBlock
                        key={q.key}
                        question={q}
                        formData={formData}
                        handleSingleChoice={handleSingleChoice}
                        handleMultiChoice={handleMultiChoice}
                      />
                    ))}
                    {showChildrenDetails && (
                      <ChildrenDetails
                        formData={formData}
                        handleNumberOfChildren={handleNumberOfChildren}
                        handleMultiChoice={handleMultiChoice}
                      />
                    )}
                  </div>

                  <div className="border-top pt-3 mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={goToPreviousStep}
                        disabled={currentStep === 1}
                      >
                        <i className="fas fa-arrow-left me-2" />Previous
                      </button>
                      
                      <div className="text-center">
                        <small className="text-muted">
                          Step {currentStep} of {steps.length}
                          {isUpdate && " • Progress auto-saved"}
                        </small>
                      </div>

                      {currentStep < steps.length ? (
                        <button className="btn btn-primary" onClick={goToNextStep}>
                          Next <i className="fas fa-arrow-right ms-2" />
                        </button>
                      ) : (
                        <button 
                          className="btn btn-success" 
                          onClick={onSubmitWrapper} 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              {isUpdate ? 'Updating...' : 'Submitting...'}
                            </>
                          ) : (
                            <>
                              <i className="fas fa-check me-2" />
                              {submitButtonText}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;

// import { useSurveyForm } from '../../../../hooks/useSurveyForm';
// import Sidebar from './Sidebar';
// import QuestionBlock from './QuestionBlock';
// import ChildrenDetails from './ChildrenDetails';
// import { steps } from '../../../../json/survey';

// const SurveyForm = (initialSurveyData = null, initialStep = 1, isUpdate = false) => {
//   const { formData, currentStep, currentStepData, progress, isLoading, showModal, showChildrenDetails, handleSingleChoice,handleMultiChoice, handleNumberOfChildren, goToNextStep, goToPreviousStep, goToStep, handleSubmit, setShowModal, handleClose, saveProgress } = useSurveyForm(initialSurveyData, initialStep);

//   if (!showModal) return null;

//   const modalTitle = isUpdate ? 'Update Your Profile' : 'Complete Your Profile';
//   const submitButtonText = isUpdate ? 'Update Survey' : 'Complete Survey';

//   return (
//     <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
//       <div className="modal-dialog modal-xl">
//         <div className="modal-content">
//           <div className="modal-header border-0 pb-0">
//             <h4 className="modal-title text-primary fw-bold">
//               <i className="fas fa-clipboard-list me-2" />{modalTitle}
//             </h4>
//             <button
//               onClick={handleClose}
//               className="btn text-dark fs-3 lh-1 border-0 bg-transparent"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>

//           <div className="modal-body p-0">
//             <div className="row g-0" style={{ minHeight: '600px' }}>
//               <Sidebar steps={steps} currentStep={currentStep} progress={progress} goToStep={goToStep} />

//               <div className="col-md-8">
//                 <div className="p-4 h-100 d-flex flex-column">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h3 className="text-primary mb-1">{currentStepData?.icon} {currentStepData?.title}</h3>
//                   {isUpdate && (
//                       <span className="badge bg-info text-dark">
//                         <i className="fas fa-sync-alt me-1"></i>
//                         Updating Profile
//                       </span>
//                   )}
//                   </div>

//                   <p className="text-muted mb-4">
//                     {isUpdate 
//                       ? "Please review and update your information below. Your previous answers are pre-filled."
//                       : "Please fill out the information below to personalize your experience."
//                     }
//                   </p>
                  
//                   <div className="flex-grow-1 overflow-auto">
//                     {currentStepData?.questions.map((q) => (
//                       <QuestionBlock
//                         key={q.key}
//                         question={q}
//                         formData={formData}
//                         handleSingleChoice={handleSingleChoice}
//                         handleMultiChoice={handleMultiChoice}
//                       />
//                     ))}
//                     {showChildrenDetails && (
//                       <ChildrenDetails
//                         formData={formData}
//                         handleNumberOfChildren={handleNumberOfChildren}
//                         handleMultiChoice={handleMultiChoice}
//                       />
//                     )}
//                   </div>

//                   <div className="border-top pt-3 mt-4">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <button
//                         className="btn btn-outline-secondary"
//                         onClick={goToPreviousStep}
//                         disabled={currentStep === 1}
//                       >
//                         <i className="fas fa-arrow-left me-2" />Previous
//                       </button>
                      
//                       <div className="text-center">
//                         <small className="text-muted">
//                           Step {currentStep} of {steps.length}
//                           {isUpdate && " • Progress auto-saved"}
//                         </small>
//                       </div>

//                       {currentStep < steps.length ? (
//                         <button className="btn btn-primary" onClick={goToNextStep}>
//                           Next <i className="fas fa-arrow-right ms-2" />
//                         </button>
//                       ) : (
//                         <button 
//                           className="btn btn-success" 
//                           onClick={onSubmitWrapper} 
//                           disabled={isLoading}
//                         >
//                           {isLoading ? (
//                             <>
//                               <span className="spinner-border spinner-border-sm me-2" />
//                               {isUpdate ? 'Updating...' : 'Submitting...'}
//                             </>
//                           ) : (
//                             <>
//                               <i className="fas fa-check me-2" />
//                               {submitButtonText}
//                             </>
//                           )}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SurveyForm;
