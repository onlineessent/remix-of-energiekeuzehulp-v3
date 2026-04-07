
export type ContractType = "variabel" | "vast1" | "vast3" | "dynamisch";

export type Scores = {
  [key in ContractType]: number;
};

export type StrengthStatus = "optimal" | "acceptable" | "negative";

export type ContractStrength = {
  text: string;
  status: StrengthStatus;
};

export interface ContractRecommendation {
  title: string;
  description: string;
  explanation: string;
  percentages: Record<ContractType, number>;
  recommendedType: ContractType;
  strengths: Record<ContractType, ContractStrength[]>;
}

export interface Question {
  id: number;
  text: string;
  explanation?: string;
  surveyQuestion?: {
    text: string;
    type: "rating" | "text";
    required?: boolean;
  };
  options: Array<{
    text: string;
    score: Scores;
  }>;
}
