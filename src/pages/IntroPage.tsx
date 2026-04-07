
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Award, ThumbsUp, ListChecks, CheckCircle2 } from "lucide-react";

const IntroPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/keuzehulp");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Welkom bij de Energiecontract Keuzehulp
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <p className="text-gray-700 mb-6">
            Deze keuzehulp helpt je bij het kiezen van een energiecontract dat het beste bij jouw situatie past.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
              <Award className="h-5 w-5 text-blue-700 mr-2" />
              Ontdek welk energiecontract het beste bij jou past
            </h2>
            
            <p className="text-gray-700 mb-6">
              Door enkele vragen te beantwoorden krijg je een persoonlijk advies over welk type energiecontract het beste aansluit bij jouw situatie.
            </p>

            <div className="mb-6 space-y-3 bg-blue-50/70 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 font-medium">92% van de gebruikers beveelt dit aan</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                className="px-8 hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700 text-lg"
              >
                Start de keuzehulp
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/70 rounded-lg p-4 flex justify-center mb-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <ListChecks className="h-5 w-5 mr-2 text-blue-700" />
              <span className="text-blue-800 font-medium">Slechts 5 vragen</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-700" />
              <span className="text-blue-800 font-medium">Slechts 2 minuten</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              <span className="text-blue-800 font-medium">Meteen persoonlijke advies</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Deze keuzehulp is ontwikkeld door energiespecialisten om je te helpen bij het maken van een weloverwogen keuze.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
