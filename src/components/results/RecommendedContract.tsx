
import { ContractRecommendation, ContractType } from "@/types/contract";
import { Progress } from "@/components/ui/progress";
import { Star, Users } from "lucide-react";
import { ContractStrengths } from "./ContractStrengths";
import { ContractExplanationDialog } from "./ContractExplanationDialog";

type RecommendedContractProps = {
  recommendation: ContractRecommendation;
};

export const RecommendedContract = ({ recommendation }: RecommendedContractProps) => {
  return (
    <div className="bg-blue-50 p-3 sm:p-6 rounded-lg border-2 border-blue-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-2xl font-bold text-blue-900">
            {recommendation.title}
          </h2>
          <ContractExplanationDialog type={recommendation.recommendedType} />
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-base sm:text-lg font-semibold text-blue-700">
            {recommendation.percentages[recommendation.recommendedType]}% match
          </span>
          <Progress 
            value={recommendation.percentages[recommendation.recommendedType]} 
            className="w-full sm:w-32"
          />
        </div>
      </div>

      {/* Social proof section */}
      <div className="flex flex-wrap gap-4 mb-4 bg-white p-2 rounded-md border border-gray-200">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-700 font-medium">89% tevredenheid</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-green-600" />
          <span className="text-sm text-gray-700 font-medium">Gekozen door 450+ gebruikers</span>
        </div>
      </div>

      <p className="text-base text-gray-600 mb-3 sm:mb-4">
        {recommendation.description}
      </p>
      
      <ContractStrengths strengths={recommendation.strengths[recommendation.recommendedType]} />
    </div>
  );
};

