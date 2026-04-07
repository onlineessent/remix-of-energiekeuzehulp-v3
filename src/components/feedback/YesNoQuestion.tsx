
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type YesNoQuestionProps = {
  questionText: string;
  onAnswer: (answer: string, followUpText?: string) => void;
  value?: string;
};

export const YesNoQuestion = ({ questionText, onAnswer, value }: YesNoQuestionProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [followUpText, setFollowUpText] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    setShowFollowUp(true); // Show follow-up textarea only after selection
  };

  const handleAnswer = () => {
    // Always pass the followUpText, even if empty
    onAnswer(selectedValue, followUpText);
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-2 sm:gap-4"
        value={selectedValue}
      >
        {['Ja', 'Nee'].map((optionValue) => (
          <div key={optionValue} className="flex items-center gap-2 rounded-md border border-gray-200 p-2 sm:p-3 hover:border-blue-200 hover:bg-blue-50 transition-colors flex-1 min-w-[120px]">
            <RadioGroupItem
              value={optionValue}
              id={`yesno-${optionValue}`}
              className="h-4 w-4"
            />
            <Label htmlFor={`yesno-${optionValue}`} className="text-sm sm:text-base">
              {optionValue}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {showFollowUp && (
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="follow-up" className="text-sm sm:text-base text-gray-700 flex gap-1 sm:gap-2">
            Wil je je antwoord toelichten?
            <span className="text-xs text-gray-500">(optioneel)</span>
          </Label>
          <Textarea
            id="follow-up"
            placeholder="Type hier je toelichting..."
            className="min-h-[80px] sm:min-h-[100px] text-sm"
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
          />
        </div>
      )}

      <Button 
        onClick={handleAnswer}
        disabled={!selectedValue}
        className="w-full text-sm"
        size="sm"
      >
        Verder
      </Button>
    </div>
  );
};
