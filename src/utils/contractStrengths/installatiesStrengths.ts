
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getInstallatiesStrengths = (financieleRuimteScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (financieleRuimteScore) {
    if (financieleRuimteScore.dynamisch >= 3) {
      strengths.dynamisch.push({
        text: "Je hebt genoeg financiële ruimte om schommelingen in kosten op te vangen, perfect bij dynamische tarieven",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Je hebt voldoende financiële ruimte om schommelingen per kwartaal goed op te vangen",
        status: "optimal"  // Changed from acceptable to optimal
      });
      strengths.vast3.push({
        text: "Je hebt veel financiële ruimte, dus zou je ook kunnen profiteren van contracten met meer prijsschommelingen",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je hebt veel financiële ruimte, dus zou je ook kunnen profiteren van contracten met meer prijsschommelingen",
        status: "acceptable"
      });
    } else if (financieleRuimteScore.vast1 >= 3 && financieleRuimteScore.dynamisch <= -3) {
      strengths.dynamisch.push({
        text: "Je hebt weinig financiële ruimte voor variabele kosten, wat minder past bij de schommelingen van een dynamisch contract",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je hebt weinig financiële ruimte voor onverwachte kosten, wat minder past bij kwartaalschommelingen",
        status: "negative"
      });
      strengths.vast3.push({
        text: "Je voorkeur voor stabiele kosten maakt een vast contract voor langere tijd zeer geschikt",
        status: "optimal"
      });
      strengths.vast1.push({
        text: "Je voorkeur voor stabiele kosten maakt een vast contract zeer geschikt",
        status: "optimal"
      });
    } else if (financieleRuimteScore.variabel >= 2 && financieleRuimteScore.vast3 <= 0) {
      strengths.dynamisch.push({
        text: "Met enige financiële ruimte kun je beperkte prijsschommelingen opvangen, maar dynamische contracten kunnen soms grote uitschieters hebben",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Met je gemiddelde financiële ruimte past een variabel contract goed bij je, met slechts kwartaalschommelingen",
        status: "optimal"  // Changed from acceptable to optimal
      });
      strengths.vast3.push({
        text: "Je hebt wat ruimte voor prijsschommelingen, maar een vast contract biedt toch meer zekerheid als dat belangrijk voor je is",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je hebt wat ruimte voor prijsschommelingen, maar een vast contract biedt toch meer zekerheid als dat belangrijk voor je is",
        status: "acceptable"
      });
    } else {
      strengths.dynamisch.push({
        text: "Je financiële situatie geeft geen sterke indicatie voor of tegen een dynamisch contract",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je financiële situatie heeft geen sterke invloed op de geschiktheid van een variabel contract",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je financiële situatie geeft geen sterke indicatie voor of tegen een vast contract",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je financiële situatie geeft geen sterke indicatie voor of tegen een vast contract",
        status: "acceptable"
      });
    }
  } else {
    Object.keys(strengths).forEach(type => {
      strengths[type as ContractType].push({
        text: "Geen antwoord gegeven over je financiële ruimte",
        status: "negative"
      });
    });
  }

  return strengths;
};
