import { useState } from "react";
import { ContractRecommendation, ResultFeedbackQuestion } from "@/types/contract";
import { useToast } from "./use-toast";

export const useFeedbackSubmission = (recommendation: ContractRecommendation) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const submitAnswer = async (
    question: ResultFeedbackQuestion,
    answer: string,
    followUpText?: string
  ) => {
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));

    try {
      const responseId = localStorage.getItem('user_response_id');
      if (!responseId) {
        console.error('No response ID found in localStorage');
        return false;
      }

      const updateData: Record<string, any> = {};
      
      if (question.type === 'rating5' || question.type === 'rating10_with_text') {
        updateData[`post_q${question.id}_rating`] = parseInt(answer);
        updateData[`post_q${question.id}_answer_type`] = 'rating';
        updateData[`post_q${question.id}_answer`] = answer;
        updateData[`post_q${question.id}_text`] = question.text;
        
        if (followUpText) {
          updateData[`post_q${question.id}_followup_text`] = followUpText;
        }
      } else if (question.type === 'text') {
        updateData[`post_q${question.id}_answer`] = answer;
        updateData[`post_q${question.id}_answer_type`] = 'text';
        updateData[`post_q${question.id}_text`] = question.text;
      } else if (question.type === 'yesno') {
        updateData[`post_q${question.id}_answer`] = answer;
        updateData[`post_q${question.id}_answer_type`] = 'yesno';
        updateData[`post_q${question.id}_text`] = question.text;
        
        if (followUpText) {
          updateData[`post_q${question.id}_followup_text`] = followUpText;
        }
      }

      const res = await fetch(`/api/responses/${responseId}/feedback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return true;
    } catch (error) {
      console.error('Error in feedback submission:', error);
      toast({
        title: "Error",
        description: "Er is een fout opgetreden bij het opslaan van je feedback.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { answers, submitAnswer };
};
