"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function Dica({ TextoInfo }: { TextoInfo: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          aria-label="Mais informações"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground"
        >
          *
        </TooltipTrigger>
        <TooltipContent>
          <p>{TextoInfo}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Dica;
