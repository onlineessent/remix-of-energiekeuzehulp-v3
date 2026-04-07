
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type TextQuestionProps = {
  onAnswer: (text: string) => void;
  value?: string;
};

export const TextQuestion = ({ onAnswer, value }: TextQuestionProps) => {
  const [text, setText] = useState(value || "");

  return (
    <div className="space-y-3 sm:space-y-4">
      <Textarea
        placeholder="Type hier je suggesties..."
        className="min-h-[80px] sm:min-h-[100px] text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button 
        onClick={() => onAnswer(text)}
        disabled={!text}
        className="text-sm"
        size="sm"
      >
        Verstuur
      </Button>
    </div>
  );
};
