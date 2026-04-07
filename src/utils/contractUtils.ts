import { Scores, ContractType, ContractRecommendation } from "@/types/contract";
import { questions } from "./contractQuestions";
import { getContractStrengths } from "./contractStrengths";
import {
  calculateMaxScores,
  calculateMinScores,
  calculateBasePercentages,
  adjustPercentagesBasedOnStrengths,
  determineRecommendedType,
  roundPercentages
} from "./contractScoring";

export { questions };

export const contractDescriptions = {
  variabel: {
    title: "Variabel contract",
    description: "Een variabel contract past bij jou omdat je flexibel wilt zijn en kunt omgaan met prijzen die elke drie maanden kunnen veranderen.",
    explanation: "Bij een variabel contract:\n\n" +
      "• Worden je energietarieven elke 3 maanden opnieuw vastgesteld\n" +
      "• Profiteer je automatisch als de energieprijzen dalen\n" +
      "• Kunnen je maandelijkse kosten stijgen als de energieprijzen omhoog gaan\n" +
      "• Kun je elke maand wisselen naar een ander soort contract\n\n" +
      "Dit type contract is geschikt voor mensen die flexibel willen zijn en bereid zijn wat meer risico te nemen in ruil voor mogelijke besparingen.",
  },
  vast1: {
    title: "1 jaar vast contract",
    description: "Een contract voor 1 jaar past bij jou omdat je een goede mix zoekt tussen zekerheid en flexibiliteit.",
    explanation: "Bij een 1-jarig vast contract:\n\n" +
      "• Ligt je energietarief voor 1 jaar vast\n" +
      "• Weet je precies wat je elke maand betaalt\n" +
      "• Ben je beschermd tegen prijsstijgingen\n" +
      "• Kun je na 1 jaar wisselen naar een ander soort contract\n\n" +
      "Dit type contract is ideaal als je zekerheid wilt voor je maandlasten, maar wel de vrijheid wilt hebben om na een jaar te kunnen overstappen.",
  },
  vast3: {
    title: "3 jaar vast contract",
    description: "Een contract voor 3 jaar past bij jou omdat je graag precies wilt weten wat je betaalt.",
    explanation: "Bij een 3-jarig vast contract:\n\n" +
      "• Ligt je energietarief voor 3 jaar vast\n" +
      "• Heb je maximale zekerheid over je energiekosten\n" +
      "• Ben je langdurig beschermd tegen prijsstijgingen\n" +
      "• Betaal je meestal iets meer voor deze zekerheid\n\n" +
      "Dit type contract is perfect als je vooral rust wilt en niet wilt nadenken over je energiekosten of veranderende prijzen.",
  },
  dynamisch: {
    title: "Dynamisch contract",
    description: "Een dynamisch contract past bij jou omdat je actief met je energieverbruik bezig wilt zijn en kunt profiteren van goedkope momenten.",
    explanation: "Bij een dynamisch contract:\n\n" +
      "• Veranderen de stroomprijzen elk uur en de gasprijzen elke dag\n" +
      "• Kun je flink besparen door slim te plannen\n" +
      "• Betaal je soms heel weinig (of krijg je zelfs geld)\n" +
      "• Kun je elke maand wisselen naar een ander soort contract\n\n" +
      "Dit type contract is ideaal als je thuis bent op flexibele tijden en bereid bent je energieverbruik aan te passen aan de goedkope momenten.",
  },
};

export const getRecommendation = (scores: Scores, answers: Array<Scores | null>): ContractRecommendation => {
  // Calculate max and min scores for each contract type
  const maxScoresPerType = calculateMaxScores();
  const minScoresPerType = calculateMinScores();

  // Log the scores for debugging
  console.log('Behaalde scores:', scores);
  console.log('Min scores:', minScoresPerType);
  console.log('Max scores:', maxScoresPerType);
  
  // Log for each contract type the min, max and current score
  Object.keys(scores).forEach(type => {
    console.log(`${type}: min=${minScoresPerType[type as ContractType]}, max=${maxScoresPerType[type as ContractType]}, current=${scores[type as ContractType]}`);
  });

  // Calculate base percentages
  const basePercentages = calculateBasePercentages(scores, minScoresPerType, maxScoresPerType);
  console.log('Base percentages:', basePercentages);

  // Get contract strengths
  const strengths = getContractStrengths(scores, answers);
  
  // Adjust percentages based on strengths
  const adjustedPercentages = adjustPercentagesBasedOnStrengths(basePercentages, strengths);
  console.log('Adjusted percentages:', adjustedPercentages);

  // Round the percentages
  const percentages = roundPercentages(adjustedPercentages);

  // Determine the recommended contract type
  const recommendedType = determineRecommendedType(percentages);

  // Return the recommendation
  return {
    ...contractDescriptions[recommendedType],
    percentages,
    recommendedType,
    strengths: getContractStrengths(scores, answers),
  };
};
