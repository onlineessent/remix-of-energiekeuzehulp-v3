
import { Scores, ContractType } from "@/types/contract";
import { questions } from "./contractQuestions";

/**
 * Calculates the maximum possible scores for each contract type
 */
export const calculateMaxScores = (): Record<ContractType, number> => {
  const maxScoresPerType: Record<ContractType, number> = {
    variabel: 0,
    vast1: 0,
    vast3: 0,
    dynamisch: 0
  };

  // Loop through all questions and their options to determine the maximum scores
  questions.forEach(question => {
    const maxScoresForQuestion = {
      variabel: Math.max(...question.options.map(opt => opt.score.variabel)),
      vast1: Math.max(...question.options.map(opt => opt.score.vast1)),
      vast3: Math.max(...question.options.map(opt => opt.score.vast3)),
      dynamisch: Math.max(...question.options.map(opt => opt.score.dynamisch))
    };

    Object.keys(maxScoresPerType).forEach(type => {
      maxScoresPerType[type as ContractType] += maxScoresForQuestion[type as ContractType];
    });
  });

  return maxScoresPerType;
};

/**
 * Calculates the minimum possible scores for each contract type
 */
export const calculateMinScores = (): Record<ContractType, number> => {
  const minScoresPerType: Record<ContractType, number> = {
    variabel: 0,
    vast1: 0,
    vast3: 0,
    dynamisch: 0
  };

  questions.forEach(question => {
    const minScoresForQuestion = {
      variabel: Math.min(...question.options.map(opt => opt.score.variabel)),
      vast1: Math.min(...question.options.map(opt => opt.score.vast1)),
      vast3: Math.min(...question.options.map(opt => opt.score.vast3)),
      dynamisch: Math.min(...question.options.map(opt => opt.score.dynamisch))
    };

    Object.keys(minScoresPerType).forEach(type => {
      minScoresPerType[type as ContractType] += minScoresForQuestion[type as ContractType];
    });
  });

  return minScoresPerType;
};

/**
 * Calculates the base match percentage for each contract type
 */
export const calculateBasePercentages = (
  scores: Scores,
  minScores: Record<ContractType, number>,
  maxScores: Record<ContractType, number>
): Record<ContractType, number> => {
  const basePercentages: Record<ContractType, number> = {} as Record<ContractType, number>;
  
  Object.keys(scores).forEach(type => {
    const contractType = type as ContractType;
    const score = scores[contractType];
    const minScore = minScores[contractType];
    const maxScore = maxScores[contractType];
    
    // Calculate how much of the available range (between min and max) is achieved
    const range = maxScore - minScore;
    const achievedRange = score - minScore;
    
    // Prevent division by 0 if the range is 0
    const percentageOfRange = range !== 0 ? (achievedRange / range) * 100 : 50;
    
    // Ensure a minimum of 20% unless the score is really poor
    basePercentages[contractType] = Math.max(20, Math.min(100, percentageOfRange));
  });
  
  return basePercentages;
};

/**
 * Adjusts the base percentages based on contract strengths and weaknesses
 */
export const adjustPercentagesBasedOnStrengths = (
  basePercentages: Record<ContractType, number>,
  strengths: Record<ContractType, any[]>
): Record<ContractType, number> => {
  return Object.entries(strengths).reduce((acc, [type, typeStrengths]) => {
    const contractType = type as ContractType;
    const strengthCount = typeStrengths.filter(s => s.status === "optimal").length;
    const weaknessCount = typeStrengths.filter(s => s.status === "negative").length;
    const total = typeStrengths.length;
    
    if (total > 0) {
      // Calculate an adjustment factor based on the strength/weakness ratio
      const adjustmentFactor = (strengthCount - weaknessCount) / total;
      
      // Determine the maximum adjustment per contract type
      const maxAdjustment = {
        variabel: 5,
        vast1: 5,
        vast3: 5,
        dynamisch: 5
      };

      // Adjust the percentage with the contract type-specific maximum adjustment
      const adjustment = adjustmentFactor * maxAdjustment[contractType];
      
      // Calculate the adjusted percentage and ensure it doesn't exceed 95% if there are non-optimal answers
      const hasNonOptimalAnswers = typeStrengths.some(s => s.status !== "optimal");
      const maxPercentage = hasNonOptimalAnswers ? 95 : 100;
      
      acc[contractType] = Math.max(15, Math.min(maxPercentage, basePercentages[contractType] + adjustment));
    } else {
      acc[contractType] = basePercentages[contractType];
    }
    
    return acc;
  }, {} as Record<ContractType, number>);
};

/**
 * Determines the recommended contract type based on match percentages
 */
export const determineRecommendedType = (
  percentages: Record<ContractType, number>
): ContractType => {
  return (Object.entries(percentages) as [ContractType, number][])
    .reduce((a, b) => (percentages[a] > percentages[b[0]] ? a : b[0]), 'variabel' as ContractType);
};

/**
 * Rounds the percentages to integer values
 */
export const roundPercentages = (
  percentages: Record<ContractType, number>
): Record<ContractType, number> => {
  return Object.entries(percentages).reduce((acc, [type, value]) => {
    acc[type as ContractType] = Math.round(value);
    return acc;
  }, {} as Record<ContractType, number>);
};
