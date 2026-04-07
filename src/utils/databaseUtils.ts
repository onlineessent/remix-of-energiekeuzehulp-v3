
import { Scores, ContractRecommendation } from "@/types/contract";
import { questions } from "@/utils/contractQuestions";

/**
 * Prepares data for a single question's response based on the question type and score
 */
export const formatQuestionData = (
  questionId: number,
  answerScore: Scores | null,
  data: Record<string, any>
) => {
  if (!answerScore) return;
  
  const question = questions.find(q => q.id === questionId);
  if (!question) return;
  
  // Format based on question type (checkbox vs. single choice)
  if (questionId === 4 || questionId === 5) {
    // For checkbox questions
    formatCheckboxQuestionData(questionId, data);
  } else {
    // For single choice questions
    formatSingleChoiceQuestionData(question, answerScore, data);
  }
};

/**
 * Formats data for checkbox-type questions (q4 and q5)
 */
const formatCheckboxQuestionData = (
  questionId: number,
  data: Record<string, any>
) => {
  try {
    // Get the stored option indices from localStorage
    const selectedOptionIds = localStorage.getItem(`q${questionId}_selected_options_ids`);
    const selectedOptionTexts = localStorage.getItem(`q${questionId}_selected_options_text`);
    
    console.log(`Formatting checkbox data for q${questionId}:`, {
      ids: selectedOptionIds,
      texts: selectedOptionTexts
    });
    
    if (selectedOptionIds) {
      data[`q${questionId}_selected_options_ids`] = selectedOptionIds;
    }
    
    if (selectedOptionTexts) {
      data[`q${questionId}_selected_options_text`] = selectedOptionTexts;
    }
  } catch (error) {
    console.error(`Error formatting checkbox data for q${questionId}:`, error);
  }
};

/**
 * Formats data for single-choice questions
 */
const formatSingleChoiceQuestionData = (
  question: typeof questions[number],
  answerScore: Scores,
  data: Record<string, any>
) => {
  try {
    const selectedOption = question.options.find(
      option => 
        option.score.variabel === answerScore.variabel &&
        option.score.vast1 === answerScore.vast1 &&
        option.score.vast3 === answerScore.vast3 &&
        option.score.dynamisch === answerScore.dynamisch
    );
    
    if (selectedOption) {
      // Add 1 to make it 1-based indexing
      const optionIndex = question.options.indexOf(selectedOption) + 1;
      data[`q${question.id}_selected_option_id`] = optionIndex;
      data[`q${question.id}_selected_option_text`] = selectedOption.text;
    }
  } catch (error) {
    console.error(`Error formatting single choice data for q${question.id}:`, error);
  }
};

/**
 * Generate or retrieve a consistent session ID for the current user
 * This ensures we consistently update the same record for a user session
 */
export const getSessionId = (): string => {
  // Check if we already have a session ID in localStorage
  let sessionId = localStorage.getItem('user_response_session_id');
  
  // If not, create a new one and store it
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('user_response_session_id', sessionId);
  }
  
  return sessionId;
};

/**
 * Prepares common data fields shared between complete and incomplete submissions
 */
export const prepareCommonData = () => {
  const data: Record<string, any> = {
    // Use a consistent ID for this user session
    id: getSessionId(),
    // Add timestamp to ensure we always get a fresh timestamp
    created_at: new Date().toISOString(),
    survey_version: "1.0"
  };
  
  return data;
};

/**
 * Calculates total scores from all answers
 */
export const calculateTotalScores = (answers: Array<Scores | null>) => {
  return {
    score_variabel: answers.reduce((sum, a) => sum + (a?.variabel || 0), 0),
    score_vast1: answers.reduce((sum, a) => sum + (a?.vast1 || 0), 0),
    score_vast3: answers.reduce((sum, a) => sum + (a?.vast3 || 0), 0),
    score_dynamisch: answers.reduce((sum, a) => sum + (a?.dynamisch || 0), 0)
  };
};
