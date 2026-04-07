
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Question, Scores } from "@/types/contract";

type CheckboxOptionsProps = {
  options: Question["options"];
  onSubmit: (score: Scores, selectedIndices: number[]) => void;
};

export const CheckboxOptions = ({ options, onSubmit }: CheckboxOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  // Load previously selected options on first render
  useEffect(() => {
    try {
      const savedSelection = localStorage.getItem(`q5_selected_options_ids`); // Changed from q4 to q5
      if (savedSelection) {
        const indices = savedSelection.split(',').map(Number);
        setSelectedOptions(indices);
      }
    } catch (error) {
      console.error('Error loading saved checkbox selection:', error);
    }
  }, []);

  const toggleOption = (index: number) => {
    setSelectedOptions(prev => {
      const optionIndex = index + 1; // Using 1-based indexing for storage
      if (prev.includes(optionIndex)) {
        return prev.filter(i => i !== optionIndex);
      } else {
        return [...prev, optionIndex];
      }
    });
  };

  const handleSubmit = () => {
    // Calculate the combined score
    const combinedScore: Scores = {
      variabel: 0,
      vast1: 0,
      vast3: 0,
      dynamisch: 0,
    };

    selectedOptions.forEach(optionIndex => {
      // Convert from 1-based to 0-based index
      const option = options[optionIndex - 1];
      if (option) {
        combinedScore.variabel += option.score.variabel;
        combinedScore.vast1 += option.score.vast1;
        combinedScore.vast3 += option.score.vast3;
        combinedScore.dynamisch += option.score.dynamisch;
      }
    });

    // Submit the combined score and selected indices
    onSubmit(combinedScore, selectedOptions);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => toggleOption(index)}
          >
            <Checkbox
              checked={selectedOptions.includes(index + 1)}
              onCheckedChange={() => toggleOption(index)}
              id={`option-${index}`}
              className="mt-0.5"
            />
            <label
              htmlFor={`option-${index}`}
              className="text-left text-lg cursor-pointer flex-grow"
            >
              {option.text}
            </label>
          </div>
        ))}
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={selectedOptions.length === 0}
        className="mt-4 w-full"
      >
        Volgende vraag
      </Button>
    </div>
  );
};
