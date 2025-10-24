import axios from 'axios';
import { useState } from "react";
import { useSurveyReminder } from "../../../../hooks/useSurveyReminder";
import SurveyStepModal from "./SurveyStepModal";
import ContinueSurveyModal from "./ContinueSurveyModal";

const SurveyPrompt = () => {
  const { show, setShow, questionData } = useSurveyReminder();
  const [showContinue, setShowContinue] = useState(false);

  const api = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('token');
  const config = { headers: { Authorization: `bearer ${token}` } };


  const handleSubmit = async (answers) => {
    if (!questionData) return;

    const surveyData = {
        multiChoiceAnswers: { [questionData.question.key]: answers },
        currentStep: questionData.step.id,
        isComplete: false,
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
