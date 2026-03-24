import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getSurveyProfile } from '../store/General';
import { steps } from '../json/survey';


export const useSurveyForm = (initialSurveyData = null, initialStep = 1) => {
  const [formData, setFormData] = useState({
    hasChildren: '',
    numberOfChildren: null,
    consentLevel: '',
    singleChoiceAnswers: {},
    multiChoiceAnswers: {}
  });
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };

  useEffect(() => {
    if (initialSurveyData) {
      setFormData({
        hasChildren: initialSurveyData.hasChildren || '',
        numberOfChildren: initialSurveyData.numberOfChildren || null,
        consentLevel: initialSurveyData.consentLevel || '',
        singleChoiceAnswers: initialSurveyData.singleChoiceAnswers || {},
        multiChoiceAnswers: initialSurveyData.multiChoiceAnswers || {}
      });
      setCurrentStep(initialSurveyData.currentStep || initialStep);
      setIsUpdate(initialSurveyData.completed || false);
    }
  }, [initialSurveyData, initialStep]);

  const handleSingleChoice = (questionKey, value) => {
    if (questionKey === 'hasChildren') {
      setFormData(prev => ({ ...prev, hasChildren: value.toLowerCase().replace(' ', '_') }));
    } else if (questionKey === 'consentLevel') {
      setFormData(prev => ({ ...prev, consentLevel: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        singleChoiceAnswers: { ...prev.singleChoiceAnswers, [questionKey]: value }
      }));
    }
  };

  const handleMultiChoice = (questionKey, value, checked) => {
    setFormData(prev => {
      const currentAnswers = prev.multiChoiceAnswers[questionKey] || [];
      const newAnswers = checked
        ? [...currentAnswers, value]
        : currentAnswers.filter(a => a !== value);
      return {
        ...prev,
        multiChoiceAnswers: { ...prev.multiChoiceAnswers, [questionKey]: newAnswers }
      };
    });
  };

  const handleNumberOfChildren = (value) => {
    setFormData(prev => ({ ...prev, numberOfChildren: parseInt(value, 10) }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Save progress when moving to next step
      saveProgress(nextStep);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      // Save progress when moving to previous step
      saveProgress(prevStep);
    }
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    saveProgress(stepNumber);
  };

  // Save progress without completing
  const saveProgress = async (step = currentStep) => {
    try {
      const progressData = {
        ...formData,
        currentStep: step,
        isComplete: false
      };

      await axios.post(`${api}/user/submit/survey/profile`, progressData, config);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const submitData = {
        ...formData,
        currentStep: steps.length,
        isComplete: true
      };

      await axios.post(`${api}/user/submit/survey/profile`, submitData, config);
      
      setIsLoading(false);
      setShowModal(false);
      dispatch(getSurveyProfile());
      
      const message = isUpdate ? 'Survey updated successfully!' : 'Survey completed successfully!';
      toast.success(message);
      
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Error submitting survey.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Save current progress before closing
    saveProgress();
    setShowModal(false);
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = (currentStep / steps.length) * 100;
  const showChildrenDetails = currentStep === 3 && formData.hasChildren === 'yes';

  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />

  return {
    formData,
    currentStep,
    currentStepData,
    progress,
    isLoading,
    showModal,
    showChildrenDetails,
    isUpdate,
    handleSingleChoice,
    handleMultiChoice,
    handleNumberOfChildren,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleSubmit,
    setShowModal,
    handleClose,
    saveProgress
  };
};
