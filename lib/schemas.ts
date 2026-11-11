import { z } from "zod";

const condition = z.object({ icon: z.string(), description: z.string() });

/** /data/2.5/weather */
export const weatherTodaySchema = z.object({
  name: z.string(),
  dt: z.number(),
  timezone: z.number().default(0),
  weather: z.array(condition).min(1),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({ speed: z.number(), deg: z.number().optional(), gust: z.number().optional() }),
  clouds: z.object({ all: z.number() }).optional(),
  visibility: z.number().optional(),
  sys: z.object({ sunrise: z.number(), sunset: z.number(), country: z.string().optional() }),
});

/** Uma linha de /data/2.5/forecast (a cada 3 h). `pop` = probabilidade de chuva (0–1). */
export const forecastEntrySchema = z.object({
  dt: z.number(),
  dt_txt: z.string(),
  main: z.object({ temp: z.number(), temp_min: z.number().optional(), temp_max: z.number().optional() }),
  weather: z.array(condition).min(1),
  pop: z.number().default(0),
});

/** /data/2.5/air_pollution — `aqi` vai de 1 (bom) a 5 (muito ruim). */
export const airQualitySchema = z.object({
  aqi: z.number().min(1).max(5),
  components: z.object({
    pm2_5: z.number(),
    pm10: z.number(),
    o3: z.number(),
    no2: z.number(),
    so2: z.number(),
    co: z.number(),
  }),
});

export const weatherResponseSchema = z.object({
  today: weatherTodaySchema,
  forecast: z.array(forecastEntrySchema),
  air: airQualitySchema.nullable(),
});

export const geoResultSchema = z.object({
  name: z.string(),
  state: z.string().optional(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});

export type WeatherToday = z.infer<typeof weatherTodaySchema>;
export type ForecastEntry = z.infer<typeof forecastEntrySchema>;
export type AirQuality = z.infer<typeof airQualitySchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
export type GeoResult = z.infer<typeof geoResultSchema>;
