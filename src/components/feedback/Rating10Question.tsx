
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Rating10QuestionProps = {
  minLabel?: string;
  maxLabel?: string;
  onAnswer: (rating: string, text?: string) => void;
  value?: string;
};

export const Rating10Question = ({ minLabel, maxLabel, onAnswer, value }: Rating10QuestionProps) => {
  const [selectedRating, setSelectedRating] = useState(value);
  const [explanationText, setExplanationText] = useState("");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <RadioGroup
          onValueChange={setSelectedRating}
          className="grid grid-cols-5 gap-1 sm:gap-2"
          value={selectedRating}
        >
          {Array.from({length: 10}, (_, i) => i + 1).map((rating) => (
            <div key={rating} className="flex flex-col items-center">
              <div className="relative">
                <RadioGroupItem
                  value={rating.toString()}
                  id={`rating-${rating}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex h-7 w-7 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-md border-2 border-gray-200 text-xs sm:text-base font-medium text-gray-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {rating}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        {(minLabel || maxLabel) && (
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span className="text-xs max-w-[80px]">{minLabel}</span>
            <span className="text-xs max-w-[80px]">{maxLabel}</span>
          </div>
        )}
      </div>
      <div className="space-y-3 sm:space-y-4">
        <Textarea
          placeholder="Wil je je antwoord toelichten?"
          className="min-h-[80px] sm:min-h-[100px] text-sm"
          value={explanationText}
          onChange={(e) => setExplanationText(e.target.value)}
        />
        <Button 
          onClick={() => onAnswer(selectedRating || "", explanationText)}
          disabled={!selectedRating}
          className="text-sm"
          size="sm"
        >
          Verstuur
        </Button>
      </div>
    </div>
  );
};
