"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { parseUnits, type Units } from "@/lib/units";

const KEY = "units";
const Ctx = createContext<{ units: Units; setUnits: (u: Units) => void }>({
  units: "metric",
  setUnits: () => {},
});

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  // começa em "metric" no servidor e no 1º render do cliente (evita erro de hidratação)
  const [units, setUnitsState] = useState<Units>("metric");

  useEffect(() => {
    try {
      setUnitsState(parseUnits(localStorage.getItem(KEY)));
    } catch {
      /* storage bloqueado */
    }
  }, []);

  function setUnits(u: Units) {
    setUnitsState(u);
    try {
      localStorage.setItem(KEY, u);
    } catch {
      /* storage bloqueado */
    }
  }

  return <Ctx.Provider value={{ units, setUnits }}>{children}</Ctx.Provider>;
}

export const useUnits = () => useContext(Ctx);
