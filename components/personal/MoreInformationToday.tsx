import React from "react";

interface MoreInformationTodayProp {
  pressure: string;
  humidity: string;
  speed: string;
}

function MoreInformationToday({
  pressure,
  humidity,
  speed,
}: MoreInformationTodayProp) {
  return (
    <div className=" bg-[#D9DAFF] flex flex-col justify-center items-center rounded-lg w-full text-[#A883BA] p-[5px]">
      {/* background-image: radial-gradient; */}
      <div className=" w-full max-w-[400px]  flex justify-between items-center  m-3 ">
        <span className=" w-[100px]  flex justify-center items-center">
          <img src="./pressao.png" alt="" />
        </span>
        <div className=" text-[20px] border-b-[3px] border-[#A883BA] ">
          Pressão: {pressure} hPa
        </div>
      </div>
      <div className=" w-full max-w-[400px]  flex justify-between  items-center m-3">
        <span className="w-[100px]  flex justify-center items-center">
          <img src="./humidade.png" alt="" />
        </span>
        <div className=" text-[20px] border-b-[3px] border-[#A883BA] font-extrabold ">
          Humidade: {humidity} %
        </div>
      </div>
      <div className=" w-full max-w-[400px]  flex justify-between  items-center m-3">
        <span className=" w-[100px]  flex justify-center items-center">
          <img src="./vento.png" alt="" />
        </span>
        <div className=" text-[20px] border-b-[3px] border-[#A883BA] ">
          Vento: {speed} m/s
        </div>
      </div>
    </div>
  );
}

export default MoreInformationToday;
