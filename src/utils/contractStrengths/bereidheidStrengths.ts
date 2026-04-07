
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getBereidheidStrengths = (bereidheidScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (bereidheidScore) {
    if (bereidheidScore.dynamisch === 2) {
      strengths.dynamisch.push({
        text: "Je bent bereid om je energieverbruik actief aan te passen om te besparen, perfect voor een dynamisch contract",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Je wilt je verbruik aanpassen, maar bij een variabel contract met kwartaaltarieven levert dit minder voordeel op",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je bent bereid je verbruik aan te passen, maar een vast contract biedt geen financiële prikkel hiervoor",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Je bent bereid je verbruik aan te passen, maar een vast contract biedt geen financiële prikkel hiervoor",
        status: "negative"
      });
    } else if (bereidheidScore.dynamisch === 1) {
      strengths.dynamisch.push({
        text: "Je wilt enigszins rekening houden met energieprijzen, wat goed past bij een dynamisch contract",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je wilt enigszins rekening houden met prijzen, maar bij kwartaaltarieven heeft dit weinig effect",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je wilt enigszins rekening houden met prijzen, maar bij vaste tarieven maakt het moment van verbruik geen verschil",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je wilt enigszins rekening houden met prijzen, maar bij vaste tarieven maakt het moment van verbruik geen verschil",
        status: "acceptable"
      });
    } else if (bereidheidScore.dynamisch === -2) {
      strengths.dynamisch.push({
        text: "Je wilt niet nadenken over energieprijzen bij je verbruik, wat minder goed past bij een dynamisch contract",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je wilt niet nadenken over prijzen, wat prima kan bij kwartaaltarieven zonder dagelijks plannen",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je wilt niet nadenken over energieprijzen en gebruikt energie wanneer nodig, perfect voor een vast contract",
        status: "optimal"
      });
      strengths.vast1.push({
        text: "Je wilt niet nadenken over energieprijzen en gebruikt energie wanneer nodig, perfect voor een vast contract",
        status: "optimal"
      });
    } else {
      strengths.dynamisch.push({
        text: "Je staat neutraal tegenover het aanpassen van je verbruik, terwijl een dynamisch contract hier wel om vraagt",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je neutrale houding over het aanpassen van je verbruik past redelijk bij een variabel contract",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je neutrale houding over het aanpassen van je verbruik past goed bij een vast contract",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je neutrale houding over het aanpassen van je verbruik past goed bij een vast contract",
        status: "acceptable"
      });
    }
  } else {
    Object.keys(strengths).forEach(type => {
      strengths[type as ContractType].push({
        text: "Geen antwoord gegeven over bereidheid tot aanpassen verbruik",
        status: "negative"
      });
    });
  }

  return strengths;
};
