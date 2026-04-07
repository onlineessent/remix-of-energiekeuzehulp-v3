
import { ContractType } from "@/types/contract";
import { contractDescriptions } from "@/utils/contractUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ContractExplanationDialogProps = {
  type: ContractType;
};

export const ContractExplanationDialog = ({ type }: ContractExplanationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-800 underline text-xs sm:text-sm">
          Uitleg
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-lg p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-xl">
            {type === "variabel"
              ? "Variabel contract"
              : type === "vast1"
              ? "1 jaar vast contract"
              : type === "vast3"
              ? "3 jaar vast contract"
              : "Dynamisch contract"}
          </DialogTitle>
          <DialogDescription className="whitespace-pre-line pt-2 sm:pt-4 text-xs sm:text-sm">
            {contractDescriptions[type].explanation}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
