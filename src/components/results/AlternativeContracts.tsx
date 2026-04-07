
import { ContractRecommendation, ContractType } from "@/types/contract";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContractExplanationDialog } from "./ContractExplanationDialog";
import { ContractStrengths } from "./ContractStrengths";

type AlternativeContractsProps = {
  recommendation: ContractRecommendation;
};

export const AlternativeContracts = ({ recommendation }: AlternativeContractsProps) => {
  const sortedContractTypes = Object.entries(recommendation.percentages)
    .filter(([type]) => type !== recommendation.recommendedType)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="mt-4 sm:mt-8">
      <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Andere contracttypes (gesorteerd op match):
      </h3>
      <Accordion type="single" collapsible className="space-y-2">
        {sortedContractTypes.map(([type, percentage]) => (
          <AccordionItem
            key={type}
            value={type}
            className="border rounded-lg p-2"
          >
            <AccordionTrigger className="hover:no-underline py-2 px-1">
              <div className="flex items-center gap-2 sm:gap-4 w-full">
                <div className="flex items-center gap-1 sm:gap-3 min-w-[100px]">
                  <span className="text-base text-gray-700">
                    {type === "variabel"
                      ? "Variabel"
                      : type === "vast1"
                      ? "1 jaar vast"
                      : type === "vast3"
                      ? "3 jaar vast"
                      : "Dynamisch"}
                  </span>
                  <ContractExplanationDialog type={type as ContractType} />
                </div>
                <Progress value={percentage} className="flex-1" />
                <span className="text-base text-gray-600 w-8 sm:w-12 text-right">
                  {percentage}%
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 sm:px-4 pt-2 sm:pt-4">
              <ContractStrengths
                strengths={recommendation.strengths[type as ContractType]}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

