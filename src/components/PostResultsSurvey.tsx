import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Question = {
  text: string;
  type: 'rating' | 'text';
  required?: boolean;
};

const questions: Question[] = [
  {
    text: "Hoe duidelijk vond je de vragen in deze keuzehulp?",
    type: "rating",
    required: true,
  },
  {
    text: "Hoe goed sluit het advies aan bij jouw situatie?",
    type: "rating",
    required: true,
  },
  {
    text: "Heb je nog suggesties voor verbetering?",
    type: "text",
    required: false,
  },
  {
    text: "Wat vond je goed aan deze keuzehulp?",
    type: "text",
    required: false,
  }
];

export const PostResultsSurvey = ({ onComplete }: { onComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleAnswer = async (answer: string) => {
    try {
      const question = questions[currentQuestion];
      
      await supabase.from('contract_survey_responses').insert({
        question_text: question.text,
        answer_text: question.type === 'text' ? answer : null,
        rating: question.type === 'rating' ? parseInt(answer) : null,
        answer_type: question.type
      });

      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsCompleted(true);
        onComplete();
      }
    } catch (error) {
      console.error('Error storing survey response:', error);
      toast({
        title: "Error",
        description: "Er is een fout opgetreden bij het opslaan van je antwoord.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Bedankt voor je feedback!
        </h3>
        <p className="text-green-700">
          Je antwoorden zijn opgeslagen. We gaan met je feedback aan de slag om de keuzehulp verder te verbeteren. Je kunt dit scherm nu afsluiten.
        </p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answer = answers[currentQuestion];

  return (
    <div className="space-y-4 bg-blue-50 p-6 rounded-lg border-2 border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Help ons de keuzehulp te verbeteren
        </h3>
        <span className="text-sm text-gray-600">
          Vraag {currentQuestion + 1} van {questions.length}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{question.text}</p>

      {question.type === 'rating' ? (
        <RadioGroup
          value={answer || ''}
          onValueChange={handleAnswer}
          className="flex flex-wrap gap-4 justify-center md:justify-start"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="flex flex-col items-center">
              <div className="relative">
                <RadioGroupItem
                  value={value.toString()}
                  id={`rating-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`rating-${value}`}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-blue-200 text-base font-medium text-gray-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {value}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="space-y-4">
          <Textarea
            value={answer || ''}
            onChange={(e) => e.target.value && handleAnswer(e.target.value)}
            placeholder="Type hier je antwoord..."
            className="w-full"
          />
          <div className="flex justify-end">
            <Button onClick={() => handleAnswer('')}>
              Overslaan
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {currentQuestion > 0 && (
          <Button variant="ghost" onClick={handleBack}>
            Vorige vraag
          </Button>
        )}
      </div>
    </div>
  );
};
