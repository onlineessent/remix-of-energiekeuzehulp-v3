
import { ContractStrength, StrengthStatus } from "@/types/contract";
import { Check, AlertCircle, X } from "lucide-react";

type ContractStrengthsProps = {
  strengths: ContractStrength[];
};

export const ContractStrengths = ({ strengths }: ContractStrengthsProps) => {
  const getStrengthIcon = (status: StrengthStatus) => {
    switch (status) {
      case "optimal":
        return <Check className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-green-500" />;
      case "acceptable":
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-yellow-500" />;
      case "negative":
        return <X className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-red-500" />;
    }
  };

  const getStrengthTextColor = (status: StrengthStatus) => {
    switch (status) {
      case "optimal":
        return "text-green-700";
      case "acceptable":
        return "text-yellow-700";
      case "negative":
        return "text-red-700";
    }
  };

  return (
    <div className="space-y-2 mt-3 sm:mt-4">
      <h4 className="font-semibold text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">
        Waarom past dit bij mij?
      </h4>
      {strengths.map((strength, index) => (
        <div key={index} className="flex items-start gap-1 sm:gap-2">
          {getStrengthIcon(strength.status)}
          <span className={`${getStrengthTextColor(strength.status)} text-xs sm:text-sm`}>
            {strength.text}
          </span>
        </div>
      ))}
    </div>
  );
};
