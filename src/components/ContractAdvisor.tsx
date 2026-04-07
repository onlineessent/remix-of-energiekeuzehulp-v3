import { useState, useEffect, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Scores } from "@/types/contract";
import { questions } from "@/utils/contractQuestions";
import { getRecommendation } from "@/utils/contractUtils";
import { QuestionSection } from "./QuestionSection";
import { ResultsSection } from "./ResultsSection";
import { useSaveContractResults } from "@/hooks/useSaveContractResults";

export const ContractAdvisor = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<Scores | null>>(new Array(questions.length).fill(null));
  const [scores, setScores] = useState<Scores>({
    variabel: 0,
    vast1: 0,
    vast3: 0,
    dynamisch: 0,
  });
  const { saveCompleteResults, saveIncompleteResults } = useSaveContractResults();
  
  const debouncedSaveIncomplete = useCallback((answersToSave: Array<Scores | null>, questionIndex: number) => {
    const timer = setTimeout(() => {
      saveIncompleteResults(answersToSave, questionIndex);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [saveIncompleteResults]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentQuestion > 0 && currentQuestion < questions.length) {
        saveIncompleteResults(answers, currentQuestion);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      const cleanup = debouncedSaveIncomplete(answers, currentQuestion);
      return () => {
        cleanup();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [answers, currentQuestion, saveIncompleteResults, debouncedSaveIncomplete]);

  const handleAnswer = (score: Scores) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    const newScores = newAnswers.reduce((acc, curr) => {
      if (curr) {
        return {
          variabel: acc.variabel + curr.variabel,
          vast1: acc.vast1 + curr.vast1,
          vast3: acc.vast3 + curr.vast3,
          dynamisch: acc.dynamisch + curr.dynamisch,
        };
      }
      return acc;
    }, {
      variabel: 0,
      vast1: 0,
      vast3: 0,
      dynamisch: 0,
    });

    setScores(newScores);
    
    saveIncompleteResults(newAnswers, currentQuestion + 1);
    
    setCurrentQuestion(currentQuestion + 1);
    
    if (currentQuestion === questions.length - 1) {
      const recommendation = getRecommendation(newScores, newAnswers);
      saveCompleteResults(newAnswers, recommendation);
    }
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setScores({ variabel: 0, vast1: 0, vast3: 0, dynamisch: 0 });
    
    // Clear localStorage keys related to questions
    for (let i = 1; i <= questions.length; i++) {
      localStorage.removeItem(`q${i}_selected_options_ids`);
      localStorage.removeItem(`q${i}_selected_options_text`);
    }
    localStorage.removeItem('user_response_id');
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-5 max-w-full mx-auto">
      <Progress value={progress} className="mb-3 sm:mb-4" />
      
      <TransitionGroup>
        <CSSTransition
          key={currentQuestion}
          timeout={300}
          classNames="slide"
        >
          <div>
            {currentQuestion < questions.length ? (
              <QuestionSection
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                showBackButton={currentQuestion > 0}
                previousAnswer={answers[currentQuestion]}
              />
            ) : (
              <ResultsSection
                recommendation={getRecommendation(scores, answers)}
                onReset={handleReset}
                onBack={handleBack}
              />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
