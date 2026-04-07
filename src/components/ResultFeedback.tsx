
import { useState } from "react";
import { ContractRecommendation } from "@/types/contract";
import { YesNoQuestion } from "./feedback/YesNoQuestion";
import { Rating5Question } from "./feedback/Rating5Question";
import { Rating10Question } from "./feedback/Rating10Question";
import { TextQuestion } from "./feedback/TextQuestion";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ThankYouScreen } from "./feedback/ThankYouScreen";
import { useFeedbackSubmission } from "@/hooks/useFeedbackSubmission";
import { feedbackQuestions } from "@/constants/feedbackQuestions";

type ResultFeedbackProps = {
  onComplete: () => void;
  recommendation: ContractRecommendation;
};

export const ResultFeedback = ({ onComplete, recommendation }: ResultFeedbackProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const { answers, submitAnswer } = useFeedbackSubmission(recommendation);

  const currentQuestion = feedbackQuestions[currentQuestionIndex];

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = async (answer: string, followUpText?: string) => {
    if (currentQuestion.optional && !answer && !followUpText) {
      if (currentQuestionIndex < feedbackQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowThankYou(true);
      }
      return;
    }

    const success = await submitAnswer(currentQuestion, answer, followUpText);
    
    if (success) {
      if (currentQuestionIndex < feedbackQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowThankYou(true);
      }
    }
  };

  if (showThankYou) {
    return <ThankYouScreen onComplete={onComplete} />;
  }

  if (!currentQuestion) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-4 sm:mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
        Help ons de keuzehulp te verbeteren
      </h3>
      <div className="text-sm text-gray-500 mb-4 sm:mb-6">
        Vraag {currentQuestionIndex + 1} van {feedbackQuestions.length}
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-start gap-1 sm:gap-2">
          <p className="text-base sm:text-lg text-gray-700">{currentQuestion.text}</p>
          {currentQuestion.optional && (
            <span className="text-sm text-gray-500">(optioneel)</span>
          )}
        </div>
        
        {currentQuestion.type === 'yesno' && (
          <YesNoQuestion
            questionText={currentQuestion.text}
            onAnswer={handleAnswer}
            value={answers[currentQuestion.id]}
          />
        )}

        {currentQuestion.type === 'rating5' && (
          <Rating5Question
            minLabel={currentQuestion.labels?.min}
            maxLabel={currentQuestion.labels?.max}
            onAnswer={handleAnswer}
          />
        )}

        {currentQuestion.type === 'rating10_with_text' && (
          <Rating10Question
            minLabel={currentQuestion.labels?.min}
            maxLabel={currentQuestion.labels?.max}
            onAnswer={handleAnswer}
          />
        )}

        {currentQuestion.type === 'text' && (
          <TextQuestion
            onAnswer={handleAnswer}
          />
        )}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap justify-between items-center gap-2">
        <div>
          {currentQuestionIndex > 0 && (
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="flex items-center gap-1 text-sm"
              size="sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Vorige vraag
            </Button>
          )}
        </div>
        {currentQuestion.optional && (
          <Button 
            variant="ghost" 
            onClick={() => handleAnswer("", "")}
            className="text-sm"
            size="sm"
          >
            Overslaan
          </Button>
        )}
      </div>
    </div>
  );
};
