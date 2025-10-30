import axios from 'axios';
import { useState } from "react";
import { useSurveyReminder } from "../../../../hooks/useSurveyReminder";
import SurveyStepModal from "./SurveyStepModal";
import ContinueSurveyModal from "./ContinueSurveyModal";

const SurveyPrompt = () => {
  const { show, setShow, questionData } = useSurveyReminder();
  const [showContinue, setShowContinue] = useState(false);

  console.log("should show", show)

  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };

  const handleSubmit = async (answers) => {
    if (!questionData) return;

    const { question } = questionData;
    const { step } = questionData;
    
    //  NEW: Determine if single or multi choice based on question type
    const surveyData = {
      currentStep: questionData.step.id,
      isComplete: false,
    };

    if (question.type === 'single') {
      // For single choice, store as singleChoiceAnswers
      surveyData.singleChoiceAnswers = { [question.key]: answers };
    } else {
      // For multi choice, store as multiChoiceAnswers
      surveyData.multiChoiceAnswers = { [question.key]: answers };
    }

    await axios.post(`${api}/user/my-profile`, surveyData, config);

    setShow(false);
    setShowContinue(true);
  };

  return (
    <>
      <SurveyStepModal
        show={show}
        question={questionData?.question}
        onSubmit={handleSubmit}
      />

      <ContinueSurveyModal
        show={showContinue}
        onContinue={() => {
          setShowContinue(false);
          window.location.href = "/dashboard/profile";
        }}
        onClose={() => setShowContinue(false)}
      />
    </>
  );
};

export default SurveyPrompt;