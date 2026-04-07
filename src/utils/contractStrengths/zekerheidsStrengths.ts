
import { Scores, ContractType, ContractStrength } from "@/types/contract";

export const getZekerheidsStrengths = (zekerheidsScore: Scores | null): Record<ContractType, ContractStrength[]> => {
  const strengths: Record<ContractType, ContractStrength[]> = {
    dynamisch: [],
    vast3: [],
    vast1: [],
    variabel: []
  };

  if (zekerheidsScore) {
    // Eerste antwoordoptie: Maximale prijszekerheid voor meerdere jaren
    // Dit komt overeen met scores: variabel: -6, vast1: 3, vast3: 7.5, dynamisch: -7.5
    if (zekerheidsScore.vast3 === 7.5 && zekerheidsScore.vast1 === 3 && zekerheidsScore.dynamisch === -7.5) {
      strengths.dynamisch.push({
        text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een variabel contract de prijzen elk kwartaal kunnen wijzigen",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Je wilt voor meerdere jaren zekerheid over je kosten. Een 1-jarig contract biedt wel zekerheid, maar niet voor meerdere jaren",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je wilt voor meerdere jaren precies weten wat je betaalt, wat perfect past bij een 3-jarig vast contract",
        status: "optimal"
      });
    } 
    // Tweede antwoordoptie: Prijszekerheid voor één jaar
    // Dit komt overeen met scores: variabel: -1.5, vast1: 7.5, vast3: 3, dynamisch: -7.5
    else if (zekerheidsScore.vast1 === 7.5 && zekerheidsScore.vast3 === 3 && zekerheidsScore.dynamisch === -7.5) {
      strengths.dynamisch.push({
        text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl variabele tarieven per kwartaal kunnen wijzigen",
        status: "negative"
      });
      strengths.vast1.push({
        text: "Je wilt ongeveer een jaar weten wat je betaalt en daarna opnieuw kunnen kiezen, perfect bij een 1-jarig contract",
        status: "optimal"
      });
      strengths.vast3.push({
        text: "Je wilt voor één jaar zekerheid, terwijl een 3-jarig contract je voor langere tijd vastlegt",
        status: "acceptable"
      });
    } 
    // Derde antwoordoptie: Tarieven die enkele keren per jaar veranderen
    // Dit komt overeen met scores: variabel: 7.5, vast1: 0, vast3: -1.5, dynamisch: -4.5
    else if (zekerheidsScore.variabel === 7.5 && zekerheidsScore.vast3 === -1.5 && zekerheidsScore.dynamisch === -4.5) {
      strengths.dynamisch.push({
        text: "Je vindt het prima als kosten enkele keren per jaar veranderen, terwijl dynamische tarieven elk uur wijzigen",
        status: "negative"
      });
      strengths.variabel.push({
        text: "Je vindt het prima als kosten enkele keren per jaar veranderen met kans op lagere en hogere prijzen, perfect voor een variabel contract",
        status: "optimal"
      });
      strengths.vast1.push({
        text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een vast contract",
        status: "acceptable"
      });
      strengths.vast3.push({
        text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een 3-jarig vast contract",
        status: "negative"
      });
    } 
    // Vierde antwoordoptie: Vind het niet erg dat kosten variëren
    // Dit komt overeen met scores: variabel: 0, vast1: -4.5, vast3: -7.5, dynamisch: 7.5
    else if (zekerheidsScore.dynamisch === 7.5 && zekerheidsScore.vast3 === -7.5 && zekerheidsScore.vast1 === -4.5) {
      strengths.dynamisch.push({
        text: "Het maakt je niet uit dat je energiekosten elke maand anders zijn en je wilt meteen profiteren van lage prijzen, perfect voor een dynamisch contract",
        status: "optimal"
      });
      strengths.variabel.push({
        text: "Je vindt variërende energiekosten acceptabel, een variabel contract biedt kwartaalaanpassingen bij marktveranderingen",
        status: "acceptable"
      });
      strengths.vast1.push({
        text: "Je wilt direct kunnen profiteren van lage prijzen, wat niet mogelijk is bij een vast contract",
        status: "negative"
      });
      strengths.vast3.push({
        text: "Je vindt variërende energiekosten acceptabel, maar een vast contract voor 3 jaar biedt geen flexibiliteit",
        status: "negative"
      });
    } 
    // Als we geen exacte match hebben, mogelijk door afronding of andere oorzaken
    else {
      // Controleer of het dicht bij de eerste optie ligt (maximale prijszekerheid voor meerdere jaren)
      if (zekerheidsScore.vast3 > 6 && zekerheidsScore.vast1 > 0 && zekerheidsScore.dynamisch < -6) {
        strengths.dynamisch.push({
          text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
          status: "negative"
        });
        strengths.variabel.push({
          text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een variabel contract de prijzen elk kwartaal kunnen wijzigen",
          status: "negative"
        });
        strengths.vast1.push({
          text: "Je wilt voor meerdere jaren zekerheid over je kosten. Een 1-jarig contract biedt wel zekerheid, maar niet voor meerdere jaren",
          status: "acceptable"
        });
        strengths.vast3.push({
          text: "Je wilt voor meerdere jaren precies weten wat je betaalt, wat perfect past bij een 3-jarig vast contract",
          status: "optimal"
        });
      }
      // Controleer of het dicht bij de tweede optie ligt (prijszekerheid voor één jaar)
      else if (zekerheidsScore.vast1 > 6 && zekerheidsScore.vast3 > 0 && zekerheidsScore.dynamisch < -6) {
        strengths.dynamisch.push({
          text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
          status: "negative"
        });
        strengths.variabel.push({
          text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl variabele tarieven per kwartaal kunnen wijzigen",
          status: "negative"
        });
        strengths.vast1.push({
          text: "Je wilt ongeveer een jaar weten wat je betaalt en daarna opnieuw kunnen kiezen, perfect bij een 1-jarig contract",
          status: "optimal"
        });
        strengths.vast3.push({
          text: "Je wilt voor één jaar zekerheid, terwijl een 3-jarig contract je voor langere tijd vastlegt",
          status: "acceptable"
        });
      }
      // Controleer of het dicht bij de derde optie ligt (tarieven die enkele keren per jaar veranderen)
      else if (zekerheidsScore.variabel > 6 && zekerheidsScore.vast3 < 0 && zekerheidsScore.dynamisch < 0) {
        strengths.dynamisch.push({
          text: "Je vindt het prima als kosten enkele keren per jaar veranderen, terwijl dynamische tarieven elk uur wijzigen",
          status: "negative"
        });
        strengths.variabel.push({
          text: "Je vindt het prima als kosten enkele keren per jaar veranderen met kans op lagere en hogere prijzen, perfect voor een variabel contract",
          status: "optimal"
        });
        strengths.vast1.push({
          text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een vast contract",
          status: "acceptable"
        });
        strengths.vast3.push({
          text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een 3-jarig vast contract",
          status: "negative"
        });
      }
      // Controleer of het dicht bij de vierde optie ligt (vind het niet erg dat kosten variëren)
      else if (zekerheidsScore.dynamisch > 6 && zekerheidsScore.vast3 < -6 && zekerheidsScore.vast1 < 0) {
        strengths.dynamisch.push({
          text: "Het maakt je niet uit dat je energiekosten elke maand anders zijn en je wilt meteen profiteren van lage prijzen, perfect voor een dynamisch contract",
          status: "optimal"
        });
        strengths.variabel.push({
          text: "Je vindt variërende energiekosten acceptabel, een variabel contract biedt kwartaalaanpassingen bij marktveranderingen",
          status: "acceptable"
        });
        strengths.vast1.push({
          text: "Je wilt direct kunnen profiteren van lage prijzen, wat niet mogelijk is bij een vast contract",
          status: "negative"
        });
        strengths.vast3.push({
          text: "Je vindt variërende energiekosten acceptabel, maar een vast contract voor 3 jaar biedt geen flexibiliteit",
          status: "negative"
        });
      }
      // Fallback als we geen goede match kunnen vinden
      else {
        strengths.dynamisch.push({
          text: "Je hebt specifieke voorkeuren over je energiekosten. Bij een dynamisch contract veranderen prijzen elk uur, wat voor- en nadelen kan hebben",
          status: "acceptable"
        });
        strengths.variabel.push({
          text: "Je hebt specifieke voorkeuren over je energiekosten. Een variabel contract met kwartaalwijzigingen zou kunnen passen",
          status: "acceptable"
        });
        strengths.vast1.push({
          text: "Je hebt specifieke voorkeuren over je energiekosten. Een 1-jarig contract biedt een balans tussen zekerheid en flexibiliteit",
          status: "acceptable"
        });
        strengths.vast3.push({
          text: "Je hebt specifieke voorkeuren over je energiekosten. Een 3-jarig contract biedt maximale stabiliteit en voorspelbaarheid",
          status: "acceptable"
        });
      }
    }
  } else {
    Object.keys(strengths).forEach(type => {
      strengths[type as ContractType].push({
        text: "Geen antwoord gegeven over vaste of variabele kosten",
        status: "negative"
      });
    });
  }

  return strengths;
};
