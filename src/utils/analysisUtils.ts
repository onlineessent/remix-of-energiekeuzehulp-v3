
import { Scores, ContractType } from "@/types/contract";
import { questions } from "./contractQuestions";

/**
 * Calculate the average of an array of numbers
 */
export function averageArray(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Reconstructs answers array from a database response
 */
export function reconstructAnswersFromResponse(response: any): Array<Scores | null> {
  const answers: Array<Scores | null> = new Array(questions.length).fill(null);
  
  try {
    // For each question
    for (let i = 0; i < questions.length; i++) {
      const questionId = i + 1; // Questions are 1-indexed
      
      // Handle checkbox questions (4 and 5) differently
      if (questionId === 4 || questionId === 5) {
        const selectedIds = response[`q${questionId}_selected_options_ids`];
        
        if (selectedIds) {
          // Convert comma-separated IDs to array of numbers and adjust to 0-based indexing
          const selectedIndices = selectedIds.split(',').map((id: string) => parseInt(id) - 1);
          
          // If we have selected indices, combine their scores
          if (selectedIndices.length > 0) {
            const combinedScore: Scores = {
              variabel: 0,
              vast1: 0,
              vast3: 0,
              dynamisch: 0
            };
            
            selectedIndices.forEach((index: number) => {
              if (questions[i].options[index]) {
                const optionScore = questions[i].options[index].score;
                combinedScore.variabel += optionScore.variabel;
                combinedScore.vast1 += optionScore.vast1;
                combinedScore.vast3 += optionScore.vast3;
                combinedScore.dynamisch += optionScore.dynamisch;
              }
            });
            
            answers[i] = combinedScore;
          }
        }
      } else {
        // For single choice questions (1, 2, 3)
        const selectedOptionId = response[`q${questionId}_selected_option_id`];
        
        if (selectedOptionId) {
          // Convert to 0-based index for accessing the options array
          const optionIndex = parseInt(selectedOptionId) - 1;
          
          if (questions[i].options[optionIndex]) {
            answers[i] = questions[i].options[optionIndex].score;
          }
        }
      }
    }
    
    return answers;
  } catch (error) {
    console.error("Error reconstructing answers:", error);
    return answers; // Return partially processed answers if possible
  }
}

/**
 * Initialize contract type data structures for analysis
 */
export function initializeContractData() {
  // Initialize counters for contract types
  const contractCounts: Record<ContractType, number> = {
    variabel: 0,
    vast1: 0,
    vast3: 0,
    dynamisch: 0
  };
  
  // Initialize arrays for each contract type to store their percentage matches
  const contractPercentages: Record<ContractType, number[]> = {
    variabel: [],
    vast1: [],
    vast3: [],
    dynamisch: []
  };
  
  return { contractCounts, contractPercentages };
}

/**
 * Calculate final percentage metrics
 */
export function calculatePercentageMetrics(
  contractCounts: Record<ContractType, number>,
  contractPercentages: Record<ContractType, number[]>,
  total: number
) {
  // Calculate percentages of each recommended contract type
  const percentages = {
    variabel: (contractCounts.variabel / total) * 100,
    vast1: (contractCounts.vast1 / total) * 100,
    vast3: (contractCounts.vast3 / total) * 100,
    dynamisch: (contractCounts.dynamisch / total) * 100
  };
  
  // Calculate average percentage match for each contract type
  const averagePercentages = {
    variabel: averageArray(contractPercentages.variabel),
    vast1: averageArray(contractPercentages.vast1),
    vast3: averageArray(contractPercentages.vast3),
    dynamisch: averageArray(contractPercentages.dynamisch)
  };
  
  return { percentages, averagePercentages };
}
