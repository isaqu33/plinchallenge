"use client"

import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface dicaProp {
  TextoInfo: string;
}

function Dica({ TextoInfo }: dicaProp) {
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          style={{ backgroundColor: "#966892", marginRight:"4px", padding: "5px", color: "white", borderRadius:"50px", display:"flex", justifyContent:"center", alignItems:"center" }}
        >
          *
        </TooltipTrigger>
        <TooltipContent>
          <p>{ TextoInfo }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Dica;
