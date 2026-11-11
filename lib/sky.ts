/** Mapeia o código de ícone do OpenWeather (ex.: "10n") para um "céu": gradiente + tipo de ícone. */
export type SkyIcon =
  | "sun"
  | "moon"
  | "cloud-sun"
  | "cloud-moon"
  | "cloud"
  | "clouds"
  | "drizzle"
  | "rain"
  | "storm"
  | "snow"
  | "fog";

export interface Sky {
  icon: SkyIcon;
  /** classes Tailwind (estáticas, para o JIT enxergar) */
  gradient: string;
}

const GRADIENTS = {
  day: "from-sky-400 via-blue-500 to-indigo-600",
  night: "from-slate-900 via-indigo-950 to-violet-950",
  cloud: "from-slate-400 via-slate-500 to-slate-700",
  rain: "from-slate-600 via-blue-800 to-slate-900",
  storm: "from-zinc-700 via-purple-900 to-slate-950",
  snow: "from-sky-200 via-blue-300 to-slate-400",
  fog: "from-zinc-300 via-slate-400 to-slate-600",
} as const;

export function skyFor(code: string): Sky {
  const night = code.endsWith("n");
  switch (code.slice(0, 2)) {
    case "01":
      return { icon: night ? "moon" : "sun", gradient: night ? GRADIENTS.night : GRADIENTS.day };
    case "02":
      return {
        icon: night ? "cloud-moon" : "cloud-sun",
        gradient: night ? GRADIENTS.night : GRADIENTS.day,
      };
    case "03":
      return { icon: "cloud", gradient: night ? GRADIENTS.night : GRADIENTS.cloud };
    case "04":
      return { icon: "clouds", gradient: GRADIENTS.cloud };
    case "09":
      return { icon: "drizzle", gradient: GRADIENTS.rain };
    case "10":
      return { icon: "rain", gradient: GRADIENTS.rain };
    case "11":
      return { icon: "storm", gradient: GRADIENTS.storm };
    case "13":
      return { icon: "snow", gradient: GRADIENTS.snow };
    case "50":
      return { icon: "fog", gradient: GRADIENTS.fog };
    default:
      return { icon: "cloud-sun", gradient: GRADIENTS.day };
  }
}
