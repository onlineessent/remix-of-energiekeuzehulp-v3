
# Contract Scoring Algorithm Overview

This document provides a focused explanation of the contract recommendation scoring algorithm, suitable for implementing in any programming language.

## Algorithm Steps

1. **Collect User Responses**
   - Present questions about energy usage preferences, habits, and situation
   - Each answer has predefined score impacts for each contract type

2. **Calculate Raw Scores**
   - Sum the scores for each contract type across all answers
   - Example: If a user selects options that give [3, -1, 4, 2] points to the dynamic contract across 4 questions, the raw score is 8

3. **Normalize Scores to Percentages**
   - Calculate theoretical min/max possible scores for each contract type
   - Determine where the user's score falls in this range
   - Convert to a percentage: (user_score - min_score) / (max_score - min_score) * 100
   - Apply a minimum threshold (e.g., 20%) to ensure no contract type appears completely unsuitable

4. **Generate Qualitative Strengths/Weaknesses**
   - For each answer, determine if it's a strength, acceptable, or weakness for each contract type
   - Apply domain-specific rules (e.g., "Being home during the day is optimal for dynamic contracts")
   - Store these labeled strengths with their status

5. **Adjust Percentages Based on Strengths**
   - Count optimal strengths and negative aspects for each contract type
   - Apply a small adjustment (±5%) based on the strength/weakness ratio
   - Ensure adjusted percentages stay within reasonable bounds (15%-100%)

6. **Select Best Match**
   - The contract type with the highest adjusted percentage is recommended
   - In case of a tie, additional tiebreaker rules can be applied

## Pseudocode Implementation

```
function calculateRecommendation(answers):
    // Step 1: Calculate raw scores
    raw_scores = {
        "variable": 0,
        "fixed_1yr": 0, 
        "fixed_3yr": 0,
        "dynamic": 0
    }
    
    for each answer in answers:
        for each contract_type in raw_scores:
            raw_scores[contract_type] += answer.scores[contract_type]
    
    // Step 2: Calculate min/max possible scores
    min_scores = calculateMinPossibleScores()
    max_scores = calculateMaxPossibleScores()
    
    // Step 3: Normalize to percentages
    percentages = {}
    for each contract_type in raw_scores:
        range = max_scores[contract_type] - min_scores[contract_type]
        achieved = raw_scores[contract_type] - min_scores[contract_type]
        
        if range == 0:
            percentages[contract_type] = 50  // Default if no range
        else:
            percentage = (achieved / range) * 100
            percentages[contract_type] = max(20, min(100, percentage))
    
    // Step 4: Generate strengths for each answer
    strengths = generateStrengths(answers)
    
    // Step 5: Adjust percentages
    for each contract_type in percentages:
        contract_strengths = strengths[contract_type]
        
        optimal_count = count where strength.status == "optimal"
        negative_count = count where strength.status == "negative"
        total = contract_strengths.length
        
        if total > 0:
            adjustment_factor = (optimal_count - negative_count) / total
            max_adjustment = 5
            adjustment = adjustment_factor * max_adjustment
            
            has_non_optimal = any strength where status != "optimal"
            max_percentage = has_non_optimal ? 95 : 100
            
            percentages[contract_type] = max(15, min(max_percentage, 
                                            percentages[contract_type] + adjustment))
    
    // Step 6: Find best match
    best_match = contract_type with highest percentage in percentages
    
    return {
        recommended_type: best_match,
        percentages: percentages,
        strengths: strengths
    }
```

## Considerations for Implementation

1. **Question Design**
   - Questions should be crafted so that answers have meaningful score differentials
   - The scoring system should be balanced so no contract type is inherently favored

2. **Localization**
   - Strength/weakness text should be localizable
   - Questions and explanation text should be separated from logic

3. **Extensibility**
   - The algorithm can be extended to support additional contract types
   - Weights could be added to make certain questions more important than others

## Conclusion

This algorithm provides a balanced approach to contract recommendation by combining quantitative scoring with qualitative explanation. The scoring is transparent and explainable, making it suitable for decision-support systems where users need to understand why a particular option is recommended.
