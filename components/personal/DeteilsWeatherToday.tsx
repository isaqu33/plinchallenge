import type { WeatherToday } from "@/lib/weather-api";
import { formatTime } from "@/lib/weather";

const SUN_BG = {
  sunrise:
    "https://wecast.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsunrise.6f6aadbe.png&w=256&q=75",
  sunset:
    "https://wecast.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsunset.77731378.png&w=256&q=75",
};

function SunCard({ name, time, image }: { name: string; time: number; image: string }) {
  return (
    <div
      className="flex h-[220px] flex-col overflow-hidden rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3 className="p-3 text-center text-2xl font-bold text-[#5A3E51]">{name}</h3>
      <p className="flex flex-1 items-center justify-center text-5xl font-extrabold text-white">
        {formatTime(time)}
      </p>
    </div>
  );
}

function Metric({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-secondary p-3">
      <img src={icon} alt="" className="h-10 w-10 object-contain dark:invert" />
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
}

export default function DeteilsWeatherToday({ today }: { today: WeatherToday }) {
  const { main, wind, sys } = today;
  return (
    <section className="mt-10 rounded-3xl border bg-card p-6 md:p-10">
      <h2 className="mb-6 text-2xl font-extrabold text-primary md:text-3xl">Mais detalhes sobre o tempo</h2>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-3">
            <Metric icon="/pressao.png" label={`Pressão: ${main.pressure} hPa`} />
            <Metric icon="/humidade.png" label={`Umidade: ${main.humidity} %`} />
            <Metric icon="/vento.png" label={`Vento: ${wind.speed} m/s`} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SunCard name="Nascer do Sol" time={sys.sunrise} image={SUN_BG.sunrise} />
            <SunCard name="Pôr do Sol" time={sys.sunset} image={SUN_BG.sunset} />
          </div>
        </div>
        <div className="hidden justify-center lg:flex">
          <img src="/weather2.svg" alt="" className="w-full max-w-[460px]" />
        </div>
      </div>
    </section>
  );
}
