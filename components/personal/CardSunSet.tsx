import React from "react";

interface CardSunSetProp {
  UrlImg: string;
  Name: string;
  Time: string;
}

function CardSunSet({ UrlImg, Name, Time }: CardSunSetProp) {
  const calculo = JSON.parse(Time) * 1000;
  const now = new Date(calculo);

  return (
    <div
      className=" w-[300px] h-[300px] bg-cover rounded-lg flex flex-col text-[black] mt-3"
      style={{
        backgroundImage: `url(${UrlImg})`,
      }}
    >
      <h1 className=" w-full  flex justify-center  text-[30px] text-[#5A3E51] ">
        {Name}
      </h1>

      <p className=" w-full flex justify-center items-center flex-1  text-[white] text-[50px]">{`  ${
        now.getHours() + ":" + now.getMinutes()
      }`}</p>
    </div>
  );
}

export default CardSunSet;
