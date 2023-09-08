import React from "react";
import CardSunSet from "./CardSunSet";
import MoreInformationToday from "./MoreInformationToday";

interface DeteilsWeatherTodayProp {
  Sunrise: string;
  Sunset: string;
  pressure: string;
  humidity: string;
  speed: string;
}
function DeteilsWeatherToday({
  Sunrise,
  Sunset,
  pressure,
  humidity,
  speed,
}: DeteilsWeatherTodayProp) {
  return (
    <div className=" w-full  bg-[#A883BA] min-h-[500px] mt-[20px] p-3 flex justify-around items-center flex-wrap">
      <div className=" w-full max-w-[50%] flex flex-col justify-center items-center text-[30px] md:text-[50px] font-extrabold flex-wrap ">
        <h1>Mais Detalhes sobre Tempo</h1>

        <div className=" w-full mt-4  max-w-[700px]  min-h-full flex flex-wrap justify-around">
          <MoreInformationToday
            pressure={pressure}
            humidity={humidity}
            speed={speed}
          ></MoreInformationToday>
        </div>

        <div className=" w-full  max-w-[700px]  min-h-full flex flex-wrap justify-around">
          <CardSunSet
            Name="Nascer do Sol"
            Time={Sunrise}
            UrlImg="https://wecast.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsunrise.6f6aadbe.png&w=256&q=75"
          ></CardSunSet>

          <CardSunSet
            Name="Por do Sol"
            Time={Sunset}
            UrlImg="https://wecast.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsunset.77731378.png&w=256&q=75"
          ></CardSunSet>
        </div>
      </div>

      <div className=" w-full max-w-[50%]   hidden md:flex justify-center items-center">
        <div className=" w-full max-w-[500px]  mt-1  overflow-hidden flex justify-center items-center ">
          <img src={"./weather2.svg"} alt="" className=" min-w-full" />
        </div>
      </div>
    </div>
  );
}

export default DeteilsWeatherToday;
