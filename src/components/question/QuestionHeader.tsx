
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type QuestionHeaderProps = {
  questionId: number;
  text: string;
  explanation: string;
};

export const QuestionHeader = ({ questionId, text, explanation }: QuestionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="space-y-2 text-left">
        <p className="text-sm font-medium text-blue-600 text-left">Vraag {questionId} van 5</p>
        <h2 className="text-2xl font-semibold text-blue-900 text-left">{text}</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="link" 
            className="text-blue-600 hover:text-blue-800 font-medium p-0 h-auto whitespace-nowrap"
          >
            Uitleg
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Waarom is dit belangrijk?</DialogTitle>
            <DialogDescription className="text-base whitespace-pre-line">
              {explanation}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

