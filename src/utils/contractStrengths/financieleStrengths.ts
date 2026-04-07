
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getFinancieleStrengths = (financieleScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (financieleScore) {
    // Veel ruimte
    if (financieleScore.dynamisch === 3) {
      strengths.dynamisch.push({
        text: "Je geeft aan veel financiële ruimte te hebben, waardoor je goed kunt omgaan met de dagelijkse prijsschommelingen van een dynamisch contract",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Met jouw ruime financiële buffer kun je de driemaandelijkse prijsaanpassingen van een variabel contract goed opvangen",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je hebt aangegeven veel financiële ruimte te hebben, waardoor een vast contract voor zekerheid niet per se nodig is",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Gezien je financiële situatie heb je de zekerheid van een langlopend vast contract niet direct nodig",
        status: "acceptable"
      });
    }
    // Ruimte
    else if (financieleScore.dynamisch === 2) {
      strengths.dynamisch.push({
        text: "Je hebt voldoende financiële ruimte om de dagelijkse prijswisselingen van een dynamisch contract op te vangen",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Met jouw financiële situatie kun je de driemaandelijkse prijsaanpassingen van een variabel contract goed aan",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Hoewel je prijsschommelingen aankunt, biedt een vast contract voor 1 jaar extra zekerheid",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je kunt prijsschommelingen aan, waardoor de lange termijn zekerheid van een 3-jarig contract niet noodzakelijk is",
        status: "acceptable"
      });
    }
    // Wat ruimte
    else if (financieleScore.dynamisch === 0) {
      strengths.dynamisch.push({
        text: "Met beperkte financiële ruimte kunnen de dagelijkse prijsschommelingen van een dynamisch contract risicovol zijn",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je hebt aangegeven wat financiële ruimte te hebben, maar de prijswijzigingen van een variabel contract kunnen soms fors zijn",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Een vast contract voor 1 jaar past goed bij jouw behoefte aan enige financiële voorspelbaarheid",
        status: "optimal"
      });
      strengths.vast3.push({
        text: "Met een 3-jarig vast contract weet je precies waar je aan toe bent, wat past bij jouw financiële situatie",
        status: "optimal"
      });
    }
    // Minder ruimte
    else if (financieleScore.dynamisch === -3) {
      strengths.dynamisch.push({
        text: "De dagelijkse prijsschommelingen van een dynamisch contract passen niet bij jouw beperkte financiële ruimte",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Met minder financiële ruimte zijn de driemaandelijkse prijsaanpassingen van een variabel contract mogelijk te onzeker",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Een vast contract voor 1 jaar geeft je de gewenste financiële zekerheid voor de kortere termijn",
        status: "optimal"
      });
      strengths.vast3.push({
        text: "Een 3-jarig vast contract biedt de financiële voorspelbaarheid die je zoekt",
        status: "optimal"
      });
    }
    // Beperkte ruimte
    else if (financieleScore.dynamisch === -4) {
      strengths.dynamisch.push({
        text: "Met beperkte financiële ruimte zijn de dagelijkse prijsschommelingen van een dynamisch contract te risicovol",
        status: "negative"
      });
      strengths.variabel.push({
        text: "De driemaandelijkse prijsaanpassingen van een variabel contract passen niet bij jouw behoefte aan stabiele maandlasten",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Een vast contract voor 1 jaar biedt de financiële zekerheid die je nodig hebt",
        status: "optimal"
      });
      strengths.vast3.push({
        text: "Een 3-jarig vast contract geeft je maximale zekerheid over je energiekosten, wat perfect aansluit bij jouw financiële situatie",
        status: "optimal"
      });
    }
    // Fallback voor onverwachte scores
    else {
      strengths.dynamisch.push({
        text: "Je financiële ruimte bepaalt mede of je de prijsschommelingen van een dynamisch contract aankunt",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Bij een variabel contract veranderen de prijzen elk kwartaal, houd rekening met je financiële situatie",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Een vast contract voor 1 jaar biedt financiële voorspelbaarheid",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Een 3-jarig vast contract geeft maximale zekerheid over je energiekosten",
        status: "acceptable"
      });
    }
  }

  return strengths;
};
