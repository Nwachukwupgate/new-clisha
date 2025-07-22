import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getSurveyProfile } from '../store/General';
import { steps } from '../json/survey';


export const useSurveyForm = () => {
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

  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };

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
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
        .post(`${api}/user/submit/survey/profile`, formData, config)
        .then((result) => {
        setIsLoading(false);
        setShowModal(false);
        dispatch(getSurveyProfile());
        toast.success('Survey Profile submitted successfully!');
        })
        .catch((err) => {
        toast.error('Error submitting Profile.');
        setIsLoading(false);
        });
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
    handleSingleChoice,
    handleMultiChoice,
    handleNumberOfChildren,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleSubmit,
    setShowModal
  };
};
