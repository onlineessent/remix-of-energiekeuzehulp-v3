
import { Question } from "@/types/contract";

export const questions: Question[] = [
  {
    id: 1,
    text: "Hoe kijk je naar je energiekosten?",
    explanation: "Bij sommige contracten veranderen je energieprijzen vaker. Dit kan voordelen, maar ook risico's met zich meebrengen.",
    options: [
      {
        text: "Ik wil voor meerdere jaren precies weten wat ik betaal, ook als dat betekent dat ik misschien iets meer betaal.",
        score: { variabel: -6, vast1: 3, vast3: 7.5, dynamisch: -7.5 },
      },
      {
        text: "Ik wil ongeveer een jaar weten wat ik betaal, daarna wil ik opnieuw kunnen kiezen wat het beste past.",
        score: { variabel: -1.5, vast1: 7.5, vast3: 3, dynamisch: -7.5 },
      },
      {
        text: "Ik vind het prima als mijn kosten enkele keren per jaar veranderen, met kans op zowel lagere als hogere prijzen.",
        score: { variabel: 7.5, vast1: 0, vast3: -1.5, dynamisch: -4.5 },
      },
      {
        text: "Het maakt me niet uit dat mijn energiekosten elke maand anders zijn. Ik wil meteen profiteren van lage prijzen, ook al kunnen de prijzen soms hoger zijn.",
        score: { variabel: 0, vast1: -4.5, vast3: -7.5, dynamisch: 7.5 },
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
        score: { variabel: 0, vast1: 0, vast3: 0, dynamisch: 3 },
      },
      {
        text: "Ruimte: Kleine veranderingen in kosten kan ik goed verwerken.",
        score: { variabel: 1, vast1: 0, vast3: 0, dynamisch: 2 },
      },
      {
        text: "Wat ruimte: Een beetje verschil in kosten is prima voor mij.",
        score: { variabel: 1, vast1: 1, vast3: 0, dynamisch: 0 },
      },
      {
        text: "Minder ruimte: Het is soms wat uitdagend om grotere veranderingen in kosten op te vangen.",
        score: { variabel: -1, vast1: 3, vast3: 2, dynamisch: -3 },
      },
      {
        text: "Beperkte ruimte: Ik houd liever mijn kosten stabiel om binnen mijn budget te blijven.",
        score: { variabel: -2, vast1: 3, vast3: 4, dynamisch: -4 },
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
        score: { variabel: 0, vast1: 0, vast3: 0, dynamisch: 3 },
      },
      {
        text: "Soms, ik ben regelmatig thuis overdag en kan dan mijn stroomverbruik een beetje aanpassen.",
        score: { variabel: 0, vast1: 0, vast3: 0, dynamisch: 2 },
      },
      {
        text: "Nee, ik ben meestal niet thuis overdag en gebruik stroom wanneer ik het nodig heb.",
        score: { variabel: 2, vast1: 3, vast3: 3, dynamisch: -3 },
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
        score: { variabel: 0, vast1: -1, vast3: -2, dynamisch: 2 },
      },
      {
        text: "Soms, maar niet elke dag. Bijvoorbeeld door altijd in het weekend de wasmachine aan te zetten.",
        score: { variabel: 1, vast1: 0, vast3: 0, dynamisch: 1 },
      },
      {
        text: "Nee, ik wil niet nadenken over de energieprijs en gebruik stroom wanneer ik het nodig heb.",
        score: { variabel: -1, vast1: 1, vast3: 2, dynamisch: -2 },
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
        score: { variabel: 0, vast1: 0, vast3: 0, dynamisch: 1 },
      },
      {
        text: "Warmtepomp",
        score: { variabel: 1, vast1: -1, vast3: -1, dynamisch: 1 },
      },
      {
        text: "Thuisbatterij",
        score: { variabel: 1, vast1: -1, vast3: -1, dynamisch: 2 },
      },
      {
        text: "Laadpaal voor mijn elektrische auto",
        score: { variabel: 1, vast1: -1, vast3: -1, dynamisch: 2 },
      },
      {
        text: "Ik heb geen van deze installaties",
        score: { variabel: 0, vast1: 1, vast3: 1, dynamisch: -2 },
      },
    ],
  },
];
