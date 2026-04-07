
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Rating5QuestionProps = {
  minLabel?: string;
  maxLabel?: string;
  onAnswer: (rating: string) => void;
  value?: string;
};

export const Rating5Question = ({ minLabel, maxLabel, onAnswer }: Rating5QuestionProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <RadioGroup
        onValueChange={onAnswer}
        className="flex justify-between max-w-full"
        defaultValue=""
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="flex flex-col items-center">
            <div className="relative">
              <RadioGroupItem
                value={rating.toString()}
                id={`rating-${rating}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 text-sm sm:text-base font-medium text-gray-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {rating}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between text-xs sm:text-sm text-gray-500 px-1">
        <div className="max-w-[80px] text-center">{minLabel || (minLabel === undefined && maxLabel === undefined) ? "Helemaal niet duidelijk" : minLabel}</div>
        <div className="flex-1" />
        <div className="max-w-[80px] text-center">{maxLabel || (minLabel === undefined && maxLabel === undefined) ? "Heel duidelijk" : maxLabel}</div>
      </div>
    </div>
  );
};
