import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Cloudy,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { skyFor, type SkyIcon } from "@/lib/sky";

const ICONS: Record<SkyIcon, LucideIcon> = {
  sun: Sun,
  moon: Moon,
  "cloud-sun": CloudSun,
  "cloud-moon": CloudMoon,
  cloud: Cloud,
  clouds: Cloudy,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
  fog: CloudFog,
};

export default function WeatherIcon({ code, className }: { code: string; className?: string }) {
  const Icon = ICONS[skyFor(code).icon];
  return <Icon className={className} aria-hidden="true" />;
}
