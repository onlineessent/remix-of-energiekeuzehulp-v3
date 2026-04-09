import { Scores, ContractRecommendation } from "@/types/contract";
import { 
  formatQuestionData, 
  prepareCommonData, 
  calculateTotalScores,
  getSessionId
} from "@/utils/databaseUtils";
import { questions } from "@/utils/contractQuestions";

export const checkExistingRecord = async (sessionId: string) => {
  try {
    const res = await fetch(`/api/responses/${sessionId}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const { existingRecord } = await res.json();
    return { existingRecord, fetchError: null };
  } catch (error) {
    return { existingRecord: null, fetchError: error };
  }
};

export const saveIncompleteResultsToDb = async (
  answers: Array<Scores | null>,
  currentQuestion: number
) => {
  try {
    if (currentQuestion <= 0) return true;
    const sessionId = getSessionId();
    const data: Record<string, any> = {
      ...prepareCommonData(),
      is_completed: false
    };
    for (let index = 0; index < currentQuestion; index++) {
      const question = questions[index];
      formatQuestionData(question.id, answers[index], data);
    }
    
    const response = await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) return false;
    return true;
  } catch (error) {
    console.error('Failed to save incomplete results:', error);
    return false;
  }
};

export const saveToContractResultsTable = async (
  sessionId: string, 
  recommendation: ContractRecommendation,
  data: Record<string, any>,
  answers: Array<Scores | null>
) => {
  try {
    const contractResultsData = {
      response_id: sessionId,
      timestamp: new Date().toISOString(),
      recommended_type: recommendation.recommendedType,
      scores: {
        variabel: data.score_variabel,
        vast1: data.score_vast1,
        vast3: data.score_vast3,
        dynamisch: data.score_dynamisch
      },
      percentages: recommendation.percentages,
      strengths: recommendation.strengths,
      answers: answers.map((answer, index) => ({
        question_id: index + 1,
        question_text: questions[index].text,
        scores: answer
      })).filter(item => item.scores !== null)
    };

    const response = await fetch('/api/contract-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contractResultsData)
    });
    
    return { success: response.ok, error: response.ok ? null : new Error('Failed to save') };
  } catch (error) {
    console.error('Error saving to contract_results table:', error);
    return { success: false, error };
  }
};

export const saveCompleteResultsToMainTable = async (
  sessionId: string,
  answers: Array<Scores | null>,
  recommendation: ContractRecommendation
) => {
  try {
    const data: Record<string, any> = {
      ...prepareCommonData(),
      is_completed: true,
      recommended_contract_type: recommendation.recommendedType,
      percentage_variabel: recommendation.percentages.variabel,
      percentage_vast1: recommendation.percentages.vast1,
      percentage_vast3: recommendation.percentages.vast3,
      percentage_dynamisch: recommendation.percentages.dynamisch,
      ...calculateTotalScores(answers)
    };
    
    for (let index = 0; index < answers.length; index++) {
      if (!answers[index]) continue;
      const question = questions[index];
      formatQuestionData(question.id, answers[index], data);
    }
    
    const response = await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) return false;
    return true;
  } catch (error) {
    console.error('Error saving to main table:', error);
    return false;
  }
};
