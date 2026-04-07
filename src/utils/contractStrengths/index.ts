
import { Scores, ContractType, ContractStrength } from "@/types/contract";
import { getZekerheidsStrengths } from "./zekerheidsStrengths";
import { getFinancieleStrengths } from "./financieleStrengths";
import { getMogelijkheidStrengths } from "./mogelijkheidStrengths";
import { getBereidheidStrengths } from "./bereidheidStrengths";
import { getApparatenStrengths } from "./apparatenStrengths";

export const getContractStrengths = (scores: Scores, answers: Array<Scores | null>): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  // Vraag 1: Zekerheid over maandlasten
  const zekerheidsStrengths = getZekerheidsStrengths(answers[0]);
  Object.keys(zekerheidsStrengths).forEach(type => {
    strengths[type as ContractType].push(...zekerheidsStrengths[type as ContractType]);
  });

  // Vraag 2: Financiële ruimte voor schommelingen
  const financieleStrengths = getFinancieleStrengths(answers[1]);
  Object.keys(financieleStrengths).forEach(type => {
    strengths[type as ContractType].push(...financieleStrengths[type as ContractType]);
  });

  // Vraag 3: Mogelijkheid om verbruik aan te passen
  const mogelijkheidStrengths = getMogelijkheidStrengths(answers[2]);
  Object.keys(mogelijkheidStrengths).forEach(type => {
    strengths[type as ContractType].push(...mogelijkheidStrengths[type as ContractType]);
  });

  // Vraag 4: Bereidheid om verbruik aan te passen
  const bereidheidStrengths = getBereidheidStrengths(answers[3]);
  Object.keys(bereidheidStrengths).forEach(type => {
    strengths[type as ContractType].push(...bereidheidStrengths[type as ContractType]);
  });

  // Vraag 5: Welke (duurzame) installaties heb je in huis?
  const apparatenStrengths = getApparatenStrengths(answers[4]);
  Object.keys(apparatenStrengths).forEach(type => {
    strengths[type as ContractType].push(...apparatenStrengths[type as ContractType]);
  });

  return strengths;
};
