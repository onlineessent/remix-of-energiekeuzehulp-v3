
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating5Question } from "@/components/feedback/Rating5Question";
import { Label } from "@/components/ui/label";

type SurveyQuestionProps = {
  text: string;
  type: 'rating' | 'text';
  required?: boolean;
  onAnswer: (answer: string, feedback?: string) => void;
  onBack: () => void;
};

export const SurveyQuestion = ({
  text,
  type,
  required = false,
  onAnswer,
  onBack,
}: SurveyQuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (answer || !required) {
      onAnswer(answer, feedback);
    }
  };

  const handleSkip = () => {
    setAnswer('');
    setFeedback('');
    onAnswer('');
  };

  return (
    <div className="space-y-4 bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-blue-900">
        Help ons de keuzehulp te verbeteren
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{text}</p>

      {type === 'rating' && (
        <div className="space-y-4 sm:space-y-6">
          <Rating5Question
            value={answer}
            onAnswer={setAnswer}
          />

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm text-gray-600">
              Kan je je antwoord toelichten? (optioneel)
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Type hier je toelichting..."
              className="w-full text-sm"
            />
          </div>
        </div>
      )}

      {type === 'text' && (
        <div className="space-y-3 sm:space-y-4">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type hier je antwoord..."
            className="w-full text-sm"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSkip}
              size="sm"
              className="text-sm"
            >
              Overslaan
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-2 mt-4 sm:mt-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          size="sm"
          className="text-sm sm:text-base"
        >
          Vorige vraag
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={required && !answer}
          className="ml-auto text-sm sm:text-base"
          size="sm"
        >
          Verder
        </Button>
      </div>
    </div>
  );
};
