
import { ContractRecommendation } from "@/types/contract";
import { ResultIntroduction } from "./results/ResultIntroduction";
import { RecommendedContract } from "./results/RecommendedContract";
import { AlternativeContracts } from "./results/AlternativeContracts";
import { NavigationButtons } from "./results/NavigationButtons";

type ResultsSectionProps = {
  recommendation: ContractRecommendation;
  onReset: () => void;
  onBack: () => void;
};

export const ResultsSection = ({ recommendation, onReset, onBack }: ResultsSectionProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <ResultIntroduction />

      <div className="relative">
        <RecommendedContract recommendation={recommendation} />
      </div>

      <AlternativeContracts recommendation={recommendation} />

      <NavigationButtons onBack={onBack} onReset={onReset} />
    </div>
  );
};
