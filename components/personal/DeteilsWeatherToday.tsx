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
      className="mt-3 flex h-[300px] w-[300px] flex-col rounded-lg bg-cover text-black"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3 className="flex w-full justify-center text-[30px] text-[#5A3E51]">{name}</h3>
      <p className="flex w-full flex-1 items-center justify-center text-[50px] text-white">
        {formatTime(time)}
      </p>
    </div>
  );
}

function Metric({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="m-3 flex w-full max-w-[400px] items-center justify-between">
      <span className="flex w-[100px] items-center justify-center">
        <img src={icon} alt="" />
      </span>
      <div className="border-b-[3px] border-[#A883BA] text-[20px]">{label}</div>
    </div>
  );
}

export default function DeteilsWeatherToday({ today }: { today: WeatherToday }) {
  const { main, wind, sys } = today;
  return (
    <section className="mt-[20px] flex min-h-[500px] w-full flex-wrap items-center justify-around bg-[#A883BA] p-3">
      <div className="flex w-full max-w-[50%] flex-col items-center justify-center text-[30px] font-extrabold md:text-[50px]">
        <h2>Mais detalhes sobre o tempo</h2>
        <div className="mt-4 flex w-full max-w-[700px] flex-wrap justify-around">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-[#D9DAFF] p-[5px] text-[#A883BA]">
            <Metric icon="/pressao.png" label={`Pressão: ${main.pressure} hPa`} />
            <Metric icon="/humidade.png" label={`Umidade: ${main.humidity} %`} />
            <Metric icon="/vento.png" label={`Vento: ${wind.speed} m/s`} />
          </div>
        </div>
        <div className="flex w-full max-w-[700px] flex-wrap justify-around">
          <SunCard name="Nascer do Sol" time={sys.sunrise} image={SUN_BG.sunrise} />
          <SunCard name="Pôr do Sol" time={sys.sunset} image={SUN_BG.sunset} />
        </div>
      </div>
      <div className="hidden w-full max-w-[50%] items-center justify-center md:flex">
        <div className="mt-1 flex w-full max-w-[500px] items-center justify-center overflow-hidden">
          <img src="/weather2.svg" alt="" className="min-w-full" />
        </div>
      </div>
    </section>
  );
}
