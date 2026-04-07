
import { ArrowDown } from "lucide-react";

export const FeedbackHeader = () => {
  return (
    <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
      <div className="flex items-start gap-2">
        <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-blue-800">
            Uw feedback over de aanbeveling
          </h3>
          <p className="text-xs text-gray-700">
            Hieronder volgen enkele vragen over het energiecontract dat we voor u hebben aanbevolen en direct daaronder wordt getoond.
          </p>
        </div>
      </div>
    </div>
  );
};
