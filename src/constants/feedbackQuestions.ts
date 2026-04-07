
import { ResultFeedbackQuestion } from "@/types/contract";

export const feedbackQuestions: ResultFeedbackQuestion[] = [
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
