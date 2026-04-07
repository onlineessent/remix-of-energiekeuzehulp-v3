
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type NavigationButtonsProps = {
  onBack: () => void;
  onReset: () => void;
};

export const NavigationButtons = ({ onBack, onReset }: NavigationButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mt-4 sm:mt-8 text-xs sm:text-sm"
        size="sm"
      >
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Antwoorden aanpassen
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        className="mt-4 sm:mt-8 text-xs sm:text-sm"
        size="sm"
      >
        Opnieuw beginnen
      </Button>
    </div>
  );
};
