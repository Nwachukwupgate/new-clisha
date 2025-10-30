import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { steps } from "../json/survey";
import { getUserSurveyStatus } from "../store/General";

function getNextQuestion(survey, currentStep) {
  const step = steps.find((s) => s.id === currentStep);
  if (!step) return null;

  //  UPDATED: Get answered keys from survey object with all answered questions
  const answeredKeys = [
    ...(survey?.singleChoiceAnswers?.map((a) => a.questionKey) || []),
    ...(survey?.multiChoiceAnswers?.map((a) => a.questionKey) || []),
  ];

  // console.log("Answered keys in step ", currentStep, ":", answeredKeys);

  // Find next unanswered question in current step
  const nextQ = step.questions.find((q) => !answeredKeys.includes(q.key));
  if (nextQ) return { step, question: nextQ };

  // If current step complete, move to next step
  const nextStep = steps.find((s) => s.id === currentStep + 1);
  if (!nextStep) return null;

  return { step: nextStep, question: nextStep.questions[0] };
}

export const useSurveyReminder = () => {
  const dispatch = useDispatch();
  const [questionData, setQuestionData] = useState(null);
  const [show, setShow] = useState(false);

  const surveyStatus = useSelector((state) => state.general.statusSurveyProfile);
  // console.log("surveyStatus in useSurveyReminder:", surveyStatus);

  // Fetch user survey status if missing
  useEffect(() => {
    if (!surveyStatus) {
      dispatch(getUserSurveyStatus());
    }
  }, [surveyStatus, dispatch]);

  // React to changes in surveyStatus
  useEffect(() => {
    if (!surveyStatus) return;

    const { shouldShow, isIncomplete, survey, currentStep } = surveyStatus;
    console.log("surveyStatus inside effect:", surveyStatus);

    if (shouldShow && isIncomplete) {
      //  FIXED: Use the 'survey' object from server response
      // It contains ALL singleChoiceAnswers and multiChoiceAnswers
      const safeSurvey = survey || { 
        singleChoiceAnswers: [], 
        multiChoiceAnswers: [] 
      };
      
      // console.log("Using safeSurvey with answered questions:", safeSurvey);
      // console.log("Answered questions breakdown:", {
      //   single: safeSurvey.singleChoiceAnswers?.map(a => ({ key: a.questionKey, value: a.value })),
      //   multi: safeSurvey.multiChoiceAnswers?.map(a => ({ key: a.questionKey, value: a.value }))
      // });

      const nextQ = getNextQuestion(safeSurvey, currentStep || 1);
      console.log("Next question determined:", nextQ?.question?.key);

      if (nextQ) {
        setQuestionData(nextQ);
        setShow(true);
      } else {
        setShow(false);
      }
    } else {
      setShow(false);
    }
  }, [surveyStatus]);

  return { show, setShow, questionData };
};