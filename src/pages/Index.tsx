
import { ContractAdvisor } from "@/components/ContractAdvisor";
import { questions } from "@/utils/contractUtils";
import { Clock, ListChecks, CheckCircle2 } from "lucide-react";

const Index = () => {
  const questionCount = questions.length;
  const estimatedMinutes = Math.ceil(questionCount * 0.5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-4">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Welk energiecontract past bij jou?
        </h1>
        
        <div className="bg-blue-50/70 rounded-xl shadow-sm p-3 mb-4 border border-blue-100">
          <div className="flex justify-center space-x-4 sm:space-x-8 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2">
              <ListChecks className="w-4 h-4 text-blue-700" />
              <span className="text-gray-700 text-sm font-medium">{questionCount} vragen</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-700" />
              <span className="text-gray-700 text-sm font-medium">± {estimatedMinutes} minuten</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 text-sm font-medium">Meteen persoonlijk advies</span>
            </div>
          </div>
        </div>

        <ContractAdvisor />
      </div>
    </div>
  );
};

export default Index;
