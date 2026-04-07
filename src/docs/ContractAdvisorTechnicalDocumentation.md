
# Contract Advisor Technical Documentation

This document provides a detailed technical overview of the Contract Advisor tool, including its algorithms, data structures, and implementation details. This documentation is designed to help developers implement this system in their own languages and frameworks.

## Table of Contents

1. [System Overview](#system-overview)
2. [Core Data Structures](#core-data-structures)
3. [Scoring Algorithm](#scoring-algorithm)
4. [Contract Strengths Generation](#contract-strengths-generation)
5. [Database Schema](#database-schema)
6. [Implementation Steps](#implementation-steps)

## System Overview

The Contract Advisor is a recommendation system that suggests the most suitable energy contract type for users based on their answers to a questionnaire. The system:

1. Presents a series of questions to the user
2. Calculates scores for each contract type based on user answers
3. Generates personalized strengths and weaknesses for each contract type
4. Determines the best contract match
5. Stores results for later analysis

The system supports four contract types: variable, fixed 1-year, fixed 3-year, and dynamic contracts.

## Core Data Structures

### Contract Types

```typescript
type ContractType = "variabel" | "vast1" | "vast3" | "dynamisch";
```

### Scores

Scores represent the numerical values for each contract type:

```typescript
type Scores = {
  variabel: number;  // Variable contract
  vast1: number;     // 1-year fixed contract
  vast3: number;     // 3-year fixed contract
  dynamisch: number; // Dynamic contract
};
```

### Questions

Each question has a set of possible options, each with its own scoring impact:

```typescript
type Question = {
  id: number;
  text: string;
  explanation: string;
  options: {
    text: string;
    score: Scores;
  }[];
};
```

### Contract Strengths

The system generates strengths/weaknesses to explain the recommendation:

```typescript
type StrengthStatus = "optimal" | "acceptable" | "negative";

type ContractStrength = {
  text: string;
  status: StrengthStatus;
};
```

### Recommendation Result

```typescript
type ContractRecommendation = {
  title: string;
  description: string;
  explanation: string;
  percentages: Record<ContractType, number>;
  recommendedType: ContractType;
  strengths: Record<ContractType, ContractStrength[]>;
};
```

## Scoring Algorithm

The scoring algorithm consists of several steps:

### 1. Calculate Min/Max Possible Scores

First, we calculate the theoretical minimum and maximum scores possible for each contract type:

```typescript
function calculateMaxScores(): Record<ContractType, number> {
  const maxScoresPerType = {
    variabel: 0, vast1: 0, vast3: 0, dynamisch: 0
  };

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
}

function calculateMinScores(): Record<ContractType, number> {
  // Similar to calculateMaxScores, but using Math.min instead
}
```

### 2. Calculate Base Percentages

Calculate each contract type's percentage match based on where the user's score falls between min and max scores:

```typescript
function calculateBasePercentages(
  scores: Scores,
  minScores: Record<ContractType, number>,
  maxScores: Record<ContractType, number>
): Record<ContractType, number> {
  const basePercentages = {} as Record<ContractType, number>;
  
  Object.keys(scores).forEach(type => {
    const contractType = type as ContractType;
    const score = scores[contractType];
    const minScore = minScores[contractType];
    const maxScore = maxScores[contractType];
    
    // Calculate how much of the available range is achieved
    const range = maxScore - minScore;
    const achievedRange = score - minScore;
    
    // Prevent division by 0 if the range is 0
    const percentageOfRange = range !== 0 ? (achievedRange / range) * 100 : 50;
    
    // Ensure a minimum of 20% unless the score is really poor
    basePercentages[contractType] = Math.max(20, Math.min(100, percentageOfRange));
  });
  
  return basePercentages;
}
```

### 3. Generate Contract Strengths

For each question answer, generate strengths or weaknesses explaining how well it aligns with each contract type.

### 4. Adjust Percentages Based on Strengths

```typescript
function adjustPercentagesBasedOnStrengths(
  basePercentages: Record<ContractType, number>,
  strengths: Record<ContractType, ContractStrength[]>
): Record<ContractType, number> {
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
        variabel: 5, vast1: 5, vast3: 5, dynamisch: 5
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
}
```

### 5. Determine the Recommended Contract Type

Choose the contract type with the highest adjusted percentage:

```typescript
function determineRecommendedType(
  percentages: Record<ContractType, number>
): ContractType {
  return Object.entries(percentages)
    .reduce((a, b) => (percentages[a] > percentages[b[0]] ? a : b[0]), 'variabel' as ContractType);
}
```

## Contract Strengths Generation

For each question answered, the system generates strengths and weaknesses for each contract type. The process uses domain-specific logic to determine why a particular answer is good or bad for a contract type.

Example from one of the strength generators:

```typescript
function getMogelijkheidStrengths(mogelijkheidScore: Scores | null): Record<ContractType, ContractStrength[]> {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [], vast3: [], vast1: [], variabel: []
  };

  if (mogelijkheidScore) {
    if (mogelijkheidScore.dynamisch === 3) {
      strengths.dynamisch.push({
        text: "You are often at home and can adapt your usage to cheaper moments, ideal for a dynamic contract",
        status: "optimal"
      });
      // Add strengths/weaknesses for other contract types...
    } 
    // Additional conditions and strengths...
  }

  return strengths;
}
```

The system has separate strength generators for different question categories:
- Price certainty preferences
- Ability to adjust energy usage
- Willingness to adjust energy usage
- Smart home devices/installations
- Financial flexibility for cost variations

## Database Schema

The system saves results to two tables:

### user_responses_v1

Primary table for storing user responses with columns:
- `id`: Unique identifier (UUID)
- `created_at`: Timestamp
- `is_completed`: Boolean indicating completed questionnaire
- `recommended_contract_type`: The recommended contract type
- `percentage_variabel`, `percentage_vast1`, etc.: Match percentages
- `score_variabel`, `score_vast1`, etc.: Raw scores
- Question-specific columns for detailed answer tracking

### contract_results

Structured results table with columns:
- `response_id`: Linked to user_responses_v1.id
- `timestamp`: When the result was saved
- `recommended_type`: The recommended contract type
- `scores`: JSON object with scores for each contract type
- `percentages`: JSON object with percentages for each contract type
- `strengths`: JSON object with strengths for each contract type
- `answers`: JSON array of all question answers with scores

## Implementation Steps

To implement this system in another language/framework:

1. **Define the data structures** for contract types, scores, questions, and recommendations
2. **Implement the question database** with scores for each option
3. **Create the scoring algorithm**:
   - Calculate min/max possible scores
   - Calculate base percentages based on user scores
   - Generate appropriate strengths/weaknesses for answers
   - Adjust percentages based on strengths
   - Determine the recommended contract type
4. **Build a data storage mechanism** to save results
5. **Create a UI layer** to present questions and display recommendations

## Conclusion

This document provides the technical details needed to implement the contract advisor system in any language or framework. The core algorithm is language-agnostic and can be ported to other systems as needed.

By focusing on implementing the scoring algorithm, strength generators, and data structures, developers can recreate this functionality in their preferred technology stack.
