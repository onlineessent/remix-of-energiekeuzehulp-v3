
import { Question, Scores } from "@/types/contract";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { QuestionHeader } from "./question/QuestionHeader";
import { MultipleChoiceOptions } from "./question/MultipleChoiceOptions";
import { CheckboxOptions } from "./question/CheckboxOptions";

type QuestionSectionProps = {
  question: Question;
  onAnswer: (score: Scores) => void;
  onBack: () => void;
  showBackButton: boolean;
  previousAnswer: Scores | null;
};

export const QuestionSection = ({
  question,
  onAnswer,
  onBack,
  showBackButton,
  previousAnswer,
}: QuestionSectionProps) => {
  const [selectedScore, setSelectedScore] = useState<Scores | null>(null);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedScore(null);
    setSelectedOptionIndices([]);
    setIsSubmitting(false);
  }, [question.id]);

  const handleOptionSelect = (score: Scores) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setSelectedScore(score);
    onAnswer(score);
  };

  const handleCheckboxSelect = (score: Scores, selectedIndices: number[]) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    setSelectedScore(score);
    setSelectedOptionIndices(selectedIndices);

    // Store the selected option indices for use in saving data
    if (question.id === 5) { // Changed from 4 to 5 - only question 5 should be checkbox
      try {
        // Use 1-based indexing for consistency
        const optionTexts = selectedIndices.map(idx => question.options[idx - 1].text);
        localStorage.setItem(`q${question.id}_selected_options_ids`, selectedIndices.join(','));
        localStorage.setItem(`q${question.id}_selected_options_text`, optionTexts.join(','));
      } catch (error) {
        console.error(`Error storing checkbox data for q${question.id}:`, error);
      }
    }

    setTimeout(() => {
      onAnswer(score);
      setIsSubmitting(false);
    }, 100); // Small delay to ensure localStorage is updated
  };

  return (
    <div className="space-y-6 mx-auto w-full">
      <div className="relative bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
        <QuestionHeader
          questionId={question.id}
          text={question.text}
          explanation={question.explanation}
        />
        {question.id === 5 ? ( // Changed from 4 to 5 - only question 5 should be checkbox
          <CheckboxOptions
            options={question.options}
            onSubmit={handleCheckboxSelect}
          />
        ) : (
          <MultipleChoiceOptions
            options={question.options}
            onSelect={handleOptionSelect}
            previousAnswer={previousAnswer}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-2 mt-4">
        {showBackButton && (
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-sm sm:text-base py-2 px-3 sm:py-6 sm:px-4"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Vorige vraag
          </Button>
        )}
        {previousAnswer && question.id !== 5 && ( // Changed from 4 to 5 - only question 5 should be checkbox
          <Button 
            variant="ghost" 
            onClick={() => onAnswer(previousAnswer)} 
            className="ml-auto text-sm sm:text-base py-2 px-3 sm:py-6 sm:px-4 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            disabled={isSubmitting}
          >
            Volgende vraag <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
