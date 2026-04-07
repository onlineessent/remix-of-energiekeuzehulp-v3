
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getMogelijkheidStrengths = (mogelijkheidScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (mogelijkheidScore) {
    if (mogelijkheidScore.dynamisch === 3) {
      strengths.dynamisch.push({
        text: "Je bent vaak thuis en kunt je verbruik aanpassen aan goedkope momenten, ideaal voor een dynamisch contract",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Je bent vaak thuis, maar bij kwartaaltarieven heeft het aanpassen van je dagelijks verbruik weinig zin",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je flexibele aanwezigheid thuis heeft weinig invloed op een vast contract zonder prijsschommelingen",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je flexibele aanwezigheid thuis heeft weinig invloed op een vast contract zonder prijsschommelingen",
        status: "acceptable"
      });
    } else if (mogelijkheidScore.dynamisch === 2) {
      strengths.dynamisch.push({
        text: "Je bent regelmatig thuis en kunt je verbruik aanpassen, wat redelijk goed past bij een dynamisch contract",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je bent regelmatig thuis, maar bij kwartaaltarieven is dagelijkse aanpassing niet relevant",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je bent regelmatig thuis, maar bij een vast contract maakt het tijdstip van energieverbruik geen verschil",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je bent regelmatig thuis, maar bij een vast contract maakt het tijdstip van energieverbruik geen verschil",
        status: "acceptable"
      });
    } else if (mogelijkheidScore.dynamisch === -3) {
      strengths.dynamisch.push({
        text: "Je bent overdag meestal niet thuis om je verbruik aan te passen, wat minder goed past bij een dynamisch contract",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je beperkte aanwezigheid thuis heeft weinig invloed op een variabel contract met kwartaaltarieven",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je gebruikt energie wanneer nodig zonder rekening te houden met tijdstip, perfect voor een vast contract",
        status: "optimal"
      });
      strengths.vast1.push({
        text: "Je gebruikt energie wanneer nodig zonder rekening te houden met tijdstip, perfect voor een vast contract",
        status: "optimal"
      });
    } else {
      strengths.dynamisch.push({
        text: "Je aanwezigheid thuis en mogelijkheid om energieverbruik aan te passen is gemiddeld",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je aanwezigheid thuis heeft weinig invloed op een variabel contract met kwartaaltarieven",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je gemiddelde aanwezigheid thuis heeft weinig invloed op de geschiktheid van een vast contract",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je gemiddelde aanwezigheid thuis heeft weinig invloed op de geschiktheid van een vast contract",
        status: "acceptable"
      });
    }
  } else {
    Object.keys(strengths).forEach(type => {
      strengths[type as ContractType].push({
        text: "Geen antwoord gegeven over mogelijkheid tot aanpassen verbruik",
        status: "negative"
      });
    });
  }

  return strengths;
};
