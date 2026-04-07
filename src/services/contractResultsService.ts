
import { supabase } from "@/integrations/supabase/client";
import { Scores, ContractRecommendation } from "@/types/contract";
import { 
  formatQuestionData, 
  prepareCommonData, 
  calculateTotalScores,
  getSessionId
} from "@/utils/databaseUtils";
import { questions } from "@/utils/contractQuestions";

/**
 * Checks if a record already exists for a given session
 */
export const checkExistingRecord = async (sessionId: string) => {
  const { data: existingRecord, error: fetchError } = await supabase
    .from('user_responses_v1')
    .select('id')
    .eq('id', sessionId)
    .maybeSingle();
  
  if (fetchError) {
    console.error('Error checking for existing record:', fetchError);
  }
  
  return { existingRecord, fetchError };
};

/**
 * Saves or updates incomplete questionnaire results to the database
 */
export const saveIncompleteResultsToDb = async (
  answers: Array<Scores | null>,
  currentQuestion: number
) => {
  try {
    // Only proceed if we have at least one answer
    if (currentQuestion <= 0) return true;
    
    // Get the consistent session ID
    const sessionId = getSessionId();
    
    // Prepare basic data
    const data = {
      ...prepareCommonData(),
      is_completed: false
    };
    
    // Format each question's data into separate columns
    for (let index = 0; index < currentQuestion; index++) {
      const question = questions[index];
      formatQuestionData(question.id, answers[index], data);
    }
    
    console.log("Saving incomplete results with session ID:", sessionId);
    
    // Check if a record already exists for this session
    const { existingRecord, fetchError } = await checkExistingRecord(sessionId);
    if (fetchError) return false;
    
    let result;
    
    // If record exists, update it; otherwise insert a new one
    if (existingRecord) {
      // Update existing record
      result = await supabase
        .from('user_responses_v1')
        .update(data)
        .eq('id', sessionId);
    } else {
      // Insert new record
      result = await supabase
        .from('user_responses_v1')
        .insert(data);
    }
    
    if (result.error) {
      console.error('Error saving incomplete results:', result.error);
      return false;
    } else {
      console.log('Successfully saved/updated incomplete results');
      return true;
    }
    
  } catch (error) {
    console.error('Failed to save incomplete results:', error);
    return false;
  }
};

/**
 * Saves contract results to a separate table for analysis
 */
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
      percentages: {
        variabel: recommendation.percentages.variabel,
        vast1: recommendation.percentages.vast1,
        vast3: recommendation.percentages.vast3,
        dynamisch: recommendation.percentages.dynamisch
      },
      strengths: recommendation.strengths,
      answers: answers.map((answer, index) => ({
        question_id: index + 1,
        question_text: questions[index].text,
        scores: answer
      })).filter(item => item.scores !== null)
    };

    // Using type assertion to bypass TypeScript's table check
    const { error: contractResultsError } = await (supabase
      .from('contract_results' as any)
      .insert(contractResultsData) as any);

    return { success: !contractResultsError, error: contractResultsError };
  } catch (error) {
    console.error('Error saving to contract_results table:', error);
    return { success: false, error };
  }
};

/**
 * Saves complete questionnaire results to the main responses table
 */
export const saveCompleteResultsToMainTable = async (
  sessionId: string,
  answers: Array<Scores | null>,
  recommendation: ContractRecommendation
) => {
  try {
    // Prepare base data for main user_responses_v1 table
    const data = {
      ...prepareCommonData(),
      is_completed: true,
      recommended_contract_type: recommendation.recommendedType,
      
      // Add the percentages for each contract type
      percentage_variabel: recommendation.percentages.variabel,
      percentage_vast1: recommendation.percentages.vast1,
      percentage_vast3: recommendation.percentages.vast3,
      percentage_dynamisch: recommendation.percentages.dynamisch,
      
      // Add the total scores
      ...calculateTotalScores(answers)
    };
    
    // Format each question's data into separate columns
    for (let index = 0; index < answers.length; index++) {
      if (!answers[index]) continue;
      const question = questions[index];
      formatQuestionData(question.id, answers[index], data);
    }
    
    // Check if a record already exists for this session
    const { existingRecord, fetchError } = await checkExistingRecord(sessionId);
    if (fetchError) return false;
    
    let result;
    
    // If record exists, update it; otherwise insert a new one
    if (existingRecord) {
      // Update existing record
      result = await supabase
        .from('user_responses_v1')
        .update(data)
        .eq('id', sessionId);
    } else {
      // Insert new record
      result = await supabase
        .from('user_responses_v1')
        .insert(data);
    }
    
    if (result.error) {
      console.error('Error saving complete results:', result.error);
      return false;
    }
    
    return true;
    
  } catch (error) {
    console.error('Error saving to main table:', error);
    return false;
  }
};
