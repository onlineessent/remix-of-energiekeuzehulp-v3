
import { useToast } from "@/hooks/use-toast";
import { Scores, ContractRecommendation } from "@/types/contract";
import { getSessionId } from "@/utils/databaseUtils";
import { 
  saveIncompleteResultsToDb, 
  saveCompleteResultsToMainTable,
  saveToContractResultsTable
} from "@/services/contractResultsService";

export const useSaveContractResults = () => {
  const { toast } = useToast();
  
  /**
   * Saves or updates incomplete questionnaire results to the database
   * Uses a single record per user session with consistent ID
   */
  const saveIncompleteResults = async (
    answers: Array<Scores | null>,
    currentQuestion: number
  ) => {
    // We don't show toast for incomplete submissions to avoid annoying users
    return saveIncompleteResultsToDb(answers, currentQuestion);
  };
  
  /**
   * Saves complete questionnaire results to the database
   * Using the same record ID as incomplete saves for consistency
   */
  const saveCompleteResults = async (
    answers: Array<Scores | null>,
    recommendation: ContractRecommendation
  ) => {
    try {
      // Get the consistent session ID
      const sessionId = getSessionId();
      
      console.log("Saving complete results with session ID:", sessionId);
      
      // Save to the main user_responses_v1 table
      const mainTableSuccess = await saveCompleteResultsToMainTable(
        sessionId, 
        answers, 
        recommendation
      );
      
      // Silently handle main table errors without showing toasts to the user
      if (!mainTableSuccess) {
        console.error('Failed to save to main results table');
      }
      
      // Save to the contract_results table (the separate analysis table)
      const { success: secondaryTableSuccess, error: secondaryTableError } = 
        await saveToContractResultsTable(
          sessionId, 
          recommendation, 
          {
            ...calculateTotalScores(answers)
          }, 
          answers
        );
      
      if (!secondaryTableSuccess) {
        // Log error but don't show toast
        console.error('Error saving to contract_results table:', secondaryTableError);
      } else {
        console.log('Successfully saved to contract_results table');
      }
      
      // Save the response ID to localStorage for use with feedback
      localStorage.setItem('user_response_id', sessionId);
      
      console.log('Successfully saved/updated complete contract advisor results');
      return true;
      
    } catch (error) {
      // Log error but don't show toast
      console.error('Failed to save complete results:', error);
      return false;
    }
  };

  return {
    saveIncompleteResults,
    saveCompleteResults
  };
};

// Import this function from databaseUtils to make the hook self-contained
const calculateTotalScores = (answers: Array<Scores | null>) => {
  return {
    score_variabel: answers.reduce((sum, a) => sum + (a?.variabel || 0), 0),
    score_vast1: answers.reduce((sum, a) => sum + (a?.vast1 || 0), 0),
    score_vast3: answers.reduce((sum, a) => sum + (a?.vast3 || 0), 0),
    score_dynamisch: answers.reduce((sum, a) => sum + (a?.dynamisch || 0), 0)
  };
};
