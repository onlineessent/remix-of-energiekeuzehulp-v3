
import { Question, Scores } from "@/types/contract";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MultipleChoiceOptionsProps = {
  options: Question["options"];
  onSelect: (score: Scores) => void;
  previousAnswer: Scores | null;
};

export const MultipleChoiceOptions = ({ options, onSelect, previousAnswer }: MultipleChoiceOptionsProps) => {
  const isOptionSelected = (optionScore: Scores) => {
    if (!previousAnswer) return false;
    
    return (
      optionScore.variabel === previousAnswer.variabel &&
      optionScore.vast1 === previousAnswer.vast1 &&
      optionScore.vast3 === previousAnswer.vast3 &&
      optionScore.dynamisch === previousAnswer.dynamisch
    );
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => onSelect(option.score)}
          className={cn(
            "w-full text-left p-6 min-h-[4.5rem] rounded-xl border transition-all cursor-pointer",
            isOptionSelected(option.score)
              ? "border-2 border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
              : "border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-900"
          )}
        >
          <div className="text-lg text-left">{option.text}</div>
        </div>
      ))}
    </div>
  );
};
