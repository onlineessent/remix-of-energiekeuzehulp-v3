
import { Button } from "@/components/ui/button";

type ThankYouScreenProps = {
  onComplete: () => void;
};

export const ThankYouScreen = ({ onComplete }: ThankYouScreenProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 sm:p-8 border border-gray-100 mb-4 sm:mb-8 text-center">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Bedankt voor je feedback!
      </h3>
      <p className="text-base text-gray-600 mb-4 sm:mb-6">
        Je antwoorden helpen ons om de keuzehulp verder te verbeteren.
      </p>
      <Button 
        onClick={onComplete}
        size="sm"
        className="text-base"
      >
        Terug naar het advies
      </Button>
    </div>
  );
};
