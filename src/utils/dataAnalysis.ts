
import { 
  analyzeFromContractResultsTable,
  analyzeFromUserResponsesTable
} from "@/services/contractAnalysisService";

/**
 * Processes user responses from the database to generate recommendations based on current algorithm
 */
export async function analyzeUserResponses() {
  // Loading indicator
  console.log("Fetching and analyzing user data...");
  
  try {
    // First try to fetch from the contract_results table (new method)
    const contractResultsAnalysis = await analyzeFromContractResultsTable();
      
    // If there's an error or no contract_results table exists yet
    if (!contractResultsAnalysis) {
      console.log("No data in contract_results table, falling back to user_responses_v1");
      // Fall back to the traditional method (analyzing user_responses_v1)
      return analyzeFromUserResponsesTable();
    }
    
    return contractResultsAnalysis;
  } catch (error) {
    console.error("Error in analyzeUserResponses:", error);
    // Fall back to the traditional method as a backup
    return analyzeFromUserResponsesTable();
  }
}
