
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getApparatenStrengths = (apparatenScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (apparatenScore) {
    if (apparatenScore.dynamisch >= 2) {
      strengths.dynamisch.push({
        text: "Je hebt grote elektrische apparaten (zoals laadpaal of thuisbatterij) waarmee je optimaal kunt profiteren van goedkope momenten",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Je hebt grote elektrische apparaten, maar bij kwartaaltarieven is het moment van gebruik minder relevant",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je hebt apparaten die kunnen profiteren van dynamische prijzen, maar dat is niet mogelijk met een vast contract",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Je hebt apparaten die kunnen profiteren van dynamische prijzen, maar dat is niet mogelijk met een vast contract",
        status: "negative"
      });
    } else if (apparatenScore.dynamisch > 0 && apparatenScore.dynamisch < 2) {
      strengths.dynamisch.push({
        text: "Met je zonnepanelen kun je op zonnige dagen profiteren van de dynamische prijsverschillen",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je zonnepanelen zijn nuttig, maar bij kwartaaltarieven kun je niet optimaal profiteren van uurlijkse prijsverschillen",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Met zonnepanelen kun je in theorie profiteren van wisselende prijzen, maar dat is niet relevant bij een vast contract",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Met zonnepanelen kun je in theorie profiteren van wisselende prijzen, maar dat is niet relevant bij een vast contract",
        status: "acceptable"
      });
    } else if (apparatenScore.dynamisch === -2) {
      strengths.dynamisch.push({
        text: "Zonder duurzame installaties is het lastiger om optimaal te profiteren van dynamische tarieven",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Zonder duurzame installaties heeft een variabel contract een gemiddelde geschiktheid",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Zonder duurzame installaties is een vast contract een stabiele en voorspelbare keuze",
        status: "optimal"
      });
      strengths.vast1.push({
        text: "Zonder duurzame installaties is een vast contract een stabiele en voorspelbare keuze",
        status: "optimal"
      });
    } else {
      strengths.dynamisch.push({
        text: "Je apparatensituatie geeft geen duidelijke voorkeur voor een bepaald contracttype",
        status: "acceptable"
      });
      strengths.variabel.push({
        text: "Je apparatensituatie heeft weinig invloed op de geschiktheid van een variabel contract",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je apparatensituatie geeft geen sterke indicatie voor of tegen een vast contract",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je apparatensituatie geeft geen sterke indicatie voor of tegen een vast contract",
        status: "acceptable"
      });
    }
  } else {
    Object.keys(strengths).forEach(type => {
      strengths[type as ContractType].push({
        text: "Geen antwoord gegeven over elektrische apparaten",
        status: "negative"
      });
    });
  }

  return strengths;
};
