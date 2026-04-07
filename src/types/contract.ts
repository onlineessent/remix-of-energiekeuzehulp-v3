
export type ContractType = 'variabel' | 'vast1' | 'vast3' | 'dynamisch';

export type StrengthStatus = "optimal" | "acceptable" | "negative";

export type ContractStrength = {
  text: string;
  status: StrengthStatus;
};

export type ResultFeedbackQuestion = {
  id: number;
  text: string;
  type: 'rating5' | 'rating10_with_text' | 'text' | 'yesno';
  optional?: boolean;
  labels?: {
    min: string;
    max: string;
  };
};

export type Question = {
  id: number;
  text: string;
  explanation: string;
  options: {
    text: string;
    score: {
      variabel: number;
      vast1: number;
      vast3: number;
      dynamisch: number;
    };
  }[];
  surveyQuestion?: {
    text: string;
    type: 'rating' | 'text';
    required?: boolean;
  };
};

export type Scores = {
  variabel: number;
  vast1: number;
  vast3: number;
  dynamisch: number;
};

export type ContractRecommendation = {
  title: string;
  description: string;
  explanation: string;
  percentages: Record<ContractType, number>;
  recommendedType: ContractType;
  strengths: Record<ContractType, ContractStrength[]>;
};
