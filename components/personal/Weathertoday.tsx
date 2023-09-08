"use client";

import { Card } from "../ui/card";
import Mapa from "./Map";
// import {Mapa} from "../personal/Mapa"

interface WeathertodayProp {
  NameCity: string;
  InfoDay: string;
  IdImg: string;
  tempoAtual: string;
  description: string;
  latitude: string;
  longitude: string;
}

function Weathertoday({
  NameCity,
  InfoDay,
  IdImg,
  tempoAtual,
  description,
  latitude,
  longitude,
}: WeathertodayProp) {
  const cdayName = new Array(
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  );
  const monName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "agosto",
    "outubro",
    "novembro",
    "dezembro"
  );
  const now = new Date(InfoDay);
  return (
    <div className=" w-full flex justify-center items-center">
      <div
        className=" w-full max-w-[98%]  flex justify-center items-center rounded-lg pb-2 "
        style={{
          backgroundImage:
            " linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff)",
        }}
      >
        {/* background-image: linear-gradient(to right top, #a883ba, #b299cd, #bdafdf, #cac4ef, #d9daff); */}
        <div className=" w-full max-w-[1700px]  rounded-md min-h-[650px] ">
          <div className=" flex items-center justify-around flex-wrap">
            {/* card previa */}
            <div className=" w-full max-w-[500px]  flex justify-center items-end border-[0px] border-[none] bg-[#00000000]">
              <div className=" w-full flex flex-col justify-center items-center">
                <h1 className="text-[50px] md:text-[90px] font-extrabold text-[white]">
                  {NameCity}
                </h1>
                <div className=" w-full  flex justify-around items-center ">
                  <span className="  min-w-[150px]  text-[white]     font-bold">
                    {cdayName[now.getDay()] +
                      ", " +
                      now.getDay() +
                      " de " +
                      monName[now.getMonth()]}
                  </span>
                  <span className="  min-w-[150px] text-[white]  font-bold">
                    {"Atualização as " +
                      now.getHours() +
                      ":" +
                      now.getMinutes()}
                  </span>
                </div>

                <Card className=" mt-[20px]">
                  <Mapa lat={latitude} lng={longitude}></Mapa>
                </Card>
              </div>
            </div>

            <div className=" flex justify-center max-w-[500px] items-center flex-wrap ">
              <div className=" w-full max-w-[400px] mt-1  overflow-hidden flex justify-center items-center ">
                <img src={"./Weather.svg"} alt="" className=" min-w-full" />
              </div>

              <div
                className=" w-[83%] mt-5 md:mt-0 max-w-[500px] min-h-[300px] rounded-lg p-9"
                style={{
                  backgroundImage:
                    " linear-gradient(to right top, #5a3e51, #6f4e68, #835e82, #96709d, #a883ba)",
                }}
              >
                <div className="  w-full flex justify-between h-[100px] ">
                  <div className=" bg-[#ffffff] text-[black] rounded-xl p-5 font-bold w-[100px] flex justify-center items-center tet">
                    Hoje
                  </div>

                  <div className="  text-[#ffffff] rounded-xl p-5   flex justify-center items-center text-[40px] md:text-[60px] font-extrabold ">
                    {description}
                  </div>
                </div>

                <div className=" w-full flex flex-col justify-center items-center">
                  <div className=" w-[150px]  overflow-hidden flex justify-center items-center ">
                    <img
                      src={`https://openweathermap.org/img/wn/${IdImg}@2x.png`}
                      alt=""
                      className=" min-w-full"
                    />
                  </div>

                  <div className=" w-full text-[50px]  rounded-lg font-bold  flex items-center justify-center">
                    {tempoAtual}
                  </div>

                  <div className=" w-full flex bg-[#a883ba] justify-around  rounded-lg">
                    <h1 className=" p-2 font-bold ">Mínima:{tempoAtual}</h1>
                    <h1 className=" p-2 font-bold ">Máxima:{tempoAtual}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weathertoday;
