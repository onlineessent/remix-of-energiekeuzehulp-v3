
/**
 * ContractAdvisorContent.tsx
 * 
 * This file contains all the user-facing text content used throughout the Contract Advisor application.
 * Content creators can modify the text in this file without needing to understand or modify the code.
 * 
 * INSTRUCTIONS FOR CONTENT CREATORS:
 * - Maintain the structure of this file (don't change variable names or export statements)
 * - You can modify any text within quotation marks
 * - Keep any formatting marks like \n (newline) or special characters intact
 * - For multiple-choice questions, maintain the number of options and their general intent
 */

// ==========================================
// GENERAL UI ELEMENTS
// ==========================================

export const generalUI = {
  nextButton: "Volgende vraag",
  backButton: "Vorige vraag",
  resetButton: "Begin opnieuw",
  submitButton: "Verstuur",
};

// ==========================================
// CONTRACT TYPES DESCRIPTIONS
// ==========================================

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

// ==========================================
// QUESTIONS AND OPTIONS
// ==========================================

export const questions = [
  {
    id: 1,
    text: "Hoe kijk je naar je energiekosten?",
    explanation: "Bij sommige contracten veranderen je energieprijzen vaker. Dit kan voordelen, maar ook risico's met zich meebrengen.",
    options: [
      {
        text: "Ik wil voor meerdere jaren precies weten wat ik betaal, ook als dat betekent dat ik misschien iets meer betaal.",
      },
      {
        text: "Ik wil ongeveer een jaar weten wat ik betaal, daarna wil ik opnieuw kunnen kiezen wat het beste past.",
      },
      {
        text: "Ik vind het prima als mijn kosten enkele keren per jaar veranderen, met kans op zowel lagere als hogere prijzen.",
      },
      {
        text: "Het maakt me niet uit dat mijn energiekosten elke maand anders zijn. Ik wil meteen profiteren van lage prijzen, ook al kunnen de prijzen soms hoger zijn.",
      },
    ],
  },
  {
    id: 2,
    text: "Hoeveel ruimte heb je om maandelijkse veranderingen in kosten te betalen?",
    explanation: "Bij sommige contracten kunnen je maandelijkse kosten sterk wisselen. Het is belangrijk om te weten of je hier financieel tegen kunt.",
    options: [
      {
        text: "Veel ruimte: Ik kan gemakkelijk wisselende kosten betalen, dat past goed binnen mijn budget.",
      },
      {
        text: "Ruimte: Kleine veranderingen in kosten kan ik goed verwerken.",
      },
      {
        text: "Wat ruimte: Een beetje verschil in kosten is prima voor mij.",
      },
      {
        text: "Minder ruimte: Het is soms wat uitdagend om grotere veranderingen in kosten op te vangen.",
      },
      {
        text: "Beperkte ruimte: Ik houd liever mijn kosten stabiel om binnen mijn budget te blijven.",
      },
    ],
  },
  {
    id: 3,
    text: "Kun je je stroomverbruik aanpassen aan goedkope en dure momenten?",
    explanation: "Bij een dynamisch contract is stroom op sommige uren goedkoper dan op andere. Als je apparaten kunt gebruiken op momenten dat stroom goedkoop is, kun je geld besparen. Dit hangt af van hoe vaak je thuis bent op deze goedkopere momenten.",
    options: [
      {
        text: "Ja, ik ben veel thuis en kan mijn apparaten aanzetten wanneer stroom goedkoper is.",
      },
      {
        text: "Soms, ik ben regelmatig thuis overdag en kan dan mijn stroomverbruik een beetje aanpassen.",
      },
      {
        text: "Nee, ik ben meestal niet thuis overdag en gebruik stroom wanneer ik het nodig heb.",
      },
    ],
  },
  {
    id: 4,
    text: "Wil je moeite doen om stroom te gebruiken op goedkope momenten?",
    explanation: "Bij een dynamisch contract is stroom op sommige uren goedkoper dan op andere. Als je apparaten kunt gebruiken op momenten dat stroom goedkoop is, kun je geld besparen. Dit hangt af van hoe vaak je thuis bent op deze goedkopere momenten.",
    options: [
      {
        text: "Ja, ik wil dagelijks energieprijzen controleren en mijn verbruik aanpassen. Bijvoorbeeld de wasmachine aanzetten op het goedkoopste moment van de dag.",
      },
      {
        text: "Soms, maar niet elke dag. Bijvoorbeeld door altijd in het weekend de wasmachine aan te zetten.",
      },
      {
        text: "Nee, ik wil niet nadenken over de energieprijs en gebruik stroom wanneer ik het nodig heb.",
      },
    ],
  },
  {
    id: 5,
    text: "Welke (duurzame) installaties heb je in huis of ben je van plan op korte termijn aan te schaffen?",
    explanation: "Duurzame installaties zoals zonnepanelen en warmtepompen kunnen je helpen om te profiteren van wisselende energieprijzen. Met zonnepanelen wek je bijvoorbeeld overdag stroom op, terwijl de prijzen dan vaak laag zijn. Een thuisbatterij kan je helpen om deze energie op te slaan voor momenten waarop de prijzen hoger zijn.",
    options: [
      {
        text: "Zonnepanelen",
      },
      {
        text: "Warmtepomp",
      },
      {
        text: "Thuisbatterij",
      },
      {
        text: "Laadpaal voor mijn elektrische auto",
      },
      {
        text: "Ik heb geen van deze installaties",
      },
    ],
  },
];

// ==========================================
// STRENGTH FEEDBACK MESSAGES BY CONTRACT TYPE
// ==========================================

// Zekerheid over maandlasten (vraag 1)
export const zekerheidsStrengths = {
  dynamisch: {
    wiltMeerdereJarenZekerheid: {
      text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
      status: "negative"
    },
    wiltEenJaarZekerheid: {
      text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl bij een dynamisch contract de prijzen per uur veranderen",
      status: "negative"
    },
    accepteertEnkeleKerenPerJaar: {
      text: "Je vindt het prima als kosten enkele keren per jaar veranderen, terwijl dynamische tarieven elk uur wijzigen",
      status: "negative"
    },
    accepteertMaandelijks: {
      text: "Het maakt je niet uit dat je energiekosten elke maand anders zijn en je wilt meteen profiteren van lage prijzen, perfect voor een dynamisch contract",
      status: "optimal"
    }
  },
  variabel: {
    wiltMeerdereJarenZekerheid: {
      text: "Je wilt voor meerdere jaren precies weten wat je betaalt, terwijl bij een variabel contract de prijzen elk kwartaal kunnen wijzigen",
      status: "negative" 
    },
    wiltEenJaarZekerheid: {
      text: "Je wilt ongeveer een jaar weten wat je betaalt, terwijl variabele tarieven per kwartaal kunnen wijzigen",
      status: "negative"
    },
    accepteertEnkeleKerenPerJaar: {
      text: "Je vindt het prima als kosten enkele keren per jaar veranderen met kans op lagere en hogere prijzen, perfect voor een variabel contract",
      status: "optimal"
    },
    accepteertMaandelijks: {
      text: "Je vindt variërende energiekosten acceptabel, een variabel contract biedt kwartaalaanpassingen bij marktveranderingen",
      status: "acceptable"
    }
  },
  vast1: {
    wiltMeerdereJarenZekerheid: {
      text: "Je wilt voor meerdere jaren zekerheid over je kosten. Een 1-jarig contract biedt wel zekerheid, maar niet voor meerdere jaren",
      status: "acceptable"
    },
    wiltEenJaarZekerheid: {
      text: "Je wilt ongeveer een jaar weten wat je betaalt en daarna opnieuw kunnen kiezen, perfect bij een 1-jarig contract",
      status: "optimal"
    },
    accepteertEnkeleKerenPerJaar: {
      text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een vast contract",
      status: "acceptable"
    },
    accepteertMaandelijks: {
      text: "Je wilt direct kunnen profiteren van lage prijzen, wat niet mogelijk is bij een vast contract",
      status: "negative"
    }
  },
  vast3: {
    wiltMeerdereJarenZekerheid: {
      text: "Je wilt voor meerdere jaren precies weten wat je betaalt, wat perfect past bij een 3-jarig vast contract",
      status: "optimal"
    },
    wiltEenJaarZekerheid: {
      text: "Je wilt voor één jaar zekerheid, terwijl een 3-jarig contract je voor langere tijd vastlegt",
      status: "acceptable"
    },
    accepteertEnkeleKerenPerJaar: {
      text: "Je wilt kunnen profiteren van prijsdalingen gedurende het jaar, wat niet mogelijk is bij een 3-jarig vast contract",
      status: "negative"
    },
    accepteertMaandelijks: {
      text: "Je vindt variërende energiekosten acceptabel, maar een vast contract voor 3 jaar biedt geen flexibiliteit",
      status: "negative"
    }
  }
};

// Financiële ruimte (vraag 2)
export const financieleStrengths = {
  dynamisch: {
    veelRuimte: {
      text: "Je hebt aangegeven veel financiële ruimte te hebben, waardoor je goed kunt omgaan met de dagelijkse prijsschommelingen van een dynamisch contract",
      status: "optimal"
    },
    ruimte: {
      text: "Je hebt voldoende financiële ruimte om de dagelijkse prijswisselingen van een dynamisch contract op te vangen",
      status: "acceptable"
    },
    watRuimte: {
      text: "Met beperkte financiële ruimte kunnen de dagelijkse prijsschommelingen van een dynamisch contract risicovol zijn",
      status: "negative"
    },
    minderRuimte: {
      text: "De dagelijkse prijsschommelingen van een dynamisch contract passen niet bij jouw beperkte financiële ruimte",
      status: "negative"
    },
    beperkteRuimte: {
      text: "Met beperkte financiële ruimte zijn de dagelijkse prijsschommelingen van een dynamisch contract te risicovol",
      status: "negative"
    }
  },
  variabel: {
    veelRuimte: {
      text: "Met jouw ruime financiële buffer kun je de driemaandelijkse prijsaanpassingen van een variabel contract goed opvangen",
      status: "acceptable"
    },
    ruimte: {
      text: "Met jouw financiële situatie kun je de driemaandelijkse prijsaanpassingen van een variabel contract goed aan",
      status: "acceptable"
    },
    watRuimte: {
      text: "Je hebt aangegeven wat financiële ruimte te hebben, maar de prijswijzigingen van een variabel contract kunnen soms fors zijn",
      status: "acceptable"
    },
    minderRuimte: {
      text: "Met minder financiële ruimte zijn de driemaandelijkse prijsaanpassingen van een variabel contract mogelijk te onzeker",
      status: "negative"
    },
    beperkteRuimte: {
      text: "De driemaandelijkse prijsaanpassingen van een variabel contract passen niet bij jouw behoefte aan stabiele maandlasten",
      status: "negative"
    }
  },
  vast1: {
    veelRuimte: {
      text: "Je hebt aangegeven veel financiële ruimte te hebben, waardoor een vast contract voor zekerheid niet per se nodig is",
      status: "acceptable"
    },
    ruimte: {
      text: "Hoewel je prijsschommelingen aankunt, biedt een vast contract voor 1 jaar extra zekerheid",
      status: "acceptable"
    },
    watRuimte: {
      text: "Een vast contract voor 1 jaar past goed bij jouw behoefte aan enige financiële voorspelbaarheid",
      status: "optimal"
    },
    minderRuimte: {
      text: "Een vast contract voor 1 jaar geeft je de gewenste financiële zekerheid voor de kortere termijn",
      status: "optimal"
    },
    beperkteRuimte: {
      text: "Een vast contract voor 1 jaar biedt de financiële zekerheid die je nodig hebt",
      status: "optimal"
    }
  },
  vast3: {
    veelRuimte: {
      text: "Gezien je financiële situatie heb je de zekerheid van een langlopend vast contract niet direct nodig",
      status: "acceptable"
    },
    ruimte: {
      text: "Je kunt prijsschommelingen aan, waardoor de lange termijn zekerheid van een 3-jarig contract niet noodzakelijk is",
      status: "acceptable"
    },
    watRuimte: {
      text: "Met een 3-jarig vast contract weet je precies waar je aan toe bent, wat past bij jouw financiële situatie",
      status: "optimal"
    },
    minderRuimte: {
      text: "Een 3-jarig vast contract biedt de financiële voorspelbaarheid die je zoekt",
      status: "optimal"
    },
    beperkteRuimte: {
      text: "Een 3-jarig vast contract geeft je maximale zekerheid over je energiekosten, wat perfect aansluit bij jouw financiële situatie",
      status: "optimal"
    }
  }
};

// Mogelijkheid om verbruik aan te passen (vraag 3)
export const mogelijkheidStrengths = {
  dynamisch: {
    veelThuis: {
      text: "Je bent vaak thuis en kunt je verbruik aanpassen aan goedkope momenten, ideaal voor een dynamisch contract",
      status: "optimal"
    },
    regelmatigThuis: {
      text: "Je bent regelmatig thuis en kunt je verbruik aanpassen, wat redelijk goed past bij een dynamisch contract",
      status: "acceptable"
    },
    nietThuis: {
      text: "Je bent overdag meestal niet thuis om je verbruik aan te passen, wat minder goed past bij een dynamisch contract",
      status: "negative"
    },
    gemiddeld: {
      text: "Je aanwezigheid thuis en mogelijkheid om energieverbruik aan te passen is gemiddeld",
      status: "acceptable"
    }
  },
  variabel: {
    veelThuis: {
      text: "Je bent vaak thuis, maar bij kwartaaltarieven heeft het aanpassen van je dagelijks verbruik weinig zin",
      status: "acceptable"
    },
    regelmatigThuis: {
      text: "Je bent regelmatig thuis, maar bij kwartaaltarieven is dagelijkse aanpassing niet relevant",
      status: "acceptable"
    },
    nietThuis: {
      text: "Je beperkte aanwezigheid thuis heeft weinig invloed op een variabel contract met kwartaaltarieven",
      status: "acceptable"
    },
    gemiddeld: {
      text: "Je aanwezigheid thuis heeft weinig invloed op een variabel contract met kwartaaltarieven",
      status: "acceptable"
    }
  },
  vast1: {
    veelThuis: {
      text: "Je flexibele aanwezigheid thuis heeft weinig invloed op een vast contract zonder prijsschommelingen",
      status: "acceptable"
    },
    regelmatigThuis: {
      text: "Je bent regelmatig thuis, maar bij een vast contract maakt het tijdstip van energieverbruik geen verschil",
      status: "acceptable"
    },
    nietThuis: {
      text: "Je gebruikt energie wanneer nodig zonder rekening te houden met tijdstip, perfect voor een vast contract",
      status: "optimal"
    },
    gemiddeld: {
      text: "Je gemiddelde aanwezigheid thuis heeft weinig invloed op de geschiktheid van een vast contract",
      status: "acceptable"
    }
  },
  vast3: {
    veelThuis: {
      text: "Je flexibele aanwezigheid thuis heeft weinig invloed op een vast contract zonder prijsschommelingen",
      status: "acceptable"
    },
    regelmatigThuis: {
      text: "Je bent regelmatig thuis, maar bij een vast contract maakt het tijdstip van energieverbruik geen verschil",
      status: "acceptable"
    },
    nietThuis: {
      text: "Je gebruikt energie wanneer nodig zonder rekening te houden met tijdstip, perfect voor een vast contract",
      status: "optimal"
    },
    gemiddeld: {
      text: "Je gemiddelde aanwezigheid thuis heeft weinig invloed op de geschiktheid van een vast contract",
      status: "acceptable"
    }
  }
};

// Bereidheid om verbruik aan te passen (vraag 4)
export const bereidheidStrengths = {
  dynamisch: {
    actiefAanpassen: {
      text: "Je bent bereid om je energieverbruik actief aan te passen om te besparen, perfect voor een dynamisch contract",
      status: "optimal"
    },
    somsAanpassen: {
      text: "Je wilt enigszins rekening houden met energieprijzen, wat goed past bij een dynamisch contract",
      status: "acceptable"
    },
    nietAanpassen: {
      text: "Je wilt niet nadenken over energieprijzen bij je verbruik, wat minder goed past bij een dynamisch contract",
      status: "negative"
    },
    neutraal: {
      text: "Je staat neutraal tegenover het aanpassen van je verbruik, terwijl een dynamisch contract hier wel om vraagt",
      status: "acceptable"
    }
  },
  variabel: {
    actiefAanpassen: {
      text: "Je wilt je verbruik aanpassen, maar bij een variabel contract met kwartaaltarieven levert dit minder voordeel op",
      status: "acceptable"
    },
    somsAanpassen: {
      text: "Je wilt enigszins rekening houden met prijzen, maar bij kwartaaltarieven heeft dit weinig effect",
      status: "acceptable"
    },
    nietAanpassen: {
      text: "Je wilt niet nadenken over prijzen, wat prima kan bij kwartaaltarieven zonder dagelijks plannen",
      status: "acceptable"
    },
    neutraal: {
      text: "Je neutrale houding over het aanpassen van je verbruik past redelijk bij een variabel contract",
      status: "acceptable"
    }
  },
  vast1: {
    actiefAanpassen: {
      text: "Je bent bereid je verbruik aan te passen, maar een vast contract biedt geen financiële prikkel hiervoor",
      status: "negative"
    },
    somsAanpassen: {
      text: "Je wilt enigszins rekening houden met prijzen, maar bij vaste tarieven maakt het moment van verbruik geen verschil",
      status: "acceptable"
    },
    nietAanpassen: {
      text: "Je wilt niet nadenken over energieprijzen en gebruikt energie wanneer nodig, perfect voor een vast contract",
      status: "optimal"
    },
    neutraal: {
      text: "Je neutrale houding over het aanpassen van je verbruik past goed bij een vast contract",
      status: "acceptable"
    }
  },
  vast3: {
    actiefAanpassen: {
      text: "Je bent bereid je verbruik aan te passen, maar een vast contract biedt geen financiële prikkel hiervoor",
      status: "negative"
    },
    somsAanpassen: {
      text: "Je wilt enigszins rekening houden met prijzen, maar bij vaste tarieven maakt het moment van verbruik geen verschil",
      status: "acceptable"
    },
    nietAanpassen: {
      text: "Je wilt niet nadenken over energieprijzen en gebruikt energie wanneer nodig, perfect voor een vast contract",
      status: "optimal"
    },
    neutraal: {
      text: "Je neutrale houding over het aanpassen van je verbruik past goed bij een vast contract",
      status: "acceptable"
    }
  }
};

// Apparaten en installaties (vraag 5)
export const apparatenStrengths = {
  dynamisch: {
    heeftGroteApparaten: {
      text: "Je hebt grote elektrische apparaten (zoals laadpaal of thuisbatterij) waarmee je optimaal kunt profiteren van goedkope momenten",
      status: "optimal"
    },
    heeftZonnepanelen: {
      text: "Met je zonnepanelen kun je op zonnige dagen profiteren van de dynamische prijsverschillen",
      status: "acceptable"
    },
    geenApparaten: {
      text: "Zonder duurzame installaties is het lastiger om optimaal te profiteren van dynamische tarieven",
      status: "negative"
    },
    gemiddeld: {
      text: "Je apparatensituatie geeft geen duidelijke voorkeur voor een bepaald contracttype",
      status: "acceptable"
    }
  },
  variabel: {
    heeftGroteApparaten: {
      text: "Je hebt grote elektrische apparaten, maar bij kwartaaltarieven is het moment van gebruik minder relevant",
      status: "acceptable"
    },
    heeftZonnepanelen: {
      text: "Je zonnepanelen zijn nuttig, maar bij kwartaaltarieven kun je niet optimaal profiteren van uurlijkse prijsverschillen",
      status: "acceptable"
    },
    geenApparaten: {
      text: "Zonder duurzame installaties heeft een variabel contract een gemiddelde geschiktheid",
      status: "acceptable"
    },
    gemiddeld: {
      text: "Je apparatensituatie heeft weinig invloed op de geschiktheid van een variabel contract",
      status: "acceptable"
    }
  },
  vast1: {
    heeftGroteApparaten: {
      text: "Je hebt apparaten die kunnen profiteren van dynamische prijzen, maar dat is niet mogelijk met een vast contract",
      status: "negative"
    },
    heeftZonnepanelen: {
      text: "Met zonnepanelen kun je in theorie profiteren van wisselende prijzen, maar dat is niet relevant bij een vast contract",
      status: "acceptable"
    },
    geenApparaten: {
      text: "Zonder duurzame installaties is een vast contract een stabiele en voorspelbare keuze",
      status: "optimal"
    },
    gemiddeld: {
      text: "Je apparatensituatie geeft geen sterke indicatie voor of tegen een vast contract",
      status: "acceptable"
    }
  },
  vast3: {
    heeftGroteApparaten: {
      text: "Je hebt apparaten die kunnen profiteren van dynamische prijzen, maar dat is niet mogelijk met een vast contract",
      status: "negative"
    },
    heeftZonnepanelen: {
      text: "Met zonnepanelen kun je in theorie profiteren van wisselende prijzen, maar dat is niet relevant bij een vast contract",
      status: "acceptable"
    },
    geenApparaten: {
      text: "Zonder duurzame installaties is een vast contract een stabiele en voorspelbare keuze",
      status: "optimal"
    },
    gemiddeld: {
      text: "Je apparatensituatie geeft geen sterke indicatie voor of tegen een vast contract",
      status: "acceptable"
    }
  }
};

// ==========================================
// RESULTS PAGE CONTENT
// ==========================================

export const resultsContent = {
  introduction: {
    heading: "Je aanbevolen energiecontract",
    description: "Op basis van jouw antwoorden hebben we het meest geschikte energiecontract voor je geselecteerd.",
  },
  socialProof: {
    satisfaction: "89% tevredenheid",
    users: "Gekozen door 450+ gebruikers",
  },
  strengthsHeading: "Waarom past dit bij mij?",
  alternativesHeading: "Andere contracttypes (gesorteerd op match):",
  contractTypesLabels: {
    variabel: "Variabel",
    vast1: "1 jaar vast",
    vast3: "3 jaar vast",
    dynamisch: "Dynamisch",
  },
  dialogLabels: {
    uitleg: "Uitleg",
    dialogTitle: "Waarom is dit belangrijk?",
  },
  navigationButtons: {
    reset: "Begin opnieuw",
    back: "Terug naar vragen",
  }
};

// ==========================================
// FEEDBACK QUESTIONS CONTENT
// ==========================================

export const feedbackQuestions = [
  {
    id: 1,
    text: "Had je zelf verwacht op dit contract uit te komen?",
    type: "yesno"
  },
  {
    id: 2,
    text: "Hoe duidelijk vind je de uitkomst van de keuzehulp?",
    type: "rating5",
    labels: {
      min: "Zeer onduidelijk",
      max: "Zeer duidelijk"
    }
  },
  {
    id: 4,
    text: "Heb je suggesties voor verbeteringen of toevoegingen aan de keuzehulp? Zijn er bepaalde functionaliteiten die je zou willen zien?",
    type: "text",
    optional: true
  },
  {
    id: 3,
    text: "In hoeverre helpt de uitkomst je bij het kiezen van een contract?",
    type: "rating5",
    labels: {
      min: "Niet behulpzaam",
      max: "Zeer behulpzaam"
    }
  },
  {
    id: 5,
    text: "Hoe waarschijnlijk is het dat je de keuzehulp aan een vriend of collega zou aanbevelen?",
    type: "rating10_with_text",
    labels: {
      min: "Helemaal niet waarschijnlijk",
      max: "Uiterst waarschijnlijk"
    }
  }
];

export const feedbackUIText = {
  yesNoFollowUp: "Wil je je antwoord toelichten?",
  optional: "(optioneel)",
  textareaPlaceholder: "Type hier je toelichting...",
  suggestionPlaceholder: "Type hier je suggesties...",
  submitButton: "Verstuur",
  continueButton: "Verder",
  feedbackHeader: {
    title: "Uw feedback over de aanbeveling",
    description: "Hieronder volgen enkele vragen over het energiecontract dat we voor u hebben aanbevolen en direct daaronder wordt getoond."
  },
  thankYou: {
    title: "Bedankt voor je feedback!",
    description: "Je antwoorden helpen ons om deze keuzehulp te verbeteren.",
    button: "Afsluiten"
  }
};
