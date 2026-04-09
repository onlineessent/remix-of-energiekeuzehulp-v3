import { Scores, ContractType } from "@/types/contract";
import { getRecommendation } from "@/utils/contractUtils";
import { 
  reconstructAnswersFromResponse, 
  initializeContractData,
  calculatePercentageMetrics
} from "@/utils/analysisUtils";

/**
 * Process data from the contract_results table
 */
export async function analyzeFromContractResultsTable() {
  try {
    console.log("Fetching data from contract_results local api...");
    
    const res = await fetch('/api/contract-results');
    if (!res.ok) throw new Error('Failed to fetch contract results');
    const { data: contractResults } = await res.json();
      
    if (!contractResults || contractResults.length === 0) {
      console.log("No data in contract_results table");
      return null;
    }
    
    console.log(`Processing ${contractResults.length} contract results...`);
    
    const { contractCounts, contractPercentages } = initializeContractData();
    let processedResponsesCount = 0;
    
    // For each contract result
    for (const result of contractResults) {
      try {
        const recommendedType = result.recommended_type as ContractType;
        contractCounts[recommendedType]++;
        
        if (result.percentages) {
          Object.entries(result.percentages).forEach(([type, percentage]) => {
            contractPercentages[type as ContractType].push(percentage as number);
          });
        }
        
        processedResponsesCount++;
      } catch (e) {
        console.error("Error processing a contract result:", e);
      }
    }
    
    // Calculate metrics
    const { percentages, averagePercentages } = calculatePercentageMetrics(
      contractCounts,
      contractPercentages,
      processedResponsesCount
    );
    
    return {
      total: processedResponsesCount,
      skipped: 0, // We don't have skipped responses in contract_results
      counts: contractCounts,
      percentages: percentages,
      averagePercentages: averagePercentages,
      dataSource: 'contract_results'
    };
  } catch (error) {
    console.error("Error analyzing from contract_results table:", error);
    return null;
  }
}

/**
 * Process data from the user_responses_v1 table
 */
export async function analyzeFromUserResponsesTable() {
  try {
    console.log("Fetching data from user_responses_v1 local api...");
    
    const res = await fetch('/api/analysis/responses');
    if (!res.ok) throw new Error('Failed to fetch user responses');
    const { data: userResponses } = await res.json();
    
    if (!userResponses || userResponses.length === 0) {
      return { error: "No completed user responses found" };
    }
    
    console.log(`Processing ${userResponses.length} user responses...`);
    
    const { contractCounts, contractPercentages } = initializeContractData();
    let processedResponsesCount = 0;
    let skippedResponsesCount = 0;
    
    // For each user response
    for (const response of userResponses) {
      try {
        // Convert database response to scores array format expected by recommendation engine
        const answers = reconstructAnswersFromResponse(response);
        
        if (!answers || answers.some(answer => answer === undefined)) {
          skippedResponsesCount++;
          continue;
        }
        
        // Calculate total scores
        const totalScores = answers.reduce((acc, curr) => {
          if (curr) {
            return {
              variabel: acc.variabel + curr.variabel,
              vast1: acc.vast1 + curr.vast1,
              vast3: acc.vast3 + curr.vast3,
              dynamisch: acc.dynamisch + curr.dynamisch,
            };
          }
          return acc;
        }, {
          variabel: 0,
          vast1: 0,
          vast3: 0,
          dynamisch: 0,
        } as Scores);
        
        // Get recommendation based on current algorithm
        const recommendation = getRecommendation(totalScores, answers);
        
        // Count the recommended contract type
        contractCounts[recommendation.recommendedType]++;
        
        // Store percentages for each contract type
        Object.entries(recommendation.percentages).forEach(([type, percentage]) => {
          contractPercentages[type as ContractType].push(percentage);
        });
        
        processedResponsesCount++;
      } catch (e) {
        console.error("Error processing a user response:", e);
        skippedResponsesCount++;
      }
    }
    
    // Calculate metrics
    const { percentages, averagePercentages } = calculatePercentageMetrics(
      contractCounts,
      contractPercentages,
      processedResponsesCount
    );
    
    return {
      total: processedResponsesCount,
      skipped: skippedResponsesCount,
      counts: contractCounts,
      percentages: percentages,
      averagePercentages: averagePercentages,
      dataSource: 'user_responses_v1'
    };
  } catch (error) {
    console.error("Error in analyzeFromUserResponsesTable:", error);
    return { error: "Failed to analyze user responses" };
  }
}
